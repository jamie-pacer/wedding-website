"use client";

import { Heart, Check } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ThankYouPage() {
  useEffect(() => {
    // Create confetti elements
    const confettiCount = 50;
    const colors = ['#D4A5A5', '#B5C4B1', '#8BA8B8', '#E8C4C4', '#9DB4A0'];
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.opacity = (Math.random() * 0.5 + 0.5).toString();
      document.body.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => confetti.remove(), 5000);
    }
  }, []);

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
              Thank You!
            </h1>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
              <Heart className="w-4 h-4 text-[var(--color-dusty-rose)] fill-[var(--color-dusty-rose)]" />
              <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
            </div>
            
            {/* Message */}
            <p className="text-[var(--color-warm-gray)] leading-relaxed text-lg mb-10">
              We appreciate your support so much and can&apos;t wait to share our adventures with you!
            </p>

            {/* Action */}
            <Link 
              href="/"
              className="inline-block px-8 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
