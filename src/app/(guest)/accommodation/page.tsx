import { MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

// Enable static generation for better performance
export const dynamic = 'force-static';

export default function AccommodationPage() {
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
      <div className="max-w-4xl mx-auto animate-float-in">
        {/* Content card - Classic elegant style */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-10 md:p-16 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] relative">
          {/* Elegant inner border decoration */}
          <div className="absolute inset-4 md:inset-6 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-5xl md:text-6xl text-[var(--color-charcoal)] mb-6 font-serif tracking-wide">
                Where to Stay
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
                <div className="w-1.5 h-1.5 bg-[var(--color-dusty-rose)]/60 rotate-45"></div>
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
              </div>
            <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-xl mx-auto mb-6">
              Our venue, <span className="text-[var(--color-charcoal)] font-medium">Die Woud</span>, is 
              nestled in the beautiful Caledon countryside, about 1.5 hours from Cape Town. 
              If travelling from Cape Town, you can{" "}
              <Link href="/transport" className="text-[var(--color-slate-blue)] hover:text-[var(--color-dusty-blue)] underline">
                book one of our shuttles here
              </Link>.
            </p>
            <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-xl mx-auto mb-8">
              If you would prefer to stay locally, we <span className="text-[var(--color-charcoal)] font-medium">highly recommend using our pre-filtered Airbnb search</span> or our carefully selected <span className="text-[var(--color-charcoal)] font-medium">accommodation options</span> below. We will be sharing more information on transport options for the surrounding areas shortly.
            </p>
          </div>

          {/* Airbnb Link - Prominent */}
          <div className="mb-8 text-center">
            <a 
              href="https://www.airbnb.co.uk/s/Die-Woud-Wedding-Venue--Myddleton--Caledon--South-Africa/homes?checkin=2026-10-23&checkout=2026-10-25&date_picker_type=calendar&adults=2&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2026-01-01&monthly_length=3&monthly_end_date=2026-04-01&price_filter_input_type=2&price_filter_num_nights=2&channel=EXPLORE&place_id=ChIJJzxuwOH7zR0RgRkWM9BXLf4&location_bb=wgjovEGbyP7CCOt_QZvDdw%3D%3D&acp_id=t-g-ChIJJzxuwOH7zR0RgRkWM9BXLf4&search_type=autocomplete_click"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
            >
              <span>Browse Airbnb listings</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-[var(--color-warm-gray)] text-sm mt-3">
              or
            </p>
          </div>

          {/* Accommodation Map */}
          <div className="rounded-xl overflow-hidden shadow-md mb-8">
            <iframe 
              src="https://www.google.com/maps/d/u/0/embed?mid=1Lrs-p0o22VivwaKX6m4aXfYRzx5IpDw&ehbc=2E312F&noprof=1" 
              width="100%" 
              height="480" 
              frameBorder="0"
              title="Accommodation Map"
              allowFullScreen
            />
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
