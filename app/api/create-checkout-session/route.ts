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
  price_1Qt20dQ4Dzd2J7XZpXGY6mqi: 35000, // $350 in cents
  price_1Qt2pJQ4Dzd2J7XZZ3lWA2nH: 30000, // $300 in cents
  price_1Qt2qdQ4Dzd2J7XZskl1HAfQ: 60000, // $600 in cents
  price_1Qt2uNQ4Dzd2J7XZ4QNUsSim: 40000, // $400 in cents
  price_1Qt2vnQ4Dzd2J7XZ9vCcgnBp: 25000, // $250 in cents
  price_1Qt2wvQ4Dzd2J7XZwrUxW1b2: 50000, // $500 in cents
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

