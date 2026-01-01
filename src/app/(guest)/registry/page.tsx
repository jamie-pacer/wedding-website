"use client";

import { useState } from "react";
import { Mountain, Hotel, Snowflake, Cable, Loader2 } from "lucide-react";

interface RegistryItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number; // Hard-coded for now, will be dynamic later
  suggestedAmounts: number[];
}

const registryItems: RegistryItem[] = [
  {
    id: "accommodation",
    icon: <Hotel className="w-6 h-6" />,
    title: "Cosy Chalet Stay",
    description: "A week in a beautiful alpine chalet with stunning mountain views and a warm fireplace.",
    targetAmount: 40000,
    raisedAmount: 9500,
    suggestedAmounts: [100, 200, 500, 1000],
  },
  {
    id: "ski-passes",
    icon: <Mountain className="w-6 h-6" />,
    title: "Ski Lift Passes",
    description: "Access to the slopes! Help us hit the pistes with week-long ski passes.",
    targetAmount: 12000,
    raisedAmount: 3000,
    suggestedAmounts: [100, 200, 500, 1000],
  },
  {
    id: "ski-hire",
    icon: <Snowflake className="w-6 h-6" />,
    title: "Ski & Boot Hire",
    description: "Top-quality ski equipment rental so we can carve through the powder in style.",
    targetAmount: 8000,
    raisedAmount: 1600,
    suggestedAmounts: [100, 200, 500, 1000],
  },
  {
    id: "lessons",
    icon: <Cable className="w-6 h-6" />,
    title: "Ski Lessons",
    description: "Professional instruction to improve our technique (and avoid too many tumbles!).",
    targetAmount: 6000,
    raisedAmount: 0,
    suggestedAmounts: [100, 200, 500, 1000],
  },
];

export default function RegistryPage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContribute = (item: RegistryItem) => {
    setSelectedItem(item);
    setSelectedAmount(null);
    setCustomAmount("");
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleProceed = async () => {
    const amount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
    if (amount <= 0 || !selectedItem) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          itemTitle: selectedItem.title,
          itemId: selectedItem.id,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="min-h-screen px-6 pt-28 pb-16"
      style={{
        backgroundImage: "url('/Fabric Texture Background.jpg')",
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
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {registryItems.map((item) => {
              const percentage = Math.min(Math.round((item.raisedAmount / item.targetAmount) * 100), 100);
              return (
                <div
                  key={item.id}
                  className="bg-[var(--color-cream)]/60 rounded-xl p-5 border border-[var(--color-champagne)] hover:border-[var(--color-dusty-blue)]/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-dusty-blue)]/20 flex items-center justify-center flex-shrink-0 text-[var(--color-dusty-blue)]">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg text-[var(--color-charcoal)] font-medium mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[var(--color-warm-gray)] text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[var(--color-warm-gray)]">
                            {percentage}%
                          </span>
                        </div>
                        <div className="h-2 bg-[var(--color-light-gray)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[var(--color-dusty-blue)] to-[var(--color-slate-blue)] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleContribute(item)}
                        className="text-sm font-medium text-[var(--color-dusty-blue)] hover:text-[var(--color-slate-blue)] transition-colors"
                      >
                        Contribute →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="text-center pt-6 border-t border-[var(--color-light-gray)]">
            <p className="text-sm text-[var(--color-warm-gray)]">
              All contributions are optional and deeply appreciated ❤️
            </p>
          </div>
        </div>
      </div>

      {/* Contribution Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[var(--color-dusty-blue)]/20 flex items-center justify-center text-[var(--color-dusty-blue)]">
                  {selectedItem.icon}
                </div>
                <div>
                  <h2 className="text-xl text-[var(--color-charcoal)] font-medium">
                    {selectedItem.title}
                  </h2>
                  <p className="text-sm text-[var(--color-warm-gray)]">
                    Select an amount to contribute
                  </p>
                </div>
              </div>

              {/* Suggested Amounts */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {selectedItem.suggestedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 rounded-lg font-medium transition-colors ${
                      selectedAmount === amount
                        ? "bg-[var(--color-dusty-blue)] text-white"
                        : "bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-champagne)]"
                    }`}
                  >
                    R{amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm text-[var(--color-warm-gray)] mb-2">
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-warm-gray)]">R</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 border border-[var(--color-light-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-dusty-blue)] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 py-3 border-2 border-[var(--color-light-gray)] text-[var(--color-warm-gray)] rounded-lg hover:bg-[var(--color-cream)] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceed}
                  disabled={(!selectedAmount && !customAmount) || isProcessing}
                  className="flex-1 py-3 bg-[var(--color-dusty-blue)] text-white rounded-lg hover:bg-[var(--color-slate-blue)] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue to Payment"
                  )}
                </button>
              </div>

              {/* Stripe Note */}
              <p className="text-center text-xs text-[var(--color-text-light)] mt-4">
                Secure payments powered by Stripe
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
