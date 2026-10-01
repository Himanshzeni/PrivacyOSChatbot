"use client";

import React, { useRef, useEffect } from "react";
import { Bot, User, Sparkles, ChevronRight, HelpCircle, RotateCcw } from "lucide-react";

export interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; citation: string }[];
  suggestSoftEnquiry?: boolean;
}

interface MessageListProps {
  messages: MessageItem[];
  isTyping: boolean;
  onSoftEnquiryClick?: () => void;
  onSelectPrompt?: (prompt: string) => void;
  onResetChat?: () => void;
}

const STARTER_PROMPTS = [
  "🛡️ What is PrivacyOS Global?",
  "⚖️ Penalties under DPDP Act 2023?",
  "🔍 How does Aadhaar & PAN discovery work?",
  "📅 What is the May 2027 deadline?",
  "📋 How to get a free compliance assessment?",
];

function renderInlineMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-[#0F172A]">$1</strong>')
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1 py-0.5 rounded bg-blue-50 border border-blue-200/50 font-mono text-[10px] text-[#1D4ED8]">$1</code>'
    );
}

function FormattedContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet point
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 text-[11.5px]">
              <span className="text-[#1D4ED8] font-bold leading-tight">•</span>
              <span
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(trimmed.slice(2)) }}
              />
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+[\.\)])\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 text-[11.5px]">
              <span className="font-mono font-bold text-[#1D4ED8] text-[10.5px]">
                {numMatch[1]}
              </span>
              <span
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(numMatch[2]) }}
              />
            </div>
          );
        }

        return (
          <p
            key={idx}
            className="text-[11.5px]"
            dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }}
          />
        );
      })}
    </div>
  );
}

export function MessageList({
  messages,
  isTyping,
  onSoftEnquiryClick,
  onSelectPrompt,
  onResetChat,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const showStarterChips = messages.length <= 1 && onSelectPrompt;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[#F8FAFC]">
      {messages.map((msg) => {
        const isUser = msg.role === "user";

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                isUser
                  ? "bg-[#1D4ED8] text-white shadow-sm"
                  : "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 shadow-sm"
              }`}
            >
              {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Content Bubble */}
            <div
              className={`max-w-[84%] rounded-2xl p-3 shadow-sm ${
                isUser
                  ? "bg-[#1D4ED8] text-white rounded-tr-none text-[11.5px]"
                  : "bg-white text-[#0F172A] border border-[#E2E8F0] rounded-tl-none"
              }`}
            >
              {isUser ? (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              ) : (
                <FormattedContent content={msg.content} />
              )}

              {/* Soft Enquiry Prompt if strongly detected */}
              {!isUser && msg.suggestSoftEnquiry && (
                <div className="mt-2.5 pt-2 border-t border-blue-100 bg-[#F0F7FF] -mx-3 -mb-3 p-2.5 rounded-b-2xl">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1 text-[#0F172A] font-medium">
                      <Sparkles className="w-3 h-3 text-[#1D4ED8]" />
                      Need a personalized compliance assessment?
                    </span>
                    <button
                      type="button"
                      onClick={onSoftEnquiryClick}
                      className="underline font-bold text-[#1D4ED8] hover:text-[#1E40AF] cursor-pointer"
                    >
                      Submit Enquiry →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Quick Interactive Prompt Chips */}
      {showStarterChips && (
        <div className="pt-2 pb-1 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="text-[10px] font-semibold text-slate-500 flex items-center gap-1 px-1">
            <HelpCircle className="w-3 h-3 text-[#1D4ED8]" />
            <span>Popular compliance questions:</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPrompt(prompt.replace(/^[^a-zA-Z0-9]+/, "").trim())}
                className="text-left px-3 py-2 rounded-xl bg-white hover:bg-blue-50/80 border border-[#E2E8F0] hover:border-blue-300 text-[11px] text-[#0F172A] font-medium transition-all shadow-xs flex items-center justify-between group cursor-pointer active:scale-[0.99]"
              >
                <span>{prompt}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>

          {/* Refresh Button placed in user's highlighted blue area */}
          {onResetChat && (
            <div className="flex justify-end pt-1 pr-0.5">
              <button
                type="button"
                onClick={onResetChat}
                title="Refresh compliance questions"
                className="w-10 h-10 rounded-xl bg-white hover:bg-blue-50 text-[#1D4ED8] border-2 border-blue-400/80 hover:border-blue-600 shadow-sm transition-all cursor-pointer active:scale-90 flex items-center justify-center group"
                aria-label="Refresh compliance questions"
              >
                <RotateCcw className="w-5 h-5 text-[#1D4ED8] group-hover:-rotate-180 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Reset button when chatting so user can restore popular questions */}
      {!showStarterChips && onResetChat && (
        <div className="flex justify-end pt-1 pr-0.5">
          <button
            type="button"
            onClick={onResetChat}
            title="Reset conversation & questions"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-[#1D4ED8] border border-blue-300 hover:border-blue-500 shadow-xs text-[11px] font-semibold transition-all cursor-pointer active:scale-95 group"
            aria-label="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#1D4ED8] group-hover:-rotate-180 transition-transform duration-300" />
            <span>New Chat</span>
          </button>
        </div>
      )}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 flex items-center justify-center shrink-0">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-bounce" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
