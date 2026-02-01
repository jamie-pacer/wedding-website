-- Fix RSVP insert policy for anonymous users
-- This ensures anonymous users can submit RSVPs from the public form

-- Drop the policy if it exists (to avoid errors on recreation)
DROP POLICY IF EXISTS "Allow public to insert rsvps" ON rsvps;

-- Recreate the insert policy for anonymous users
CREATE POLICY "Allow public to insert rsvps" ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);
