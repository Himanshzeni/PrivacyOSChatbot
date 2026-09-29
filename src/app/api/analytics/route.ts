import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventType, conversationId, sessionId, pagePath, metadata } = body;

    if (!eventType) {
      return NextResponse.json({ error: "eventType required" }, { status: 400 });
    }

    await prisma.analyticsEvent.create({
      data: {
        eventType,
        conversationId: conversationId || null,
        sessionId: sessionId || null,
        pagePath: pagePath || null,
        metadata: metadata || undefined,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Analytics Event Error]:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
