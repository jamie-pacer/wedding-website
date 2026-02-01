import { Heart, Check } from "lucide-react";
import Link from "next/link";

// Enable static generation for better performance
export const dynamic = 'force-static';

export default function ThankYouPage() {
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
      <div className="max-w-2xl mx-auto animate-float-in">
        {/* Content card */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-10 md:p-16 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] relative text-center">
          {/* Elegant inner border */}
          <div className="absolute inset-4 md:inset-6 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-[var(--color-sage)] flex items-center justify-center">
              <Check className="w-10 h-10 text-[var(--color-sage)]" strokeWidth={2.5} />
            </div>

            {/* Header */}
            <h1 className="text-4xl md:text-5xl text-[var(--color-charcoal)] mb-6 font-serif tracking-wide">
              Thank You
            </h1>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
              <Heart className="w-4 h-4 text-[var(--color-dusty-rose)] fill-[var(--color-dusty-rose)]" />
              <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
            </div>
            
            {/* Message */}
            <div className="space-y-6 mb-10">
              <p className="text-[var(--color-warm-gray)] leading-relaxed text-lg">
                Your generous contribution to our honeymoon fund means the world to us.
              </p>
              
              <p className="text-[var(--color-warm-gray)] leading-relaxed">
                We&apos;re so grateful for your love and support as we begin this new chapter 
                of our lives together. Your gift will help us create memories that will last a lifetime.
              </p>

              <div className="pt-4">
                <p className="text-[var(--color-charcoal)] font-medium mb-2">
                  We can&apos;t wait to share stories from our adventure!
                </p>
                <p className="text-sm text-[var(--color-warm-gray)] italic">
                  (Even if we&apos;re keeping the destination secret for now...)
                </p>
              </div>
            </div>

            {/* Signature */}
            <div className="mb-10">
              <div className="flex items-center justify-center gap-3 text-[var(--color-dusty-rose)] font-serif text-2xl">
                <Heart className="w-5 h-5 fill-current" />
                <span>Natalie & James</span>
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-[var(--color-light-gray)] mb-8"></div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="inline-block px-8 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                Return Home
              </Link>
              <Link 
                href="/photo-booth"
                className="inline-block px-8 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                Share a Photo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
