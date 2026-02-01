import { Heart, Check } from "lucide-react";
import Link from "next/link";

// Enable static generation for better performance
export const dynamic = 'force-static';

export default function RegistrySuccessPage() {
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
      <div className="max-w-md mx-auto animate-float-in">
        {/* Content card */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-8 md:p-10 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] relative text-center">
          {/* Elegant inner border */}
          <div className="absolute inset-4 md:inset-5 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Success Icon */}
            <div className="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-[var(--color-sage)] flex items-center justify-center">
              <Check className="w-7 h-7 text-[var(--color-sage)]" strokeWidth={2.5} />
            </div>

            {/* Header */}
            <h1 className="text-3xl md:text-4xl text-[var(--color-charcoal)] mb-4 font-serif">
              Thank You
            </h1>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-[var(--color-dusty-rose)]/40"></div>
              <Heart className="w-3 h-3 text-[var(--color-dusty-rose)] fill-[var(--color-dusty-rose)]" />
              <div className="h-px w-10 bg-[var(--color-dusty-rose)]/40"></div>
            </div>
            
            <p className="text-[var(--color-warm-gray)] leading-relaxed mb-6">
              Your generous contribution to our honeymoon fund means the world to us. 
              We&apos;re so grateful for your love and support.
            </p>

            <p className="text-sm text-[var(--color-charcoal)] mb-8">
              We can&apos;t wait to share stories from our adventure
              <span className="block text-xs text-[var(--color-warm-gray)] mt-1">
                (even if we&apos;re keeping the destination secret for now)
              </span>
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/registry"
                className="px-6 py-2.5 text-xs tracking-[0.15em] uppercase border border-[var(--color-light-gray)] text-[var(--color-warm-gray)] hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)] transition-colors"
              >
                Back to Fund
              </Link>
              <Link 
                href="/accommodation"
                className="px-6 py-2.5 text-xs tracking-[0.15em] uppercase border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white transition-colors"
              >
                Go to Accommodation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
