import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Retrieve the invoice associated with the session
    const invoice = await stripe.invoices.retrieve(session.invoice as string);

    // Check if the invoice has a hosted PDF URL
    if (!invoice.hosted_invoice_url) {
      return NextResponse.json(
        { error: "Invoice PDF is not available" },
        { status: 404 }
      );
    }

    // Return the hosted invoice URL
    return NextResponse.json({ invoiceUrl: invoice.hosted_invoice_url });
  } catch (err) {
    console.error("Error retrieving invoice:", err);

    // Handle Stripe-specific errors
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: "Failed to retrieve invoice. Please check the session ID.",
          details: err.message,
        },
        { status: 400 }
      );
    }

    // Handle generic errors
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}