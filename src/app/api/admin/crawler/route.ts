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
        url: "/",
        title: "Homepage - Curavia Fort Website Care",
        extractedText:
          "Curavia Fort provides 24/7 proactive website maintenance, automated cloud backups, security monitoring, and DPDP-compliant automated AI support.",
      },
      {
        url: "/services",
        title: "Website Operations & Incident Response",
        extractedText:
          "Services include real-time synthetic uptime monitoring, malware removal, performance optimization, and 15-minute emergency SLA support.",
      },
      {
        url: "/enquiry",
        title: "Official Website Enquiry Form",
        extractedText:
          "Submit your website details to get a free health check and maintenance proposal within 2 hours.",
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
