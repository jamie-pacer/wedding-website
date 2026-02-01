import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(request: NextRequest) {
  try {
    const { amount, contributorName, message } = await request.json();

    // Validate amount (minimum R10)
    if (!amount || amount < 10) {
      return NextResponse.json(
        { error: "Minimum contribution is R10" },
        { status: 400 }
      );
    }

    // Validate BASE_URL is set
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.error("NEXT_PUBLIC_BASE_URL is not set");
      return NextResponse.json(
        { error: "Server configuration error: BASE_URL not set" },
        { status: 500 }
      );
    }

    // Log for debugging (remove in production)
    console.log("Creating checkout session for amount:", amount);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "zar",
            product_data: {
              name: "Honeymoon Fund Contribution",
              description: contributorName 
                ? `From: ${contributorName}${message ? ` - "${message}"` : ""}`
                : "A generous gift for the newlyweds",
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/registry`,
      metadata: {
        contributorName: contributorName || "Anonymous",
        message: message || "",
        amount: amount.toString(),
      },
    });

    console.log("Checkout session created successfully:", session.id);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error details:", error);
    
    // Return more specific error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { 
        error: "Failed to create checkout session",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
