export interface LegalKnowledgeItem {
  section: string;
  topic: string;
  citation: string;
  summary: string;
  keywords: string[];
}

/**
 * Official Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)
 * Published in The Gazette of India (Extraordinary, Part II, Section 1, August 11, 2023)
 * And Ministry of Electronics and Information Technology (MeitY) Notifications (G.S.R. 843(E) to 846(E), Nov 13, 2025)
 */
export const APPROVED_DPDP_KNOWLEDGE: LegalKnowledgeItem[] = [
  {
    section: "Act Overview & Preamble",
    topic: "Enactment, Objective & Legislative Authority",
    citation: "Source: The Gazette of India, Extraordinary, Part II, Sec. 1 (Act No. 22 of 2023, 11 August 2023)",
    summary:
      "The Digital Personal Data Protection Act, 2023 was enacted by the Parliament of India and received Presidential assent on 11 August 2023. The Act provides for the processing of digital personal data in a manner that recognises both the right of individuals to protect their personal data and the need to process such personal data for lawful purposes.",
    keywords: ["act", "gazette", "preamble", "dpdp", "dpdpa", "parliament", "assent", "law", "meity", "act 22 of 2023"],
  },
  {
    section: "Section 2",
    topic: "Statutory Definitions (Data Fiduciary, Principal, Processor, Child)",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 2, Gazette of India)",
    summary:
      "Key definitions: 1) 'Data Principal' means the individual to whom personal data relates (and in case of a child, includes parents/lawful guardian). 2) 'Data Fiduciary' means any person who alone or in conjunction with others determines the purpose and means of processing. 3) 'Data Processor' processes on behalf of a Fiduciary. 4) 'Child' means an individual below 18 years. 5) 'Consent Manager' is an entity registered with the Board acting as single point of contact to give, manage, review, and withdraw consent.",
    keywords: ["definitions", "data fiduciary", "data principal", "data processor", "consent manager", "child", "minor", "personal data", "processing"],
  },
  {
    section: "Section 3",
    topic: "Application and Territorial Scope of the Act",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 3, Gazette of India)",
    summary:
      "The Act applies to digital personal data collected within India in digital form or digitized subsequently. It applies extraterritorially outside India if processing is in connection with offering goods or services to Data Principals within India. It does NOT apply to non-digital data, personal data processed for personal or domestic purposes, or publicly available personal data made public by the Data Principal.",
    keywords: ["scope", "applicability", "extraterritorial", "territorial", "domestic", "outside india", "jurisdiction"],
  },
  {
    section: "Section 4 & 5",
    topic: "Grounds for Processing & Mandatory Itemised Notice",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Sections 4 & 5, Gazette of India)",
    summary:
      "Personal data may only be processed for a lawful purpose upon valid Consent (Section 6) or for Certain Legitimate Uses (Section 7). Before or at the time of seeking consent, the Data Fiduciary must give an itemised notice informing: 1) What personal data is collected, 2) Specified purpose, 3) How the Data Principal can exercise rights under Section 11-13, 4) Grievance redressal contact. The notice must be offered in English or any of the 22 languages specified in the Eighth Schedule of the Constitution of India.",
    keywords: ["notice", "itemised", "grounds", "language", "22 languages", "eighth schedule", "purpose", "processing"],
  },
  {
    section: "Section 6",
    topic: "Consent Architecture, Validity & Unconditional Withdrawal",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 6, Gazette of India)",
    summary:
      "Consent must be free, specific, informed, unconditional, and unambiguous with a clear affirmative action. It must signify agreement to the processing of personal data for the specified purpose only. Any part of consent infringing the Act is void. The Data Principal has the absolute right to withdraw consent at any time, with the ease of withdrawal being comparable to the ease with which consent was given.",
    keywords: ["consent", "withdrawal", "affirmative", "free", "specific", "unconditional", "unambiguous", "opt-out", "revoke"],
  },
  {
    section: "Section 7",
    topic: "Certain Legitimate Uses for Processing Personal Data",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 7, Gazette of India)",
    summary:
      "A Data Fiduciary may process personal data without explicit consent for specified legitimate uses: 1) Specified purpose for which the Data Principal voluntarily provided data without objecting, 2) Delivery of government subsidies, benefits, certificates, or licenses, 3) Performance of legal function under any Indian law, 4) Medical emergency involving threat to life, 5) Epidemic, disaster, or breakdown of public order, 6) Employment purposes including safety and corporate benefits.",
    keywords: ["legitimate", "legitimate uses", "voluntary", "employment", "medical emergency", "subsidy", "disaster"],
  },
  {
    section: "Section 8",
    topic: "General Obligations of Data Fiduciary (Security, Breach Notification, Erasure)",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 8, Gazette of India)",
    summary:
      "Data Fiduciaries must: 1) Implement reasonable security safeguards to prevent personal data breaches under Section 8(5), 2) Give mandatory notice of personal data breach to the Data Protection Board and every affected Data Principal under Section 8(6), 3) Erase personal data upon purpose completion or consent withdrawal (Storage Limitation) under Section 8(7), 4) Publish contact details of a Data Protection Officer or Grievance Officer under Section 8(9).",
    keywords: ["security", "safeguards", "breach notification", "erasure", "storage limitation", "grievance officer", "retention"],
  },
  {
    section: "Section 9",
    topic: "Processing of Personal Data of Children & Persons with Disabilities",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 9, Gazette of India)",
    summary:
      "Before processing personal data of a child (below 18 years) or a person with disability, verifiable consent of the parent or lawful guardian is mandatory. A Data Fiduciary shall NOT undertake: 1) Processing likely to cause any detrimental effect on the well-being of a child, 2) Tracking or behavioural monitoring of children, 3) Targeted advertising directed at children.",
    keywords: ["children", "child", "minor", "parental consent", "guardian", "tracking", "targeted advertising", "disability"],
  },
  {
    section: "Section 10",
    topic: "Additional Obligations of Significant Data Fiduciaries (SDF)",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 10, Gazette of India)",
    summary:
      "The Central Government may notify any Data Fiduciary or class of Fiduciaries as 'Significant Data Fiduciary' based on data volume, sensitivity, risk to rights, sovereignty, and public order. SDFs must: 1) Appoint an India-based Data Protection Officer (DPO) who reports directly to the Board of Directors, 2) Appoint an independent data auditor to evaluate compliance, 3) Undertake periodic Data Protection Impact Assessments (DPIA) and periodic compliance audits.",
    keywords: ["sdf", "significant data fiduciary", "dpo", "data protection officer", "dpia", "independent auditor", "audit"],
  },
  {
    section: "Section 11",
    topic: "Right to Access Information About Personal Data",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 11, Gazette of India)",
    summary:
      "Data Principals have the statutory right to request: 1) A summary of personal data being processed and the processing activities undertaken, 2) The identities of all other Data Fiduciaries and Data Processors with whom the personal data has been shared, 3) Any other information related to their personal data as prescribed by Rules.",
    keywords: ["access", "summary", "shared", "third party", "transparency", "information right"],
  },
  {
    section: "Section 12",
    topic: "Right to Correction and Erasure of Personal Data",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 12, Gazette of India)",
    summary:
      "Data Principals have the right to correction, completion, updating, and erasure of their personal data. Upon receiving an erasure request, the Data Fiduciary must erase personal data unless retention is mandatory under an applicable law or necessary for the specified purpose.",
    keywords: ["correction", "erasure", "updating", "rectification", "delete", "forgotten", "right to be forgotten"],
  },
  {
    section: "Section 13",
    topic: "Right of Grievance Redressal",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 13, Gazette of India)",
    summary:
      "Data Principals have the right to have readily available and accessible grievance redressal mechanisms provided by the Data Fiduciary or Consent Manager. The Fiduciary must respond within prescribed timelines before the Principal can escalate the complaint to the Data Protection Board of India.",
    keywords: ["grievance", "redressal", "complaint", "dispute", "escalation", "officer"],
  },
  {
    section: "Section 14",
    topic: "Right to Nominate",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 14, Gazette of India)",
    summary:
      "Data Principals have the right to nominate, in the prescribed manner, any other individual who shall, in the event of death or incapacity of the Data Principal, exercise the rights of the Data Principal under the Act.",
    keywords: ["nominate", "nomination", "death", "incapacity", "legal heir", "representative"],
  },
  {
    section: "Section 15",
    topic: "Statutory Duties of Data Principals",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 15, Gazette of India)",
    summary:
      "Data Principals have legal duties: 1) Do not impersonate another person, 2) Do not suppress any material information while providing personal data, 3) Do not register false or frivolous grievances, 4) Furnish authentic information for verification. Breach of duties under Section 15 attracts penalties up to ₹10,000 under the Schedule.",
    keywords: ["duties", "data principal duties", "impersonation", "false complaint", "frivolous", "authentic"],
  },
  {
    section: "Section 16",
    topic: "Cross-Border Transfer of Personal Data Outside India",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 16, Gazette of India)",
    summary:
      "The Central Government may, by notification, restrict the transfer of personal data by a Data Fiduciary for processing to such country or territory outside India as may be specified (blacklisting regime). Sectoral laws granting higher protection or localization (e.g. RBI payments localization directives) will continue to apply.",
    keywords: ["cross-border", "transfer", "foreign", "outside india", "blacklisting", "localization", "international transfer"],
  },
  {
    section: "Section 17",
    topic: "Statutory Exemptions (Offences, Legal Claims, Startups)",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 17, Gazette of India)",
    summary:
      "The Act provides exemptions for processing personal data: 1) Prevention, detection, or prosecution of any offence, 2) Enforcement of legal rights or claims, 3) Judicial functions, 4) Research, archiving, or statistical purposes if not used to take specific decisions affecting the Principal, 5) Central Government power to exempt certain startups from Sections 5, 8(3), 8(7), 10, and 11.",
    keywords: ["exemptions", "startups", "research", "legal claims", "judicial", "investigation", "crime"],
  },
  {
    section: "Sections 18–26",
    topic: "Establishment & Composition of the Data Protection Board of India",
    citation: "Source: Gazette Notifications G.S.R. 844(E) & 845(E) (MeitY, 13 November 2025)",
    summary:
      "By Gazette Notification G.S.R. 844(E) and G.S.R. 845(E) dated 13 November 2025, the Central Government officially established the Data Protection Board of India. The Board consists of 4 members: a Chairperson and 3 Members. The Board functions as an independent, digital-by-default body exercising quasi-judicial powers to inquire into data breaches and non-compliances.",
    keywords: ["data protection board", "dpb", "establishment", "composition", "members", "chairperson", "g.s.r. 844", "g.s.r. 845"],
  },
  {
    section: "Sections 27–28",
    topic: "Powers, Functions, Digital Inquiries & Remedial Directions",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Sections 27–28, Gazette of India)",
    summary:
      "The Data Protection Board has the power to inquire into personal data breaches upon receipt of intimation under Section 8(6), complaint by Data Principal, or reference from Central/State Government. The Board operates through a digital office, observes principles of natural justice, can summon persons, inspect digital records, and issue binding remedial directions and financial penalties.",
    keywords: ["powers of board", "inquiry", "digital proceedings", "remedial directions", "summon", "inspection"],
  },
  {
    section: "Sections 29–32",
    topic: "Appeals to TDSAT, Mediation & Voluntary Undertaking",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Sections 29–32, Gazette of India)",
    summary:
      "1) Any person aggrieved by an order of the Data Protection Board may appeal to TDSAT (Telecom Disputes Settlement and Appellate Tribunal) within 60 days (Section 29). 2) The Board may refer disputes to mediation (Section 31). 3) A Data Fiduciary may submit a voluntary compliance undertaking to the Board to resolve non-compliance without adjudication of penalties (Section 32).",
    keywords: ["appeal", "tdsat", "mediation", "voluntary undertaking", "tribunal", "60 days"],
  },
  {
    section: "Section 33 & The Schedule",
    topic: "Statutory Schedule of Penalties for Non-Compliance",
    citation: "Source: Digital Personal Data Protection Act, 2023 (The Schedule, Gazette of India)",
    summary:
      "The Data Protection Board determines penalties based on nature, gravity, duration, repetitive nature, and mitigation: 1) Up to ₹250 Crores: Failure to take reasonable security safeguards to prevent personal data breach (Section 8(5)). 2) Up to ₹200 Crores: Failure to notify the Board or affected Data Principals of a breach (Section 8(6)). 3) Up to ₹200 Crores: Breach of obligations regarding children's data (Section 9). 4) Up to ₹150 Crores: Breach of obligations of Significant Data Fiduciary (Section 10). 5) Up to ₹10,000: Breach of Data Principal duties (Section 15). 6) Up to ₹50 Crores: Breach of any other provision of the Act or Rules.",
    keywords: ["penalty", "fine", "schedule", "₹250 crore", "₹200 crore", "₹150 crore", "₹50 crore", "punishment", "maximum penalty"],
  },
  {
    section: "DPDP Rules 2025 Roadmap",
    topic: "18-Month Phased Implementation Transition Roadmap",
    citation: "Source: Gazette Notification G.S.R. 843(E) & 846(E) (MeitY, 13 November 2025)",
    summary:
      "Notification G.S.R. 843(E) and G.S.R. 846(E) laid out the 18-month transition framework: 1) Phase 1 (Active Now, 13 Nov 2025): Data Protection Board live; procedural framework active for grievances and breach intimations. 2) Phase 2 (13 Nov 2026): Consent Manager registration opens; penalty adjudication machinery active. 3) Phase 3 (Hard Deadline, 13 May 2027): Full mandatory DPDP Act enforcement with zero grace period across consent, DSR, breach notifications, and children's data.",
    keywords: ["dpdp rules 2025", "transition", "roadmap", "timeline", "may 2027", "18-month", "g.s.r. 843", "g.s.r. 846", "deadline"],
  },
];
