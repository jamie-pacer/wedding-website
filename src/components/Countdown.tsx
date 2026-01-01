"use client";

import { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2026-10-24T15:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = WEDDING_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Set initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { value: timeLeft?.days ?? "---", label: "Days" },
    { value: timeLeft?.hours ?? "---", label: "Hours" },
    { value: timeLeft?.minutes ?? "---", label: "Minutes" },
    { value: timeLeft?.seconds ?? "---", label: "Seconds" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
      {items.map((item) => (
        <div key={item.label} className="bg-[var(--color-cream)] rounded-xl p-4 border border-[var(--color-light-gray)]">
          <p className="text-3xl md:text-4xl tabular-nums text-[var(--color-charcoal)]">
            {typeof item.value === "number" ? String(item.value).padStart(2, "0") : item.value}
          </p>
          <p className="text-sm text-[var(--color-warm-gray)] font-light">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

