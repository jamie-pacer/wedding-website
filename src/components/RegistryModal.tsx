"use client";

import { useState } from "react";

interface RegistryItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  suggestedAmounts: number[];
}

interface RegistryModalProps {
  selectedItem: RegistryItem | null;
  onClose: () => void;
  onProceed: (amount: number) => void;
}

export function RegistryModal({ selectedItem, onClose, onProceed }: RegistryModalProps) {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  if (!selectedItem) return null;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleProceed = () => {
    const amount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
    if (amount <= 0) return;
    onProceed(amount);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
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
              onClick={onClose}
              className="flex-1 py-3 border-2 border-[var(--color-light-gray)] text-[var(--color-warm-gray)] rounded-lg hover:bg-[var(--color-cream)] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              disabled={!selectedAmount && !customAmount}
              className="flex-1 py-3 bg-[var(--color-dusty-blue)] text-white rounded-lg hover:bg-[var(--color-slate-blue)] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

