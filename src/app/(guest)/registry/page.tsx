"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

const suggestedAmounts = [50, 100, 250, 500, 1000];

export default function RegistryPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [contributorName, setContributorName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activeAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  const handleContribute = async () => {
    if (activeAmount < 10) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: activeAmount,
          contributorName: contributorName.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
      <div className="max-w-2xl mx-auto animate-float-in">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-8 md:p-12 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] relative">
          {/* Elegant inner border */}
          <div className="absolute inset-4 md:inset-6 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl text-[var(--color-charcoal)] mb-4 font-serif tracking-wide">
                Honeymoon Fund
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-[var(--color-dusty-rose)]/40"></div>
                <Heart className="w-3.5 h-3.5 text-[var(--color-dusty-rose)] fill-[var(--color-dusty-rose)]" />
                <div className="h-px w-12 bg-[var(--color-dusty-rose)]/40"></div>
              </div>
              <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-lg mx-auto text-sm">
                Your presence at our wedding is the greatest gift we could ask for. 
                For those who would really like to share a gift with us, as we are based 
                in the UK and unable to accept physical gifts, we would massively appreciate 
                any contributions towards our dream honeymoon!
              </p>
              <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-lg mx-auto text-sm mt-4">
                We will be sharing 15% of your contributions with Waves for Change in Cape Town.{" "}
                <a 
                  href="https://waves-for-change.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--color-dusty-blue)] hover:text-[var(--color-slate-blue)] underline underline-offset-2"
                >
                  Find out more about them here
                </a>.
              </p>
            </div>

            {/* Contribution Section */}
            <div className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm text-[var(--color-warm-gray)] mb-3 text-center uppercase tracking-wide">
                  Select an amount
                </label>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        selectedAmount === amount
                          ? "bg-[var(--color-dusty-blue)] text-white"
                          : "bg-white text-[var(--color-charcoal)] border border-[var(--color-light-gray)] hover:border-[var(--color-dusty-blue)] hover:text-[var(--color-dusty-blue)]"
                      }`}
                    >
                      R{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                
                {/* Custom Amount */}
                <div className="max-w-[200px] mx-auto">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-warm-gray)]">R</span>
                    <input
                      type="number"
                      min="10"
                      step="10"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      placeholder="Other"
                      className="w-full pl-7 pr-3 py-2 text-sm border border-[var(--color-light-gray)] text-center focus:border-[var(--color-dusty-blue)] transition-colors outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Details */}
              <div className="border-t border-[var(--color-light-gray)] pt-6">
                <p className="text-xs text-center text-[var(--color-warm-gray)] mb-4 uppercase tracking-wide">
                  Optional: Leave your name and a message
                </p>
                <div className="space-y-3 max-w-md mx-auto">
                  <input
                    type="text"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 text-sm border border-[var(--color-light-gray)] focus:border-[var(--color-dusty-blue)] transition-colors outline-none"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="A message for the happy couple..."
                    rows={2}
                    className="w-full px-3 py-2.5 text-sm border border-[var(--color-light-gray)] focus:border-[var(--color-dusty-blue)] transition-colors outline-none resize-none"
                  />
                </div>
              </div>

              {/* Contribute Button */}
              <div className="text-center pt-2">
                <button
                  onClick={handleContribute}
                  disabled={activeAmount < 10 || isLoading}
                  className="inline-block px-8 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.15em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--color-charcoal)]"
                >
                  {isLoading ? (
                    "Processing..."
                  ) : activeAmount >= 10 ? (
                    `Contribute R${activeAmount.toLocaleString()}`
                  ) : (
                    "Select an amount"
                  )}
                </button>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-8 pt-6 border-t border-[var(--color-light-gray)]">
              <p className="text-sm text-[var(--color-warm-gray)]">
                All contributions are optional and deeply appreciated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
