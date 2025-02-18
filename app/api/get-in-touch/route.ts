import { NextResponse } from "next/server";
import { Resend } from "resend";

// Check if the API key is present
if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set in environment variables.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message, service } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Taylor Inc <info@taylorinsightgroup.com>",
      to: ["info@taylorinsightgroup.com"], // Replace with your email
      subject: `New Get in Touch Request: ${service}`,
      html: `
        <h1>New Get in Touch Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}