"use client";

import React, { useRef, useEffect } from "react";
import { Bot, User, Sparkles, BookOpen } from "lucide-react";

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
}

export function MessageList({ messages, isTyping, onSoftEnquiryClick }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
              className={`max-w-[82%] rounded-2xl p-3 shadow-sm leading-relaxed ${
                isUser
                  ? "bg-[#1D4ED8] text-white rounded-tr-none"
                  : "bg-white text-[#0F172A] border border-[#E2E8F0] rounded-tl-none"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {/* Source citations tag */}
              {!isUser && msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                  {msg.sources.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EFF6FF] border border-blue-200/60 text-[9px] font-mono text-[#1D4ED8]"
                    >
                      <BookOpen className="w-2.5 h-2.5 text-[#1D4ED8]" />
                      <span>{s.citation}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Soft Enquiry Prompt if strongly detected */}
              {!isUser && msg.suggestSoftEnquiry && (
                <div className="mt-2.5 pt-2 border-t border-blue-100 bg-[#F0F7FF] -mx-3 -mb-3 p-2.5 rounded-b-2xl">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1 text-[#0F172A] font-medium">
                      <Sparkles className="w-3 h-3 text-[#1D4ED8]" />
                      Need a personalized compliance roadmap?
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
