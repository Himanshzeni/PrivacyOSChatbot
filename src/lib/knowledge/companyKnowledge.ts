export interface CompanyKnowledgeFact {
  category: "SERVICES" | "TIERS" | "OVERVIEW" | "FAQS" | "SECURITY";
  title: string;
  content: string;
  sourceCitation: string;
}

export const DEFAULT_COMPANY_KNOWLEDGE: CompanyKnowledgeFact[] = [
  {
    category: "OVERVIEW",
    title: "About Our Platform & Mission",
    content:
      "We provide enterprise 24/7 proactive website maintenance, performance optimization, security monitoring, and DPDP-compliant automated AI support solutions. We take complete ownership of technical operations so businesses can focus on growth.",
    sourceCitation: "Source: Website Information - Company Overview",
  },
  {
    category: "SERVICES",
    title: "Core Website Maintenance & Operations",
    content:
      "Our services include: 1) 24/7 Real-Time Uptime Monitoring, 2) Daily Automated Cloud Backups, 3) Security Hardening & Malware Removal, 4) Core Web Vitals & Speed Optimization, 5) Safe WordPress/Plugin & Next.js Updates, 6) 15-Minute Critical Incident SLA Support.",
    sourceCitation: "Source: Website Information - Services Catalog",
  },
  {
    category: "TIERS",
    title: "Care Tiers & Coverage Plans",
    content:
      "We offer 3 primary care tiers: 1. Starter Care (Standard maintenance, weekly backups, security scans), 2. Business Care (Daily backups, speed tuning, 1-hour SLA, dedicated developer hours), 3. Enterprise / High-Traffic Care (Continuous monitoring, 15-min SLA, multi-region failover, custom cloud DevOps).",
    sourceCitation: "Source: Website Information - Pricing & Care Plans",
  },
  {
    category: "SECURITY",
    title: "DPDP & Privacy Commitment",
    content:
      "Our website and AI Smart Assistant comply strictly with India's Digital Personal Data Protection Act, 2023. We do not store conversation PII permanently in AI logs. Any voluntary bot enquiries are purged immediately upon official website form submission.",
    sourceCitation: "Source: Website Information - Privacy Framework",
  },
  {
    category: "FAQS",
    title: "How does the onboarding process work?",
    content:
      "Onboarding takes under 24 hours. After you submit an enquiry, our lead engineer conducts a non-invasive technical health audit, prepares a roadmap, and activates staging backup protocols.",
    sourceCitation: "Source: Website Information - FAQs",
  },
];
