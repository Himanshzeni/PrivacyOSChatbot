# Smart Assistant Implementation Plan

> **For Agent:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Build a privacy-first, DPDP-compliant embedded Smart Assistant for Next.js with hybrid RAG, zero-duplicate CRM integration, and an integrated Admin panel.

**Architecture:** Next.js App Router with Prisma + MongoDB Atlas, abstracted AI Provider (Google Gemini default), dual-tier RAG (Company Knowledge + Approved DPDP Act Knowledge), session-only conversation memory, ephemeral Bot Enquiry with PII deletion upon official form submission, and an embedded responsive UI widget.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma ORM, MongoDB Atlas ($vectorSearch + cosine fallback), Google Gemini API (@google/generative-ai), Lucide React.

---

### Task 1: Dependencies & Database Schema Setup
**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/db.ts`
- Modify: `package.json`

**Step 1: Install core dependencies**
Install `@prisma/client`, `prisma`, `@google/generative-ai`, `lucide-react`, `clsx`, `tailwind-merge`.

**Step 2: Define Prisma schema**
Define models for `CompanyKnowledge`, `KnowledgeChunk`, `CrawlStaging`, `TemporaryBotEnquiry`, `SubmittedEnquiry`, `AnalyticsEvent`, and `AdminUser`.

**Step 3: Generate Prisma client**
Run `npx prisma generate` to ensure client types are generated.

---

### Task 2: AI Provider Abstraction & Google Gemini Adapter
**Files:**
- Create: `src/lib/ai/types.ts`
- Create: `src/lib/ai/gemini.ts`
- Create: `src/lib/ai/provider.ts`

**Step 1: Define AIProvider interface**
Unified methods: `generateResponse()`, `generateEmbeddings()`.

**Step 2: Implement Google Gemini Adapter**
Use `gemini-2.5-flash` with system prompt instructions and embeddings via `text-embedding-004`.

**Step 3: Unit test / verification script**
Test provider factory and fallback behavior.

---

### Task 3: Security & Privacy Layer (PII Redactor, Prompt Injection & Rate Limiter)
**Files:**
- Create: `src/lib/security/rateLimit.ts`
- Create: `src/lib/security/piiFilter.ts`
- Create: `src/lib/security/injectionShield.ts`

**Step 1: PII Filter**
Detect and redact Indian phone numbers, emails, PAN, Aadhaar, and payment info.

**Step 2: Injection Shield**
Validate against system prompt override delimiters and prompt injection attacks.

**Step 3: Rate Limiter**
IP and session-based sliding-window rate limiter.

---

### Task 4: Hybrid RAG & 4-Tier Knowledge Orchestrator
**Files:**
- Create: `src/lib/knowledge/dpdpKnowledge.ts`
- Create: `src/lib/rag/retriever.ts`
- Create: `src/lib/rag/orchestrator.ts`

**Step 1: Seed approved DPDP Act 2023 knowledge**
Official legal sections (Consent, Notice, Data Fiduciary obligations, Rights of Data Principal, Penalties) with mandatory citation metadata (`Source: DPDP Act, 2023`).

**Step 2: Vector search + local cosine retriever**
Retrieve company facts and DPDP knowledge with similarity scoring.

**Step 3: 4-Tier Orchestrator**
Enforce Priority 1: Website Knowledge -> Priority 2: DPDP Knowledge -> Priority 3: General AI -> Priority 4: Anti-hallucination controlled fallback.

---

### Task 5: Intent Detection & Soft Enquiry Suggestion Engine
**Files:**
- Create: `src/lib/intent/detector.ts`
- Create: `src/app/api/chat/route.ts`

**Step 1: Intent Analyzer**
Classify visitor turns into `CASUAL`, `INFORMATIONAL`, or `STRONG_ENQUIRY`.

**Step 2: Soft CTA Rule**
When `STRONG_ENQUIRY` is detected, trigger exactly ONE soft non-intrusive suggestion to click "Submit an Enquiry →".

**Step 3: Ephemeral Bot Enquiry Recording**
If voluntary requirements or contact details are mentioned, save temporary record with `conversationId`.

---

### Task 6: Enquiry Redirection, Form & PII Purge Pipeline
**Files:**
- Create: `src/app/enquiry/page.tsx`
- Create: `src/app/api/enquiry/route.ts`

**Step 1: Build the Main Enquiry Form Page**
Render standard enquiry form accepting `conversation_id` from URL query parameter or session storage.

**Step 2: Implement `/api/enquiry` Submission Handler**
When enquiry is submitted:
1. Save permanent lead in `SubmittedEnquiry`.
2. Match `conversation_id` with `TemporaryBotEnquiry`.
3. Permanently PURGE/DELETE PII from `TemporaryBotEnquiry`.

---

### Task 7: Smart Assistant UI Widget
**Files:**
- Create: `src/components/chatbot/ChatWidget.tsx`
- Create: `src/components/chatbot/ChatWindow.tsx`
- Create: `src/components/chatbot/MessageList.tsx`
- Create: `src/components/chatbot/MessageInput.tsx`
- Create: `src/components/chatbot/EnquiryButton.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Build Floating Bubble & Window**
Desktop bottom-right popup card with smooth transitions + mobile responsive sheet.

**Step 2: Embedded Enquiry CTA Button**
Fixed "Submit an Enquiry →" button inside chat footer redirecting to `/enquiry?conversation_id=...`.

**Step 3: Session Context Management**
Unique ephemeral `conversation_id` generated per browser tab.

---

### Task 8: Website Crawler with Staging Approval Queue
**Files:**
- Create: `src/lib/crawler/crawler.ts`
- Create: `src/app/api/admin/crawler/route.ts`

**Step 1: Sitemap & URL Discoverer**
Parse internal pages while skipping excluded routes (`/admin`, `/login`, etc.).

**Step 2: Staging Storage**
Compute SHA256 hashes of content to detect changes and queue them in `CrawlStaging` for admin review.

---

### Task 9: Integrated Admin Panel (`/admin`)
**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/knowledge/page.tsx`
- Create: `src/app/admin/crawler/page.tsx`
- Create: `src/app/admin/analytics/page.tsx`

**Step 1: Dashboard Navigation & Metrics Overview**
Display privacy-sanitized analytics (Chat opens, queries, intent funnel, AI latency).

**Step 2: Knowledge Management**
CRUD for Company Knowledge & FAQs.

**Step 3: Crawler Review Queue**
Review pending crawled content with 1-click "Approve" (indexes into Vector DB) or "Reject".

---

### Task 10: End-to-End Verification & DPDP Compliance Test
- Verify build with `npm run build`.
- Test chat endpoint with RAG context and DPDP questions.
- Test intent detection and "Submit an Enquiry" redirection.
- Test form submission and verify PII deletion from `TemporaryBotEnquiry`.
