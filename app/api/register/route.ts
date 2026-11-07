import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRegistrationConfirmation } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  registrationType: z.enum(["Single", "Group", "Institute", "Foreigner"]),
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal('')).default(''),
  phone: z.string().min(7),
  noOfPersons: z.number().optional().default(1),
  country: z.string().min(1),
  city: z.string().min(1),
  assistance: z.array(z.string()).optional().default([]),
  registerForEvent: z.array(z.string()).min(1),
  consentAccepted: z.boolean().optional(),
  refund_policy_accepted: z.boolean().optional(),
  refund_policy_version: z.string().optional(),
  terms_accepted: z.boolean().optional(),
  privacy_policy_accepted: z.boolean().optional(),
});

function getISTTimestamp() {
  // Generates e.g. "22-08-2026, 10:45:32 AM IST"
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).replace(/\u202f/g, ' ') + " IST"; // handle non-breaking spaces occasionally returned
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Mandatory consent validation on backend
    const refundAccepted = Boolean(data.refund_policy_accepted ?? data.consentAccepted);
    const termsAccepted = Boolean(data.terms_accepted ?? data.consentAccepted);
    const privacyAccepted = Boolean(data.privacy_policy_accepted ?? data.consentAccepted);

    if (!refundAccepted || !termsAccepted || !privacyAccepted) {
      return NextResponse.json(
        {
          message: "You must accept the Terms & Conditions, Privacy Policy, and Refund & Cancellation Policy to complete registration.",
          error: "POLICY_CONSENT_REQUIRED"
        },
        { status: 422 }
      );
    }

    const timestamp = getISTTimestamp();

    let registrationId = `REG-${Date.now().toString().slice(-6)}`;
    try {
      const dbType = data.registrationType;
      const policyVersion = data.refund_policy_version || "2026-11-05";
      const now = new Date();

      const { neon } = require("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
      
      const cuid = "cuid_" + Date.now().toString(36) + Math.random().toString(36).substr(2);
      
      await sql`
        INSERT INTO "Registration" (
          id, type, name, email, phone, country, city, 
          "noOfPersons", "assistance", "registerForEvent", 
          "refund_policy_accepted", "refund_policy_accepted_at", "refund_policy_version",
          "terms_accepted", "privacy_policy_accepted", 
          "createdAt"
        )
        VALUES (
          ${cuid}, ${dbType}, ${data.name}, ${data.email}, ${data.phone}, ${data.country}, ${data.city}, 
          ${data.noOfPersons}, ${data.assistance}, ${data.registerForEvent}, 
          ${refundAccepted}, ${now}, ${policyVersion},
          ${termsAccepted}, ${privacyAccepted}, 
          NOW()
        )
      `;
      registrationId = cuid;
    } catch (dbErr) {
      console.error("Neon DB failed to save registration", dbErr);
      throw new Error("Failed to save registration to the database");
    }

    // Fire-and-forget email — don't block response
    sendRegistrationConfirmation({
      name: data.name,
      email: data.email,
      type: data.registrationType,
      country: data.country
    }).catch(console.error);

    return NextResponse.json({ success: true, id: registrationId }, { status: 201 });
    } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/register]", err);
    return NextResponse.json({ message: "Server error", error: err?.message || String(err), stack: err?.stack }, { status: 500 });
  }
}
