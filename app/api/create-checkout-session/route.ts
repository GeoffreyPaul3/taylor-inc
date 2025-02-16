import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
})

const PRICE_ID_TO_AMOUNT = {
  price_1234567890: 35000, // $350 in cents
  price_2345678901: 30000, // $300 in cents
  price_3456789012: 60000, // $600 in cents
  price_4567890123: 40000, // $400 in cents
  price_5678901234: 25000, // $250 in cents
  price_6789012345: 50000, // $500 in cents
}

export async function POST(request: Request) {
  try {
    const { priceId, email } = await request.json()

    if (!PRICE_ID_TO_AMOUNT[priceId as keyof typeof PRICE_ID_TO_AMOUNT]) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 })
    }

    const amount = PRICE_ID_TO_AMOUNT[priceId as keyof typeof PRICE_ID_TO_AMOUNT]

    // Create a customer
    const customer = await stripe.customers.create({
      email: email,
    })

    // Create an invoice item
    await stripe.invoiceItems.create({
      customer: customer.id,
      amount: amount,
      currency: "usd",
      description: "Service Payment",
    })

    // Create an invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: true, // Auto-finalize the invoice
    })

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Service",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/payment/failed`,
    })

    return NextResponse.json({ sessionId: session.id, invoiceId: invoice.id })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

