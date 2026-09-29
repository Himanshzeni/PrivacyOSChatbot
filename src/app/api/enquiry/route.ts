import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { redactPII } from "@/lib/security/piiFilter";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, websiteUrl, service, notes, conversationId } = body;

    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: "Name, email, phone, and service are mandatory fields." },
        { status: 400 }
      );
    }

    // 1. Save Permanent Lead to Official SubmittedEnquiry Database
    const newLead = await prisma.submittedEnquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        websiteUrl: websiteUrl ? websiteUrl.trim() : null,
        service: service.trim(),
        notes: notes ? notes.trim() : null,
        conversationId: conversationId || null,
        status: "NEW",
      },
    });

    console.log(`[Official Lead Received]: ID=${newLead.id}, Name=${newLead.name}`);

    // 2. ZERO-DUPLICATE CRM & DPDP PURGE:
    // If conversationId was passed from the chatbot session, permanently purge temporary bot PII!
    let botEnquiryPurged = false;
    if (conversationId) {
      try {
        const deletedResult = await prisma.temporaryBotEnquiry.deleteMany({
          where: { conversationId },
        });

        if (deletedResult.count > 0) {
          botEnquiryPurged = true;
          console.log(`[DPDP PII Purge]: Successfully purged temporary bot enquiry for conversationId=${conversationId}`);
        }
      } catch (purgeErr) {
        console.error("[DPDP PII Purge Error]:", purgeErr);
      }
    }

    // 3. Log Analytics (Sanitized, zero raw PII)
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: "form_submitted",
          conversationId: conversationId || null,
          intentType: "STRONG_ENQUIRY",
          metadata: {
            serviceSelected: service,
            botEnquiryPurged,
            sanitizedNotes: notes ? redactPII(notes) : null,
          },
        },
      });
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully. Our engineering team will contact you within 2 hours.",
      leadId: newLead.id,
      botPiiPurged: botEnquiryPurged,
    });
  } catch (error) {
    console.error("[Enquiry Submission API Error]:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again or contact support." },
      { status: 500 }
    );
  }
}
