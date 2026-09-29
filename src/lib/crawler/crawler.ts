import crypto from "crypto";
import { prisma } from "../db";

const EXCLUDED_PATTERNS = [
  /^\/admin/i,
  /^\/login/i,
  /^\/api/i,
  /^\/private/i,
  /^\/temporary/i,
  /\.(png|jpg|jpeg|svg|gif|ico|pdf|zip|css|js)$/i,
];

export interface CrawlResultItem {
  url: string;
  title: string;
  extractedText: string;
  contentHash: string;
  isNewOrChanged: boolean;
}

export function isUrlAllowed(path: string): boolean {
  return !EXCLUDED_PATTERNS.some((pattern) => pattern.test(path));
}

export function computeHash(content: string): string {
  return crypto.createHash("sha256").update(content.trim()).digest("hex");
}

/**
 * Clean HTML to extract pure text content
 */
export function extractCleanText(html: string): { title: string; content: string } {
  // Extract Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled Page";

  // Remove script, style, nav, footer tags
  const cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, "")
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, "")
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return { title, content: cleaned };
}

/**
 * Queue a discovered page for Admin Review
 */
export async function stageDiscoveredPage(
  url: string,
  title: string,
  extractedText: string
): Promise<{ status: "QUEUED" | "UNCHANGED" | "EXCLUDED" }> {
  if (!isUrlAllowed(url)) {
    return { status: "EXCLUDED" };
  }

  const contentHash = computeHash(extractedText);

  // Check if unchanged existing staging item exists
  const existingStaging = await prisma.crawlStaging.findUnique({
    where: { url },
  });

  if (existingStaging && existingStaging.contentHash === contentHash) {
    return { status: "UNCHANGED" };
  }

  // Update or insert into CrawlStaging queue for Admin review
  await prisma.crawlStaging.upsert({
    where: { url },
    update: {
      title,
      extractedText,
      contentHash,
      status: "PENDING",
      reviewedAt: null,
      reviewedBy: null,
    },
    create: {
      url,
      title,
      extractedText,
      contentHash,
      status: "PENDING",
    },
  });

  return { status: "QUEUED" };
}
