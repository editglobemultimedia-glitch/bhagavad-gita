async function test() {
  console.log('Testing live dev server endpoints...');

  // 1. Missing donation amount
  let res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      registrationType: 'Single',
      name: 'Dev Server Test',
      phone: '+91 98765 43210',
      country: 'India',
      city: 'Hyderabad',
      registerForEvent: ['Mahotsav'],
      consentAccepted: true,
      refund_policy_accepted: true,
      terms_accepted: true,
      privacy_policy_accepted: true,
    })
  });
  let json = await res.json();
  console.log('1. Missing donation amount -> status:', res.status, json);
  console.assert(res.status === 422, 'Status should be 422');

  // 2. Zero donation amount
  res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      registrationType: 'Single',
      name: 'Dev Server Test',
      phone: '+91 98765 43210',
      country: 'India',
      city: 'Hyderabad',
      donationAmount: 0,
      registerForEvent: ['Mahotsav'],
      consentAccepted: true,
      refund_policy_accepted: true,
      terms_accepted: true,
      privacy_policy_accepted: true,
    })
  });
  json = await res.json();
  console.log('2. Zero donation amount -> status:', res.status, json);
  console.assert(res.status === 422, 'Status should be 422');

  // 3. Negative donation amount
  res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      registrationType: 'Single',
      name: 'Dev Server Test',
      phone: '+91 98765 43210',
      country: 'India',
      city: 'Hyderabad',
      donationAmount: -250,
      registerForEvent: ['Mahotsav'],
      consentAccepted: true,
      refund_policy_accepted: true,
      terms_accepted: true,
      privacy_policy_accepted: true,
    })
  });
  json = await res.json();
  console.log('3. Negative donation amount -> status:', res.status, json);
  console.assert(res.status === 422, 'Status should be 422');

  // 4. Invalid decimal places (>2)
  res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      registrationType: 'Single',
      name: 'Dev Server Test',
      phone: '+91 98765 43210',
      country: 'India',
      city: 'Hyderabad',
      donationAmount: '100.999',
      registerForEvent: ['Mahotsav'],
      consentAccepted: true,
      refund_policy_accepted: true,
      terms_accepted: true,
      privacy_policy_accepted: true,
    })
  });
  json = await res.json();
  console.log('4. Invalid decimal places -> status:', res.status, json);
  console.assert(res.status === 422, 'Status should be 422');

  // 5. Valid donation amount (501.00)
  res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      registrationType: 'Single',
      name: 'Dev Server Test Valid',
      email: 'validtest@example.com',
      phone: '+91 98765 43210',
      country: 'India',
      city: 'Hyderabad',
      donationAmount: '501.00',
      registerForEvent: ['Mahotsav'],
      consentAccepted: true,
      refund_policy_accepted: true,
      terms_accepted: true,
      privacy_policy_accepted: true,
    })
  });
  json = await res.json();
  console.log('5. Valid registration submission -> status:', res.status, json);
  console.assert(res.status === 201 && json.success === true, 'Registration must succeed with 201');
  console.assert(json.paymentStatus === 'PENDING', 'Payment status must be PENDING');
  console.assert(json.donationAmount === 501, 'Donation amount must match');

  // 6. Test GET /payment
  const payRes = await fetch('http://localhost:3000/payment?ref=' + json.id);
  const payHtml = await payRes.text();
  console.log('6. GET /payment status:', payRes.status, 'HTML length:', payHtml.length);
  console.assert(payRes.status === 200, 'Payment page must return 200');

  // 7. Verify in Neon DB
  const { neon } = require('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true');
  const rows = await sql`SELECT id, name, donation_amount, currency, payment_status FROM "Registration" WHERE id = ${json.id}`;
  console.log('7. Verified in Neon DB directly:', rows[0]);
  console.assert(rows.length === 1, 'Record must exist in DB');
  console.assert(rows[0].payment_status === 'PENDING', 'DB payment_status must be PENDING');
  console.assert(Number(rows[0].donation_amount) === 501.00, 'DB donation_amount must be 501.00');

  // Clean up
  await sql`DELETE FROM "Registration" WHERE id = ${json.id}`;
  console.log('8. Cleaned up verification record from Neon DB.');
  console.log('\nALL 8 TESTS PASSED ON LIVE RUNNING DEV SERVER!');
}
test().catch(e => { console.error(e); process.exit(1); });

