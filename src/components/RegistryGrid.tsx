"use client";

import { Mountain, Hotel, Snowflake, Cable } from "lucide-react";

interface RegistryItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
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

interface RegistryGridProps {
  onContribute: (item: RegistryItem) => void;
}

export function RegistryGrid({ onContribute }: RegistryGridProps) {
  return (
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
                  onClick={() => onContribute(item)}
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
  );
}

export type { RegistryItem };

