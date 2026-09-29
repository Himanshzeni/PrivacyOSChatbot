import React from "react";
import { prisma } from "@/lib/db";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  MessageSquare,
  Sparkles,
  MousePointerClick,
  FileCheck2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const funnel = {
    chatOpened: 0,
    messageSent: 0,
    intentDetected: 0,
    ctaClicked: 0,
    formReached: 0,
    formSubmitted: 0,
  };

  const intentCounts = {
    CASUAL: 0,
    INFORMATIONAL: 0,
    STRONG_ENQUIRY: 0,
  };

  let avgLatency = 0;
  let avgTokens = 0;
  let totalEvents = 0;
  let recentEvents: Array<{
    id: string;
    eventType: string;
    intentType: string | null;
    tokensUsed: number | null;
    latencyMs: number | null;
    pagePath: string | null;
    createdAt: Date;
  }> = [];

  try {
    const events = await prisma.analyticsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    totalEvents = events.length;
    recentEvents = events.slice(0, 15);

    let latencySum = 0;
    let latencyCount = 0;
    let tokensSum = 0;
    let tokensCount = 0;

    for (const ev of events) {
      if (ev.eventType === "chat_opened") funnel.chatOpened++;
      if (ev.eventType === "message_sent") funnel.messageSent++;
      if (ev.eventType === "intent_detected") funnel.intentDetected++;
      if (ev.eventType === "cta_clicked") funnel.ctaClicked++;
      if (ev.eventType === "form_reached") funnel.formReached++;
      if (ev.eventType === "form_submitted") funnel.formSubmitted++;

      if (ev.intentType === "CASUAL") intentCounts.CASUAL++;
      if (ev.intentType === "INFORMATIONAL") intentCounts.INFORMATIONAL++;
      if (ev.intentType === "STRONG_ENQUIRY") intentCounts.STRONG_ENQUIRY++;

      if (ev.latencyMs) {
        latencySum += ev.latencyMs;
        latencyCount++;
      }
      if (ev.tokensUsed) {
        tokensSum += ev.tokensUsed;
        tokensCount++;
      }
    }

    if (latencyCount > 0) avgLatency = Math.round(latencySum / latencyCount);
    if (tokensCount > 0) avgTokens = Math.round(tokensSum / tokensCount);
  } catch (err) {
    console.warn("[Analytics DB Warning]:", err);
  }

  // Calculate funnel conversions
  const funnelSteps = [
    {
      name: "1. Chat Opened",
      icon: MessageSquare,
      count: funnel.chatOpened,
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "2. Message Sent",
      icon: Sparkles,
      count: funnel.messageSent,
      color: "from-teal-600 to-cyan-600",
    },
    {
      name: "3. Intent Detected",
      icon: TrendingUp,
      count: funnel.intentDetected,
      color: "from-cyan-600 to-blue-600",
    },
    {
      name: "4. Soft CTA Clicked",
      icon: MousePointerClick,
      count: funnel.ctaClicked,
      color: "from-blue-600 to-indigo-600",
    },
    {
      name: "5. Form Reached",
      icon: Clock,
      count: funnel.formReached,
      color: "from-indigo-600 to-purple-600",
    },
    {
      name: "6. Lead Submitted & Purged",
      icon: FileCheck2,
      count: funnel.formSubmitted,
      color: "from-purple-600 to-emerald-600",
    },
  ];

  const baseCount = funnelSteps[0].count || 1;

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
            Funnel Analytics & Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B64]">
            Privacy-sanitized conversion metrics. Strictly Zero Raw PII is ever recorded in this telemetry pipeline.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>DPDP 2023 Compliant Telemetry</span>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-neutral-400">Total Telemetry Events</div>
          <div className="text-2xl font-black text-[#17201C]">{totalEvents}</div>
          <div className="text-[10px] text-neutral-500 font-medium">Logged securely</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-neutral-400">Average AI Latency</div>
          <div className="text-2xl font-black text-[#17201C]">{avgLatency ? `${avgLatency} ms` : "—"}</div>
          <div className="text-[10px] text-emerald-700 font-medium">Gemini 2.5 Flash</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-neutral-400">Average Tokens / Query</div>
          <div className="text-2xl font-black text-[#17201C]">{avgTokens || "—"}</div>
          <div className="text-[10px] text-neutral-500 font-medium">Optimized hybrid prompts</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-neutral-400">High-Intent Leads</div>
          <div className="text-2xl font-black text-emerald-800">{intentCounts.STRONG_ENQUIRY}</div>
          <div className="text-[10px] text-emerald-700 font-medium">High commercial potential</div>
        </div>
      </div>

      {/* Conversion Funnel Visualization */}
      <div className="p-6 rounded-3xl bg-white border border-[#12372A]/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-black text-[#17201C] tracking-tight">Visitor → Enquiry Funnel</h2>
            <p className="text-xs text-neutral-500">Conversion stages from initial chat engagement to lead submission.</p>
          </div>
          <Zap className="w-5 h-5 text-amber-500" />
        </div>

        <div className="space-y-3">
          {funnelSteps.map((step, idx) => {
            const Icon = step.icon;
            const pctOfBase = Math.round((step.count / baseCount) * 100);

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-[#17201C]">
                    <Icon className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{step.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-neutral-700">{step.count}</span>
                    <span className="text-[11px] text-neutral-400 font-medium w-12 text-right">
                      {funnelSteps[0].count > 0 ? `${pctOfBase}%` : "0%"}
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${step.color} rounded-full transition-all duration-500`}
                    style={{
                      width: `${funnelSteps[0].count > 0 ? Math.max(pctOfBase, 2) : 2}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Intent Distribution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-neutral-500">Casual Inquiries</div>
          <div className="text-2xl font-black text-[#17201C]">{intentCounts.CASUAL}</div>
          <p className="text-[11px] text-neutral-400">Greetings, company identity, and general guidance.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-neutral-500">Informational / DPDP Inquiries</div>
          <div className="text-2xl font-black text-[#17201C]">{intentCounts.INFORMATIONAL}</div>
          <p className="text-[11px] text-neutral-400">Questions about DPDP Act 2023 compliance, penalties, and audit scope.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-neutral-500">Commercial / Strong Enquiry</div>
          <div className="text-2xl font-black text-emerald-700">{intentCounts.STRONG_ENQUIRY}</div>
          <p className="text-[11px] text-neutral-400">Pricing, contracts, audits, and booking enquiries.</p>
        </div>
      </div>

      {/* Recent Telemetry Stream */}
      <div className="p-6 rounded-3xl bg-white border border-[#12372A]/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-[#17201C] tracking-tight">Recent Telemetry Activity</h2>
          <span className="text-xs text-neutral-400 font-mono">Last 15 Events</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 font-semibold">
                <th className="pb-2.5">Event Type</th>
                <th className="pb-2.5">Intent</th>
                <th className="pb-2.5">Latency</th>
                <th className="pb-2.5">Tokens</th>
                <th className="pb-2.5">Page</th>
                <th className="pb-2.5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {recentEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-neutral-400">
                    No analytics events logged yet. Open the chatbot or send a message to test telemetry.
                  </td>
                </tr>
              ) : (
                recentEvents.map((ev) => (
                  <tr key={ev.id} className="text-neutral-700 hover:bg-neutral-50/60">
                    <td className="py-2.5 font-mono text-[11px] text-[#12372A] font-semibold">
                      {ev.eventType}
                    </td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-bold">
                        {ev.intentType || "—"}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-[11px]">
                      {ev.latencyMs ? `${ev.latencyMs}ms` : "—"}
                    </td>
                    <td className="py-2.5 font-mono text-[11px]">
                      {ev.tokensUsed || "—"}
                    </td>
                    <td className="py-2.5 font-mono text-[11px] text-neutral-400">
                      {ev.pagePath || "/"}
                    </td>
                    <td className="py-2.5 text-neutral-400 text-[11px]">
                      {new Date(ev.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
