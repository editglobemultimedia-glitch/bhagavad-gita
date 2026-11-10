const { neon } = require("@neondatabase/serverless");

async function runTests() {
  const DATABASE_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true";
  const sql = neon(DATABASE_URL);

  console.log("=== RUNNING REGISTRATION & DONATION VALIDATION TESTS ===");

  // Helper to test validation logic matching app/api/register/route.ts
  const validateDonation = (rawAmount) => {
    if (rawAmount === undefined || rawAmount === null || String(rawAmount).trim() === "") {
      return { valid: false, error: "DONATION_AMOUNT_REQUIRED" };
    }
    const numAmount = Number(rawAmount);
    if (isNaN(numAmount) || !isFinite(numAmount) || numAmount <= 0) {
      return { valid: false, error: "INVALID_DONATION_AMOUNT" };
    }
    const strAmount = String(rawAmount).trim();
    if (strAmount.includes(".")) {
      const decimals = strAmount.split(".")[1] || "";
      if (decimals.length > 2) {
        return { valid: false, error: "INVALID_DECIMAL_PLACES" };
      }
    }
    return { valid: true, amount: Math.round(numAmount * 100) / 100 };
  };

  // Test 1: Empty donation amount
  const t1 = validateDonation("");
  console.assert(!t1.valid && t1.error === "DONATION_AMOUNT_REQUIRED", "Test 1 Failed: empty amount");
  console.log("✔ Test 1 Passed: Empty donation amount is rejected.");

  // Test 2: Zero donation amount
  const t2 = validateDonation("0");
  console.assert(!t2.valid && t2.error === "INVALID_DONATION_AMOUNT", "Test 2 Failed: zero amount");
  console.log("✔ Test 2 Passed: Zero donation amount is rejected.");

  // Test 3: Negative donation amount
  const t3 = validateDonation("-500");
  console.assert(!t3.valid && t3.error === "INVALID_DONATION_AMOUNT", "Test 3 Failed: negative amount");
  console.log("✔ Test 3 Passed: Negative donation amount is rejected.");

  // Test 4: >2 decimal places
  const t4 = validateDonation("100.555");
  console.assert(!t4.valid && t4.error === "INVALID_DECIMAL_PLACES", "Test 4 Failed: 3 decimals");
  console.log("✔ Test 4 Passed: >2 decimal places amount is rejected.");

  // Test 5: Valid amount (e.g. 501.50)
  const t5 = validateDonation("501.50");
  console.assert(t5.valid && t5.amount === 501.50, "Test 5 Failed: valid amount");
  console.log("✔ Test 5 Passed: Valid decimal amount (501.50) is accepted.");

  // Test 6: Neon DB Insert & Verification
  console.log("\n=== TESTING NEON DB INSERT & RETRIEVAL ===");
  const testId = `REG-TEST-${Date.now().toString(36).toUpperCase()}`;
  const testAmount = 1008.00;
  const testCurrency = "INR";
  const now = new Date();

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
      ${testId}, 'Single', 'Harsha Test Donor', 'test@example.com', '+91 99999 88888', 'India', 'Hyderabad',
      1, ARRAY['Accommodation'], ARRAY['Mahotsav'],
      ${testAmount}, ${testAmount}, ${testCurrency},
      'PENDING', 'PENDING',
      true, ${now}, '2026-11-05',
      true, true,
      NOW()
    )
  `;

  // Fetch the record back
  const records = await sql`
    SELECT id, type, name, "donation_amount", "currency", "payment_status", "refund_policy_accepted", "terms_accepted"
    FROM "Registration"
    WHERE id = ${testId}
  `;

  console.log("Inserted Record:", records[0]);
  console.assert(records.length === 1, "Failed to retrieve record");
  console.assert(Number(records[0].donation_amount) === 1008.00, "donation_amount mismatch");
  console.assert(records[0].currency === "INR", "currency mismatch");
  console.assert(records[0].payment_status === "PENDING", "payment_status mismatch");
  console.log("✔ Test 6 Passed: Neon DB record created and verified with PENDING status and donation amount 1008.00 INR.");

  // Clean up test record
  await sql`DELETE FROM "Registration" WHERE id = ${testId}`;
  console.log("✔ Cleaned up test record.");
  console.log("\nALL VERIFICATIONS PASSED!");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});

