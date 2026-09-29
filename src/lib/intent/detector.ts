export type IntentLevel = "CASUAL" | "INFORMATIONAL" | "STRONG_ENQUIRY";

export interface IntentAnalysisResult {
  level: IntentLevel;
  score: number; // 0.0 - 1.0
  reasons: string[];
  suggestSoftEnquiry: boolean;
}

const STRONG_ENQUIRY_TRIGGERS = [
  "price",
  "pricing",
  "cost",
  "quote",
  "proposal",
  "hire",
  "consultation",
  "enquiry",
  "contact team",
  "talk to team",
  "start service",
  "book",
  "onboard",
  "urgent issue",
  "my website is down",
  "want to fix",
  "take maintenance",
  "kharidna hai",
  "service leni hai",
  "baat karni hai",
];

export function analyzeVisitorIntent(
  userMessage: string,
  turnCount: number,
  hasSharedRequirements = false
): IntentAnalysisResult {
  const text = userMessage.toLowerCase();
  const matchedTriggers = STRONG_ENQUIRY_TRIGGERS.filter((trigger) => text.includes(trigger));

  let score = 0.2;
  const reasons: string[] = [];

  if (matchedTriggers.length > 0) {
    score += 0.45;
    reasons.push(`Explicit commercial trigger matched: ${matchedTriggers.join(", ")}`);
  }

  if (hasSharedRequirements) {
    score += 0.35;
    reasons.push("Visitor voluntarily shared specific project requirements");
  }

  if (turnCount >= 3) {
    score += 0.15;
    reasons.push("Engaged multi-turn conversational session");
  }

  let level: IntentLevel = "CASUAL";
  if (score >= 0.7) {
    level = "STRONG_ENQUIRY";
  } else if (score >= 0.4) {
    level = "INFORMATIONAL";
  }

  // Suggest soft enquiry ONLY on strong intent
  const suggestSoftEnquiry = level === "STRONG_ENQUIRY";

  return {
    level,
    score: Math.min(1.0, score),
    reasons,
    suggestSoftEnquiry,
  };
}
