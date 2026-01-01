-- Add trigram index on guests.name for efficient ILIKE pattern matching
-- This optimizes the RSVP autofill search functionality

-- Enable pg_trgm extension for trigram support
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN index on guests.name using trigram similarity
-- This makes ILIKE queries with %pattern% much faster
CREATE INDEX IF NOT EXISTS idx_guests_name_trgm ON guests USING gin (name gin_trgm_ops);

