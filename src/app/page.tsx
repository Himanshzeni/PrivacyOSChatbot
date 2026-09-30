import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Activity,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-white text-[#0F172A]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center font-black text-lg shadow-sm">
              P
            </div>
            <div>
              <span className="font-extrabold text-[#0F172A] text-lg tracking-tight">PRIVACYOS GLOBAL</span>
              <span className="block text-[10px] text-[#64748B] font-medium tracking-wide">
                By Vexalix Technology Private Limited
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#64748B]">
            <a href="#modules" className="hover:text-[#1D4ED8] transition-colors">
              Platform Modules
            </a>
            <a href="#timeline" className="hover:text-[#1D4ED8] transition-colors">
              DPDP Roadmap
            </a>
            <a href="#frameworks" className="hover:text-[#1D4ED8] transition-colors">
              Frameworks
            </a>
            <Link href="/admin" className="text-neutral-500 hover:text-[#1D4ED8] transition-colors">
              Admin Console
            </Link>
          </nav>

          <Link
            href="/enquiry"
            className="px-5 py-2.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <span>Free Assessment</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>DPDP Rules 2025 Notified • 18-Month Transition Live</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0F172A] tracking-tight leading-[1.08]">
              India&apos;s all-in-one{" "}
              <span className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#0D9488] bg-clip-text text-transparent block mt-1">
                DPDPA & GDPR
              </span>{" "}
              compliance platform.
            </h1>

            <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Automate consent capture, data discovery for Indian identifiers (Aadhaar, PAN, UPI), DSR fulfillment, and privacy assessments with PrivacyOS Global. Stay 100% audit-ready before the May 2027 enforcement deadline.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/enquiry"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 group"
              >
                <span>Get Free Compliance Assessment</span>
                <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#modules"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-neutral-50 text-[#0F172A] font-bold text-sm border border-[#CBD5E1] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Lock className="w-4 h-4 text-[#1D4ED8]" />
                <span>Explore Platform Modules</span>
              </a>
            </div>

            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#475569]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DPDPA & Rules 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>22 Scheduled Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certified DPO Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated DPB Incident Vault</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 Platform Modules Section */}
      <section id="modules" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              The Unified Platform
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              12 Connected Compliance Engines
            </h2>
            <p className="text-sm text-[#64748B]">
              Replaces the patchwork of 5-6 disconnected point tools with one native compliance operating system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#F0F7FF] border border-blue-100 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg">Consent & Cookie Management</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Geo-aware banners, tracker blocking, 22 Indian scheduled languages, purpose-specific preferences, and cryptographic audit logs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFF1F2] border border-rose-100 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg">DSR Rights Automation</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Branded self-service portal, OTP verification, regulatory SLA tracking, and automated erasure execution without spreadsheet chaos.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F0FDF4] border border-emerald-100 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg">India PII Discovery & Mapping</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Scans databases, clouds, and endpoints with built-in pattern recognition for Aadhaar, PAN, UPI IDs, and Indian mobile numbers.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF5FF] border border-purple-100 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg">Privacy Assessments (DPIA)</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Mandatory DPIA templates for Significant Data Fiduciaries, 5x5 risk scoring heatmaps, collaborative review, and 1-click audit export.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFBEB] border border-amber-100 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                05
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg">Dual-Clock Breach Management</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Synchronized dual-clock monitoring for CERT-In 6-hour and DPDPA 72-hour notifications with incident evidence vaults.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                06
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg">Vendor Risk & DPA Tracking</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Vendor security assessments, cross-border data transfer evaluations, and centralized Data Processing Agreement (DPA) tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Timeline Section */}
      <section id="timeline" className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>DPDP Act Compliance Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Phased Rollout Towards May 2027
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              India has set an 18-month transition timeline. Penalties reach up to ₹250 Crore per violation for security failures and defaults.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-400">PHASE 01 • ACTIVE NOW</div>
              <div className="text-xl font-bold text-white">13 Nov 2025</div>
              <h3 className="text-sm font-semibold text-slate-200">Data Protection Board Live</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Procedural framework is active. Data principals can now file grievances and complaints directly with the DPB.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="text-xs font-mono font-bold text-blue-400">PHASE 02 • 1 YEAR IN</div>
              <div className="text-xl font-bold text-white">13 Nov 2026</div>
              <h3 className="text-sm font-semibold text-slate-200">Consent Managers & Inquiries</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consent Manager registration opens. Penalty and adjudication machinery becomes operative for inquiries.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="text-xs font-mono font-bold text-rose-400">PHASE 03 • HARD DEADLINE</div>
              <div className="text-xl font-bold text-white">13 May 2027</div>
              <h3 className="text-sm font-semibold text-slate-200">Full DPDP Act Enforcement</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mandatory compliance across consent, DSR, breach notifications, DPIAs, and children&apos;s data with zero grace period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#F8FAFC] border-t border-[#E2E8F0] text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 PrivacyOS Global by Vexalix Technology Private Limited. Gurugram, Haryana, India.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.privacyosglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D4ED8] font-semibold"
            >
              privacyosglobal.com ↗
            </a>
            <Link href="/enquiry" className="hover:text-[#1D4ED8] font-semibold">
              Enquiry Form
            </Link>
            <Link href="/admin" className="hover:text-[#1D4ED8] font-semibold">
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
