"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Settings, 
  LogOut,
  Heart,
  ExternalLink
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/rsvps", label: "RSVPs", icon: CheckSquare },
  { href: "/dashboard/guests", label: "Guest List", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[var(--color-light-gray)] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--color-light-gray)]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-dusty-blue)] to-[var(--color-slate-blue)] rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-lg text-[var(--color-charcoal)]">
              N & J
            </p>
            <p className="text-xs text-[var(--color-text-light)]">Wedding Planner</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[var(--color-dusty-blue)] text-white"
                      : "text-[var(--color-warm-gray)] hover:bg-[var(--color-ivory)] hover:text-[var(--color-charcoal)]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* View Live Site */}
        <div className="mt-8 pt-8 border-t border-[var(--color-light-gray)]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-[var(--color-slate-blue)] hover:bg-[var(--color-ivory)] rounded-lg transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="font-medium">View Live Site</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-light-gray)]">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 text-[var(--color-warm-gray)] hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}

