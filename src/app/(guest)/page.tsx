import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import { Countdown } from "@/components/Countdown";

export default function HomePage() {
  return (
    <div className="bg-[var(--color-cream)]">
      {/* Hero Section - Invitation Style */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-start justify-center overflow-hidden pt-28 md:pt-34 pb-12 md:pb-20">
        {/* Background Image */}
        <Image
          src="/background-2.JPG"
          alt="Wedding background"
          fill
          className="object-cover animate-scale-out"
          priority
        />

        {/* Invitation Card */}
        <div className="relative z-10 mx-4 md:mx-6 animate-float-in">
          <div className="bg-white/95 backdrop-blur-sm px-8 py-10 md:px-14 md:py-14 lg:px-18 lg:py-16 max-w-lg md:max-w-xl text-center shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)]">
            {/* Thin elegant border inside the card */}
            <div className="absolute inset-4 md:inset-6 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
            
            {/* Top ornament */}
            <p className="text-[var(--color-warm-gray)] text-xs md:text-sm tracking-[0.3em] uppercase mb-8">
              Together with their families
            </p>

            {/* Names in elegant script */}
            <h1 className="text-[var(--color-charcoal)] leading-tight">
              <span className="block text-5xl md:text-6xl lg:text-7xl">Natalie</span>
              <span className="block text-2xl md:text-3xl text-[var(--color-dusty-rose)] my-2">&amp;</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl">James</span>
            </h1>

            {/* Simple divider */}
            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-px w-12 bg-[var(--color-dusty-rose)]/60"></div>
              <div className="w-1.5 h-1.5 bg-[var(--color-dusty-rose)]/60 rotate-45"></div>
              <div className="h-px w-12 bg-[var(--color-dusty-rose)]/60"></div>
            </div>

            {/* Invitation text */}
            <p className="text-[var(--color-warm-gray)] text-sm md:text-base tracking-wide mb-6">
              Request the pleasure of your company<br />
              at their wedding celebration
            </p>

            {/* Date */}
            <p className="text-2xl md:text-3xl text-[var(--color-charcoal)] mb-6">
              October 24, 2026
            </p>

            {/* Venue */}
            <div>
              <p className="text-lg md:text-xl text-[var(--color-charcoal)]">
                Die Woud
              </p>
              <p className="text-[var(--color-warm-gray)] text-sm tracking-wide">
                Caledon, South Africa
              </p>
            </div>

            {/* RSVP Button */}
            <div className="mt-8">
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[var(--color-warm-gray)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* Engagement Photo Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] bg-[var(--color-champagne)] rounded-2xl overflow-hidden relative">
                <Image
                  src="/engagement-photo.png"
                  alt="Natalie and James engagement photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-[var(--color-dusty-rose)] rounded-2xl -z-10 opacity-50"></div>
            </div>

            {/* Our Story */}
            <div className="space-y-6">
              <h2 className=" text-4xl text-[var(--color-charcoal)]">
                Our Story
              </h2>
              <div className="floral-divider w-24"></div>
              <p className="text-[var(--color-warm-gray)] leading-relaxed">
                From the moment our paths crossed, we knew there was something special 
                between us. Through laughter, adventures, and countless memories, 
                our love has blossomed into something beautiful.
              </p>
              <p className="text-[var(--color-warm-gray)] leading-relaxed">
                Now, we&apos;re ready to take the next step in our journey together, 
                and we couldn&apos;t imagine celebrating this milestone without you, 
                our cherished friends and family.
              </p>
              <p className=" text-xl text-[var(--color-slate-blue)]">
                We can&apos;t wait to see you there!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Running Order Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl text-[var(--color-charcoal)] mb-4">
            Running Order
          </h2>
          <div className="floral-divider w-24 mx-auto mb-12"></div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Horizontal line */}
            <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--color-dusty-rose)] via-[var(--color-dusty-blue)] to-[var(--color-slate-blue)]"></div>

            {/* Timeline Items */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {/* Arrival */}
              <div className="flex flex-col items-center">
                <div className="relative z-10 w-14 h-14 bg-[var(--color-dusty-rose)] rounded-full flex items-center justify-center shadow-lg mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl text-[var(--color-charcoal)] mb-1">15:30</p>
                <p className="text-[var(--color-warm-gray)] font-medium">Arrival</p>
              </div>

              {/* Ceremony */}
              <div className="flex flex-col items-center">
                <div className="relative z-10 w-14 h-14 bg-[var(--color-dusty-blue)] rounded-full flex items-center justify-center shadow-lg mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl text-[var(--color-charcoal)] mb-1">16:30</p>
                <p className="text-[var(--color-warm-gray)] font-medium">Ceremony Starts</p>
              </div>

              {/* Cocktails */}
              <div className="flex flex-col items-center">
                <div className="relative z-10 w-14 h-14 bg-[var(--color-sage)] rounded-full flex items-center justify-center shadow-lg mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl text-[var(--color-charcoal)] mb-1">17:00</p>
                <p className="text-[var(--color-warm-gray)] font-medium text-center">Cocktails &<br/>Lawn Games</p>
              </div>

              {/* Dinner */}
              <div className="flex flex-col items-center">
                <div className="relative z-10 w-14 h-14 bg-[var(--color-slate-blue)] rounded-full flex items-center justify-center shadow-lg mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl text-[var(--color-charcoal)] mb-1">19:30</p>
                <p className="text-[var(--color-warm-gray)] font-medium text-center">Dinner &<br/>Speeches</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl text-[var(--color-charcoal)] mb-4">
            Counting Down
          </h2>
          <p className="text-[var(--color-warm-gray)] mb-8 font-light">
            Until we say &ldquo;I do&rdquo;
          </p>
          
          <Countdown />
        </div>
      </section>

      {/* RSVP Call to Action */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl text-[var(--color-charcoal)] mb-4">
            Will You Join Us?
          </h2>
          <div className="floral-divider w-24 mx-auto mb-6"></div>
          <p className="text-[var(--color-warm-gray)] mb-8 leading-relaxed">
            We would be honored to have you celebrate this special day with us. 
            Please let us know if you can make it by responding to our invitation.
          </p>
          <Link href="/rsvp" className="btn-primary inline-block">
            Respond Now
          </Link>
        </div>
      </section>
    </div>
  );
}

