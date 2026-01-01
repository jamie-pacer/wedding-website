-- Allow public to delete photos (anyone can delete any photo for now)
-- This can be restricted later if needed

CREATE POLICY "Allow public to delete photos" ON photos
  FOR DELETE
  TO anon
  USING (true);

