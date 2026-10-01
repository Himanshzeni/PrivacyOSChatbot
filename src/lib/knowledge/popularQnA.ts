export interface CuratedQnA {
  patterns: RegExp[];
  answerHinglish: string;
  answerEnglish: string;
}

export const POPULAR_QNA_LIST: CuratedQnA[] = [
  // 1. What is PrivacyOS Global?
  {
    patterns: [
      /what\s+is\s+privacyos/i,
      /privacyos\s+(kya\s+hai|kya\s+karta|ke\s+baare|overview)/i,
      /about\s+privacyos/i,
      /tell\s+me\s+about\s+privacyos/i,
    ],
    answerHinglish:
      "PrivacyOS Global (by Vexalix Technology) ek all-in-one data privacy aur compliance platform hai. Yeh Indian businesses ko DPDP Act 2023 aur GDPR compliance ke liye Consent Management, Indian PII Discovery (Aadhaar/PAN/UPI), DSR Automation, aur Audit Assessments jaise solutions ek hi dashboard par provide karta hai taaki aap audit-ready reh sakein.",
    answerEnglish:
      "PrivacyOS Global (by Vexalix Technology) is India's all-in-one data privacy and compliance operating system. Purpose-built for DPDP Act 2023 and GDPR compliance, it unifies Consent Management, Indian PII Discovery (Aadhaar, PAN, UPI), DSR Automation, and Audit Readiness into a single pane of glass.",
  },

  // 2. Penalties under DPDP Act 2023?
  {
    patterns: [
      /penalt(y|ies)\s+under\s+dpdp/i,
      /dpdp.*penalt/i,
      /penalty.*dpdp/i,
      /jurmana/i,
      /fine.*dpdp/i,
    ],
    answerHinglish:
      "DPDP Act 2023 ke tehat non-compliance par maximum ₹250 Crore tak ki penalty lag sakti hai. Isme data breach na rokne par ₹250 Crore tak, children's data violations par ₹200 Crore tak, aur anya statutory compliance violations par ₹50 Crore tak ka jurmana shamil hai.",
    answerEnglish:
      "Under the DPDP Act 2023, penalties reach up to ₹250 Crore per violation. This includes up to ₹250 Cr for failure to prevent personal data breaches, up to ₹200 Cr for violations regarding children's data, and up to ₹50 Cr for other compliance breaches.",
  },

  // 3. How does Aadhaar & PAN discovery work?
  {
    patterns: [
      /aadhaar.*pan/i,
      /pan.*aadhaar/i,
      /how\s+does.*discovery\s+work/i,
      /pii\s+discovery/i,
      /data\s+discovery.*work/i,
    ],
    answerHinglish:
      "PrivacyOS ka Data Discovery engine aapke databases, cloud storage (AWS, Azure, GCP), aur SaaS tools ko automatically scan karta hai. Yeh built-in pattern recognition se Indian identifiers jaise Aadhaar, PAN, UPI IDs aur mobile numbers ko detect karke unka automated data flow map aur RoPA (Record of Processing Activities) generate karta hai.",
    answerEnglish:
      "PrivacyOS Data Discovery automatically scans your databases, cloud environments (AWS, Azure, GCP), SaaS tools, and endpoints with built-in pattern recognition for Indian identifiers like Aadhaar, PAN, UPI IDs, and mobile numbers, generating data flow maps and automated RoPA records.",
  },

  // 4. What is the May 2027 deadline?
  {
    patterns: [
      /may\s+2027/i,
      /deadline/i,
      /timeline.*dpdp/i,
      /transition\s+period/i,
      /when.*enforce/i,
    ],
    answerHinglish:
      "13 May 2027 DPDP Act 2023 ka full mandatory enforcement hard deadline hai. Is date ke baad bina kisi grace period ke sabhi Indian organizations ke liye Consent, DSR requests, 72-hour Breach Reporting, aur DPIA compliance 100% compulsory ho jayegi.",
    answerEnglish:
      "May 13, 2027 is the hard deadline for full mandatory enforcement of the DPDP Act 2023. After this date, all Indian organizations must be 100% compliant with consent records, DSR execution, 72-hour breach reporting, and DPIAs with zero grace period.",
  },

  // 5. How to get a free compliance assessment?
  {
    patterns: [
      /free.*compliance.*assessment/i,
      /assessment/i,
      /how\s+to\s+get.*assessment/i,
      /audit.*assessment/i,
      /free.*audit/i,
      /demo/i,
    ],
    answerHinglish:
      "Aap hamari website par neeche diye gaye 'Submit an Enquiry →' button par click karke apni basic requirement share kar sakte hain. PrivacyOS ki certified privacy team aapse connect karke aapke business ka customized DPDP readiness assessment aur roadmap provide karegi.",
    answerEnglish:
      "You can click the 'Submit an Enquiry →' button below and share your organization's requirements. Our certified privacy experts will promptly connect with you to conduct a complimentary DPDP readiness assessment and audit roadmap.",
  },
];

export function findCuratedAnswer(query: string): string | null {
  const q = query.trim();
  const isEnglishOnly =
    /^[a-zA-Z0-9\s\?.,!'&%()\-]+$/.test(q) &&
    !/(kya|hai|kaise|kitna|batao|kripya|namaste|lagti|milega|hoga)/i.test(q);

  for (const item of POPULAR_QNA_LIST) {
    for (const pattern of item.patterns) {
      if (pattern.test(q)) {
        return isEnglishOnly ? item.answerEnglish : item.answerHinglish;
      }
    }
  }

  return null;
}
