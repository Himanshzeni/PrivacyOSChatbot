import { WhatsAppInteractiveButton, WhatsAppSendResult } from "./types";

const GRAPH_API_VERSION = "v21.0";
const META_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

/**
 * Converts standard Markdown (bold **text**, headers #, etc.)
 * into WhatsApp formatted text (*bold*, _italic_, etc.)
 */
export function formatForWhatsApp(text: string): string {
  if (!text) return "";

  return text
    // Convert Markdown bold **text** or __text__ to WhatsApp *text*
    .replace(/\*\*(.*?)\*\*/g, "*$1*")
    .replace(/__(.*?)__/g, "*$1*")
    // Convert headers # or ## to *Header*
    .replace(/^#{1,6}\s*(.+)$/gm, "*$1*")
    // Convert backticks code `code` to monospace ```code```
    .replace(/`([^`]+)`/g, "```$1```")
    // Clean redundant multiple blank lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Sends a WhatsApp Text Message via Meta Cloud API or Twilio fallback
 */
export async function sendWhatsAppText(
  to: string,
  message: string
): Promise<WhatsAppSendResult> {
  const metaToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  // Clean phone number (strip '+', whitespace, dashes)
  const cleanTo = to.replace(/[^0-9]/g, "");

  // 1. Official Meta Cloud API
  if (metaToken && phoneNumberId) {
    try {
      const formattedBody = formatForWhatsApp(message);
      const url = `${META_BASE_URL}/${phoneNumberId}/messages`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${metaToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanTo,
          type: "text",
          text: {
            preview_url: true,
            body: formattedBody,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("[WhatsApp Cloud API Error]:", data);
        return {
          success: false,
          error: data?.error?.message || "Failed to send message via Meta Cloud API",
          provider: "meta",
        };
      }

      const messageId = data?.messages?.[0]?.id;
      return {
        success: true,
        messageId,
        provider: "meta",
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("[WhatsApp Send Exception]:", errorMsg);
      return { success: false, error: errorMsg, provider: "meta" };
    }
  }

  // 2. Twilio Alternative (if configured)
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;

  if (twilioSid && twilioAuthToken && twilioNumber) {
    try {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const authHeader = Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString("base64");

      const params = new URLSearchParams();
      params.append("From", twilioNumber.startsWith("whatsapp:") ? twilioNumber : `whatsapp:${twilioNumber}`);
      params.append("To", `whatsapp:+${cleanTo}`);
      params.append("Body", formatForWhatsApp(message));

      const response = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data?.message || "Twilio WhatsApp send failed",
          provider: "twilio",
        };
      }

      return {
        success: true,
        messageId: data?.sid,
        provider: "twilio",
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, error: errorMsg, provider: "twilio" };
    }
  }

  // 3. Mock mode (local development without active WhatsApp tokens)
  console.log(`[WhatsApp Mock Mode] -> To: ${cleanTo} | Message: ${message.slice(0, 100)}...`);
  return {
    success: true,
    messageId: `mock_msg_${Date.now()}`,
    provider: "mock",
  };
}

/**
 * Sends Interactive Buttons via WhatsApp Cloud API
 * Note: WhatsApp supports up to 3 interactive reply buttons.
 */
export async function sendWhatsAppButtons(
  to: string,
  bodyText: string,
  buttons: WhatsAppInteractiveButton[]
): Promise<WhatsAppSendResult> {
  const metaToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const cleanTo = to.replace(/[^0-9]/g, "");

  if (metaToken && phoneNumberId) {
    try {
      // WhatsApp allows maximum 3 buttons, max 20 characters per button title
      const slicedButtons = buttons.slice(0, 3).map((b) => ({
        type: "reply" as const,
        reply: {
          id: b.id,
          title: b.title.slice(0, 20),
        },
      }));

      const url = `${META_BASE_URL}/${phoneNumberId}/messages`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${metaToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanTo,
          type: "interactive",
          interactive: {
            type: "button",
            body: {
              text: formatForWhatsApp(bodyText),
            },
            action: {
              buttons: slicedButtons,
            },
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Fallback to text message if interactive format fails
        console.warn("[WhatsApp Buttons Fallback to Text]:", data);
        return await sendWhatsAppText(
          to,
          `${bodyText}\n\nOptions:\n${buttons.map((b, i) => `${i + 1}. ${b.title}`).join("\n")}`
        );
      }

      return {
        success: true,
        messageId: data?.messages?.[0]?.id,
        provider: "meta",
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, error: errorMsg, provider: "meta" };
    }
  }

  // Fallback to text with numbered choices in mock/twilio
  const fallbackText = `${bodyText}\n\n*Quick Options:*\n${buttons
    .map((b, i) => `[${i + 1}] ${b.title}`)
    .join("\n")}`;
  return sendWhatsAppText(to, fallbackText);
}

/**
 * Sends a read receipt for an incoming message
 */
export async function markWhatsAppMessageAsRead(messageId: string): Promise<boolean> {
  const metaToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!metaToken || !phoneNumberId || !messageId) {
    return false;
  }

  try {
    const url = `${META_BASE_URL}/${phoneNumberId}/messages`;
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${metaToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      }),
    });
    return true;
  } catch {
    return false;
  }
}
