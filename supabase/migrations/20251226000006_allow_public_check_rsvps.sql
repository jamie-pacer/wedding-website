-- Allow anonymous users to check if a guest has already submitted an RSVP
-- This is needed for the RSVP form to show "RSVP Sent" status
CREATE POLICY "Allow public to check RSVP status" ON rsvps
  FOR SELECT
  TO anon
  USING (true);

