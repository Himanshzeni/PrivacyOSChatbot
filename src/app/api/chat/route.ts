import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { getAIProvider } from "@/lib/ai/provider";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { validateInputSecurity } from "@/lib/security/injectionShield";
import { extractPII, redactPII } from "@/lib/security/piiFilter";
import { retrieveRelevantKnowledge } from "@/lib/rag/retriever";
import { buildOrchestratorPrompt } from "@/lib/rag/orchestrator";
import { analyzeVisitorIntent } from "@/lib/intent/detector";
import { ChatMessage } from "@/lib/ai/types";
import { findCuratedAnswer } from "@/lib/knowledge/popularQnA";

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    const body = await req.json();
    const { message, conversationId, history = [] } = body;

    const convId = conversationId || "conv_" + Math.random().toString(36).substring(2, 12);

    // 1. Rate Limiting (Session/IP key)
    const rateCheck = checkRateLimit(convId, 30, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute." },
        { status: 429 }
      );
    }

    // 2. Input Security Validation
    const securityCheck = validateInputSecurity(message);
    if (!securityCheck.isValid) {
      return NextResponse.json(
        { error: securityCheck.reason || "Invalid request content" },
        { status: 400 }
      );
    }

    // 3. PII Extraction & Sanitization (DPDP Privacy Layer)
    const piiResult = extractPII(message);
    const sanitizedUserMessage = redactPII(message);

    // If voluntary contact details or requirements were shared, persist to TemporaryBotEnquiry
    if (piiResult.hasPII && isDatabaseConfigured()) {
      try {
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24-hour TTL

        await prisma.temporaryBotEnquiry.upsert({
          where: { conversationId: convId },
          update: {
            detectedName: piiResult.name || undefined,
            detectedEmail: piiResult.email || undefined,
            detectedPhone: piiResult.phone || undefined,
            requirementNotes: sanitizedUserMessage,
            expiresAt,
          },
          create: {
            conversationId: convId,
            sessionId: convId,
            detectedName: piiResult.name,
            detectedEmail: piiResult.email,
            detectedPhone: piiResult.phone,
            requirementNotes: sanitizedUserMessage,
            expiresAt,
          },
        });
      } catch (dbErr) {
        console.warn("[TemporaryBotEnquiry Warning]: DB save skipped", dbErr);
      }
    }

    // 4. Intent Detection
    const turnCount = (history?.length || 0) + 1;
    const intentResult = analyzeVisitorIntent(
      message,
      turnCount,
      piiResult.hasPII || message.length > 50
    );

    // 5. Hybrid RAG Retrieval (Priority 1: Website, Priority 2: DPDP)
    const retrievedContext = await retrieveRelevantKnowledge(sanitizedUserMessage);

    // 6. Build 4-Tier Orchestrated System Prompt
    const systemPrompt = buildOrchestratorPrompt(retrievedContext);

    // 7. Format Chat History (Keep only the last 6 turns to maintain short session context)
    const recentHistory: ChatMessage[] = (history || [])
      .slice(-6)
      .map((item: { role: string; content: string }) => ({
        role: item.role === "assistant" ? "assistant" : "user",
        content: redactPII(item.content),
      }));

    recentHistory.push({
      role: "user",
      content: sanitizedUserMessage,
    });

    // 8. Generate AI Response via Abstracted Provider or Curated High-Precision Knowledge
    let cleanResponseText = "";
    let tokensUsed = 0;

    const curatedAnswer = findCuratedAnswer(sanitizedUserMessage);
    if (curatedAnswer) {
      cleanResponseText = curatedAnswer;
      tokensUsed = Math.round(curatedAnswer.length / 4);
    } else {
      const aiProvider = getAIProvider();
      const aiResponse = await aiProvider.generateResponse(recentHistory, systemPrompt);
      tokensUsed = aiResponse.tokensUsed || 0;
      cleanResponseText = aiResponse.text
        .replace(/\[Source:[^\]]*\]/gi, "")
        .replace(/\[https?:\/\/[^\]]*\]/gi, "")
        .trim();
    }

    // 9. Privacy-Sanitized Analytics Log (No PII)
    const latencyMs = Date.now() - startTime;
    if (isDatabaseConfigured()) {
      try {
        await prisma.analyticsEvent.create({
          data: {
            eventType: "message_sent",
            conversationId: convId,
            intentType: intentResult.level,
            tokensUsed,
            latencyMs,
            metadata: {
              hasPiiRedacted: piiResult.hasPII,
              matchedSourcesCount: retrievedContext.length,
            },
          },
        });
      } catch {
        // Analytics non-blocking
      }
    }

    return NextResponse.json({
      response: cleanResponseText,
      conversationId: convId,
      intent: intentResult.level,
      suggestSoftEnquiry: intentResult.suggestSoftEnquiry,
      sources: [],
    });
  } catch (error) {
    console.error("[Chat API Route Error]:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        response:
          "Maaf kijiye, temporary processing error aaya hai. Kripya thodi der baad dobara koshish karein.",
      },
      { status: 500 }
    );
  }
}
