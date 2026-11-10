import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Validation Schema ────────────────────────────────────────────────────────
const schema = z.object({
  registrationType: z.enum(["Single", "Group", "Institute", "Foreigner"]),
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")).default(""),
  phone: z.string().min(7, "Phone number required"),
  noOfPersons: z.coerce.number().optional().default(1),
  donationAmount: z.union([z.string(), z.number()]).optional(),
  donation_amount: z.union([z.string(), z.number()]).optional(),
  currency: z.string().optional().default("INR"),
  country: z.string().min(1, "Country required"),
  city: z.string().min(1, "City required"),
  assistance: z.array(z.string()).optional().default([]),
  registerForEvent: z.array(z.string()).min(1, "Select at least one event"),
  consentAccepted: z.boolean().optional(),
  refund_policy_accepted: z.boolean().optional(),
  refund_policy_version: z.string().optional(),
  terms_accepted: z.boolean().optional(),
  privacy_policy_accepted: z.boolean().optional(),
});

function getISTTimestamp() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).replace(/\u202f/g, " ") + " IST";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // ── 1. Mandatory policy consent validation ───────────────────────────────
    const refundAccepted = Boolean(data.refund_policy_accepted ?? data.consentAccepted);
    const termsAccepted = Boolean(data.terms_accepted ?? data.consentAccepted);
    const privacyAccepted = Boolean(data.privacy_policy_accepted ?? data.consentAccepted);

    if (!refundAccepted || !termsAccepted || !privacyAccepted) {
      return NextResponse.json(
        {
          message: "You must accept the Terms & Conditions, Privacy Policy, and Refund & Cancellation Policy to complete registration.",
          error: "POLICY_CONSENT_REQUIRED",
        },
        { status: 422 }
      );
    }

    // ── 2. Strict Server-Side Donation Amount Validation ─────────────────────
    const rawAmount = data.donationAmount ?? data.donation_amount;
    if (rawAmount === undefined || rawAmount === null || String(rawAmount).trim() === "") {
      return NextResponse.json(
        {
          message: "Donation amount is required.",
          error: "DONATION_AMOUNT_REQUIRED",
        },
        { status: 422 }
      );
    }

    const numAmount = Number(rawAmount);
    if (isNaN(numAmount) || !isFinite(numAmount) || numAmount <= 0) {
      return NextResponse.json(
        {
          message: "Donation amount must be a valid number greater than zero.",
          error: "INVALID_DONATION_AMOUNT",
        },
        { status: 422 }
      );
    }

    const strAmount = String(rawAmount).trim();
    // Validate decimal precision up to 2 decimal places
    if (strAmount.includes(".")) {
      const decimals = strAmount.split(".")[1] || "";
      if (decimals.length > 2) {
        return NextResponse.json(
          {
            message: "Donation amount can have up to 2 decimal places only.",
            error: "INVALID_DECIMAL_PLACES",
          },
          { status: 422 }
        );
      }
    }

    const parsedAmount = Math.round(numAmount * 100) / 100;
    const currency = (data.currency || "INR").toUpperCase();
    const policyVersion = data.refund_policy_version || "2026-11-05";
    const now = new Date();
    const dbType = data.registrationType;

    // ── 3. Generate unique registration reference ID ─────────────────────────
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const registrationId = `REG-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`;

    // ── 4. Save to Neon DB with payment_status = 'PENDING' ───────────────────
    try {
      const { neon } = require("@neondatabase/serverless");
      const sql = neon(
        process.env.DATABASE_URL ||
          "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true"
      );

      await sql`
        INSERT INTO "Registration" (
          id, type, name, email, phone, country, city, 
          "noOfPersons", "assistance", "registerForEvent", 
          "donation_amount", "donationAmount", "currency",
          "payment_status", "paymentStatus",
          "refund_policy_accepted", "refund_policy_accepted_at", "refund_policy_version",
          "terms_accepted", "privacy_policy_accepted", 
          "createdAt"
        )
        VALUES (
          ${registrationId}, ${dbType}, ${data.name}, ${data.email}, ${data.phone}, ${data.country}, ${data.city}, 
          ${data.noOfPersons}, ${data.assistance}, ${data.registerForEvent}, 
          ${parsedAmount}, ${parsedAmount}, ${currency},
          'PENDING', 'PENDING',
          ${refundAccepted}, ${now}, ${policyVersion},
          ${termsAccepted}, ${privacyAccepted}, 
          NOW()
        )
      `;
    } catch (dbErr: any) {
      console.error("Neon DB failed to save registration", dbErr);
      return NextResponse.json(
        {
          message: "Failed to save registration record to the database.",
          error: dbErr?.message || String(dbErr),
        },
        { status: 500 }
      );
    }

    // ── 5. Return Registration Reference for Payment Gateway ─────────────────
    return NextResponse.json(
      {
        success: true,
        id: registrationId,
        paymentStatus: "PENDING",
        donationAmount: parsedAmount,
        currency,
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: err.issues },
        { status: 422 }
      );
    }
    console.error("[POST /api/register]", err);
    return NextResponse.json(
      { message: "Server error", error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
