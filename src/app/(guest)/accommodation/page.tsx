import { MapPin, ExternalLink } from "lucide-react";

export default function AccommodationPage() {
  return (
    <div 
      className="min-h-screen px-6 pt-28 pb-16"
      style={{
        backgroundImage: "url('/Fabric Texture Background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Content card with backdrop */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl text-[var(--color-charcoal)] mb-4">
              Where to Stay
            </h1>
            <div className="floral-divider w-24 mx-auto mb-6"></div>
            <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-xl mx-auto">
              Our venue, <span className="text-[var(--color-charcoal)] font-medium">Die Woud</span>, is 
              nestled in the beautiful Caledon countryside, about 1.5 hours from Cape Town. 
              Browse accommodation options nearby using the map below.
            </p>
          </div>

          {/* Stay22 Map */}
          <div className="rounded-xl overflow-hidden shadow-md mb-8">
            <iframe 
              id="stay22-widget" 
              width="100%" 
              height="480" 
              src="https://www.stay22.com/embed/694e5779581ec595fcb05cb5" 
              frameBorder="0"
              title="Accommodation Map"
            />
          </div>

          {/* Airbnb Link */}
          <div className="text-center mb-8">
            <p className="text-[var(--color-warm-gray)] text-sm mb-3">
              Prefer Airbnb? We&apos;ve prepared a search with our wedding dates.
            </p>
            <a 
              href="https://www.airbnb.co.uk/s/Die-Woud-Wedding-Venue--Myddleton--Caledon--South-Africa/homes?checkin=2026-10-23&checkout=2026-10-25&date_picker_type=calendar&adults=2&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2026-01-01&monthly_length=3&monthly_end_date=2026-04-01&price_filter_input_type=2&price_filter_num_nights=2&channel=EXPLORE&place_id=ChIJJzxuwOH7zR0RgRkWM9BXLf4&location_bb=wgjovEGbyP7CCOt_QZvDdw%3D%3D&acp_id=t-g-ChIJJzxuwOH7zR0RgRkWM9BXLf4&search_type=autocomplete_click"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-slate-blue)] hover:text-[var(--color-dusty-blue)] transition-colors font-medium"
            >
              Browse Airbnb listings
              <ExternalLink className="w-4 h-4" />
            </a>
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
