import React from "react";
import { APPROVED_DPDP_KNOWLEDGE } from "@/lib/knowledge/dpdpKnowledge";
import { DEFAULT_COMPANY_KNOWLEDGE } from "@/lib/knowledge/companyKnowledge";
import { prisma } from "@/lib/db";
import { ShieldCheck, Database, Layers, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function KnowledgeAdminPage() {
  let dbChunkCount = 0;
  try {
    dbChunkCount = await prisma.knowledgeChunk.count();
  } catch {
    // Non-blocking
  }

  return (
    <div className="space-y-8 max-w-5xl text-[#0F172A]">
      <div>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">
          Knowledge Base & Authoritative Sources
        </h1>
        <p className="text-xs text-[#64748B]">
          Inspect the multi-tier knowledge system: Verified PrivacyOS facts, Official Gazette of India DPDP Act 2023 statutory citations, and embedded Vector Chunks.
        </p>
      </div>

      {/* Vector Status Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shadow-sm">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0F172A]">Production Vector DB Chunks</div>
            <div className="text-[11px] text-[#64748B]">
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
        <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          <Layers className="w-4 h-4 text-[#1D4ED8]" />
          <span>Priority 1: Verified PrivacyOS Platform Knowledge ({DEFAULT_COMPANY_KNOWLEDGE.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEFAULT_COMPANY_KNOWLEDGE.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-wider bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {item.sourceCitation}
                </span>
              </div>
              <h3 className="font-bold text-[#0F172A] text-sm">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Approved DPDP Knowledge from Government Gazette */}
      <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Priority 2: Official DPDP Act 2023 Statutory Sections ({APPROVED_DPDP_KNOWLEDGE.length})</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span>Gazette of India (Act 22 of 2023)</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {APPROVED_DPDP_KNOWLEDGE.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#0F172A] font-mono bg-white border border-[#CBD5E1] px-2 py-0.5 rounded">
                  {item.section}
                </span>
                <span className="text-[9.5px] text-[#1D4ED8] font-mono text-right truncate max-w-[200px]" title={item.citation}>
                  {item.citation}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[#0F172A] text-sm">{item.topic}</h3>
                {item.topicHindi && (
                  <div className="text-[11px] font-semibold text-emerald-800">
                    {item.topicHindi}
                  </div>
                )}
              </div>
              <div className="space-y-1.5 text-slate-600 text-[11.5px] leading-relaxed">
                <p><strong className="text-slate-800 font-medium">EN:</strong> {item.summary}</p>
                {item.summaryHindi && (
                  <p className="bg-emerald-50/50 p-2 rounded-xl border border-emerald-100 text-slate-700">
                    <strong className="text-emerald-900 font-medium">HI:</strong> {item.summaryHindi}
                  </p>
                )}
                {item.summaryHinglish && (
                  <p className="bg-blue-50/50 p-2 rounded-xl border border-blue-100 text-slate-700">
                    <strong className="text-blue-900 font-medium">HINGLISH:</strong> {item.summaryHinglish}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
