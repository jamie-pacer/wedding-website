-- Wedding Website Database Schema

-- Guests table (for tracking invited guests)
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  group_name TEXT NOT NULL DEFAULT 'General',
  plus_one_allowed BOOLEAN DEFAULT false
);

-- RSVPs table (for tracking responses)
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending TEXT NOT NULL CHECK (attending IN ('yes', 'no')),
  guest_count INTEGER DEFAULT 1,
  dietary_requirements TEXT,
  song_request TEXT,
  message TEXT,
  additional_guests JSONB DEFAULT '[]'::jsonb
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_rsvps_email ON rsvps(email);
CREATE INDEX IF NOT EXISTS idx_rsvps_attending ON rsvps(attending);
CREATE INDEX IF NOT EXISTS idx_guests_email ON guests(email);
CREATE INDEX IF NOT EXISTS idx_guests_group ON guests(group_name);

-- Row Level Security (RLS) Policies

-- Enable RLS on tables
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Guests table policies
-- Allow authenticated users (admin) to do everything
CREATE POLICY "Allow admin full access to guests" ON guests
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RSVPs table policies
-- Allow anyone to insert RSVPs (public form submission)
CREATE POLICY "Allow public to insert rsvps" ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admin) to view all RSVPs
CREATE POLICY "Allow admin to view all rsvps" ON rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admin) to update RSVPs
CREATE POLICY "Allow admin to update rsvps" ON rsvps
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admin) to delete RSVPs
CREATE POLICY "Allow admin to delete rsvps" ON rsvps
  FOR DELETE
  TO authenticated
  USING (true);

-- Create a view for RSVP statistics
CREATE OR REPLACE VIEW rsvp_stats AS
SELECT
  COUNT(*) FILTER (WHERE attending = 'yes') as attending_count,
  COUNT(*) FILTER (WHERE attending = 'no') as declined_count,
  (SELECT COUNT(*) FROM guests) - COUNT(*) as pending_count,
  SUM(guest_count) FILTER (WHERE attending = 'yes') as total_guests
FROM rsvps;

-- Grant access to the view
GRANT SELECT ON rsvp_stats TO authenticated;

