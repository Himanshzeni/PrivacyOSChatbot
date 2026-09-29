import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Server,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  HeartHandshake,
  Activity,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#12372A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#12372A] text-[#A8E6CF] flex items-center justify-center font-black text-lg shadow-sm">
              C
            </div>
            <div>
              <span className="font-extrabold text-[#17201C] text-lg tracking-tight">CURAVIA FORT</span>
              <span className="block text-[10px] text-[#5C6B64] font-medium tracking-wide">
                Digital Excellence & Care
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#5C6B64]">
            <a href="#services" className="hover:text-[#12372A] transition-colors">
              Services
            </a>
            <a href="#dpdp-framework" className="hover:text-[#12372A] transition-colors">
              DPDP Framework
            </a>
            <a href="#care-tiers" className="hover:text-[#12372A] transition-colors">
              Care Plans
            </a>
            <Link href="/admin" className="text-neutral-500 hover:text-[#12372A] transition-colors">
              Admin Portal
            </Link>
          </nav>

          <Link
            href="/enquiry"
            className="px-5 py-2.5 rounded-full bg-[#12372A] hover:bg-[#1a4a39] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <span>Submit Enquiry</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A8E6CF]" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#F4F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A8E6CF]/40 border border-[#3FA7A3]/30 text-[#12372A] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Activity className="w-3.5 h-3.5 text-emerald-800" />
              <span>We Quietly Keep Your Website Alive 24/7</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#17201C] tracking-tight leading-[1.08]">
              Your Website.{" "}
              <span className="font-serif italic font-normal text-[#12372A] block mt-1">
                Always Alive & Fortified.
              </span>
            </h1>

            <p className="text-[#5C6B64] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Enterprise proactive website maintenance, automated malware security, speed optimization, and an embedded Smart Assistant designed in full accordance with India&apos;s DPDP Act, 2023.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/enquiry"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#12372A] hover:bg-[#1a4a39] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 group"
              >
                <span>Request Technical Assessment</span>
                <ArrowRight className="w-4 h-4 text-[#A8E6CF] group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#dpdp-framework"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-neutral-100 text-[#12372A] font-bold text-sm border border-[#12372A]/20 flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>Explore DPDP Framework</span>
              </a>
            </div>

            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#5C6B64]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>99.98% Monitored Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero-Duplicate CRM Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>15-Min Critical SLA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="services" className="py-24 bg-white border-t border-b border-[#12372A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Complete Operations
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#17201C] tracking-tight">
              Proactive Technical Ownership
            </h2>
            <p className="text-sm text-[#5C6B64]">
              We handle all maintenance tasks so you never have to worry about broken updates or sudden downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#12372A]/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#12372A] text-[#A8E6CF] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#17201C] text-lg">24/7 Live Monitoring</h3>
              <p className="text-xs text-[#5C6B64] leading-relaxed">
                Automated synthetic checks every 60 seconds with instant DevOps alerting and automated self-healing failovers.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#12372A]/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#12372A] text-[#A8E6CF] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#17201C] text-lg">Security & Malware Defense</h3>
              <p className="text-xs text-[#5C6B64] leading-relaxed">
                Daily heuristic scans, web application firewall rules, patch verification, and real-time vulnerability mitigation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#12372A]/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#12372A] text-[#A8E6CF] flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#17201C] text-lg">Automated Cloud Backups</h3>
              <p className="text-xs text-[#5C6B64] leading-relaxed">
                Encrypted offsite daily snapshots with verified 1-click instant disaster recovery protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DPDP Act Section */}
      <section id="dpdp-framework" className="py-24 bg-[#12372A] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8E6CF]/20 text-[#A8E6CF] text-xs font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>India&apos;s DPDP Act, 2023 Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Privacy by Design & Zero-Duplicate CRM
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Unlike generic chatbots that secretly hoard transcripts and build uncontrolled duplicate lead databases, our assistant enforces strict purpose and storage limitation under Section 8 of the DPDP Act.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#0e211e] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#A8E6CF] font-bold text-sm">
                <HeartHandshake className="w-5 h-5" />
                <span>Zero-Duplicate CRM Policy</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Voluntary chat enquiries are held only temporarily with an ephemeral <code className="font-mono text-emerald-400">conversation_id</code>. Once you submit the official form, matching temporary bot PII is instantly and permanently deleted.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e211e] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#A8E6CF] font-bold text-sm">
                <Sparkles className="w-5 h-5" />
                <span>4-Tier Intelligence Hierarchy</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                The AI answers from Verified Website Facts first, Official DPDP Act articles second, and General AI third. Speculative or unverified claims are strictly rejected to eliminate hallucinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#FAF8F5] border-t border-[#12372A]/10 text-xs text-[#5C6B64]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 CURAVIA FORT. Compliant with Digital Personal Data Protection Act, 2023.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/enquiry" className="hover:text-[#12372A] font-semibold">
              Enquiry Form
            </Link>
            <Link href="/admin" className="hover:text-[#12372A] font-semibold">
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
