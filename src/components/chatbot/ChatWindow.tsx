"use client";

import React from "react";
import { X, Sparkles, ShieldCheck, RotateCcw } from "lucide-react";
import { MessageList, MessageItem } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { EnquiryButton } from "./EnquiryButton";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: MessageItem[];
  isTyping: boolean;
  conversationId: string;
  onSendMessage: (text: string) => void;
  onEnquiryClick: () => void;
  onResetChat?: () => void;
}

export function ChatWindow({
  isOpen,
  onClose,
  messages,
  isTyping,
  conversationId,
  onSendMessage,
  onEnquiryClick,
  onResetChat,
}: ChatWindowProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-3 sm:right-8 z-50 w-[94vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.3)] border border-[#E2E8F0] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="px-4 py-3.5 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex items-center justify-between shadow-sm border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white font-bold flex items-center justify-center shadow-sm shrink-0">
            <Sparkles className="w-4 h-4 text-blue-200" />
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-1.5 text-white">
              <span>PrivacyOS Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              DPDP Act 2023 & Platform Verified
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] text-emerald-300 font-medium flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
            <span>DPDP Safe</span>
          </div>

          {onResetChat && (
            <button
              type="button"
              onClick={onResetChat}
              title="Reset conversation"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Reset Conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message List with Interactive Chips and Markdown */}
      <MessageList
        messages={messages}
        isTyping={isTyping}
        onSoftEnquiryClick={onEnquiryClick}
        onSelectPrompt={onSendMessage}
      />

      {/* Always Visible Fixed Enquiry Button */}
      <div className="px-3 pt-2 pb-1 bg-white border-t border-[#E2E8F0]">
        <EnquiryButton
          conversationId={conversationId}
          onEnquiryClick={onEnquiryClick}
        />
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} disabled={isTyping} />
    </div>
  );
}
