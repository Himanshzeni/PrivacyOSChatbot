export interface CompanyKnowledgeFact {
  category: "OVERVIEW" | "SERVICES" | "MODULES" | "TIMELINE" | "FRAMEWORKS" | "INDUSTRIES" | "COMPARISON" | "CONTACT_INFO" | "FAQS";
  title: string;
  content: string;
  sourceCitation: string;
}

export const DEFAULT_COMPANY_KNOWLEDGE: CompanyKnowledgeFact[] = [
  {
    category: "OVERVIEW",
    title: "About PrivacyOS Global & Vexalix Technology",
    content:
      "PrivacyOS Global (by Vexalix Technology Private Limited) is India's all-in-one DPDPA (Digital Personal Data Protection Act 2023 & DPDP Rules 2025) and GDPR compliance operating system. Purpose-built for Indian businesses and global organizations operating in India, it unifies consent management, automated PII discovery, DSR execution, breach response, vendor risk, and security assurance into a single pane of glass to ensure 100% audit-readiness before the May 2027 enforcement deadline.",
    sourceCitation: "Source: PrivacyOS Global - Company Overview (https://www.privacyosglobal.com/about)",
  },
  {
    category: "CONTACT_INFO",
    title: "PrivacyOS Global Contact & Corporate Headquarters",
    content:
      "Entity: Vexalix Technology Private Limited (operating PrivacyOS Global). Corporate Office: C-042C, 4th Floor, Supermart, DLF Phase IV, Gurugram, Haryana 122009, India. Phone / Hotline: +91 8887946496. Email: info@privacyosglobal.com. Official Website: https://www.privacyosglobal.com. Parent Organization: https://www.vexalixtechnology.com.",
    sourceCitation: "Source: PrivacyOS Global - Corporate Contact Information",
  },
  {
    category: "MODULES",
    title: "Core Privacy Platform Module 1: Consent & Cookie Management",
    content:
      "Collect, manage, and demonstrate valid user consent across websites, mobile apps, and digital channels. Features: 1) Dynamic geolocation-aware banners serving DPDPA notices in India and GDPR flows in the EU, 2) Cookie scanning and automatic tracker blocking, 3) Native support for all 22 Eighth Schedule Indian languages, 4) Purpose-specific consent and user preference center, 5) Immutable, time-stamped cryptographic audit logs.",
    sourceCitation: "Source: PrivacyOS Global - Consent Management (https://www.privacyosglobal.com/services/consent-management)",
  },
  {
    category: "MODULES",
    title: "Core Privacy Platform Module 2: Data Principal Rights (DSR) Automation",
    content:
      "Streamline and automate end-to-end Data Principal Rights requests (access, correction, erasure, portability, grievance redressal) without email threads or spreadsheets. Features: 1) Branded self-service intake portal, 2) Automated OTP-based identity verification, 3) Regulatory SLA tracking with escalation alerts, 4) Automated data purging and erasure workflows.",
    sourceCitation: "Source: PrivacyOS Global - DSR Automation (https://www.privacyosglobal.com/#modules)",
  },
  {
    category: "MODULES",
    title: "Core Privacy Platform Module 3: Data Discovery, Classification & Mapping",
    content:
      "Identify exactly where sensitive personal data resides. Automatically scans databases, cloud storage (AWS, Azure, GCP), SaaS tools, and endpoints with built-in pattern recognition for Indian identifiers including Aadhaar, PAN, UPI IDs, and Indian mobile numbers. Automatically generates data flow maps and Record of Processing Activities (RoPA) with retention labels.",
    sourceCitation: "Source: PrivacyOS Global - Data Discovery (https://www.privacyosglobal.com/#modules)",
  },
  {
    category: "MODULES",
    title: "Core Privacy Platform Module 4: Privacy Impact Assessments (DPIA/PIA)",
    content:
      "Fulfill mandatory DPIA obligations for Significant Data Fiduciaries and high-risk processing. Features: 1) Pre-built DPDPA and GDPR assessment templates, 2) 5x5 risk scoring heatmap engine, 3) Collaborative review and multi-stakeholder sign-off trails, 4) One-click audit-ready export in PDF and JSON formats.",
    sourceCitation: "Source: PrivacyOS Global - DPIA Framework (https://www.privacyosglobal.com/#modules)",
  },
  {
    category: "MODULES",
    title: "Core Privacy Platform Module 5: Breach Response & Incident Management",
    content:
      "Dual-clock incident response engine designed for Indian regulations: monitors and enforces both CERT-In 6-hour cybersecurity reporting and DPDPA 72-hour breach notification timelines. Includes severity-based automated escalation, pre-formatted DPB and CERT-In notification templates, and immutable incident evidence vaults.",
    sourceCitation: "Source: PrivacyOS Global - Incident Management (https://www.privacyosglobal.com/#modules)",
  },
  {
    category: "MODULES",
    title: "Core Privacy Platform Module 6: Vendor & Third-Party Risk Management",
    content:
      "Ensure third-party data processors don't compromise your compliance. Features: 1) Automated vendor security questionnaires, 2) Cross-border data transfer assessments against government-notified country restrictions, 3) Data Processing Agreement (DPA) tracking and validation, 4) Centralized vendor compliance scoring.",
    sourceCitation: "Source: PrivacyOS Global - Vendor Risk (https://www.privacyosglobal.com/#modules)",
  },
  {
    category: "SERVICES",
    title: "Extended Capabilities & Advisory Services (Tier B)",
    content:
      "Beyond core software, PrivacyOS provides: 1) DPO-as-a-Service (DPOaaS): Certified CIPP/E, CIPM privacy counsels acting as outsourced Data Protection Officers, 2) Children's Data Protection: Verifiable parental consent and tracking restrictions under DPDPA Section 9, 3) Privacy & Security Training: Role-based training for engineering, HR, and marketing teams with quizzes and certificates, 4) AI Governance: Inventorying AI data flows and algorithmic decision risk audits, 5) Security & Compliance: ISO 27001 ISMS, ISO 27701 PIMS, SOC 2 Type 2 readiness, and VAPT penetration testing.",
    sourceCitation: "Source: PrivacyOS Global - Beyond Compliance Capabilities (https://www.privacyosglobal.com/#modules)",
  },
  {
    category: "TIMELINE",
    title: "India DPDP Act Compliance Transition Timeline & Deadlines",
    content:
      "India has established an 18-month phased transition roadmap: 1) Phase 01 (Active Now - 13 Nov 2025): Data Protection Board (DPB) live; procedural framework active for citizen grievances and complaints. 2) Phase 02 (13 Nov 2026): Consent Manager registration opens; inquiry and adjudication machinery becomes operative. 3) Phase 03 (Hard Deadline - 13 May 2027): Full DPDP Act mandatory enforcement across consent, DSR, breach notifications, DPIAs, and children's data with zero grace period. Non-compliance penalties reach up to ₹250 Crore per violation.",
    sourceCitation: "Source: PrivacyOS Global - Regulatory Roadmap (https://www.privacyosglobal.com/#timeline)",
  },
  {
    category: "COMPARISON",
    title: "Why Indian Businesses Choose PrivacyOS over OneTrust / Securiti",
    content:
      "1) Purpose-Built Natively for India: Built from day one for the DPDP Act 2023 & DPDP Rules 2025 with native Aadhaar, PAN, UPI detection and 22 Indian language support (whereas global legacy tools like OneTrust were designed for GDPR and retrofitted for India). 2) Unified All-in-One Architecture: Replaces fragmented tool sprawl (no need to stitch 5-6 different tools). 3) Dual-Clock Regulatory Sync: Aligned with both CERT-In 6-hour and DPDP 72-hour reporting. 4) Zero Bloat Licensing: Transparent, scalable pricing from 10-person startups to cross-border enterprises with no multi-million rupee lock-in contracts.",
    sourceCitation: "Source: PrivacyOS Global - Platform Comparison (https://www.privacyosglobal.com/#comparison)",
  },
  {
    category: "FRAMEWORKS",
    title: "Supported Regulatory and Security Frameworks",
    content:
      "PrivacyOS Global provides comprehensive cross-framework mapping across: 1) DPDPA 2023 & DPDP Rules 2025 (India), 2) GDPR (European Union), 3) ISO 27001 (Information Security Management), 4) ISO 27701 (Privacy Information Management), 5) SOC 2 Type 2 (AICPA Trust Services Criteria).",
    sourceCitation: "Source: PrivacyOS Global - Frameworks (https://www.privacyosglobal.com/#frameworks)",
  },
  {
    category: "INDUSTRIES",
    title: "Supported Industries & Specialized Sectors",
    content:
      "Tailored compliance playbooks for: 1) SaaS & Technology (cross-border data flows, multi-tenant privacy, SOC 2), 2) BFSI (Fintech, Banking, NBFCs, RBI compliance alignment), 3) Healthcare & HealthTech (HIPAA/DISHA/DPDPA patient health records), 4) E-commerce & Retail (consent banners, analytics tracker blocking, customer DSRs), 5) Manufacturing & Supply Chain (vendor DPAs, employee records), 6) Education & EdTech (DPDPA Section 9 parental consent & student data safeguards), 7) Government & Public Sector, 8) Startups & High-Growth Ventures.",
    sourceCitation: "Source: PrivacyOS Global - Industries (https://www.privacyosglobal.com/industries)",
  },
  {
    category: "FAQS",
    title: "How quickly can PrivacyOS Global be deployed?",
    content:
      "Proven implementation benchmarks: 1) Consent banners deployed in < 72 hours across web and mobile in 22 languages, 2) OTP-authenticated DSR intake portal live in < 1 week, 3) First compliance scorecard and gap analysis generated in < 2 weeks, 4) 40+ points average compliance score improvement in first 90 days, 5) Full end-to-end program audit-readiness in < 8 weeks.",
    sourceCitation: "Source: PrivacyOS Global - Implementation Benchmarks (https://www.privacyosglobal.com/#outcomes)",
  },
  {
    category: "FAQS",
    title: "Does PrivacyOS offer a Free Compliance Assessment?",
    content:
      "Yes. PrivacyOS Global offers a complimentary DPDPA GAP assessment and readiness playbook for Indian businesses. You can evaluate your data processing activities, consent mechanisms, and risk score by clicking 'Submit an Enquiry →' or visiting https://www.privacyosglobal.com/resources/dpdpa-gap-assessment.",
    sourceCitation: "Source: PrivacyOS Global - Free GAP Assessment",
  },
];
