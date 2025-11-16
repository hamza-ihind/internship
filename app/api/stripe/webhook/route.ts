import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }
  const body = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const email = session.customer_details?.email as string | undefined;
    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        await prisma.payment.create({
          data: {
            userId: user.id,
            stripeId: session.id,
            amount: session.amount_total ?? 0,
            currency: (session.currency ?? "mad").toUpperCase(),
            status: session.payment_status ?? "paid",
          },
        });
        await prisma.user.update({ where: { id: user.id }, data: { plan: "PRO" as any } });
      }
    }
  }
  return NextResponse.json({ received: true });
}