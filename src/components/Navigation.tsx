"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/accommodation", label: "Accommodation" },
  { href: "/registry", label: "Gifts" },
  { href: "/transport", label: "Transport" },
  { href: "/photo-booth", label: "Live Moments" },
  { href: "/photography", label: "Photography" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-cream)]/95 backdrop-blur-sm border-b border-[var(--color-light-gray)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center h-20">
            {/* Logo with illustration on desktop */}
            <Link 
              href="/" 
              className="flex items-center gap-2 text-3xl text-[var(--color-charcoal)] hover:text-[var(--color-slate-blue)] transition-colors"
            >
              <span>N <span className="text-[var(--color-dusty-rose)]">&</span> J</span>
              <Image 
                src="/couple-illustration.png" 
                alt="Natalie & James" 
                width={48} 
                height={48}
                className="hidden md:block"
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center gap-10 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors font-light tracking-wide relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-[var(--color-charcoal)] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Spacer to balance the logo on desktop */}
            <div className="hidden md:block w-[100px]"></div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[var(--color-charcoal)] ml-auto transition-transform duration-300"
              aria-label="Toggle menu"
            >
              <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Separate overlay */}
      <div 
        className={`fixed top-20 left-0 right-0 z-40 md:hidden transition-all duration-400 ease-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-[var(--color-champagne)] py-3 rounded-b-[2rem] shadow-xl">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-6 py-2.5 text-[var(--color-charcoal)] hover:text-[var(--color-slate-blue)] transition-colors tracking-wide text-center"
              style={{
                transitionDelay: isOpen ? `${index * 40}ms` : '0ms',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

