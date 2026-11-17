import crypto from "crypto";

/**
 * Validates Meta WhatsApp Webhook X-Hub-Signature-256 header.
 * Uses timingSafeEqual to guard against timing attacks.
 */
export function verifyMetaSignature(rawBody: string | Buffer, signatureHeader: string | null): boolean {
  const appSecret = process.env.WHATSAPP_APP_SECRET;

  // If secret is not configured in environment, permit during development or warn
  if (!appSecret) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[WhatsApp Security] WHATSAPP_APP_SECRET is not set in production. Webhook validation disabled.");
    }
    return true;
  }

  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
    return false;
  }

  try {
    const signature = signatureHeader.replace("sha256=", "");
    const bodyBuffer = typeof rawBody === "string" ? Buffer.from(rawBody, "utf8") : rawBody;

    const computedHmac = crypto
      .createHmac("sha256", appSecret)
      .update(bodyBuffer)
      .digest("hex");

    const expectedBuffer = Buffer.from(computedHmac, "hex");
    const receivedBuffer = Buffer.from(signature, "hex");

    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch (err) {
    console.error("[WhatsApp Security Error]: Failed to verify signature", err);
    return false;
  }
}
