// Import types from database.types
import type { Database, Tables, TablesInsert, TablesUpdate } from "./database.types";

// Re-export auto-generated types from Supabase CLI
export type { Database, Tables, TablesInsert, TablesUpdate };

// Convenience type aliases
export type Guest = Tables<"guests">;
export type RSVP = Tables<"rsvps">;
export type RSVPStats = Tables<"rsvp_stats">;
export type Contribution = Tables<"contributions">;

// Additional guest type for JSONB field
export interface AdditionalGuest {
  name: string;
  dietary_requirements: string;
}
