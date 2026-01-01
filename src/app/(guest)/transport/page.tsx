import { Car, MapPin, Navigation, Bus, Phone } from "lucide-react";

export default function TransportPage() {
  return (
    <div 
      className="min-h-screen px-6 pt-28 pb-16"
      style={{
        backgroundImage: "url('/background-3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Content card with backdrop */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl text-[var(--color-charcoal)] mb-4">
              Getting There
            </h1>
            <div className="floral-divider w-24 mx-auto mb-6"></div>
            <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-xl mx-auto">
              Die Woud is nestled in the beautiful Caledon countryside, about 1.5 hours from Cape Town.
              Choose the option that works best for you.
            </p>
          </div>

          {/* Two Options Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Option 1: Traveling from Cape Town */}
            <div className="bg-[var(--color-cream)]/60 rounded-xl p-6 border border-[var(--color-champagne)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-dusty-blue)]/20 flex items-center justify-center">
                  <Bus className="w-6 h-6 text-[var(--color-dusty-blue)]" />
                </div>
                <h2 className="text-xl text-[var(--color-charcoal)] font-medium">
                  Traveling from Cape Town
                </h2>
              </div>
              <p className="text-[var(--color-warm-gray)] text-sm leading-relaxed mb-6">
                We&apos;re arranging shuttle services from Cape Town to the venue and back. 
                Alternatively, you can drive yourself—the scenic route takes about 1.5 hours.
              </p>
              <div className="space-y-3">
                <a 
                  href="#shuttle"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[var(--color-dusty-blue)] text-white rounded-lg hover:bg-[var(--color-slate-blue)] transition-colors font-medium"
                >
                  <Bus className="w-4 h-4" />
                  Book Shuttle
                </a>
                <a 
                  href="https://maps.google.com/maps/dir//Die+Woud+Caledon+South+Africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-[var(--color-dusty-blue)] text-[var(--color-dusty-blue)] rounded-lg hover:bg-[var(--color-dusty-blue)]/10 transition-colors font-medium"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Option 2: Staying Locally */}
            <div className="bg-[var(--color-cream)]/60 rounded-xl p-6 border border-[var(--color-champagne)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-dusty-rose)]/20 flex items-center justify-center">
                  <Car className="w-6 h-6 text-[var(--color-dusty-rose)]" />
                </div>
                <h2 className="text-xl text-[var(--color-charcoal)] font-medium">
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
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[var(--color-dusty-rose)] text-white rounded-lg hover:bg-[var(--color-dusty-rose)]/80 transition-colors font-medium"
                >
                  <Phone className="w-4 h-4" />
                  Request Trip
                </a>
                <div className="py-3 px-4 text-center text-[var(--color-warm-gray)] text-sm">
                  We&apos;ll get in touch to coordinate your pickup
                </div>
              </div>
            </div>
          </div>

          {/* Venue Location */}
          <div className="pt-6 border-t border-[var(--color-light-gray)] text-center">
            <a 
              href="https://maps.google.com/?q=Die+Woud+Caledon+South+Africa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-warm-gray)] hover:text-[var(--color-slate-blue)] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Die Woud, Caledon, South Africa</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
