import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Database,
  Search,
  BarChart3,
  ShieldCheck,
  ArrowLeft,
  Lock,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F4F8F6] text-[#17201C]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#12372A] text-white border-r border-white/10 hidden md:flex flex-col justify-between p-6">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#A8E6CF] text-[#12372A] font-black flex items-center justify-center shadow">
              A
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-white">SMART ADMIN</div>
              <div className="text-[10px] text-[#A8E6CF] font-mono">Curavia Fort Control</div>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#A8E6CF]" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/crawler"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Search className="w-4 h-4 text-[#A8E6CF]" />
              <span>Crawler Queue</span>
            </Link>

            <Link
              href="/admin/knowledge"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Database className="w-4 h-4 text-[#A8E6CF]" />
              <span>Knowledge Base</span>
            </Link>

            <Link
              href="/admin/analytics"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-[#A8E6CF]" />
              <span>Funnel Analytics</span>
            </Link>
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10 text-xs">
          <div className="p-3 rounded-2xl bg-[#0e211e] border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-[#A8E6CF] font-bold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DPDP Guard Active</span>
            </div>
            <div className="text-[10px] text-neutral-400 leading-tight">
              Zero Raw PII logged in analytics tables.
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#12372A]/10 px-6 sm:px-10 flex items-center justify-between">
          <div className="text-xs font-semibold text-neutral-500 flex items-center gap-2">
            <span>Admin Console</span>
            <span>/</span>
            <span className="text-[#12372A] font-bold">System Management</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-[#12372A]/5 text-[#12372A] text-xs font-semibold flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-700" />
              <span>Admin Role</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
