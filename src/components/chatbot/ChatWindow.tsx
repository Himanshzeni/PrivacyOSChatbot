"use client";

import React from "react";
import { X, Sparkles } from "lucide-react";
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
          <span className="text-sm font-semibold text-white">
            PrivacyOS Global Assistant
          </span>
        </div>

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

      {/* Message List with Interactive Chips, Markdown & Questions Toggle */}
      <MessageList
        messages={messages}
        isTyping={isTyping}
        onSoftEnquiryClick={onEnquiryClick}
        onSelectPrompt={onSendMessage}
      />

      {/* Message Search / Input Bar (Replaced to be above Enquiry button) */}
      <div className="border-t border-[#E2E8F0] bg-white">
        <MessageInput onSendMessage={onSendMessage} disabled={isTyping} />
      </div>

      {/* Submit an Enquiry Button & Privacy Badge */}
      <div className="px-3 pb-2.5 pt-0.5 bg-white space-y-1.5">
        <EnquiryButton
          conversationId={conversationId}
          onEnquiryClick={onEnquiryClick}
        />
        <div className="text-[9px] text-center text-slate-400 font-mono">
          PrivacyOS Shield Active • DPDP 2023 Compliant Session
        </div>
      </div>
    </div>
  );
}
