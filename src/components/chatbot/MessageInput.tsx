"use client";

import React, { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 border-t border-[#E2E8F0] bg-white">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask about PrivacyOS modules or DPDP Act 2023..."
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 focus:bg-white transition-all"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="p-2.5 rounded-xl bg-[#1D4ED8] text-white hover:bg-[#1E40AF] disabled:opacity-40 transition-all cursor-pointer shadow-[0_2px_8px_rgba(29,78,216,0.3)] active:scale-95"
          aria-label="Send message"
        >
          <Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
      <div className="pt-1.5 text-[9px] text-center text-slate-400 font-mono">
        PrivacyOS Shield Active • DPDP 2023 Compliant Session
      </div>
    </div>
  );
}
