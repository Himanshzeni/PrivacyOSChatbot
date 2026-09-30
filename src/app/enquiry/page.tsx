"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Lock, ArrowLeft } from "lucide-react";

function EnquiryFormContent() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation_id") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    websiteUrl: "",
    service: "DPDPA 2023 & GDPR Consent Management",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [botPurged, setBotPurged] = useState(false);

  useEffect(() => {
    // Notify analytics that form page was reached
    if (conversationId) {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "form_reached",
          conversationId,
        }),
      }).catch(() => {});
    }
  }, [conversationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          conversationId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setBotPurged(data.botPiiPurged);
      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to connect to server. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#0F172A]">Enquiry Received! ✨</h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Thank you, <strong className="text-[#0F172A]">{formData.name}</strong>. The PrivacyOS compliance team has received your enquiry. Our certified privacy counsels will review your requirements and reach out within 2 hours.
          </p>
        </div>

        {botPurged && (
          <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-blue-200 text-xs text-[#0F172A] flex items-center gap-2 text-left">
            <ShieldCheck className="w-4 h-4 text-[#1D4ED8] shrink-0" />
            <span>
              <strong>DPDP Act Compliance Active:</strong> Your temporary assistant chat details have been matched and permanently purged from the bot cache.
            </span>
          </div>
        )}

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D4ED8] text-white text-xs font-bold hover:bg-[#1E40AF] transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
          <span>PrivacyOS Official Assessment Form</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Request DPDPA & GDPR Assessment
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
          Provide your organisation details below. Our certified privacy engineers will conduct an initial compliance gap check and share a tailored roadmap.
        </p>
      </div>

      {conversationId && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#1D4ED8]" />
            Assistant Session Linked: <code className="font-mono text-[#0F172A] font-bold">{conversationId.substring(0, 14)}...</code>
          </span>
          <span className="text-emerald-700 font-medium">✓ Secure Handoff</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Full Name & Company */}
        <div className="space-y-1">
          <label className="font-bold text-[#0F172A] text-xs">
            Your Name / Organisation Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma / Enterprise Corp"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0F172A] text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 focus:bg-white transition-all"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-[#0F172A] text-xs">
              Work Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. privacy@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0F172A] text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#0F172A] text-xs">
              Mobile / Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0F172A] text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Website URL & Service */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-[#0F172A] text-xs">
              Website URL (or Target Platform)
            </label>
            <input
              type="text"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="e.g. https://mycompany.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0F172A] text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#0F172A] text-xs">
              Compliance Module / Requirement <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0F172A] text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 focus:bg-white transition-all"
            >
              <option value="DPDPA 2023 & GDPR Consent Management">DPDPA 2023 & GDPR Consent Management</option>
              <option value="Data Principal Rights (DSR) Automation">Data Principal Rights (DSR) Automation</option>
              <option value="India PII Discovery (Aadhaar, PAN, UPI)">India PII Discovery (Aadhaar, PAN, UPI)</option>
              <option value="Privacy Impact Assessments (DPIA/PIA)">Privacy Impact Assessments (DPIA/PIA)</option>
              <option value="Breach Response & Dual-Clock Incident Management">Breach Response & Dual-Clock Incident Management</option>
              <option value="Vendor Risk Management & DPA Tracking">Vendor Risk Management & DPA Tracking</option>
              <option value="DPO-as-a-Service (DPOaaS)">DPO-as-a-Service (DPOaaS)</option>
              <option value="ISO 27001 & SOC 2 Readiness">ISO 27001 & SOC 2 Readiness</option>
            </select>
          </div>
        </div>

        {/* Requirements / Notes */}
        <div className="space-y-1">
          <label className="font-bold text-[#0F172A] text-xs">
            Describe Your Compliance Goals or Data Workflows (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="e.g. Processing 500k Indian user signups, need 22-language consent banners and DSR workflows before May 2027..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0F172A] text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 focus:bg-white transition-all resize-none"
          />
        </div>

        {/* DPDP Notice */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-[#475569] leading-relaxed">
          <p>
            By submitting this form, you consent to the processing of your contact details solely for consultation under India&apos;s Digital Personal Data Protection Act, 2023. We never sell your data or distribute unsolicited communications.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_14px_rgba(29,78,216,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
        >
          <span>{isSubmitting ? "Submitting Enquiry..." : "Submit Enquiry & Request Free Assessment"}</span>
          <ArrowRight className="w-4 h-4 text-blue-200" />
        </button>
      </form>
    </div>
  );
}

export default function EnquiryPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 md:px-12 flex flex-col justify-center">
      <div className="mb-6 max-w-2xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      <Suspense fallback={<div className="text-center text-xs text-neutral-500">Loading form...</div>}>
        <EnquiryFormContent />
      </Suspense>
    </main>
  );
}
