import Link from "next/link";

// Enable static generation for better performance
export const dynamic = 'force-static';

export default function PhotographyPage() {
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
                Photography
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
                <div className="w-1.5 h-1.5 bg-[var(--color-dusty-rose)]/60 rotate-45"></div>
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
              </div>
              <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-xl mx-auto">
                After our special day, we&apos;ll share all the beautiful moments 
                captured by our photographer here.
              </p>
            </div>

            {/* Back link */}
            <div className="text-center">
              <Link 
                href="/" 
                className="inline-block px-8 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

