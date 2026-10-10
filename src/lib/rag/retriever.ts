import { prisma, isDatabaseConfigured } from "../db";
import { APPROVED_DPDP_KNOWLEDGE } from "../knowledge/dpdpKnowledge";
import { DEFAULT_COMPANY_KNOWLEDGE } from "../knowledge/companyKnowledge";
import { getAIProvider } from "../ai/provider";

export interface RetrievedContextItem {
  category: "WEBSITE_KNOWLEDGE" | "DPDP_KNOWLEDGE" | "STRUCTURED_FACT";
  title: string;
  content: string;
  sourceCitation: string;
  score: number;
}

function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length || vecA.length === 0) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function retrieveRelevantKnowledge(query: string): Promise<RetrievedContextItem[]> {
  const results: RetrievedContextItem[] = [];
  const normalizedQuery = query.toLowerCase();

  // 1. Check Approved DPDP Knowledge from Gazette of India (Authoritative priority)
  const isDpdpRelated =
    /(dpdp|data protection|consent|privacy|fiduciary|penalty|rights|personal data|fine|act 2023|dpo|dpia|cross-border|transfer|children|minor|breach|cert-in|section|sec\b|tdsat|board|nominate|schedule|grievance|notice|erasure|storage limitation|rule\s*\d+|rules\s*2025|gazette|नियम|धारा|डीपीडीपी|उल्लंघन|सहमति|जुर्माना|बच्चे|बालक|अधिकार|बोर्ड|संरक्षण|प्रबंधक|डेटा|फिड्यूशरी|प्रिंसिपल|नोटिस|सुरक्षा|पहचान|डिजिलॉकर|jurmana|sahmati|suchna|ullanghan)/i.test(
      normalizedQuery
    );

  if (isDpdpRelated) {
    for (const item of APPROVED_DPDP_KNOWLEDGE) {
      const matchScoreEn = item.keywords.filter((kw) => normalizedQuery.includes(kw.toLowerCase())).length;
      const matchScoreHi = (item.keywordsHindi || []).filter((kw) => normalizedQuery.includes(kw.toLowerCase())).length;
      const matchScore = matchScoreEn + matchScoreHi;

      const sectionMatch = normalizedQuery.includes(item.section.toLowerCase());
      const topicWords = item.topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      const topicMatches = topicWords.filter((w) => normalizedQuery.includes(w)).length;
      const topicHiMatches = item.topicHindi && normalizedQuery.includes(item.topicHindi.toLowerCase()) ? 2 : 0;

      if (matchScore > 0 || sectionMatch || topicMatches > 0 || topicHiMatches > 0) {
        const bilingualContent = item.summaryHindi
          ? `[English]: ${item.summary}\n[हिन्दी]: ${item.summaryHindi}`
          : item.summary;

        results.push({
          category: "DPDP_KNOWLEDGE",
          title: item.topicHindi ? `${item.section}: ${item.topic} (${item.topicHindi})` : `${item.section}: ${item.topic}`,
          content: bilingualContent,
          sourceCitation: item.citation,
          score: 0.8 + matchScore * 0.08 + (sectionMatch ? 0.25 : 0) + topicMatches * 0.05 + topicHiMatches * 0.1,
        });
      }
    }
  }

  // 2. Check Static/Structured Company Knowledge (PrivacyOS Global)
  for (const fact of DEFAULT_COMPANY_KNOWLEDGE) {
    const titleWords = fact.title.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    const contentText = fact.content.toLowerCase();

    let matches = 0;
    for (const w of titleWords) {
      if (normalizedQuery.includes(w)) matches += 2;
    }

    const queryTokens = normalizedQuery.split(/\s+/).filter((w) => w.length > 3);
    for (const token of queryTokens) {
      if (contentText.includes(token)) matches += 1;
    }

    // Direct platform or company name matches
    if (normalizedQuery.includes("privacyos") || normalizedQuery.includes("vexalix") || normalizedQuery.includes("platform")) {
      if (fact.category === "OVERVIEW" || fact.category === "MODULES") {
        matches += 2;
      }
    }

    if (matches > 0) {
      results.push({
        category: "WEBSITE_KNOWLEDGE",
        title: fact.title,
        content: fact.content,
        sourceCitation: fact.sourceCitation,
        score: 0.7 + matches * 0.08,
      });
    }
  }

  // 3. Database Chunks Vector / Hybrid Retrieval (if DB is configured and seeded)
  if (isDatabaseConfigured()) {
    try {
      const ai = getAIProvider();
      const queryEmbedding = await ai.generateEmbeddings(query);

      const dbChunks = await prisma.knowledgeChunk.findMany({
        take: 20,
      });

      for (const chunk of dbChunks) {
        if (chunk.embedding && chunk.embedding.length > 0) {
          const score = calculateCosineSimilarity(queryEmbedding, chunk.embedding);
          if (score > 0.45) {
            results.push({
              category: chunk.category === "DPDP_LEGAL" ? "DPDP_KNOWLEDGE" : "WEBSITE_KNOWLEDGE",
              title: chunk.title,
              content: chunk.content,
              sourceCitation: chunk.sourceCitation || "Source: Website Information",
              score,
            });
          }
        }
      }
    } catch (dbErr) {
      // If database is not yet seeded or offline, in-memory curated knowledge acts as flawless fallback
      console.warn("[Retriever DB Chunk Warning]: Using curated baseline knowledge", dbErr);
    }
  }

  // Sort by score descending and take top 4 most relevant items
  return results.sort((a, b) => b.score - a.score).slice(0, 4);
}
