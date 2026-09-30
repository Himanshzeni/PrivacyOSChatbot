"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText } from "lucide-react";

interface EnquiryButtonProps {
  conversationId: string;
  onEnquiryClick?: () => void;
}

export function EnquiryButton({ conversationId, onEnquiryClick }: EnquiryButtonProps) {
  const router = useRouter();

  const handleRedirect = () => {
    // Notify analytics
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "cta_clicked",
        conversationId,
        metadata: { button: "submit_enquiry_footer" },
      }),
    }).catch(() => {});

    if (onEnquiryClick) onEnquiryClick();
    router.push(`/enquiry?conversation_id=${encodeURIComponent(conversationId)}`);
  };

  return (
    <button
      onClick={handleRedirect}
      type="button"
      className="w-full py-2.5 px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold transition-all shadow-[0_4px_14px_rgba(29,78,216,0.25)] flex items-center justify-between group cursor-pointer border border-blue-500/40 active:scale-[0.98]"
    >
      <span className="flex items-center gap-2 text-white">
        <FileText className="w-3.5 h-3.5 text-blue-200" />
        <span>Submit an Enquiry</span>
      </span>
      <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform text-blue-100">
        <span>Proceed</span>
        <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
      </span>
    </button>
  );
}
