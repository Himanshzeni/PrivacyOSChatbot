"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatWindow } from "./ChatWindow";
import { MessageItem } from "./MessageList";

export function ChatWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "initial_welcome",
      role: "assistant",
      content: "Welcome to PrivacyOS Global",
    },
  ]);

  // Initialize or restore session-only conversation_id
  useEffect(() => {
    let convId = sessionStorage.getItem("smart_assistant_conv_id");
    if (!convId) {
      convId = "conv_" + Math.random().toString(36).substring(2, 10);
      sessionStorage.setItem("smart_assistant_conv_id", convId);
    }
    queueMicrotask(() => {
      setConversationId(convId);
    });
  }, []);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      // Log chat opened event to analytics
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "chat_opened",
          conversationId,
        }),
      }).catch(() => {});
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: MessageItem = {
      id: "user_" + Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const botResponse =
        data.response || "Maaf kijiye, main is samay response generate nahi kar pa raha hoon.";

      const assistantMsg: MessageItem = {
        id: "assistant_" + Date.now(),
        role: "assistant",
        content: botResponse,
        sources: data.sources,
        suggestSoftEnquiry: data.suggestSoftEnquiry,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("[ChatWidget Error]:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "error_" + Date.now(),
          role: "assistant",
          content:
            "Connectivity issue detect hui hai. Kripya apna sawal dobara poochhein ya seedhe enquiry form par jayein.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEnquiryRedirect = () => {
    setIsOpen(false);
    router.push(`/enquiry?conversation_id=${encodeURIComponent(conversationId)}`);
  };

  const handleResetChat = () => {
    const newConvId = "conv_" + Math.random().toString(36).substring(2, 10);
    sessionStorage.setItem("smart_assistant_conv_id", newConvId);
    setConversationId(newConvId);
    setMessages([
      {
        id: "initial_welcome",
        role: "assistant",
        content: "Welcome to PrivacyOS Global",
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={handleToggle}
          className="relative px-5 py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white shadow-[0_8px_25px_rgba(29,78,216,0.35)] flex items-center gap-2.5 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 border border-blue-400/30 group"
          aria-label="Toggle Smart Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide">Smart Assistant</span>
          <Sparkles className="w-3.5 h-3.5 text-blue-200 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Embedded Chat Window */}
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        conversationId={conversationId}
        onSendMessage={handleSendMessage}
        onEnquiryClick={handleEnquiryRedirect}
        onResetChat={handleResetChat}
      />
    </>
  );
}
