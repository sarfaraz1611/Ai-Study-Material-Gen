import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { headers } from "next/headers";

export async function POST(req) {
  // const body = await req.text();
  // const signature = headers().get("stripe-signature");

  // let event;

  // try {
  //   event = Stripe.webhooks.constructEvent(
  //     body,
  //     signature,
  //     process.env.STRIPE_WEBHOOK_SECRET
  //   );
  // } catch (err) {
  //   return NextResponse.json(
  //     { error: `Webhook signature verification failed.` },
  //     { status: 400 }
  //   );
  // }

  // const session = event.data.object;

  // if (event.type === "checkout.session.completed") {
  //   // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
  //   const sessionWithLineItems = await Stripe.checkout.sessions.retrieve(
  //     session.id,
  //     {
  //       expand: ["line_items"],
  //     }
  //   }
  //   const lineItems = sessionWithLineItems.line_items;
  //   console.log(lineItems);
  // }

  return NextResponse.json({
    message: "Webhook endpoint - Stripe temporarily disabled",
  });
}
