-- Contributions table (for tracking honeymoon fund contributions)
CREATE TABLE IF NOT EXISTS contributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  contributor_name TEXT,
  message TEXT,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contributions_status ON contributions(status);
CREATE INDEX IF NOT EXISTS idx_contributions_stripe_session ON contributions(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_contributions_created_at ON contributions(created_at);

-- Enable RLS on contributions table
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (admin) to view all contributions
CREATE POLICY "Allow admin to view all contributions" ON contributions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admin) to update contributions
CREATE POLICY "Allow admin to update contributions" ON contributions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admin) to delete contributions
CREATE POLICY "Allow admin to delete contributions" ON contributions
  FOR DELETE
  TO authenticated
  USING (true);

-- Allow service role (webhook) to insert contributions
CREATE POLICY "Allow service role to insert contributions" ON contributions
  FOR INSERT
  TO service_role
  WITH CHECK (true);
