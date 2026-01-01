import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";

// Enable static generation for better performance
export const dynamic = 'force-static';

export default function PhotographyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-lg text-center">
        {/* Decorative Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-[var(--color-champagne)] rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-[var(--color-dusty-blue)]" />
          </div>
          {/* Decorative rings */}
          <div className="absolute -inset-4 border-2 border-[var(--color-dusty-rose)]/30 rounded-full"></div>
          <div className="absolute -inset-8 border border-[var(--color-dusty-blue)]/20 rounded-full"></div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl text-[var(--color-charcoal)] mb-4">
          Photography
        </h1>
        <div className="floral-divider w-24 mx-auto mb-6"></div>

        {/* Coming Soon Message */}
        <p className="text-2xl text-[var(--color-dusty-blue)] mb-4">
          Coming Soon
        </p>
        <p className="text-[var(--color-warm-gray)] leading-relaxed mb-8">
          After our special day, we&apos;ll share all the beautiful moments 
          captured by our photographer here. Check back after the wedding 
          to relive the memories with us!
        </p>


        <Link href="/" className="btn-secondary inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

