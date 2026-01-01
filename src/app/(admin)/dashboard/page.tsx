import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Calendar,
  MapPin,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

// Mock data - will be replaced with Supabase queries
const stats = {
  totalInvited: 120,
  attending: 78,
  declined: 12,
  pending: 30,
  totalGuests: 95,
};

const recentRsvps = [
  { id: 1, name: "Sarah Johnson", status: "attending", guests: 2, date: "2024-09-15" },
  { id: 2, name: "Michael Chen", status: "attending", guests: 1, date: "2024-09-14" },
  { id: 3, name: "Emma Williams", status: "declined", guests: 0, date: "2024-09-14" },
  { id: 4, name: "David Brown", status: "attending", guests: 3, date: "2024-09-13" },
  { id: 5, name: "Lisa Anderson", status: "pending", guests: 0, date: "2024-09-12" },
];

export default function DashboardPage() {
  const attendanceRate = Math.round((stats.attending / (stats.attending + stats.declined)) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-charcoal)]">
            Dashboard
          </h1>
          <p className="text-[var(--color-warm-gray)] mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your wedding.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="btn-secondary flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          View Site
        </Link>
      </div>

      {/* Wedding Info Card */}
      <div className="card p-6 bg-gradient-to-br from-[var(--color-dusty-blue)] to-[var(--color-slate-blue)] text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl mb-2">
              Natalie & James
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>24th October 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Die Woud, Caledon</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Days until wedding</p>
            <p className="font-[family-name:var(--font-playfair)] text-4xl">---</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Invited */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[var(--color-ivory)] rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[var(--color-dusty-blue)]" />
            </div>
            <span className="text-sm text-[var(--color-text-light)]">Invitations</span>
          </div>
          <p className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-charcoal)]">
            {stats.totalInvited}
          </p>
          <p className="text-[var(--color-warm-gray)] text-sm mt-1">Total invited</p>
        </div>

        {/* Attending */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-sm text-green-500 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {attendanceRate}%
            </span>
          </div>
          <p className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-charcoal)]">
            {stats.attending}
          </p>
          <p className="text-[var(--color-warm-gray)] text-sm mt-1">Confirmed attending</p>
        </div>

        {/* Declined */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <p className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-charcoal)]">
            {stats.declined}
          </p>
          <p className="text-[var(--color-warm-gray)] text-sm mt-1">Declined</p>
        </div>

        {/* Pending */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <p className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-charcoal)]">
            {stats.pending}
          </p>
          <p className="text-[var(--color-warm-gray)] text-sm mt-1">Awaiting response</p>
        </div>
      </div>

      {/* Recent RSVPs & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent RSVPs */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--color-charcoal)]">
              Recent RSVPs
            </h3>
            <Link 
              href="/dashboard/rsvps" 
              className="text-[var(--color-dusty-blue)] text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentRsvps.map((rsvp) => (
              <div 
                key={rsvp.id} 
                className="flex items-center justify-between py-3 border-b border-[var(--color-light-gray)] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--color-champagne)] rounded-full flex items-center justify-center">
                    <span className="text-[var(--color-charcoal)] font-medium">
                      {rsvp.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)]">{rsvp.name}</p>
                    <p className="text-sm text-[var(--color-text-light)]">
                      {rsvp.guests > 0 ? `+${rsvp.guests - 1} guest${rsvp.guests > 2 ? 's' : ''}` : 'Solo'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    rsvp.status === 'attending' 
                      ? 'bg-green-50 text-green-600'
                      : rsvp.status === 'declined'
                      ? 'bg-red-50 text-red-500'
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {rsvp.status.charAt(0).toUpperCase() + rsvp.status.slice(1)}
                  </span>
                  <span className="text-sm text-[var(--color-text-light)]">
                    {new Date(rsvp.date).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--color-charcoal)] mb-6">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/dashboard/rsvps"
              className="block w-full p-4 bg-[var(--color-ivory)] hover:bg-[var(--color-champagne)] rounded-lg transition-colors text-left"
            >
              <p className="font-medium text-[var(--color-charcoal)]">Manage RSVPs</p>
              <p className="text-sm text-[var(--color-text-light)]">View and update responses</p>
            </Link>
            <Link
              href="/dashboard/guests"
              className="block w-full p-4 bg-[var(--color-ivory)] hover:bg-[var(--color-champagne)] rounded-lg transition-colors text-left"
            >
              <p className="font-medium text-[var(--color-charcoal)]">Guest List</p>
              <p className="text-sm text-[var(--color-text-light)]">Manage your guest list</p>
            </Link>
            <a
              href="mailto:guests@example.com"
              className="block w-full p-4 bg-[var(--color-ivory)] hover:bg-[var(--color-champagne)] rounded-lg transition-colors text-left"
            >
              <p className="font-medium text-[var(--color-charcoal)]">Send Reminders</p>
              <p className="text-sm text-[var(--color-text-light)]">Email pending guests</p>
            </a>
            <Link
              href="/"
              target="_blank"
              className="block w-full p-4 bg-[var(--color-ivory)] hover:bg-[var(--color-champagne)] rounded-lg transition-colors text-left"
            >
              <p className="font-medium text-[var(--color-charcoal)]">Preview Website</p>
              <p className="text-sm text-[var(--color-text-light)]">See guest-facing pages</p>
            </Link>
          </div>

          {/* Guest Count Summary */}
          <div className="mt-6 p-4 bg-gradient-to-br from-[var(--color-sage)]/20 to-[var(--color-eucalyptus)]/20 rounded-lg">
            <p className="text-sm text-[var(--color-warm-gray)]">Total confirmed guests</p>
            <p className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-charcoal)]">
              {stats.totalGuests}
            </p>
            <p className="text-xs text-[var(--color-text-light)] mt-1">
              Including plus ones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

