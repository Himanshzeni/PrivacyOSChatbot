import React from "react";
import { APPROVED_DPDP_KNOWLEDGE } from "@/lib/knowledge/dpdpKnowledge";
import { DEFAULT_COMPANY_KNOWLEDGE } from "@/lib/knowledge/companyKnowledge";
import { prisma } from "@/lib/db";
import { ShieldCheck, Database, Layers } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function KnowledgeAdminPage() {
  let dbChunkCount = 0;
  try {
    dbChunkCount = await prisma.knowledgeChunk.count();
  } catch {
    // Non-blocking
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-[#17201C] tracking-tight">
          Knowledge Base & Authoritative Sources
        </h1>
        <p className="text-xs text-[#5C6B64]">
          Inspect the 4-tier knowledge system: Verified Website facts, Approved DPDP legal citations, and embedded Vector Chunks.
        </p>
      </div>

      {/* Vector Status Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#12372A]/15 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#12372A] text-[#A8E6CF] flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#17201C]">Production Vector DB Chunks</div>
            <div className="text-[11px] text-[#5C6B64]">
              {dbChunkCount} live embedding vectors ready for semantic cosine search
            </div>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          Active
        </div>
      </div>

      {/* Section 1: Verified Company Facts */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#17201C] uppercase tracking-wider">
          <Layers className="w-4 h-4 text-emerald-700" />
          <span>Priority 1: Verified Company Knowledge ({DEFAULT_COMPANY_KNOWLEDGE.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEFAULT_COMPANY_KNOWLEDGE.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {item.sourceCitation}
                </span>
              </div>
              <h3 className="font-bold text-[#17201C] text-sm">{item.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Approved DPDP Knowledge */}
      <div className="space-y-4 pt-4 border-t border-neutral-200">
        <div className="flex items-center gap-2 text-xs font-bold text-[#17201C] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Priority 2: Authoritative DPDP Act 2023 Knowledge ({APPROVED_DPDP_KNOWLEDGE.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {APPROVED_DPDP_KNOWLEDGE.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#12372A]/10 shadow-sm space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#12372A] font-mono bg-white border border-[#12372A]/10 px-2 py-0.5 rounded">
                  {item.section}
                </span>
                <span className="text-[10px] text-emerald-800 font-mono">
                  {item.citation}
                </span>
              </div>
              <h3 className="font-bold text-[#17201C] text-sm">{item.topic}</h3>
              <p className="text-neutral-600 leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
