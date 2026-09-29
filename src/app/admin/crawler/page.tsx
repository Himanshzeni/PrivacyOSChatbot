"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, RefreshCw, Sparkles, Globe } from "lucide-react";

interface StagingItem {
  id: string;
  url: string;
  title: string;
  extractedText: string;
  contentHash: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewedAt?: string;
  createdAt: string;
}

export default function CrawlerAdminPage() {
  const [items, setItems] = useState<StagingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const fetchQueue = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/crawler");
      const data = await res.json();
      setItems(data.queue || []);
    } catch (err) {
      console.error("Failed to fetch crawler queue", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadInitial() {
      try {
        const res = await fetch("/api/admin/crawler");
        const data = await res.json();
        if (!ignore) {
          setItems(data.queue || []);
        }
      } catch (err) {
        console.error("Failed to fetch crawler queue", err);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }
    loadInitial();
    return () => {
      ignore = true;
    };
  }, []);

  const handleAction = async (id: string, action: "APPROVED" | "REJECTED") => {
    setActionInProgress(id);
    setMessage("");
    try {
      const res = await fetch("/api/admin/crawler", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      setMessage(data.message || "Updated successfully");
      await fetchQueue();
    } catch {
      setMessage("Failed to update status");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleTriggerCrawl = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/crawler", { method: "POST" });
      await res.json();
      setMessage("Crawler run complete! Discovered pages queued for review.");
      await fetchQueue();
    } catch {
      setMessage("Crawler run failed");
    } finally {
      setIsLoading(false);
    }
  };

  const pendingItems = items.filter((i) => i.status === "PENDING");
  const processedItems = items.filter((i) => i.status !== "PENDING");

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#17201C] tracking-tight">
            Crawler Staging & Approval Queue
          </h1>
          <p className="text-xs text-[#5C6B64]">
            Review newly extracted website content before indexing into the Vector Database.
          </p>
        </div>

        <button
          type="button"
          onClick={handleTriggerCrawl}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#1a4a39] text-white text-xs font-bold transition-all shadow flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Trigger Crawler Scan</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-[#EBF8F2] border border-[#3FA7A3]/30 text-xs text-[#12372A] font-medium animate-in fade-in">
          {message}
        </div>
      )}

      {/* Pending Review Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#17201C] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Pending Review ({pendingItems.length})</span>
        </div>

        {pendingItems.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-[#12372A]/10 text-center text-xs text-neutral-400 space-y-1">
            <Globe className="w-8 h-8 mx-auto text-neutral-300" />
            <p className="font-semibold text-neutral-600">No pending pages in queue.</p>
            <p>Click &quot;Trigger Crawler Scan&quot; above to check for website updates.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-[#12372A]/15 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#17201C]">{item.title}</h3>
                    <div className="text-[11px] font-mono text-emerald-800">{item.url}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={actionInProgress === item.id}
                      onClick={() => handleAction(item.id, "APPROVED")}
                      className="px-3.5 py-1.5 rounded-lg bg-[#12372A] hover:bg-[#1a4a39] text-white text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A8E6CF]" />
                      <span>Approve & Embed</span>
                    </button>

                    <button
                      type="button"
                      disabled={actionInProgress === item.id}
                      onClick={() => handleAction(item.id, "REJECTED")}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <XCircle className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>

                <div className="text-xs text-neutral-600 leading-relaxed max-h-32 overflow-y-auto bg-neutral-50 p-3 rounded-xl border border-neutral-200/60 font-mono text-[11px]">
                  {item.extractedText}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      {processedItems.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-neutral-200">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Review History ({processedItems.length})
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden text-xs">
            {processedItems.map((item) => (
              <div key={item.id} className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-neutral-800">{item.title}</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{item.url}</div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    item.status === "APPROVED"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
