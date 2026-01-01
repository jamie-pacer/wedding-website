"use client";

import { useState } from "react";
import { 
  Search, 
  Plus, 
  UserPlus,
  Mail,
  Trash2,
  Edit2,
  X
} from "lucide-react";

// Mock data - will be replaced with Supabase queries
const mockGuests = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", group: "Bride's Family", plusOne: true },
  { id: 2, name: "Michael Chen", email: "michael@example.com", group: "Groom's Friends", plusOne: false },
  { id: 3, name: "Emma Williams", email: "emma@example.com", group: "Work Colleagues", plusOne: true },
  { id: 4, name: "David Brown", email: "david@example.com", group: "Bride's Friends", plusOne: true },
  { id: 5, name: "Lisa Anderson", email: "lisa@example.com", group: "Groom's Family", plusOne: false },
  { id: 6, name: "James Wilson", email: "james.w@example.com", group: "Bride's Friends", plusOne: true },
  { id: 7, name: "Sophie Taylor", email: "sophie@example.com", group: "Work Colleagues", plusOne: false },
  { id: 8, name: "Robert Martinez", email: "robert@example.com", group: "Groom's Friends", plusOne: true },
];

const groups = ["All Groups", "Bride's Family", "Groom's Family", "Bride's Friends", "Groom's Friends", "Work Colleagues"];

export default function GuestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All Groups");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", email: "", group: "Bride's Friends", plusOne: false });

  const filteredGuests = mockGuests.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === "All Groups" || guest.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding guest:", newGuest);
    setIsAddModalOpen(false);
    setNewGuest({ name: "", email: "", group: "Bride's Friends", plusOne: false });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-charcoal)]">
            Guest List
          </h1>
          <p className="text-[var(--color-warm-gray)] mt-1">
            Manage your wedding guest list
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2 self-start"
        >
          <UserPlus className="w-4 h-4" />
          Add Guest
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <p className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--color-charcoal)]">
            {mockGuests.length}
          </p>
          <p className="text-sm text-[var(--color-warm-gray)]">Total Guests</p>
        </div>
        <div className="card p-4 text-center">
          <p className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--color-charcoal)]">
            {mockGuests.filter(g => g.plusOne).length}
          </p>
          <p className="text-sm text-[var(--color-warm-gray)]">With Plus One</p>
        </div>
        <div className="card p-4 text-center">
          <p className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--color-charcoal)]">
            {new Set(mockGuests.map(g => g.group)).size}
          </p>
          <p className="text-sm text-[var(--color-warm-gray)]">Groups</p>
        </div>
        <div className="card p-4 text-center">
          <p className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--color-charcoal)]">
            {mockGuests.length + mockGuests.filter(g => g.plusOne).length}
          </p>
          <p className="text-sm text-[var(--color-warm-gray)]">Max Attendees</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)]" />
            <input
              type="text"
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-light-gray)] rounded-lg bg-white"
            />
          </div>

          {/* Group Filter */}
          <div className="flex gap-2 flex-wrap">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedGroup === group
                    ? "bg-[var(--color-dusty-blue)] text-white"
                    : "bg-[var(--color-ivory)] text-[var(--color-warm-gray)] hover:bg-[var(--color-champagne)]"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuests.map((guest) => (
          <div key={guest.id} className="card p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--color-champagne)] rounded-full flex items-center justify-center">
                  <span className="text-lg text-[var(--color-charcoal)] font-medium">
                    {guest.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-charcoal)]">{guest.name}</p>
                  <p className="text-sm text-[var(--color-text-light)]">{guest.email}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-[var(--color-ivory)] rounded-lg transition-colors text-[var(--color-warm-gray)]">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-[var(--color-warm-gray)] hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs px-2 py-1 bg-[var(--color-ivory)] rounded-full text-[var(--color-warm-gray)]">
                {guest.group}
              </span>
              {guest.plusOne && (
                <span className="text-xs px-2 py-1 bg-[var(--color-dusty-blue)]/10 text-[var(--color-dusty-blue)] rounded-full">
                  +1 Allowed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredGuests.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-[var(--color-warm-gray)]">No guests found matching your criteria.</p>
        </div>
      )}

      {/* Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <div className="p-6 border-b border-[var(--color-light-gray)]">
              <div className="flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--color-charcoal)]">
                  Add New Guest
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-[var(--color-ivory)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--color-warm-gray)]" />
                </button>
              </div>
            </div>
            <form onSubmit={handleAddGuest} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-charcoal)]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[var(--color-light-gray)] rounded-lg"
                  placeholder="Enter guest name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-charcoal)]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[var(--color-light-gray)] rounded-lg"
                  placeholder="guest@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-charcoal)]">
                  Group
                </label>
                <select
                  value={newGuest.group}
                  onChange={(e) => setNewGuest({ ...newGuest, group: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[var(--color-light-gray)] rounded-lg"
                >
                  {groups.slice(1).map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="plusOne"
                  checked={newGuest.plusOne}
                  onChange={(e) => setNewGuest({ ...newGuest, plusOne: e.target.checked })}
                  className="w-4 h-4 rounded border-[var(--color-light-gray)] text-[var(--color-dusty-blue)]"
                />
                <label htmlFor="plusOne" className="text-sm text-[var(--color-warm-gray)]">
                  Allow plus one
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Add Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

