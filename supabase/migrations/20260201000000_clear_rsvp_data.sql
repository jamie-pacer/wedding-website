-- Clear all RSVP data
-- This migration removes all existing RSVP records in preparation for fresh data upload

-- Delete all records from the rsvps table
TRUNCATE TABLE rsvps;
