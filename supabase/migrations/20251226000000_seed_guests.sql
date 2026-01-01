-- Seed sample guest data for testing

INSERT INTO guests (name, email, group_name, plus_one_allowed) VALUES
  ('Jacqui Shuttleworth', 'jacqui@example.com', 'Shuttleworth Family', true),
  ('Greg Shuttleworth', 'greg@example.com', 'Shuttleworth Family', true),
  ('Luke Shuttleworth', 'luke@example.com', 'Shuttleworth Family', false),
  ('Alice McLachlan', 'alice@example.com', 'Friends', true)
ON CONFLICT (email) DO NOTHING;

-- Allow anonymous users to search for guests (needed for RSVP autocomplete)
CREATE POLICY "Allow public to search guests" ON guests
  FOR SELECT
  TO anon
  USING (true);

