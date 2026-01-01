"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronDown,
  Mail,
  Eye
} from "lucide-react";

// Mock data - will be replaced with Supabase queries
const mockRsvps = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    email: "sarah@example.com",
    status: "attending", 
    guests: 2, 
    dietaryRequirements: "Vegetarian",
    songRequest: "Dancing Queen",
    message: "So excited for your big day!",
    submittedAt: "2024-09-15T10:30:00" 
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    email: "michael@example.com",
    status: "attending", 
    guests: 1, 
    dietaryRequirements: "",
    songRequest: "",
    message: "",
    submittedAt: "2024-09-14T15:45:00" 
  },
  { 
    id: 3, 
    name: "Emma Williams", 
    email: "emma@example.com",
    status: "declined", 
    guests: 0, 
    dietaryRequirements: "",
    songRequest: "",
    message: "Sorry we can't make it, will be traveling.",
    submittedAt: "2024-09-14T09:20:00" 
  },
  { 
    id: 4, 
    name: "David Brown", 
    email: "david@example.com",
    status: "attending", 
    guests: 3, 
    dietaryRequirements: "Gluten-free",
    songRequest: "September",
    message: "Can't wait to celebrate with you both!",
    submittedAt: "2024-09-13T14:00:00" 
  },
  { 
    id: 5, 
    name: "Lisa Anderson", 
    email: "lisa@example.com",
    status: "pending", 
    guests: 0, 
    dietaryRequirements: "",
    songRequest: "",
    message: "",
    submittedAt: "" 
  },
  { 
    id: 6, 
    name: "James Wilson", 
    email: "james.w@example.com",
    status: "attending", 
    guests: 2, 
    dietaryRequirements: "Nut allergy",
    songRequest: "",
    message: "Congratulations!",
    submittedAt: "2024-09-12T11:15:00" 
  },
  { 
    id: 7, 
    name: "Sophie Taylor", 
    email: "sophie@example.com",
    status: "pending", 
    guests: 0, 
    dietaryRequirements: "",
    songRequest: "",
    message: "",
    submittedAt: "" 
  },
  { 
    id: 8, 
    name: "Robert Martinez", 
    email: "robert@example.com",
    status: "attending", 
    guests: 1, 
    dietaryRequirements: "",
    songRequest: "Sweet Caroline",
    message: "",
    submittedAt: "2024-09-11T16:30:00" 
  },
];

type StatusFilter = "all" | "attending" | "declined" | "pending";

