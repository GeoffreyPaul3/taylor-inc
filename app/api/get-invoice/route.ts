import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invoiceId = searchParams.get("invoiceId");

  if (!invoiceId) {
    return NextResponse.json(
      { error: "Invoice ID is required" },
      { status: 400 }
    );
  }

  try {
    // Retrieve the invoice from Stripe
    const invoice = await stripe.invoices.retrieve(invoiceId);

    // Check if the invoice has a hosted PDF URL
    if (!invoice.hosted_invoice_url) {
      return NextResponse.json(
        { error: "Invoice PDF is not available" },
        { status: 404 }
      );
    }

    // Fetch the PDF file from the hosted URL
    const pdfResponse = await fetch(invoice.hosted_invoice_url);

    if (!pdfResponse.ok) {
      throw new Error("Failed to fetch the invoice PDF");
    }

    // Convert the PDF response to a buffer
    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Return the PDF file as a downloadable response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${invoiceId}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Error retrieving invoice:", err);

    // Handle Stripe-specific errors
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: "Failed to retrieve invoice. Please check the invoice ID.",
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
