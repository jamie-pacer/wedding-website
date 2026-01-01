"use client";

import { useState } from "react";
import { RegistryGrid, type RegistryItem } from "@/components/RegistryGrid";
import { RegistryModal } from "@/components/RegistryModal";

export default function RegistryPage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  const handleContribute = (item: RegistryItem) => {
    setSelectedItem(item);
  };

  const handleProceed = async (amount: number) => {
    // Payment integration coming soon
    alert("Payment integration is coming soon! Please contact us directly if you'd like to contribute.");
    setSelectedItem(null);
  };

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
      <div className="max-w-4xl mx-auto">
        {/* Content card with backdrop */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl text-[var(--color-charcoal)] mb-4">
              Honeymoon Fund
            </h1>
            <div className="floral-divider w-24 mx-auto mb-6"></div>
            <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-2xl mx-auto">
              Your presence at our wedding is the greatest gift we could ask for. However, if you&apos;d like to 
              contribute to our honeymoon, we&apos;re dreaming of a magical ski trip to the Swiss Alps! 
              Choose an experience below to help make our adventure possible.
            </p>
          </div>

          {/* Registry Items Grid */}
          <RegistryGrid onContribute={handleContribute} />

          {/* Footer Note */}
          <div className="text-center pt-6 border-t border-[var(--color-light-gray)]">
            <p className="text-sm text-[var(--color-warm-gray)]">
              All contributions are optional and deeply appreciated ❤️
            </p>
          </div>
        </div>
      </div>

      {/* Contribution Modal */}
      <RegistryModal 
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
        onProceed={handleProceed}
      />
    </div>
  );
}
