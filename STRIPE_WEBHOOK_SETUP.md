# Stripe Webhook Setup Guide

This guide explains how to set up Stripe webhooks to save honeymoon fund contributions to your database.

## What Was Added

1. **Database Table**: A new `contributions` table to store payment information
2. **Webhook Endpoint**: `/api/webhook` to receive Stripe payment events
3. **Type Definitions**: TypeScript types for the contributions table

## Setup Instructions

### 1. Run Database Migration

Apply the new migration to create the contributions table:

```bash
# If using Supabase locally
supabase db push

# Or apply the migration file manually in your Supabase dashboard
```

The migration file is located at: `supabase/migrations/20260201000003_contributions.sql`

### 2. Set Environment Variable

Add your Stripe webhook secret to your environment variables:

```bash
# .env.local
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Configure Stripe Webhook

#### For Local Development (using Stripe CLI):

1. Install the Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe CLI:
   ```bash
   stripe login
   ```
3. Forward webhook events to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
4. The CLI will display your webhook signing secret - add it to `.env.local`

#### For Production:

1. Go to your Stripe Dashboard: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/webhook`
4. Select events to listen to:
   - `checkout.session.completed` (required)
   - `checkout.session.expired` (optional)
5. Copy the webhook signing secret and add it to your production environment variables

### 4. Test the Integration

1. Make a test contribution through your website
2. Check your Supabase database - you should see a new row in the `contributions` table
3. Check your Stripe webhook logs to ensure events are being received

## What Gets Saved

For each successful payment, the following information is saved:

- **stripe_session_id**: Unique Stripe checkout session ID
- **stripe_payment_intent_id**: Stripe payment intent ID
- **contributor_name**: Name provided by the contributor (or "Anonymous")
- **message**: Personal message from the contributor
- **amount**: Contribution amount in ZAR
- **currency**: Currency code (ZAR)
- **status**: Payment status (completed, pending, failed, or refunded)
- **created_at**: Timestamp of when the payment was made

## Viewing Contributions

You can query contributions in your Supabase dashboard or through the Supabase client:

```typescript
const { data, error } = await supabase
  .from('contributions')
  .select('*')
  .order('created_at', { ascending: false });
```

## Security Notes

- The webhook endpoint uses Stripe signature verification to ensure requests are genuine
- Database access uses Supabase service role key (set in SUPABASE_SERVICE_ROLE_KEY)
- Only authenticated admin users can view contributions through the database policies
- The webhook endpoint is the only way to insert new contributions (via service_role policy)

## Troubleshooting

If contributions aren't being saved:

1. Check your Stripe webhook logs for delivery failures
2. Verify your `STRIPE_WEBHOOK_SECRET` is correct
3. Check your application logs for errors
4. Ensure your Supabase service role key is set correctly
5. Verify the database migration was applied successfully
