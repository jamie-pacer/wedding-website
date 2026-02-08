"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ExternalLink,
  Search,
  UserPlus,
  X,
  LogOut,
  ChevronRight,
  Mail,
  Music,
  UtensilsCrossed,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type GuestWithRsvp = {
  id: string;
  name: string;
  email: string | null;
  status: "accepted" | "declined" | "waiting";
  dietary_requirements?: string;
  song_request?: string;
  message?: string;
  guest_count?: number;
  created_at?: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [guests, setGuests] = useState<GuestWithRsvp[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "accepted" | "declined" | "waiting">("all");
  const [selectedGuest, setSelectedGuest] = useState<GuestWithRsvp | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchGuestsWithRsvps();
  }, []);

  async function fetchGuestsWithRsvps() {
    const supabase = createClient();
    setIsLoading(true);

    try {
      const { data: guestsData, error: guestsError } = await supabase
        .from('guests')
        .select('*')
        .order('name');

      if (guestsError) throw guestsError;

      const { data: rsvpsData, error: rsvpsError } = await supabase
        .from('rsvps')
        .select('*');

      if (rsvpsError) throw rsvpsError;

      const combined: GuestWithRsvp[] = (guestsData || []).map(guest => {
        // Match by guest_id (primary) or fall back to email matching
        const rsvp = rsvpsData?.find(r => 
          r.guest_id === guest.id || 
          (guest.email && r.email?.toLowerCase() === guest.email?.toLowerCase())
        );
        
        if (rsvp) {
          return {
            id: guest.id,
            name: guest.name,
            email: guest.email,
            status: rsvp.attending === 'yes' ? 'accepted' : 'declined',
            dietary_requirements: rsvp.dietary_requirements || undefined,
            song_request: rsvp.song_request || undefined,
            message: rsvp.message || undefined,
            guest_count: rsvp.guest_count || 1,
            created_at: rsvp.created_at ?? undefined
          };
        }
        
        return {
          id: guest.id,
          name: guest.name,
          email: guest.email,
          status: 'waiting' as const
        };
      });

      setGuests(combined);
    } catch (error) {
      console.error('Error fetching guests:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const stats = {
    invited: guests.length,
    accepted: guests.filter(g => g.status === 'accepted').length,
    declined: guests.filter(g => g.status === 'declined').length,
    waiting: guests.filter(g => g.status === 'waiting').length,
  };

  const filteredGuests = guests.filter((guest) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (guest.name || '').toLowerCase().includes(searchLower) ||
      (guest.email || '').toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === "all" || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('guests')
        .insert({
          name: newGuest.name,
          email: newGuest.email || null,
        });

      if (error) throw error;

      setIsAddModalOpen(false);
      setNewGuest({ name: "", email: "" });
      fetchGuestsWithRsvps();
    } catch (error: any) {
      console.error('Error adding guest:', error);
      alert(error.message || 'Failed to add guest');
    } finally {
      setIsAdding(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Guest Manager</h1>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </Link>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Guest</span>
              </button>
              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Invited</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.invited}</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Accepted</p>
                <p className="text-2xl font-semibold text-emerald-600 mt-1">{stats.accepted}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Declined</p>
                <p className="text-2xl font-semibold text-red-600 mt-1">{stats.declined}</p>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Awaiting</p>
                <p className="text-2xl font-semibold text-amber-600 mt-1">{stats.waiting}</p>
              </div>
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search guests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-slate-300 focus:ring-0 focus:outline-none transition-colors"
                />
              </div>
              <div className="relative w-full sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | "accepted" | "declined" | "waiting")}
                  className="w-full appearance-none px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:bg-white focus:border-slate-300 focus:ring-0 focus:outline-none transition-colors"
                  aria-label="Filter by RSVP status"
                >
                  <option value="all">All statuses</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                  <option value="waiting">Awaiting</option>
                </select>
                <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90" />
              </div>
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="p-16 text-center">
              <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-slate-500">Loading guests...</p>
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="p-16 text-center">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                {searchQuery ? "No guests match your search" : "No guests added yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guest</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Dietary</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Song Request</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGuests.map((guest) => (
                    <tr 
                      key={guest.id} 
                      onClick={() => setSelectedGuest(guest)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-medium text-slate-600">
                              {(guest.name || '?').charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{guest.name || 'Unknown'}</p>
                            <p className="text-xs text-slate-500 truncate">{guest.email || 'No email'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          guest.status === 'accepted' 
                            ? 'bg-emerald-50 text-emerald-700'
                            : guest.status === 'declined'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {guest.status === 'accepted' && <CheckCircle2 className="w-3 h-3" />}
                          {guest.status === 'declined' && <XCircle className="w-3 h-3" />}
                          {guest.status === 'waiting' && <Clock className="w-3 h-3" />}
                          {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-slate-600">{guest.dietary_requirements || '—'}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-sm text-slate-600 truncate block max-w-[200px]">{guest.song_request || '—'}</span>
                      </td>
                      <td className="px-4 py-4">
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {!isLoading && filteredGuests.length > 0 && (
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Showing {filteredGuests.length} of {guests.length} guests
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Guest Detail Modal */}
      {selectedGuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedGuest(null)}>
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-slate-600">
                      {(selectedGuest.name || '?').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{selectedGuest.name || 'Unknown'}</h3>
                    <p className="text-sm text-slate-500">{selectedGuest.email || 'No email'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGuest(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors -mr-2 -mt-2"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                {selectedGuest.status === 'accepted' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {selectedGuest.status === 'declined' && <XCircle className="w-5 h-5 text-red-500" />}
                {selectedGuest.status === 'waiting' && <Clock className="w-5 h-5 text-amber-600" />}
                <div>
                  <p className="text-sm font-medium text-slate-900 capitalize">{selectedGuest.status}</p>
                  <p className="text-xs text-slate-500">
                    {selectedGuest.status === 'accepted' && `${selectedGuest.guest_count || 1} guest${(selectedGuest.guest_count || 1) > 1 ? 's' : ''} attending`}
                    {selectedGuest.status === 'declined' && 'Unable to attend'}
                    {selectedGuest.status === 'waiting' && 'Awaiting response'}
                  </p>
                </div>
              </div>

              {/* Details */}
              {selectedGuest.dietary_requirements && (
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <UtensilsCrossed className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Dietary Requirements</p>
                    <p className="text-sm text-slate-900 mt-1">{selectedGuest.dietary_requirements}</p>
                  </div>
                </div>
              )}

              {selectedGuest.song_request && (
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <Music className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Song Request</p>
                    <p className="text-sm text-slate-900 mt-1">{selectedGuest.song_request}</p>
                  </div>
                </div>
              )}

              {selectedGuest.message && (
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Message</p>
                    <p className="text-sm text-slate-900 mt-1">{selectedGuest.message}</p>
                  </div>
                </div>
              )}

              {selectedGuest.status === 'waiting' && !selectedGuest.dietary_requirements && !selectedGuest.song_request && !selectedGuest.message && (
                <div className="text-center py-6">
                  <Mail className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No RSVP received yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsAddModalOpen(false)}>
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Add Guest</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors -mr-2"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <form onSubmit={handleAddGuest} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-0 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email Address <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-0 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isAdding}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isAdding ? "Adding..." : "Add Guest"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
