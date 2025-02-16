import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const invoiceId = searchParams.get("invoiceId")

  if (!invoiceId) {
    return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 })
  }

  try {
    const invoice = await stripe.invoices.retrieve(invoiceId)

    // Generate a URL for the invoice PDF

    return NextResponse.json({ invoiceUrl: invoice.hosted_invoice_url })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

