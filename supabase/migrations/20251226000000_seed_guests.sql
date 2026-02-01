-- Seed sample guest data for testing

INSERT INTO guests (name, email) VALUES
  ('Jacqui Shuttleworth', 'jacqui@example.com'),
  ('Greg Shuttleworth', 'greg@example.com'),
  ('Luke Shuttleworth', 'luke@example.com'),
  ('Alice McLachlan', 'alice@example.com')
ON CONFLICT DO NOTHING;

-- Allow anonymous users to search for guests (needed for RSVP autocomplete)
CREATE POLICY "Allow public to search guests" ON guests
  FOR SELECT
  TO anon
  USING (true);

