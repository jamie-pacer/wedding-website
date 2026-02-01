import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { ScrollButton } from "@/components/ScrollButton";

// Enable static generation for better performance
export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <div className="bg-[var(--color-cream)]">
      {/* Hero Section - Invitation Style */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-start justify-center overflow-hidden pt-28 md:pt-34 pb-12 md:pb-20">
        {/* Background Image */}
        <Image
          src="/background-3.png"
          alt="Wedding background"
          fill
          className="object-cover animate-scale-out"
          priority
          sizes="100vw"
          quality={85}
        />

        {/* Invitation Card */}
        <div className="relative z-10 mx-4 md:mx-6 animate-float-in">
          <div className="bg-white/95 backdrop-blur-sm px-8 py-7 md:px-14 md:py-10 lg:px-18 lg:py-12 max-w-lg md:max-w-xl text-center shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)]">
            {/* Thin elegant border inside the card */}
            <div className="absolute inset-4 md:inset-6 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
            
            {/* Top ornament */}
            <p className="text-[var(--color-warm-gray)] text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
              Together with their families
            </p>

            {/* Names in elegant script */}
            <h1 className="text-[var(--color-charcoal)] leading-tight">
              <span className="block text-5xl md:text-6xl lg:text-7xl">Natalie</span>
              <span className="block text-sm md:text-base lg:text-lg -mt-1">Lacey</span>
              <span className="block text-2xl md:text-3xl text-[var(--color-dusty-rose)] my-1">&amp;</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl">James</span>
              <span className="block text-sm md:text-base lg:text-lg -mt-1">&ldquo;Jamie&rdquo;</span>
              <span className="block text-sm md:text-base lg:text-lg -mt-1">Shuttleworth</span>
            </h1>

            {/* Simple divider */}
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-px w-12 bg-[var(--color-dusty-rose)]/60"></div>
              <div className="w-1.5 h-1.5 bg-[var(--color-dusty-rose)]/60 rotate-45"></div>
              <div className="h-px w-12 bg-[var(--color-dusty-rose)]/60"></div>
            </div>

            {/* Invitation text */}
            <p className="text-[var(--color-warm-gray)] text-sm md:text-base tracking-wide mb-4">
              Request the pleasure of your company<br />
              at their wedding celebration
            </p>

            {/* Date */}
            <p className="text-2xl md:text-3xl text-[var(--color-charcoal)] mb-4">
              October 24, 2026
            </p>

            {/* Venue */}
            <div className="mb-4">
              <p className="text-lg md:text-xl text-[var(--color-charcoal)]">
                Die Woud
              </p>
              <p className="text-[var(--color-warm-gray)] text-sm tracking-wide">
                Caledon, South Africa
              </p>
            </div>

            {/* Dress Code */}
            <div className="mt-4 relative group">
              <p className="text-[var(--color-charcoal)] text-sm md:text-base tracking-wide">
                <span className="font-medium">Dress Code:</span> <span className="font-semibold">Summer semi-formal</span>
              </p>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-[var(--color-charcoal)] text-white text-xs rounded shadow-lg whitespace-normal opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 max-w-[200px] text-center">
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[var(--color-charcoal)]"></div>
                Whimsical, colourful attire encouraged – think linen suits and flowy dresses.
              </div>
            </div>

            {/* RSVP Button */}
            <div className="mt-4">
              <Link 
                href="/rsvp" 
                className="inline-block px-8 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                RSVP
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollButton />
      </section>

      {/* Engagement Photo Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden relative">
                <Image
                  src="/engagement-watercolour.png"
                  alt="Natalie and James engagement photo"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
            </div>

            {/* Our Story */}
            <div className="space-y-6">
              <h2 className=" text-4xl text-[var(--color-charcoal)]">
                Our Story
              </h2>
              <div className="floral-divider w-24"></div>
              <p className="text-[var(--color-warm-gray)] leading-relaxed">
                Since we met in school, our paths have intertwined, growing closer and closer. 
                With a shared love of the outdoors, a new hike, a good game of chess, amongst 
                a million other things, we have grown to adore every moment we get together.
              </p>
              <p className="text-[var(--color-warm-gray)] leading-relaxed">
                We so look forward to this next step in our story, our journey together, 
                and we couldn&apos;t imagine celebrating it without you, our cherished 
                friends and family.
              </p>
              <p className=" text-xl text-[var(--color-slate-blue)]">
                We can&apos;t wait to see you there!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Running Order Section */}
      <section 
        className="py-20 px-6"
        style={{
          backgroundImage: "url('/background-3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-10 md:p-16 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)] relative">
            {/* Elegant inner border decoration */}
            <div className="absolute inset-4 md:inset-6 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl text-[var(--color-charcoal)] mb-6 font-serif tracking-wide">
                Running Order
              </h2>
              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
                <div className="w-1.5 h-1.5 bg-[var(--color-dusty-rose)]/60 rotate-45"></div>
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
              </div>

              {/* Horizontal Timeline */}
              <div className="relative">
                {/* Horizontal line */}
                <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--color-dusty-rose)]/40 via-[var(--color-dusty-blue)]/40 to-[var(--color-slate-blue)]/40"></div>

                {/* Timeline Items */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                  {/* Arrival */}
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 w-14 h-14 bg-[var(--color-dusty-rose)] rounded-full flex items-center justify-center shadow-md mb-4 border-2 border-white">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl text-[var(--color-charcoal)] mb-1 font-semibold">15:30</p>
                    <p className="text-[var(--color-warm-gray)] font-medium">Arrival</p>
                  </div>

                  {/* Ceremony */}
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 w-14 h-14 bg-[var(--color-dusty-blue)] rounded-full flex items-center justify-center shadow-md mb-4 border-2 border-white">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl text-[var(--color-charcoal)] mb-1 font-semibold">16:30</p>
                    <p className="text-[var(--color-warm-gray)] font-medium">Ceremony Starts</p>
                  </div>

                  {/* Cocktails */}
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 w-14 h-14 bg-[var(--color-sage)] rounded-full flex items-center justify-center shadow-md mb-4 border-2 border-white">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl text-[var(--color-charcoal)] mb-1 font-semibold">17:00</p>
                    <p className="text-[var(--color-warm-gray)] font-medium text-center">Cocktails &<br/>Lawn Games</p>
                  </div>

                  {/* Dinner */}
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 w-14 h-14 bg-[var(--color-slate-blue)] rounded-full flex items-center justify-center shadow-md mb-4 border-2 border-white">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                <p className="text-2xl text-[var(--color-charcoal)] mb-1 font-semibold">19:00</p>
                <p className="text-[var(--color-warm-gray)] font-medium text-center">Reception Starts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="relative py-16 md:py-32 lg:py-40 px-4 sm:px-6 min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/watercolour.png"
          alt="Watercolour background"
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-6 sm:p-8 md:p-12 lg:p-16 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)] relative mx-2 sm:mx-4">
            {/* Elegant inner border decoration */}
            <div className="absolute inset-3 sm:inset-4 md:inset-6 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-[var(--color-charcoal)] mb-4 sm:mb-6 font-serif tracking-wide">
                Counting Down
              </h2>
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="h-px w-12 sm:w-16 bg-[var(--color-dusty-rose)]/40"></div>
                <div className="w-1.5 h-1.5 bg-[var(--color-dusty-rose)]/60 rotate-45"></div>
                <div className="h-px w-12 sm:w-16 bg-[var(--color-dusty-rose)]/40"></div>
              </div>
              <p className="text-[var(--color-warm-gray)] mb-6 sm:mb-8 text-base sm:text-lg tracking-wide px-2">
                Until we say &ldquo;I do&rdquo;
              </p>
              
              <Countdown />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

