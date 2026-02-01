# Stripe Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Get Your Stripe Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Click "Reveal test key" and copy your **Secret key** (starts with `sk_test_`)

### 2. Add Keys to .env.local

Create/edit `.env.local` in your project root:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Test Your Setup

```bash
npm run test:stripe
```

This will verify your configuration is correct.

### 4. Start Development Server

```bash
npm run dev
```

### 5. Test a Payment

1. Go to http://localhost:3000/registry
2. Select an amount (e.g., R100)
3. Click "Contribute"
4. Use test card: **4242 4242 4242 4242**
5. Use any future expiry date, any CVC, any ZIP
6. Complete the payment
7. You should see the success page!

### 6. Verify in Stripe Dashboard

Go to https://dashboard.stripe.com/test/payments to see your test payment.

## 📝 For Vercel Deployment

In your Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_your_key
STRIPE_SECRET_KEY = sk_test_your_key
NEXT_PUBLIC_BASE_URL = https://your-domain.vercel.app
```

**Important:** Change `NEXT_PUBLIC_BASE_URL` to your actual Vercel URL!

## 🎯 Test Cards

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Declined |
| 4000 0000 0000 9995 | ⏱️ Insufficient funds |

## 🔴 Going Live

When ready for real payments:

1. Complete Stripe account activation
2. Switch to **Live mode** in Stripe Dashboard
3. Get your live keys (start with `pk_live_` and `sk_live_`)
4. Update environment variables in Vercel
5. Test with a small real payment

## 📚 More Info

See `STRIPE_SETUP.md` for detailed documentation.

## ❓ Troubleshooting

**"Failed to create checkout session"**
- Check your `STRIPE_SECRET_KEY` is set correctly
- Make sure it starts with `sk_test_` or `sk_live_`

**Redirect not working after payment**
- Verify `NEXT_PUBLIC_BASE_URL` is correct
- No trailing slash!
- For Vercel: use your full domain

**Environment variables not loading**
- Restart your dev server after changing `.env.local`
- In Vercel, redeploy after changing variables

## ✅ What's Already Done

Your Stripe integration is **fully implemented**! Here's what's working:

- ✅ Checkout API route (`/api/checkout`)
- ✅ Stripe client library setup
- ✅ Payment form with amount selection
- ✅ Success page after payment
- ✅ Error handling
- ✅ Contributor name & message tracking
- ✅ ZAR currency support

**You just need to add your API keys and test it!**
