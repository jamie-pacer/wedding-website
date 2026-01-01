-- Drop existing policy if it exists and recreate
DROP POLICY IF EXISTS "Allow public to search guests" ON guests;

-- Allow anonymous users to search for guests (needed for RSVP autocomplete)
CREATE POLICY "Allow public to search guests" ON guests
  FOR SELECT
  TO anon
  USING (true);

