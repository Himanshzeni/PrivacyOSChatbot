import { NextResponse } from "next/server";

export async function GET() {
  const hasAccessToken = !!process.env.WHATSAPP_ACCESS_TOKEN;
  const hasPhoneNumberId = !!process.env.WHATSAPP_PHONE_NUMBER_ID;
  const hasAppSecret = !!process.env.WHATSAPP_APP_SECRET;
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "privacyos_whatsapp_webhook_token";
  const publicWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919876543210";
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;

  const isConfigured = hasAccessToken && hasPhoneNumberId;

  return NextResponse.json({
    status: isConfigured ? "configured" : "mock_or_pending",
    readyForProduction: isConfigured && hasAppSecret,
    details: {
      hasAccessToken,
      hasPhoneNumberId,
      hasAppSecret,
      verifyToken,
      publicWhatsAppNumber,
      hasGeminiKey,
      webhookPath: "/api/whatsapp",
    },
    suggestedSteps: isConfigured
      ? [
          "Meta Cloud API credentials are active.",
          "Ensure your webhook URL https://<your-domain>/api/whatsapp is registered in Meta App Dashboard.",
          "Subscribe to the 'messages' field in Webhook settings.",
        ]
      : [
          "Set WHATSAPP_ACCESS_TOKEN & WHATSAPP_PHONE_NUMBER_ID in .env",
          "Set WHATSAPP_VERIFY_TOKEN for webhook challenge verification",
          "Set WHATSAPP_APP_SECRET for HMAC-SHA256 signature verification",
          "Test using the built-in WhatsApp Simulator & Webhook Tester below.",
        ],
  });
}
