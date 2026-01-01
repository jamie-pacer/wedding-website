// Re-export auto-generated types from Supabase CLI
export type { Database, Tables, TablesInsert, TablesUpdate } from "./database.types";

// Convenience type aliases
export type Guest = Tables<"guests">;
export type RSVP = Tables<"rsvps">;
export type RSVPStats = Tables<"rsvp_stats">;

// Additional guest type for JSONB field
export interface AdditionalGuest {
  name: string;
  dietary_requirements: string;
}
