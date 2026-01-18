-- Shuttle Bookings table
CREATE TABLE IF NOT EXISTS shuttle_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  passenger_count INTEGER NOT NULL DEFAULT 1,
  pickup_location TEXT NOT NULL,
  collect_time TEXT NOT NULL DEFAULT '14:00',
  return_time TEXT NOT NULL,
  confirmed BOOLEAN DEFAULT false
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_shuttle_bookings_email ON shuttle_bookings(email);
CREATE INDEX IF NOT EXISTS idx_shuttle_bookings_pickup ON shuttle_bookings(pickup_location);

-- Enable RLS
ALTER TABLE shuttle_bookings ENABLE ROW LEVEL SECURITY;

-- Allow public to insert shuttle bookings
CREATE POLICY "Allow public to insert shuttle bookings" ON shuttle_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admin) to view all shuttle bookings
CREATE POLICY "Allow admin to view shuttle bookings" ON shuttle_bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admin) to update shuttle bookings
CREATE POLICY "Allow admin to update shuttle bookings" ON shuttle_bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admin) to delete shuttle bookings
CREATE POLICY "Allow admin to delete shuttle bookings" ON shuttle_bookings
  FOR DELETE
  TO authenticated
  USING (true);

