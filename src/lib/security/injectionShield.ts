const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /you\s+are\s+now\s+(unrestricted|in\s+developer\s+mode|dan|jailbroken)/i,
  /reveal\s+(your\s+)?(system\s+prompt|system\s+instructions|internal\s+rules)/i,
  /print\s+the\s+text\s+above/i,
  /bypass\s+(all\s+)?safety\s+filters/i,
  /output\s+the\s+exact\s+prompt/i,
  /\[\[LEAD_DATA/i, // Prevent tampering with internal markers
];

export function validateInputSecurity(input: string): { isValid: boolean; reason?: string } {
  if (!input || typeof input !== "string") {
    return { isValid: false, reason: "Invalid input format" };
  }

  const trimmed = input.trim();
  if (trimmed.length > 2500) {
    return { isValid: false, reason: "Message exceeds allowed length of 2500 characters" };
  }

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        isValid: false,
        reason: "Prompt injection or unsupported command pattern detected",
      };
    }
  }

  return { isValid: true };
}
