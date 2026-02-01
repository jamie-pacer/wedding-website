# Stripe Integration Setup Guide

This guide will help you set up Stripe payments for the honeymoon fund on your wedding website.

## Prerequisites

- A Stripe account (sign up at https://stripe.com)
- Access to your Stripe Dashboard
- Environment variables configured in both local and Vercel

## Step 1: Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Click on **Developers** in the left sidebar
3. Click on **API keys**
4. You'll see two types of keys:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode)

### For Testing (Recommended to start)
- Use **Test mode** keys (toggle in top right of dashboard)
- Test keys start with `pk_test_` and `sk_test_`

### For Production (When ready to go live)
- Switch to **Live mode** in Stripe Dashboard
- Use live keys (start with `pk_live_` and `sk_live_`)

## Step 2: Configure Environment Variables

### Local Development (.env.local)

Create or update your `.env.local` file with:

```bash
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Base URL (for local development)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Vercel Production

You've already added the Stripe keys to Vercel. Make sure you also have:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/verify these variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_... (or pk_live_... for production)
STRIPE_SECRET_KEY = sk_test_... (or sk_live_... for production)
NEXT_PUBLIC_BASE_URL = https://your-domain.vercel.app
```

**Important:** Update `NEXT_PUBLIC_BASE_URL` to your actual Vercel domain!

## Step 3: Test the Integration

### Using Stripe Test Cards

When in test mode, use these test card numbers:

#### Successful Payment
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., 12/34)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any 5 digits (e.g., 12345)

#### Declined Payment (for testing error handling)
- **Card Number:** `4000 0000 0000 0002`
- **Expiry:** Any future date
- **CVC:** Any 3 digits
- **ZIP:** Any 5 digits

### Testing Locally

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/registry`

3. Select an amount or enter a custom amount

4. Optionally add your name and message

5. Click the "Contribute" button

6. You'll be redirected to Stripe's checkout page

7. Use a test card to complete the payment

8. You should be redirected to `/registry/success`

## Step 4: Verify Payments in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click on **Payments** in the left sidebar
3. You should see your test payments listed
4. Click on a payment to see details including:
   - Amount
   - Contributor name (in metadata)
   - Message (in metadata)

## How It Works

### Payment Flow

1. **User selects amount** → Registry page (`/registry`)
2. **Clicks contribute** → API call to `/api/checkout`
3. **Server creates session** → Stripe Checkout Session created
4. **User redirected** → Stripe's hosted checkout page
5. **User pays** → Stripe processes payment
6. **Success redirect** → Back to `/registry/success`

### Security

- ✅ Secret key is server-side only (never exposed to browser)
- ✅ Publishable key is safe to expose (client-side)
- ✅ Stripe handles all payment processing (PCI compliant)
- ✅ No card details ever touch your server

## Currency

The integration is configured for **South African Rand (ZAR)**.

To change currency, edit `/src/app/api/checkout/route.ts`:

```typescript
currency: "zar",  // Change to "usd", "gbp", "eur", etc.
```

## Troubleshooting

### "Minimum contribution is R10" error
- Ensure the amount is at least 10 (R10)

### "Failed to create checkout session" error
- Check that `STRIPE_SECRET_KEY` is set correctly
- Verify the key starts with `sk_test_` or `sk_live_`
- Check server logs for detailed error messages

### Redirect issues after payment
- Verify `NEXT_PUBLIC_BASE_URL` is set correctly
- For Vercel, it should be your full domain (e.g., `https://your-site.vercel.app`)
- No trailing slash

### Environment variables not working
- Restart your development server after changing `.env.local`
- In Vercel, redeploy after changing environment variables

## Going Live

When you're ready to accept real payments:

1. **Complete Stripe account setup**
   - Verify your business details
   - Add bank account for payouts
   - Complete any required verification

2. **Switch to live keys**
   - In Stripe Dashboard, toggle to **Live mode**
   - Copy your live API keys
   - Update environment variables in Vercel:
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
     - `STRIPE_SECRET_KEY` → `sk_live_...`

3. **Test with a real card** (small amount)
   - Make a small test contribution
   - Verify it appears in your Stripe Dashboard
   - Check the payout schedule

4. **Monitor payments**
   - Check Stripe Dashboard regularly
   - Set up email notifications in Stripe settings

## Support

- **Stripe Documentation:** https://stripe.com/docs
- **Stripe Support:** https://support.stripe.com
- **Test Cards:** https://stripe.com/docs/testing

## Current Implementation Status

✅ Stripe checkout session API route configured
✅ Client-side Stripe integration ready
✅ Success page configured
✅ Error handling implemented
✅ Metadata tracking (contributor name, message)
✅ ZAR currency configured
✅ Minimum amount validation (R10)

## Next Steps

1. Add your actual Stripe API keys to `.env.local`
2. Update `NEXT_PUBLIC_BASE_URL` in Vercel to your production domain
3. Test with Stripe test cards
4. When ready, switch to live keys and go live!