export default function RSVPsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedRsvp, setSelectedRsvp] = useState<typeof mockRsvps[0] | null>(null);

  const filteredRsvps = mockRsvps.filter((rsvp) => {
    const matchesSearch = rsvp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rsvp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || rsvp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    attending: mockRsvps.filter(r => r.status === "attending").length,
    declined: mockRsvps.filter(r => r.status === "declined").length,
    pending: mockRsvps.filter(r => r.status === "pending").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-charcoal)]">
            RSVP Management
          </h1>
          <p className="text-[var(--color-warm-gray)] mt-1">
            Track and manage guest responses
          </p>
        </div>
        <button className="btn-secondary flex items-center gap-2 self-start">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setStatusFilter(statusFilter === "attending" ? "all" : "attending")}
          className={`card p-4 text-center transition-all ${
            statusFilter === "attending" ? "ring-2 ring-green-500" : ""
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--color-charcoal)]">
              {stats.attending}
            </span>
          </div>
          <p className="text-sm text-[var(--color-warm-gray)]">Attending</p>
        </button>
        <button
          onClick={() => setStatusFilter(statusFilter === "declined" ? "all" : "declined")}
          className={`card p-4 text-center transition-all ${
            statusFilter === "declined" ? "ring-2 ring-red-400" : ""
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--color-charcoal)]">
              {stats.declined}
            </span>
          </div>
          <p className="text-sm text-[var(--color-warm-gray)]">Declined</p>
        </button>
        <button
          onClick={() => setStatusFilter(statusFilter === "pending" ? "all" : "pending")}
          className={`card p-4 text-center transition-all ${
            statusFilter === "pending" ? "ring-2 ring-amber-500" : ""
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-amber-500" />
            <span className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--color-charcoal)]">
              {stats.pending}
            </span>
          </div>
          <p className="text-sm text-[var(--color-warm-gray)]">Pending</p>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)]" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-light-gray)] rounded-lg bg-white"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="appearance-none pl-4 pr-10 py-2.5 border border-[var(--color-light-gray)] rounded-lg bg-white cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="attending">Attending</option>
              <option value="declined">Declined</option>
              <option value="pending">Pending</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-ivory)] border-b border-[var(--color-light-gray)]">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--color-charcoal)]">
                  Guest
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--color-charcoal)]">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--color-charcoal)]">
                  Guests
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--color-charcoal)]">
                  Dietary
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--color-charcoal)]">
                  Submitted
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-[var(--color-charcoal)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-light-gray)]">
              {filteredRsvps.map((rsvp) => (
                <tr key={rsvp.id} className="hover:bg-[var(--color-ivory)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-champagne)] rounded-full flex items-center justify-center">
                        <span className="text-[var(--color-charcoal)] font-medium">
                          {rsvp.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-charcoal)]">{rsvp.name}</p>
                        <p className="text-sm text-[var(--color-text-light)]">{rsvp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      rsvp.status === 'attending' 
                        ? 'bg-green-50 text-green-600'
                        : rsvp.status === 'declined'
                        ? 'bg-red-50 text-red-500'
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {rsvp.status === 'attending' && <CheckCircle className="w-3 h-3" />}
                      {rsvp.status === 'declined' && <XCircle className="w-3 h-3" />}
                      {rsvp.status === 'pending' && <Clock className="w-3 h-3" />}
                      {rsvp.status.charAt(0).toUpperCase() + rsvp.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-warm-gray)]">
                    {rsvp.guests > 0 ? rsvp.guests : '-'}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-warm-gray)]">
                    {rsvp.dietaryRequirements || '-'}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-light)] text-sm">
                    {rsvp.submittedAt 
                      ? new Date(rsvp.submittedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })
                      : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedRsvp(rsvp)}
                        className="p-2 hover:bg-[var(--color-ivory)] rounded-lg transition-colors text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {rsvp.status === 'pending' && (
                        <button
                          className="p-2 hover:bg-[var(--color-ivory)] rounded-lg transition-colors text-[var(--color-dusty-blue)] hover:text-[var(--color-slate-blue)]"
                          title="Send reminder"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRsvps.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[var(--color-warm-gray)]">No RSVPs found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRsvp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--color-light-gray)]">
              <div className="flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--color-charcoal)]">
                  RSVP Details
                </h3>
                <button
                  onClick={() => setSelectedRsvp(null)}
                  className="p-2 hover:bg-[var(--color-ivory)] rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-[var(--color-warm-gray)]" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[var(--color-champagne)] rounded-full flex items-center justify-center">
                  <span className="text-2xl text-[var(--color-charcoal)] font-medium">
                    {selectedRsvp.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-lg text-[var(--color-charcoal)]">{selectedRsvp.name}</p>
                  <p className="text-[var(--color-warm-gray)]">{selectedRsvp.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--color-ivory)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-light)]">Status</p>
                  <p className="font-medium text-[var(--color-charcoal)] capitalize">{selectedRsvp.status}</p>
                </div>
                <div className="p-4 bg-[var(--color-ivory)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-light)]">Total Guests</p>
                  <p className="font-medium text-[var(--color-charcoal)]">{selectedRsvp.guests || '-'}</p>
                </div>
              </div>

              {selectedRsvp.dietaryRequirements && (
                <div className="p-4 bg-[var(--color-ivory)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-light)] mb-1">Dietary Requirements</p>
                  <p className="text-[var(--color-charcoal)]">{selectedRsvp.dietaryRequirements}</p>
                </div>
              )}

              {selectedRsvp.songRequest && (
                <div className="p-4 bg-[var(--color-ivory)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-light)] mb-1">Song Request</p>
                  <p className="text-[var(--color-charcoal)]">{selectedRsvp.songRequest}</p>
                </div>
              )}

              {selectedRsvp.message && (
                <div className="p-4 bg-[var(--color-ivory)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-light)] mb-1">Message</p>
                  <p className="text-[var(--color-charcoal)]">{selectedRsvp.message}</p>
                </div>
              )}

              {selectedRsvp.submittedAt && (
                <p className="text-sm text-[var(--color-text-light)]">
                  Submitted on {new Date(selectedRsvp.submittedAt).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

