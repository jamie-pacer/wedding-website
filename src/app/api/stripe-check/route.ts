import { NextResponse } from "next/server";

/**
 * Diagnostic endpoint to check Stripe configuration
 * Visit /api/stripe-check to see if your environment variables are set
 * Remove this file in production!
 */
export async function GET() {
  const checks = {
    stripeSecretKey: {
      set: !!process.env.STRIPE_SECRET_KEY,
      startsWithSk: process.env.STRIPE_SECRET_KEY?.startsWith("sk_"),
      isTest: process.env.STRIPE_SECRET_KEY?.includes("_test_"),
      prefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) || "not set",
    },
    stripePublishableKey: {
      set: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      startsWithPk: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_"),
      isTest: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes("_test_"),
      prefix: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 7) || "not set",
    },
    baseUrl: {
      set: !!process.env.NEXT_PUBLIC_BASE_URL,
      value: process.env.NEXT_PUBLIC_BASE_URL || "not set",
    },
    nodeEnv: process.env.NODE_ENV,
  };

  const allGood = 
    checks.stripeSecretKey.set &&
    checks.stripeSecretKey.startsWithSk &&
    checks.stripePublishableKey.set &&
    checks.stripePublishableKey.startsWithPk &&
    checks.baseUrl.set;

  return NextResponse.json({
    status: allGood ? "✅ Configuration looks good!" : "❌ Configuration issues found",
    checks,
    recommendations: {
      stripeSecretKey: checks.stripeSecretKey.set && checks.stripeSecretKey.startsWithSk
        ? "✅ Set correctly"
        : "❌ Set STRIPE_SECRET_KEY in .env.local (should start with sk_test_ or sk_live_)",
      stripePublishableKey: checks.stripePublishableKey.set && checks.stripePublishableKey.startsWithPk
        ? "✅ Set correctly"
        : "❌ Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local (should start with pk_test_ or pk_live_)",
      baseUrl: checks.baseUrl.set
        ? "✅ Set correctly"
        : "❌ Set NEXT_PUBLIC_BASE_URL in .env.local (e.g., http://localhost:3000)",
    },
  });
}
