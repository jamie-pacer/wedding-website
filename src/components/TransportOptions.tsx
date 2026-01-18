"use client";

import { useState } from "react";
import { Car, Bus, Phone, Navigation } from "lucide-react";
import { ShuttleBookingModal } from "@/components/ShuttleBookingModal";

export function TransportOptions() {
  const [isShuttleModalOpen, setIsShuttleModalOpen] = useState(false);

  return (
    <>
      {/* Two Options Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Option 1: Traveling from Cape Town */}
        <div className="bg-white/50 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-6 relative">
          <div className="absolute inset-2 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-dusty-blue)]/10 border border-[var(--color-dusty-blue)]/30 flex items-center justify-center">
                <Bus className="w-5 h-5 text-[var(--color-dusty-blue)]" />
              </div>
              <h2 className="text-lg text-[var(--color-charcoal)] font-medium">
                Traveling from Cape Town
              </h2>
            </div>
            <p className="text-[var(--color-warm-gray)] text-sm leading-relaxed mb-6">
              We&apos;re arranging shuttle services from Cape Town to the venue and back. 
              Alternatively, you can drive yourself—the scenic route takes about 1.5 hours.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setIsShuttleModalOpen(true)}
                className="flex items-center justify-center gap-2 w-full px-6 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300 cursor-pointer"
              >
                <Bus className="w-4 h-4" />
                Book Shuttle
              </button>
              <a 
                href="https://maps.google.com/maps/dir//Die+Woud+Caledon+South+Africa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Option 2: Staying Locally */}
        <div className="bg-white/50 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-6 relative">
          <div className="absolute inset-2 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-dusty-rose)]/10 border border-[var(--color-dusty-rose)]/30 flex items-center justify-center">
                <Car className="w-5 h-5 text-[var(--color-dusty-rose)]" />
              </div>
              <h2 className="text-lg text-[var(--color-charcoal)] font-medium">
                Staying Locally
              </h2>
            </div>
            <p className="text-[var(--color-warm-gray)] text-sm leading-relaxed mb-6">
              If you&apos;re staying near the venue in Caledon or surrounds, 
              we can help arrange a trip to and from Die Woud on the day.
            </p>
            <div className="space-y-3">
              <a 
                href="#request-trip"
                className="flex items-center justify-center gap-2 w-full px-6 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Request Trip
              </a>
              <p className="py-2 text-center text-[var(--color-warm-gray)] text-xs">
                We&apos;ll get in touch to coordinate your pickup
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Shuttle Booking Modal */}
      <ShuttleBookingModal 
        isOpen={isShuttleModalOpen}
        onClose={() => setIsShuttleModalOpen(false)}
      />
    </>
  );
}

