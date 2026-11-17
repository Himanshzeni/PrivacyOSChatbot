import { prisma, isDatabaseConfigured } from "@/lib/db";
import { getAIProvider } from "@/lib/ai/provider";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { validateInputSecurity } from "@/lib/security/injectionShield";
import { extractPII, redactPII } from "@/lib/security/piiFilter";
import { retrieveRelevantKnowledge } from "@/lib/rag/retriever";
import { buildOrchestratorPrompt } from "@/lib/rag/orchestrator";
import { analyzeVisitorIntent } from "@/lib/intent/detector";
import { findCuratedAnswer } from "@/lib/knowledge/popularQnA";
import { sendWhatsAppButtons, sendWhatsAppText, markWhatsAppMessageAsRead } from "./client";
import { WhatsAppInteractiveButton } from "./types";

export interface ProcessWhatsAppInput {
  from: string; // sender phone number
  text: string; // message text or button payload
  messageId?: string;
  senderName?: string;
}

export async function processIncomingWhatsAppMessage(input: ProcessWhatsAppInput) {
  const { from, text, messageId, senderName } = input;
  const startTime = Date.now();
  const convId = `wa_${from.replace(/[^0-9]/g, "")}`;

  // 1. Mark message as read on WhatsApp
  if (messageId) {
    markWhatsAppMessageAsRead(messageId).catch(() => {});
  }

  // 2. Rate Limiting (Prevent spam)
  const rateCheck = checkRateLimit(convId, 25, 60000);
  if (!rateCheck.success) {
    await sendWhatsAppText(
      from,
      "⏳ *Too many messages received.* Please wait a minute before sending another message."
    );
    return;
  }

  // 3. Security Check
  const securityCheck = validateInputSecurity(text);
  if (!securityCheck.isValid) {
    await sendWhatsAppText(
      from,
      "⚠️ *Security Notice*: Your request could not be processed due to invalid or restricted syntax."
    );
    return;
  }

  // 4. Quick Action Button / Keyword Handling
  const cleanText = text.trim().toLowerCase();

  if (cleanText === "btn_assessment" || cleanText.includes("free assessment") || cleanText === "assessment") {
    const assessmentMessage =
      `📋 *PrivacyOS Global Compliance Assessment*\n\n` +
      `Hello ${senderName || "there"}! You can instantly run a free DPDP & GDPR readiness assessment for your website and infrastructure.\n\n` +
      `• *Scope*: Aadhaar, PAN, UPI identifiers, consent management & DSR workflows\n` +
      `• *Duration*: 3 minutes\n` +
      `• *Access Link*: https://privacyosglobal.com/enquiry?wa_id=${from}\n\n` +
      `Would you like our compliance architect to call you directly? Reply with your *Work Email* or *Preferred Call Time*.`;

    const buttons: WhatsAppInteractiveButton[] = [
      { id: "btn_expert", title: "Talk to Expert" },
      { id: "btn_penalties", title: "DPDP Penalties" },
      { id: "btn_modules", title: "Platform Modules" },
    ];

    await sendWhatsAppButtons(from, assessmentMessage, buttons);
    return;
  }

  if (cleanText === "btn_penalties" || cleanText.includes("penalty") || cleanText.includes("penalties")) {
    const penaltyMsg =
      `⚖️ *DPDP Act 2023 Penalty Framework*\n\n` +
      `Under Section 33 & the First Schedule of the Digital Personal Data Protection Act 2023:\n\n` +
      `1️⃣ *Failure to take reasonable security safeguards* to prevent personal data breach: Up to *₹250 Crore*.\n` +
      `2️⃣ *Failure to notify Data Protection Board (DPB) or affected Data Principals* of a breach: Up to *₹200 Crore*.\n` +
      `3️⃣ *Breach of additional obligations for Children's Data* (Section 9): Up to *₹200 Crore*.\n` +
      `4️⃣ *Breach of obligations of Significant Data Fiduciaries (SDF)*: Up to *₹150 Crore*.\n` +
      `5️⃣ *General statutory violations*: Up to *₹50 Crore*.\n\n` +
      `*Hard Deadline*: 13 May 2027 (18-Month Transition active now).`;

    const buttons: WhatsAppInteractiveButton[] = [
      { id: "btn_assessment", title: "Free Assessment" },
      { id: "btn_expert", title: "Talk to Expert" },
    ];

    await sendWhatsAppButtons(from, penaltyMsg, buttons);
    return;
  }

  // 5. PII Extraction & Sanitization (DPDP Privacy Layer)
  const piiResult = extractPII(text);
  const sanitizedUserMessage = redactPII(text);

  // If user provided contact information or requirements, register in TemporaryBotEnquiry
  if (isDatabaseConfigured()) {
    try {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24-hr TTL
      await prisma.temporaryBotEnquiry.upsert({
        where: { conversationId: convId },
        update: {
          detectedName: piiResult.name || senderName || undefined,
          detectedEmail: piiResult.email || undefined,
          detectedPhone: piiResult.phone || from,
          requirementNotes: sanitizedUserMessage,
          expiresAt,
        },
        create: {
          conversationId: convId,
          sessionId: convId,
          detectedName: piiResult.name || senderName,
          detectedEmail: piiResult.email,
          detectedPhone: piiResult.phone || from,
          requirementNotes: sanitizedUserMessage,
          expiresAt,
        },
      });
    } catch (dbErr) {
      console.warn("[WhatsApp DB Notice]: TemporaryBotEnquiry save skipped", dbErr);
    }
  }

  // 6. Intent Detection
  const intentResult = analyzeVisitorIntent(text, 1, piiResult.hasPII || text.length > 40);

  // 7. Knowledge Search (Curated FAQ first, then Hybrid RAG + AI Provider)
  let replyText = "";
  let tokensUsed = 0;

  const curatedAnswer = findCuratedAnswer(sanitizedUserMessage);
  if (curatedAnswer) {
    replyText = curatedAnswer;
    tokensUsed = Math.round(curatedAnswer.length / 4);
  } else {
    // Hybrid RAG Knowledge Retrieval
    const retrievedContext = await retrieveRelevantKnowledge(sanitizedUserMessage);
    const systemPrompt = buildOrchestratorPrompt(retrievedContext);

    const aiProvider = getAIProvider();
    const history = [
      {
        role: "user" as const,
        content: `[User WhatsApp Contact Name: ${senderName || "Unknown"}]\n${sanitizedUserMessage}`,
      },
    ];

    const aiResponse = await aiProvider.generateResponse(history, systemPrompt);
    tokensUsed = aiResponse.tokensUsed || 0;
    replyText = aiResponse.text
      .replace(/\[Source:[^\]]*\]/gi, "")
      .replace(/\[https?:\/\/[^\]]*\]/gi, "")
      .trim();
  }

  // 8. Decide whether to send standard text or Interactive Buttons
  const buttons: WhatsAppInteractiveButton[] = [
    { id: "btn_assessment", title: "Free Assessment" },
    { id: "btn_penalties", title: "DPDP Penalties" },
    { id: "btn_expert", title: "Talk to Expert" },
  ];

  if (intentResult.suggestSoftEnquiry || replyText.length < 350) {
    await sendWhatsAppButtons(from, replyText, buttons);
  } else {
    await sendWhatsAppText(from, replyText);
  }

  // 9. Analytics Log
  const latencyMs = Date.now() - startTime;
  if (isDatabaseConfigured()) {
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: "whatsapp_message",
          conversationId: convId,
          intentType: intentResult.level,
          tokensUsed,
          latencyMs,
          metadata: {
            from: from.slice(0, 4) + "****" + from.slice(-2),
            hasPiiRedacted: piiResult.hasPII,
          },
        },
      });
    } catch {
      // non-blocking
    }
  }
}
