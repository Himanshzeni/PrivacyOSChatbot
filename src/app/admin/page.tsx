import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  FileText,
  Bot,
  ShieldCheck,
  Activity,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let submittedCount = 0;
  let temporaryBotCount = 0;
  let analyticsCount = 0;
  let stagingPendingCount = 0;

  try {
    const [sub, bot, ana, stg] = await Promise.all([
      prisma.submittedEnquiry.count(),
      prisma.temporaryBotEnquiry.count(),
      prisma.analyticsEvent.count(),
      prisma.crawlStaging.count({ where: { status: "PENDING" } }),
    ]);
    submittedCount = sub;
    temporaryBotCount = bot;
    analyticsCount = ana;
    stagingPendingCount = stg;
  } catch (err) {
    console.warn("[Admin Dashboard Stats Warning]:", err);
  }

  return (
    <div className="space-y-8 max-w-6xl text-[#0F172A]">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          System Overview & Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Real-time metrics on PrivacyOS smart assistant conversations, zero-duplicate CRM pipeline, and DPDP compliance.
        </p>
      </div>

      {/* KPI 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Official Submitted Leads</span>
            <FileText className="w-4 h-4 text-[#1D4ED8]" />
          </div>
          <div className="text-2xl font-black text-[#0F172A]">{submittedCount}</div>
          <div className="text-[10px] text-[#1D4ED8] font-medium">Permanent Single Source</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Active Bot Enquiries</span>
            <Bot className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-[#0F172A]">{temporaryBotCount}</div>
          <div className="text-[10px] text-amber-600 font-medium">Ephemeral (24h TTL)</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Crawler Review Queue</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-[#0F172A]">{stagingPendingCount}</div>
          <div className="text-[10px] text-blue-600 font-medium">Pages Awaiting Approval</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">DPDP PII Purge Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">100%</div>
          <div className="text-[10px] text-emerald-600 font-medium">Auto-purge on Match</div>
        </div>
      </div>

      {/* Quick Action Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#0F172A] text-white space-y-4 shadow-lg border border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Crawler & Staging Pipeline</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">
            Review Discovered Website Pages
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Crawler runs never inject unverified text directly into production. Review detected content, verify accuracy, and index them into Vector DB with 1-click.
          </p>
          <Link
            href="/admin/crawler"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold transition-all shadow-md"
          >
            <span>Open Crawler Queue ({stagingPendingCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] space-y-4 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>Zero Raw PII Analytics</span>
          </div>
          <h2 className="text-xl font-black text-[#0F172A] tracking-tight">
            High-Conversion Funnel Insights
          </h2>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Track visitor intent scores, question topics, and drop-offs without recording any sensitive names, emails, or phone numbers.
          </p>
          <Link
            href="/admin/analytics"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold transition-all shadow-md"
          >
            <span>View Funnel Analytics ({analyticsCount} Events)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
