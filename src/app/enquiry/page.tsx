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
    service: "24/7 Proactive Website Maintenance",
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
      setErrorMessage(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white border border-[#12372A]/15 shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#12372A] text-[#A8E6CF] flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#17201C]">Enquiry Received! ✨</h2>
          <p className="text-sm text-[#5C6B64] leading-relaxed">
            Thank you, <strong className="text-[#17201C]">{formData.name}</strong>. Our senior technical team has received your enquiry. We will conduct a preliminary audit and reach out to you within 2 hours.
          </p>
        </div>

        {botPurged && (
          <div className="p-3.5 rounded-2xl bg-[#EBF8F2] border border-[#3FA7A3]/30 text-xs text-[#12372A] flex items-center gap-2 text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>DPDP Compliance Active:</strong> Your temporary assistant chat details have been matched and securely purged from the bot cache.
            </span>
          </div>
        )}

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#12372A] text-white text-xs font-bold hover:bg-[#1a4a39] transition-all shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-[#12372A]/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12372A]/5 text-[#12372A] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Official Maintenance & Care Form</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          Request Website Care Assessment
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6B64] leading-relaxed">
          Provide your website details below. Our senior engineers will perform an initial technical health review and share a tailored roadmap.
        </p>
      </div>

      {conversationId && (
        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-600 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            Assistant Session Linked: <code className="font-mono text-[#12372A] font-bold">{conversationId.substring(0, 14)}...</code>
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
          <label className="font-bold text-[#17201C] text-xs">
            Your Name / Company Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma / Hotel Riviera"
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-[#17201C] text-xs sm:text-sm focus:outline-none focus:border-[#12372A] focus:bg-white transition-colors"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-[#17201C] text-xs">
              Work Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. client@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-[#17201C] text-xs sm:text-sm focus:outline-none focus:border-[#12372A] focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#17201C] text-xs">
              Mobile / Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-[#17201C] text-xs sm:text-sm focus:outline-none focus:border-[#12372A] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Website URL & Service */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-[#17201C] text-xs">
              Website URL (or Target Domain)
            </label>
            <input
              type="text"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="e.g. https://mywebsite.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-[#17201C] text-xs sm:text-sm focus:outline-none focus:border-[#12372A] focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#17201C] text-xs">
              Primary Service / Care Plan <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-[#17201C] text-xs sm:text-sm focus:outline-none focus:border-[#12372A] focus:bg-white transition-colors"
            >
              <option value="24/7 Proactive Website Maintenance">24/7 Proactive Website Maintenance</option>
              <option value="Speed & Core Web Vitals Optimization">Speed & Core Web Vitals Optimization</option>
              <option value="Malware Removal & Security Hardening">Malware Removal & Security Hardening</option>
              <option value="Bug Fixing & Layout Repair">Bug Fixing & Layout Repair</option>
              <option value="Cloud, Hosting & Disaster Recovery">Cloud, Hosting & Disaster Recovery</option>
              <option value="Custom Enterprise Care Pod">Custom Enterprise Care Pod</option>
            </select>
          </div>
        </div>

        {/* Requirements / Notes */}
        <div className="space-y-1">
          <label className="font-bold text-[#17201C] text-xs">
            Describe Your Requirements or Concerns (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="e.g. Facing periodic 502 downtime, need urgent backup and speed boost..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-[#17201C] text-xs sm:text-sm focus:outline-none focus:border-[#12372A] focus:bg-white transition-colors resize-none"
          />
        </div>

        {/* DPDP Notice & Consent Checkbox */}
        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#12372A]/10 text-[11px] text-[#5C6B64] leading-relaxed">
          <p>
            By submitting this form, you consent to the processing of your contact info solely for consultation under India&apos;s Digital Personal Data Protection Act, 2023. We never sell your data or send spam.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-[#12372A] hover:bg-[#1a4a39] text-white font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
        >
          <span>{isSubmitting ? "Submitting Enquiry..." : "Submit Enquiry & Request Free Audit"}</span>
          <ArrowRight className="w-4 h-4 text-[#A8E6CF]" />
        </button>
      </form>
    </div>
  );
}

export default function EnquiryPage() {
  return (
    <main className="min-h-screen bg-[#F4F8F6] py-16 px-4 sm:px-6 md:px-12 flex flex-col justify-center">
      <div className="mb-6 max-w-2xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12372A] hover:underline"
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
