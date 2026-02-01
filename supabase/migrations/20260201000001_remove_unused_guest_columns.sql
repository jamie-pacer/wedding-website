-- Remove unused columns from guests table
-- These columns were defined but never used in the application

ALTER TABLE guests DROP COLUMN IF EXISTS group_name;
ALTER TABLE guests DROP COLUMN IF EXISTS plus_one_allowed;

-- Drop the index on group_name if it exists
DROP INDEX IF EXISTS idx_guests_group;
