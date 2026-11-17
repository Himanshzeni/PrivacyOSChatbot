/**
 * WhatsApp Cloud API (Meta Graph API v21.0) Type Definitions
 */

export interface WhatsAppWebhookMessageText {
  body: string;
}

export interface WhatsAppWebhookInteractiveReply {
  id: string;
  title: string;
}

export interface WhatsAppWebhookInteractive {
  type: "button_reply" | "list_reply";
  button_reply?: WhatsAppWebhookInteractiveReply;
  list_reply?: WhatsAppWebhookInteractiveReply;
}

export interface WhatsAppWebhookMessage {
  from: string; // e.g. "919876543210"
  id: string; // "wamid.HBg..."
  timestamp: string;
  type: "text" | "interactive" | "image" | "document" | "location" | "button" | "unknown";
  text?: WhatsAppWebhookMessageText;
  interactive?: WhatsAppWebhookInteractive;
}

export interface WhatsAppWebhookContact {
  profile: {
    name?: string;
  };
  wa_id: string;
}

export interface WhatsAppWebhookStatus {
  id: string;
  status: "sent" | "delivered" | "read" | "failed";
  timestamp: string;
  recipient_id: string;
  errors?: Array<{
    code: number;
    title: string;
    message: string;
  }>;
}

export interface WhatsAppWebhookChangeValue {
  messaging_product: "whatsapp";
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts?: WhatsAppWebhookContact[];
  messages?: WhatsAppWebhookMessage[];
  statuses?: WhatsAppWebhookStatus[];
}

export interface WhatsAppWebhookPayload {
  object: "whatsapp_business_account";
  entry?: Array<{
    id: string;
    changes: Array<{
      value: WhatsAppWebhookChangeValue;
      field: "messages";
    }>;
  }>;
}

export interface WhatsAppInteractiveButton {
  id: string;
  title: string;
}

export interface WhatsAppSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  provider?: "meta" | "twilio" | "mock";
}
