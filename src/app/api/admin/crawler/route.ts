import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stageDiscoveredPage } from "@/lib/crawler/crawler";
import { getAIProvider } from "@/lib/ai/provider";

export async function GET() {
  try {
    const queue = await prisma.crawlStaging.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ queue });
  } catch (error) {
    console.error("[Crawl Queue GET Error]:", error);
    return NextResponse.json({ queue: [] });
  }
}

// Trigger simulated crawl / sitemap ingest
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const pagesToCrawl = body.pages || [
      {
        url: "https://www.privacyosglobal.com/",
        title: "PrivacyOS Global — India's All-in-One DPDPA & GDPR Compliance Platform",
        extractedText:
          "PrivacyOS Global by Vexalix Technology is an all-in-one DPDPA & GDPR compliance platform for Indian businesses. Automate consent capture, Indian PII discovery (Aadhaar, PAN, UPI), DSR fulfillment, breach response, and privacy assessments to stay 100% audit-ready before May 2027.",
      },
      {
        url: "https://www.privacyosglobal.com/services/consent-management",
        title: "Consent & Cookie Management Module — 22 Scheduled Indian Languages",
        extractedText:
          "Collect, manage, and demonstrate valid user consent across websites and apps. Features dynamic geolocation banners, tracker blocking, purpose-specific consent, native 22 Indian language support, and immutable cryptographic audit logs.",
      },
      {
        url: "https://www.privacyosglobal.com/#modules",
        title: "Platform Modules: DSR Automation, DPIA, Dual-Clock Breach Management",
        extractedText:
          "Automate Data Principal Rights (access, correction, erasure) with OTP verification and SLA alerts. Fulfill mandatory DPIAs with 5x5 risk heatmaps. Manage breach incidents with dual-clock tracking: CERT-In 6-hour and DPDPA 72-hour reporting.",
      },
      {
        url: "https://www.privacyosglobal.com/#timeline",
        title: "Regulatory Transition Roadmap — Data Protection Board to May 2027 Deadline",
        extractedText:
          "India's 18-month phased rollout: Phase 1 active now with Data Protection Board live; Phase 2 in Nov 2026 for Consent Managers; Phase 3 hard enforcement deadline on 13 May 2027 with penalties up to ₹250 Crore per violation.",
      },
      {
        url: "https://www.privacyosglobal.com/about",
        title: "About PrivacyOS Global & Vexalix Technology Private Limited",
        extractedText:
          "Operated by Vexalix Technology Private Limited, headquartered at C-042C, 4th Floor, Supermart, DLF Phase IV, Gurugram, Haryana 122009. Hotline: +91 8887946496, Email: info@privacyosglobal.com.",
      },
    ];

    const results = [];
    for (const page of pagesToCrawl) {
      const res = await stageDiscoveredPage(page.url, page.title, page.extractedText);
      results.push({ url: page.url, ...res });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("[Crawl Trigger POST Error]:", error);
    return NextResponse.json({ error: "Failed to run crawler" }, { status: 500 });
  }
}

// Handle Admin Approval / Rejection
export async function PATCH(req: Request) {
  try {
    const { id, action, reviewerName = "Admin" } = await req.json();

    if (!id || !["APPROVED", "REJECTED"].includes(action)) {
      return NextResponse.json({ error: "id and valid action required" }, { status: 400 });
    }

    const stagedItem = await prisma.crawlStaging.findUnique({
      where: { id },
    });

    if (!stagedItem) {
      return NextResponse.json({ error: "Staged item not found" }, { status: 404 });
    }

    if (action === "APPROVED") {
      // 1. Generate Vector Embeddings via configured AIProvider
      const aiProvider = getAIProvider();
      const embedding = await aiProvider.generateEmbeddings(stagedItem.extractedText);

      // 2. Index into KnowledgeChunk table
      await prisma.knowledgeChunk.create({
        data: {
          category: "WEBSITE_CONTENT",
          sourceUrl: stagedItem.url,
          sourceCitation: `Source: Website Information (${stagedItem.url})`,
          title: stagedItem.title,
          content: stagedItem.extractedText,
          embedding,
          contentHash: stagedItem.contentHash,
        },
      });
    }

    // 3. Update Staging status
    const updated = await prisma.crawlStaging.update({
      where: { id },
      data: {
        status: action,
        reviewedAt: new Date(),
        reviewedBy: reviewerName,
      },
    });

    return NextResponse.json({
      success: true,
      item: updated,
      message:
        action === "APPROVED"
          ? "Page approved and successfully embedded into production Vector DB!"
          : "Page rejected.",
    });
  } catch (error) {
    console.error("[Crawl Approval PATCH Error]:", error);
    return NextResponse.json({ error: "Failed to update staging status" }, { status: 500 });
  }
}
