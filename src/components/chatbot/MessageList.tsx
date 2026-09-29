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
    <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[#FAF8F5]">
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
                  ? "bg-[#12372A] text-white"
                  : "bg-[#A8E6CF] text-[#12372A] border border-[#3FA7A3]/30"
              }`}
            >
              {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Content Bubble */}
            <div
              className={`max-w-[82%] rounded-2xl p-3 shadow-sm leading-relaxed ${
                isUser
                  ? "bg-[#12372A] text-white rounded-tr-none"
                  : "bg-white text-[#17201C] border border-[#12372A]/10 rounded-tl-none"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {/* Source citations tag */}
              {!isUser && msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-neutral-100 flex flex-wrap gap-1">
                  {msg.sources.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 text-[9px] font-mono text-neutral-600"
                    >
                      <BookOpen className="w-2.5 h-2.5 text-emerald-700" />
                      <span>{s.citation}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Soft Enquiry Prompt if strongly detected */}
              {!isUser && msg.suggestSoftEnquiry && (
                <div className="mt-2.5 pt-2 border-t border-emerald-100/60 bg-[#EBF8F2] -mx-3 -mb-3 p-2.5 rounded-b-2xl">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1 text-[#12372A] font-medium">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      Ready to talk to the engineering team?
                    </span>
                    <button
                      type="button"
                      onClick={onSoftEnquiryClick}
                      className="underline font-bold text-[#12372A] hover:text-black cursor-pointer"
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
          <div className="w-6 h-6 rounded-full bg-[#A8E6CF] text-[#12372A] border border-[#3FA7A3]/30 flex items-center justify-center shrink-0">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="p-3 bg-white border border-[#12372A]/10 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12372A] animate-bounce" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#12372A] animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#12372A] animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
