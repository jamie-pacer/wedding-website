import { MapPin } from "lucide-react";

// Enable static generation for better performance
export const dynamic = 'force-static';

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
      <div className="max-w-5xl mx-auto animate-float-in">
        {/* Content card - Classic elegant style */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-10 md:p-16 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] relative">
          {/* Elegant inner border decoration */}
          <div className="absolute inset-4 md:inset-6 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-5xl md:text-6xl text-[var(--color-charcoal)] mb-6 font-serif tracking-wide">
                Getting There
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
                <div className="w-1.5 h-1.5 bg-[var(--color-dusty-rose)]/60 rotate-45"></div>
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
              </div>
            </div>

            {/* Transport Information */}
            <div className="bg-white/50 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-8 mb-10 relative">
              <div className="absolute inset-2 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-[var(--color-warm-gray)] text-center leading-relaxed">
                  We will be sharing a list of recommended providers for shuttles and taxi&apos;s shortly, both here and to the email addresses provided when RSVPing
                </p>
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
    </div>
  );
}
