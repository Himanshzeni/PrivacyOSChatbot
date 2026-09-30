export interface LegalKnowledgeItem {
  section: string;
  topic: string;
  citation: string;
  summary: string;
  keywords: string[];
}

export const APPROVED_DPDP_KNOWLEDGE: LegalKnowledgeItem[] = [
  {
    section: "Section 4 & 5",
    topic: "Notice and Grounds for Processing Personal Data",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 5)",
    summary:
      "A Data Fiduciary must give clear, itemised notice to the Data Principal before or at the time of seeking consent. The notice must specify the personal data to be collected, the purpose of processing, how to exercise rights, and grievance redressal contact details. Notice must be available in English or any language specified in the Eighth Schedule to the Constitution.",
    keywords: ["notice", "purpose", "processing", "information", "itemised", "grounds"],
  },
  {
    section: "Section 6",
    topic: "Consent Architecture & Withdrawal",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 6)",
    summary:
      "Consent must be free, specific, informed, unconditional, and unambiguous with a clear affirmative action. Any part of consent which infringes the Act is invalid. The Data Principal has the right to withdraw consent at any time, with the ease of withdrawal comparable to the ease of giving consent.",
    keywords: ["consent", "withdraw", "unconditional", "affirmative", "free", "permission"],
  },
  {
    section: "Section 8",
    topic: "General Obligations of Data Fiduciary (Storage Limitation & Security)",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 8)",
    summary:
      "Data Fiduciaries must implement reasonable security safeguards to prevent personal data breaches, ensure data accuracy, and erase personal data as soon as the specified purpose is no longer served or consent is withdrawn (Storage Limitation & Purpose Limitation).",
    keywords: ["fiduciary", "security", "erasure", "storage limitation", "retention", "breach", "safeguards"],
  },
  {
    section: "Section 9",
    topic: "Processing of Personal Data of Children",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 9)",
    summary:
      "Processing personal data of a child (individual below 18 years) requires verifiable parental consent. Tracking, behavioural monitoring, and targeted advertising directed at children are strictly prohibited.",
    keywords: ["child", "children", "minor", "parental consent", "tracking", "advertising"],
  },
  {
    section: "Section 10",
    topic: "Additional Obligations of Significant Data Fiduciaries (SDF)",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 10)",
    summary:
      "Significant Data Fiduciaries designated by Central Government based on data volume and risk must: 1) Appoint an India-based Data Protection Officer (DPO) reporting directly to the Board of Directors, 2) Appoint an independent data auditor, 3) Undertake periodic Data Protection Impact Assessments (DPIA) and periodic compliance audits.",
    keywords: ["sdf", "significant", "dpo", "data protection officer", "dpia", "audit", "auditor"],
  },
  {
    section: "Section 11, 12 & 13",
    topic: "Rights of the Data Principal (Access, Correction, Erasure & Grievance)",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Sections 11-13)",
    summary:
      "Data Principals have the right to obtain a summary of personal data being processed, identities of all third parties shared with, right to correction/completion, right to erasure (Right to be Forgotten), and right of grievance redressal with the Data Fiduciary and the Data Protection Board of India.",
    keywords: ["rights", "access", "erasure", "correction", "delete", "grievance", "complaint", "forgotten"],
  },
  {
    section: "Section 16",
    topic: "Cross-Border Transfer of Personal Data Outside India",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 16)",
    summary:
      "Cross-border transfer of personal data outside India is permitted to countries except those specifically blacklisted or restricted by the Central Government via official gazette notification, subject to sectoral rules (e.g. RBI data localization directives).",
    keywords: ["cross-border", "transfer", "foreign", "outside india", "blacklisted", "localization", "international"],
  },
  {
    section: "Schedule & Penalties",
    topic: "Penalties for Non-Compliance",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Schedule)",
    summary:
      "Penalties are determined by the Data Protection Board of India based on severity: 1) Up to ₹250 Crores for failure to take reasonable security safeguards to prevent personal data breaches, 2) Up to ₹200 Crores for default in breach notification to the Board or Data Principals, 3) Up to ₹200 Crores for violation of children's data obligations (Section 9), 4) Up to ₹50 Crores for general non-compliances.",
    keywords: ["penalty", "fine", "crore", "punishment", "violation", "enforcement", "board"],
  },
];
