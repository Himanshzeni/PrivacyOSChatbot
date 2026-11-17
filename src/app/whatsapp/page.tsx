"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MessageCircle,
  ShieldCheck,
  Check,
  CheckCheck,
  Send,
  ExternalLink,
  Copy,
  Sparkles,
  ArrowRight,
  Terminal,
  Activity,
  Phone,
  Video,
  Smile,
  Paperclip,
  Mic,
  RotateCcw,
} from "lucide-react";

interface SimMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  time: string;
  buttons?: Array<{ id: string; title: string }>;
}

export default function WhatsAppHubPage() {
  const [messages, setMessages] = useState<SimMessage[]>([
    {
      id: "1",
      role: "bot",
      text:
        "Namaste! 🙏 Welcome to *PrivacyOS Global WhatsApp Assistant*.\n\n" +
        "I can help you with:\n" +
        "• *DPDP Act 2023 Rules & Roadmap*\n" +
        "• *India PII Discovery (Aadhaar, PAN, UPI)*\n" +
        "• *Consent & DSR Automation*\n" +
        "• *Free Compliance Assessment*\n\n" +
        "Select an option below or type your question:",
      time: "10:00 AM",
      buttons: [
        { id: "btn_assessment", title: "📋 Free Assessment" },
        { id: "btn_penalties", title: "⚖️ DPDP Penalties" },
        { id: "btn_expert", title: "📞 Talk to Expert" },
      ],
    },
  ]);

  const msgIdRef = useRef(100);
  const getNextId = (prefix: string) => {
    msgIdRef.current += 1;
    return `${prefix}_${msgIdRef.current}`;
  };

  const [inputVal, setInputVal] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testPhoneNumber] = useState("919876543210");
  const [apiStatus, setApiStatus] = useState<{
    status: string;
    readyForProduction: boolean;
    details: {
      hasAccessToken: boolean;
      hasPhoneNumberId: boolean;
      hasAppSecret: boolean;
      verifyToken: string;
      publicWhatsAppNumber: string;
      webhookPath: string;
    };
  } | null>(null);

  const [webhookTestLog, setWebhookTestLog] = useState<{
    requestPayload?: unknown;
    responsePayload?: unknown;
    latencyMs?: number;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch live status of WhatsApp integration
    fetch("/api/whatsapp/status")
      .then((res) => res.json())
      .then((data) => setApiStatus(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isSending) return;

    const userMsg: SimMessage = {
      id: getNextId("u"),
      role: "user",
      text: textToSend,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsSending(true);

    try {
      const res = await fetch("/api/whatsapp/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: testPhoneNumber,
          text: textToSend,
          senderName: "Enterprise Client",
        }),
      });

      const data = await res.json();
      setWebhookTestLog({
        requestPayload: {
          object: "whatsapp_business_account",
          entry: [
            {
              changes: [
                {
                  value: {
                    messaging_product: "whatsapp",
                    messages: [
                      {
                        from: testPhoneNumber,
                        text: { body: textToSend },
                        type: "text",
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        responsePayload: data,
        latencyMs: data.latencyMs,
      });

      const botReply: SimMessage = {
        id: getNextId("b"),
        role: "bot",
        text: data.whatsappFormatted || data.response || "No response received",
        time: "Just now",
        buttons: data.buttons,
      };

      setMessages((prev) => [...prev, botReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: getNextId("err"),
          role: "bot",
          text: "⚠️ Simulation network issue. Please verify that the API server is running.",
          time: "Just now",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${(apiStatus?.details?.publicWhatsAppNumber || "919876543210").replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent("Hello PrivacyOS! I want to explore DPDP Act compliance.")}`;

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#111B21] flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#008069] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white text-[#008069] flex items-center justify-center font-black text-lg shadow-sm">
                P
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight">
                  PrivacyOS Global
                </span>
                <span className="block text-[10px] text-emerald-200 font-medium">
                  WhatsApp Cloud API Suite
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 text-emerald-100 text-xs font-semibold border border-emerald-600/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Meta Graph API v21.0 Ready</span>
            </span>

            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Smartphone Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[390px] rounded-[42px] p-3 bg-[#1E293B] shadow-[0_25px_60px_rgba(0,0,0,0.35)] border-4 border-slate-700">
            {/* Phone Screen Container */}
            <div className="w-full h-[660px] bg-[#EFEAE2] rounded-[32px] overflow-hidden flex flex-col relative shadow-inner">
              {/* WhatsApp App Header */}
              <div className="bg-[#008069] text-white px-3.5 py-3 flex items-center justify-between select-none shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5 text-emerald-200" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#008069] flex items-center justify-center">
                      <Check className="w-2 h-2 text-white stroke-[3]" />
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight flex items-center gap-1">
                      <span>PrivacyOS Global</span>
                    </div>
                    <div className="text-[10px] text-emerald-100 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      <span>online</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-emerald-100">
                  <Video className="w-4 h-4 cursor-pointer hover:text-white" />
                  <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
                  <button
                    type="button"
                    onClick={() =>
                      setMessages([
                        {
                          id: getNextId("reset"),
                          role: "bot",
                          text: "Conversation reset. Ask about DPDP compliance or Free Assessment.",
                          time: "Just now",
                        },
                      ])
                    }
                    title="Reset Simulator"
                    className="cursor-pointer hover:text-white"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Wallpaper & Chat Bubbles */}
              <div
                className="flex-1 overflow-y-auto p-3 space-y-2.5"
                style={{
                  backgroundImage: `radial-gradient(#CBD5E1 0.75px, transparent 0.75px)`,
                  backgroundSize: "16px 16px",
                }}
              >
                {/* Security Pill */}
                <div className="flex justify-center my-1">
                  <div className="bg-[#FFEECD] text-[#54656F] px-2.5 py-1 rounded-md text-[9.5px] text-center shadow-xs flex items-center gap-1 border border-[#F4E1BD]">
                    <ShieldCheck className="w-3 h-3 text-amber-700 shrink-0" />
                    <span>End-to-end encrypted & DPDP Compliant</span>
                  </div>
                </div>

                {messages.map((m) => {
                  const isUser = m.role === "user";
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                    >
                      <div
                        className={`max-w-[85%] px-3 py-2 rounded-2xl shadow-xs text-xs ${
                          isUser
                            ? "bg-[#D9FDD3] text-[#111B21] rounded-tr-none"
                            : "bg-white text-[#111B21] rounded-tl-none border border-slate-200/60"
                        }`}
                      >
                        <div className="whitespace-pre-wrap leading-relaxed text-[11.5px]">{m.text}</div>
                        <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-[#667781] select-none">
                          <span>{m.time}</span>
                          {isUser && <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />}
                        </div>
                      </div>

                      {/* Interactive WhatsApp reply buttons */}
                      {!isUser && m.buttons && (
                        <div className="flex flex-col gap-1 w-full max-w-[85%]">
                          {m.buttons.map((btn) => (
                            <button
                              key={btn.id}
                              type="button"
                              onClick={() => handleSendMessage(btn.id)}
                              className="py-1.5 px-3 bg-white hover:bg-emerald-50 text-[#008069] border border-slate-200 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                            >
                              <span>{btn.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {isSending && (
                  <div className="flex items-start">
                    <div className="px-3 py-2 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-xs text-[10px] text-[#667781] flex items-center gap-1.5">
                      <span>PrivacyOS is typing</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-bounce" />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* WhatsApp Input Bar */}
              <div className="p-2 bg-[#F0F2F5] border-t border-[#E2E8F0] flex items-center gap-1.5">
                <Smile className="w-5 h-5 text-[#54656F]" />
                <Paperclip className="w-5 h-5 text-[#54656F] rotate-45" />
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage(inputVal);
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-2xl bg-white text-xs text-[#111B21] focus:outline-none shadow-xs"
                />
                {inputVal.trim() ? (
                  <button
                    type="button"
                    onClick={() => handleSendMessage(inputVal)}
                    className="w-8 h-8 rounded-full bg-[#00A884] text-white flex items-center justify-center cursor-pointer shadow-md shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 translate-x-0.5" />
                  </button>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#00A884] text-white flex items-center justify-center cursor-pointer shadow-md shrink-0">
                    <Mic className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="text-[11px] text-slate-500 font-medium">
              📱 Live Interactive WhatsApp Phone Simulator
            </span>
          </div>
        </div>

        {/* Right Column: Meta WhatsApp Cloud API Control & Integration Hub */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Integration Status */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#008069] flex items-center justify-center border border-emerald-200">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">
                    WhatsApp Cloud API Status
                  </h2>
                  <p className="text-xs text-slate-500">
                    Direct integration with Meta Graph API v21.0 & Hybrid RAG Engine
                  </p>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  apiStatus?.readyForProduction
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    apiStatus?.readyForProduction ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                  }`}
                />
                <span>{apiStatus?.readyForProduction ? "Production Active" : "Mock & Dev Mode"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Webhook Verification</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Ready (GET)</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">HMAC Signature</span>
                <span
                  className={`font-bold flex items-center gap-1 mt-0.5 ${
                    apiStatus?.details?.hasAppSecret ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{apiStatus?.details?.hasAppSecret ? "Enforced" : "Permissive (Dev)"}</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">AI Engine</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Gemini / Hybrid RAG</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">DPDP PII Shield</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Auto-Redact Active</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Meta Webhook Setup Credentials */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#008069]" />
              <h3 className="font-bold text-sm text-[#0F172A]">
                Meta Developer Webhook Configuration
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Paste these values into your Meta Developer App Dashboard under{" "}
              <strong>WhatsApp &gt; Configuration &gt; Webhook</strong>:
            </p>

            <div className="space-y-3">
              {/* Webhook Callback URL */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Callback URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://<your-domain>/api/whatsapp"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `${window.location.origin}/api/whatsapp`,
                        "callback_url"
                      )
                    }
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedKey === "callback_url" ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Verify Token */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Verify Token
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={apiStatus?.details?.verifyToken || "privacyos_whatsapp_webhook_token"}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        apiStatus?.details?.verifyToken || "privacyos_whatsapp_webhook_token",
                        "verify_token"
                      )
                    }
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedKey === "verify_token" ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Webhook Fields to Subscribe */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block">Required Webhook Subscription Field:</strong>
                  <span>
                    In Meta Dashboard, click &quot;Manage&quot; beside Webhook Fields and check{" "}
                    <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-mono text-emerald-800">
                      messages
                    </code>
                    .
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Click-to-Chat & Real WhatsApp Link Generator */}
          <div className="bg-gradient-to-br from-[#075E54] to-[#128C7E] text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Click-to-Chat Link (wa.me)</h3>
                  <p className="text-xs text-emerald-100">
                    Share directly with users or embed in your marketing campaigns
                  </p>
                </div>
              </div>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white text-[#075E54] hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <span>Open in App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-2xl text-xs font-mono">
              <span className="flex-1 truncate text-emerald-200">{whatsappDirectUrl}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(whatsappDirectUrl, "wa_link")}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-xl text-white text-[11px] font-semibold cursor-pointer shrink-0 transition-colors"
              >
                {copiedKey === "wa_link" ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Card 4: Webhook Simulation Logs */}
          {webhookTestLog && (
            <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 border border-slate-800 shadow-md space-y-3 font-mono text-xs animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Terminal className="w-4 h-4" />
                  <span>Webhook Execution Telemetry</span>
                </span>
                <span>Latency: {webhookTestLog.latencyMs}ms</span>
              </div>
              <div className="max-h-48 overflow-y-auto bg-black/50 p-3 rounded-2xl text-[11px] text-slate-300">
                <pre>{JSON.stringify(webhookTestLog.responsePayload, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* Card 5: Free Assessment & Next Steps */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#CBD5E1] text-xs">
            <span className="text-slate-600">
              Looking to deploy this live on your custom domain?
            </span>
            <Link
              href="/enquiry"
              className="text-[#008069] font-bold hover:underline flex items-center gap-1"
            >
              <span>Get Free Deployment Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
