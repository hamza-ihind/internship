import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  if (!process.env.STRIPE_PRICE_ID) {
    return NextResponse.json({ error: "STRIPE_PRICE_ID missing" }, { status: 500 });
  }
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?upgrade=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/dashboard?upgrade=cancel`,
  });
  return NextResponse.json({ id: session.id, url: session.url });
}