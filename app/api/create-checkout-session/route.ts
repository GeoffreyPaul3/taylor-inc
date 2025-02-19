import { NextResponse } from "next/server";
import Stripe from "stripe";

// Ensure the API key is available
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables.");
}

// Initialize Stripe with the latest stable API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
});

const PRICE_ID_TO_AMOUNT: Record<string, number> = {
  price_1Qu8ZxQ4Dzd2J7XZc2990Cvbi: 100000, // $1000 in cents
  price_1Qu8dTQ4Dzd2J7XZFb0FxbR1:  150000, // $1500 in cents
  price_1Qu8edQ4Dzd2J7XZqgJNPUq4:  19900, // $199 in cents
  price_1Qu8iYQ4Dzd2J7XZxAkRZXMG:  24900, // $249 in cents
};

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    console.log("Received request:", body);

    const { priceId, email } = body;

    // Validate request fields
    if (!priceId || !email) {
      return NextResponse.json(
        { error: "Missing required fields: priceId or email" },
        { status: 400 }
      );
    }

    if (!PRICE_ID_TO_AMOUNT[priceId]) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    const amount = PRICE_ID_TO_AMOUNT[priceId];

    console.log(`Creating Stripe customer for email: ${email}`);

    // Create a Stripe customer
    const customer = await stripe.customers.create({ email });

    console.log(`Customer created: ${customer.id}`);

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Service Payment" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/payment/failed`,
    });

    console.log(`Checkout session created: ${session.id}`);

    return NextResponse.json({ sessionId: session.id });
  } catch (err: unknown) {
    console.error("Error creating checkout session:", err);

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

