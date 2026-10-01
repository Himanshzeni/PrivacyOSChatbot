import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventType, conversationId, sessionId, pagePath, metadata } = body;

    if (!eventType) {
      return NextResponse.json({ error: "eventType required" }, { status: 400 });
    }

    if (isDatabaseConfigured()) {
      try {
        await prisma.analyticsEvent.create({
          data: {
            eventType,
            conversationId: conversationId || null,
            sessionId: sessionId || null,
            pagePath: pagePath || null,
            metadata: metadata || undefined,
          },
        });
      } catch (dbErr) {
        console.warn("[Analytics Warning]: Database currently unavailable, event skipped.", (dbErr as Error)?.message || dbErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.warn("[Analytics Handler Warning]:", error);
    return NextResponse.json({ success: true, warning: "Processed with fallback" });
  }
}
