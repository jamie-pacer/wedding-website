-- Photos table for Live Moments feature
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by TEXT NOT NULL, -- Guest name
  caption TEXT,
  storage_path TEXT NOT NULL, -- Path in Supabase storage
  width INTEGER,
  height INTEGER
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos(created_at DESC);

-- Enable RLS
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view photos
CREATE POLICY "Allow public to view photos" ON photos
  FOR SELECT
  TO anon
  USING (true);

-- Allow anyone to upload photos (guests don't need to be authenticated)
CREATE POLICY "Allow public to insert photos" ON photos
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Allow admin full access to photos" ON photos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Note: You need to create a storage bucket called 'photos' in Supabase Dashboard
-- with the following policies:
-- 1. Allow public uploads: INSERT for anon users
-- 2. Allow public downloads: SELECT for anon users
-- 3. Allow admin full access: ALL for authenticated users

