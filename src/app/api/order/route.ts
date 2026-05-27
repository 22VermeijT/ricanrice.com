import { NextRequest, NextResponse } from "next/server";

// TODO: install resend → `npm i resend`
// TODO: add RESEND_API_KEY to .env.local
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = "ricanricecatering@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderType, name, phone, email, notes, ...rest } = body;

    if (!name || !phone || !email || !notes) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject =
      orderType === "lunch"
        ? `🍚 New Lunch Order from ${name}`
        : `🎉 New Catering Inquiry from ${name}`;

    const details =
      orderType === "lunch"
        ? `Pickup Day: ${rest.pickupDay}\nQuantity: ${rest.lunchQty}`
        : `Event Date: ${rest.eventDate}\nGuests: ${rest.guestCount}\nEvent Type: ${rest.eventType}\nService: ${rest.serviceType}\nVenue: ${rest.venue}\nBudget: ${rest.budget}`;

    const text = [
      `Order Type: ${orderType}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      details,
      `Notes: ${notes}`,
    ].join("\n");

    // ── Send with Resend (uncomment when API key is ready) ──────────────────
    // await resend.emails.send({
    //   from: "orders@ricanrice.com",   // must be a verified Resend sender domain
    //   to: OWNER_EMAIL,
    //   replyTo: email,
    //   subject,
    //   text,
    // });
    // ────────────────────────────────────────────────────────────────────────

    // Temporary: log until email is wired up
    console.log("📬 New order submission:", { subject, text, to: OWNER_EMAIL });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
