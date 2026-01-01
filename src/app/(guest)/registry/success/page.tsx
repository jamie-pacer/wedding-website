import { Heart, CheckCircle } from "lucide-react";
import Link from "next/link";

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
      <div className="max-w-lg mx-auto">
        {/* Content card with backdrop */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Header */}
          <h1 className="text-4xl text-[var(--color-charcoal)] mb-4">
            Thank You!
          </h1>
          <div className="floral-divider w-24 mx-auto mb-6"></div>
          
          <p className="text-[var(--color-warm-gray)] leading-relaxed mb-6">
            Your generous contribution to our honeymoon fund has been received. 
            We&apos;re so grateful for your love and support as we begin this 
            exciting new chapter together.
          </p>

          <p className="text-[var(--color-dusty-blue)] font-medium mb-8">
            We can&apos;t wait to share our adventure with you! ⛷️
          </p>

          {/* Heart decoration */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-dusty-rose)]"></div>
            <Heart className="w-5 h-5 text-[var(--color-dusty-rose)] fill-[var(--color-dusty-rose)]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-dusty-rose)]"></div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/registry"
              className="px-6 py-3 border-2 border-[var(--color-dusty-blue)] text-[var(--color-dusty-blue)] rounded-lg hover:bg-[var(--color-dusty-blue)]/10 transition-colors font-medium flex items-center justify-center"
            >
              Back to Registry
            </Link>
            <Link 
              href="/"
              className="px-6 py-3 bg-[var(--color-dusty-blue)] text-white rounded-lg hover:bg-[var(--color-slate-blue)] transition-colors font-medium flex items-center justify-center"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

