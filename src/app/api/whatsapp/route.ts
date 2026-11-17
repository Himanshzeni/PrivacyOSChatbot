import { NextRequest, NextResponse } from "next/server";
import { verifyMetaSignature } from "@/lib/whatsapp/webhookSecurity";
import { processIncomingWhatsAppMessage } from "@/lib/whatsapp/processor";
import { WhatsAppWebhookPayload } from "@/lib/whatsapp/types";

/**
 * GET Handler - Meta Webhook Verification Challenge
 * Meta sends GET request when you register the Webhook URL in Meta App Dashboard:
 * https://your-domain.com/api/whatsapp
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN || "privacyos_whatsapp_webhook_token";

  if (mode === "subscribe" && token === expectedToken) {
    console.log("[WhatsApp Webhook]: Verification successful for challenge:", challenge);
    return new Response(challenge || "", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  console.warn("[WhatsApp Webhook]: Verification failed. Provided token does not match WHATSAPP_VERIFY_TOKEN.");
  return new Response("Verification token mismatch", { status: 403 });
}

/**
 * POST Handler - Receives WhatsApp Messages & Status updates from Meta Cloud API
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");

    // 1. Signature Verification (HMAC-SHA256)
    if (process.env.WHATSAPP_APP_SECRET) {
      const isValid = verifyMetaSignature(rawBody, signature);
      if (!isValid) {
        console.error("[WhatsApp Webhook]: Invalid HMAC signature detected");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const payload: WhatsAppWebhookPayload = JSON.parse(rawBody);

    // Meta sends test pings or non-message payloads
    if (payload.object !== "whatsapp_business_account" && (payload as unknown as Record<string, unknown>).object !== "whatsapp_business_account") {
      return NextResponse.json({ status: "ignored_non_whatsapp_object" }, { status: 200 });
    }

    const entries = payload.entry || [];
    for (const entry of entries) {
      for (const change of entry.changes || []) {
        const value = change.value;
        if (!value) continue;

        // Extract contacts
        const contactMap: Record<string, string> = {};
        if (value.contacts) {
          for (const contact of value.contacts) {
            contactMap[contact.wa_id] = contact.profile?.name || "";
          }
        }

        // Process incoming messages
        if (value.messages && value.messages.length > 0) {
          for (const message of value.messages) {
            const senderNumber = message.from;
            const messageId = message.id;
            const senderName = contactMap[senderNumber] || "";

            let messageText = "";

            if (message.type === "text" && message.text) {
              messageText = message.text.body;
            } else if (message.type === "interactive" && message.interactive) {
              if (message.interactive.button_reply) {
                messageText = message.interactive.button_reply.id || message.interactive.button_reply.title;
              } else if (message.interactive.list_reply) {
                messageText = message.interactive.list_reply.id || message.interactive.list_reply.title;
              }
            } else if (message.type === "button") {
              // Quick reply template button
              messageText = (message as unknown as { button: { text: string } }).button?.text || "Option clicked";
            } else {
              // Media or other format
              messageText = "Hello";
            }

            if (messageText && senderNumber) {
              console.log(`[WhatsApp Incoming]: From: ${senderNumber} (${senderName}): ${messageText}`);

              // Process message through AI RAG pipeline asynchronously
              await processIncomingWhatsAppMessage({
                from: senderNumber,
                text: messageText,
                messageId,
                senderName,
              });
            }
          }
        }
      }
    }

    // Always return 200 OK to Meta to acknowledge event receipt
    return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  } catch (error) {
    console.error("[WhatsApp Webhook Route Error]:", error);
    // Returning 200 avoids Meta retrying failing webhooks repeatedly
    return NextResponse.json({ status: "ERROR_HANDLED" }, { status: 200 });
  }
}
