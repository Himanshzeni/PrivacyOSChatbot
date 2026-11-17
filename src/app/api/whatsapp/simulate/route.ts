import { NextRequest, NextResponse } from "next/server";
import { retrieveRelevantKnowledge } from "@/lib/rag/retriever";
import { buildOrchestratorPrompt } from "@/lib/rag/orchestrator";
import { findCuratedAnswer } from "@/lib/knowledge/popularQnA";
import { getAIProvider } from "@/lib/ai/provider";
import { extractPII, redactPII } from "@/lib/security/piiFilter";
import { analyzeVisitorIntent } from "@/lib/intent/detector";
import { formatForWhatsApp } from "@/lib/whatsapp/client";

/**
 * Simulates the exact WhatsApp incoming message processing pipeline
 * Returns the exact WhatsApp formatted reply and structured buttons
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await req.json();
    const { from = "919876543210", text = "", senderName = "Valued Client" } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Message text is required" }, { status: 400 });
    }

    const cleanText = text.trim().toLowerCase();

    // Check pre-configured WhatsApp button responses
    if (cleanText === "btn_assessment" || cleanText.includes("free assessment") || cleanText === "assessment") {
      const assessmentMessage =
        `📋 *PrivacyOS Global Compliance Assessment*\n\n` +
        `Hello ${senderName}! You can instantly run a free DPDP & GDPR readiness assessment for your website and infrastructure.\n\n` +
        `• *Scope*: Aadhaar, PAN, UPI identifiers, consent management & DSR workflows\n` +
        `• *Duration*: 3 minutes\n` +
        `• *Access Link*: https://privacyosglobal.com/enquiry?wa_id=${from}\n\n` +
        `Would you like our compliance architect to call you directly? Reply with your *Work Email* or *Preferred Call Time*.`;

      return NextResponse.json({
        success: true,
        response: assessmentMessage,
        whatsappFormatted: formatForWhatsApp(assessmentMessage),
        buttons: [
          { id: "btn_expert", title: "Talk to Expert" },
          { id: "btn_penalties", title: "DPDP Penalties" },
          { id: "btn_modules", title: "Platform Modules" },
        ],
        intent: "STRONG_ENQUIRY",
        latencyMs: Date.now() - startTime,
      });
    }

    if (cleanText === "btn_penalties" || cleanText.includes("penalty") || cleanText.includes("penalties")) {
      const penaltyMsg =
        `⚖️ *DPDP Act 2023 Penalty Framework*\n\n` +
        `Under Section 33 & First Schedule of the Digital Personal Data Protection Act 2023:\n\n` +
        `1️⃣ *Failure to take reasonable security safeguards* to prevent data breaches: Up to *₹250 Crore*.\n` +
        `2️⃣ *Failure to notify Data Protection Board (DPB) or affected Data Principals*: Up to *₹200 Crore*.\n` +
        `3️⃣ *Breach of additional obligations for Children's Data* (Section 9): Up to *₹200 Crore*.\n` +
        `4️⃣ *Breach of obligations of Significant Data Fiduciaries (SDF)*: Up to *₹150 Crore*.\n` +
        `5️⃣ *General statutory violations*: Up to *₹50 Crore*.\n\n` +
        `*Hard Deadline*: 13 May 2027 (18-Month Transition active now).`;

      return NextResponse.json({
        success: true,
        response: penaltyMsg,
        whatsappFormatted: formatForWhatsApp(penaltyMsg),
        buttons: [
          { id: "btn_assessment", title: "Free Assessment" },
          { id: "btn_expert", title: "Talk to Expert" },
        ],
        intent: "INFORMATIONAL",
        latencyMs: Date.now() - startTime,
      });
    }

    // PII & sanitization
    const piiResult = extractPII(text);
    const sanitizedUserMessage = redactPII(text);
    const intentResult = analyzeVisitorIntent(text, 1, piiResult.hasPII || text.length > 40);

    // Knowledge search
    let replyText = "";
    const curatedAnswer = findCuratedAnswer(sanitizedUserMessage);

    if (curatedAnswer) {
      replyText = curatedAnswer;
    } else {
      const retrievedContext = await retrieveRelevantKnowledge(sanitizedUserMessage);
      const systemPrompt = buildOrchestratorPrompt(retrievedContext);

      const aiProvider = getAIProvider();
      const history = [
        {
          role: "user" as const,
          content: `[User WhatsApp Contact Name: ${senderName}]\n${sanitizedUserMessage}`,
        },
      ];

      const aiResponse = await aiProvider.generateResponse(history, systemPrompt);
      replyText = aiResponse.text
        .replace(/\[Source:[^\]]*\]/gi, "")
        .replace(/\[https?:\/\/[^\]]*\]/gi, "")
        .trim();
    }

    const whatsappFormatted = formatForWhatsApp(replyText);

    return NextResponse.json({
      success: true,
      response: replyText,
      whatsappFormatted,
      buttons: [
        { id: "btn_assessment", title: "Free Assessment" },
        { id: "btn_penalties", title: "DPDP Penalties" },
        { id: "btn_expert", title: "Talk to Expert" },
      ],
      intent: intentResult.level,
      hasPiiRedacted: piiResult.hasPII,
      latencyMs: Date.now() - startTime,
    });
  } catch (error) {
    console.error("[WhatsApp Simulator Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process simulated WhatsApp message",
      },
      { status: 500 }
    );
  }
}
