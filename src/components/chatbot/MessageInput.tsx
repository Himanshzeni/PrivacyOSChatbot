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
    <div className="p-3 border-t border-[#12372A]/10 bg-white">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask about website care or DPDP compliance..."
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-[#17201C] placeholder-neutral-400 focus:outline-none focus:border-[#12372A] focus:bg-white transition-colors"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="p-2.5 rounded-xl bg-[#12372A] text-white hover:bg-[#1a4a39] disabled:opacity-40 transition-all cursor-pointer shadow-sm active:scale-95"
          aria-label="Send message"
        >
          <Send className="w-3.5 h-3.5 text-[#A8E6CF]" />
        </button>
      </div>
      <div className="pt-1.5 text-[9px] text-center text-neutral-400">
        DPDP-Compliant Session • No Permanent Chat PII
      </div>
    </div>
  );
}
