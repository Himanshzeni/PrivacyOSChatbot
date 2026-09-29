export interface DetectedPII {
  hasPII: boolean;
  name?: string;
  email?: string;
  phone?: string;
  otherRedactions: string[];
}

// Regex patterns for sensitive Indian PII & standard credentials
const PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
  phone: /(?:(?:\+91|0)?[\s-]?[6789]\d{9})|(?:\b\d{10}\b)/g,
  pan: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g,
  aadhaar: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
  nameGreeting: /(?:my name is|i am|this is|call me|myself)\s+([a-zA-Z\s]{2,30})/i,
};

export function extractPII(text: string): DetectedPII {
  const emails = text.match(PATTERNS.email) || [];
  const phones = text.match(PATTERNS.phone) || [];
  const pans = text.match(PATTERNS.pan) || [];
  const aadhaars = text.match(PATTERNS.aadhaar) || [];
  const nameMatch = text.match(PATTERNS.nameGreeting);

  const otherRedactions: string[] = [...pans, ...aadhaars];

  return {
    hasPII: emails.length > 0 || phones.length > 0 || otherRedactions.length > 0 || Boolean(nameMatch),
    name: nameMatch ? nameMatch[1].trim() : undefined,
    email: emails[0] || undefined,
    phone: phones[0] ? phones[0].replace(/[\s-]/g, "") : undefined,
    otherRedactions,
  };
}

export function redactPII(text: string): string {
  let redacted = text;

  // Mask emails
  redacted = redacted.replace(PATTERNS.email, "[PROTECTED_EMAIL]");

  // Mask phones
  redacted = redacted.replace(PATTERNS.phone, "[PROTECTED_PHONE]");

  // Mask PAN
  redacted = redacted.replace(PATTERNS.pan, "[PROTECTED_ID]");

  // Mask Aadhaar
  redacted = redacted.replace(PATTERNS.aadhaar, "[PROTECTED_AADHAAR]");

  return redacted;
}
