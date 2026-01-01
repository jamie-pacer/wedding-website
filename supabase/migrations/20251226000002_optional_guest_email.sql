-- Make email optional in guests table (will be filled during RSVP)
ALTER TABLE guests ALTER COLUMN email DROP NOT NULL;

-- Remove the unique constraint on email since it can be null
ALTER TABLE guests DROP CONSTRAINT IF EXISTS guests_email_key;

-- Update existing test guests to have null emails
UPDATE guests SET email = NULL;

-- Allow anon users to update guest email during RSVP
CREATE POLICY "Allow public to update guest email" ON guests
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

