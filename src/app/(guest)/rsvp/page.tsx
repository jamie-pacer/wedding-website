"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Send, Check, Minus, Search, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import confetti from "canvas-confetti";

interface AdditionalGuest {
  id: string;
  name: string;
  dietaryRequirements: string;
}

interface Guest {
  id: string;
  name: string;
  email: string | null;
  hasRsvp?: boolean;
}

export default function RSVPPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Guest[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Additional guest search state
  const [additionalSearchQuery, setAdditionalSearchQuery] = useState("");
  const [additionalSearchResults, setAdditionalSearchResults] = useState<Guest[]>([]);
  const [isSearchingAdditional, setIsSearchingAdditional] = useState(false);
  const [showAdditionalDropdown, setShowAdditionalDropdown] = useState(false);
  const [showAddGuestInput, setShowAddGuestInput] = useState(false);
  const additionalSearchRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    attending: "",
    additionalGuests: [] as AdditionalGuest[],
    dietaryRequirements: "",
    songRequest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  
  // Initialize Supabase client only on client side
  const getSupabase = () => {
    if (!supabaseRef.current && typeof window !== 'undefined') {
      supabaseRef.current = createClient();
    }
    return supabaseRef.current;
  };

  // Search for primary guest as user types
  useEffect(() => {
    const searchGuests = async () => {
      if (searchQuery.length < 2 || selectedGuest) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      const supabase = getSupabase();
      if (!supabase) return;

      setIsSearching(true);
      const { data: guestsData, error: guestsError } = await supabase
        .from("guests")
        .select("id, name, email")
        .ilike("name", `%${searchQuery}%`)
        .limit(5);

      if (!guestsError && guestsData) {
        // Check which guests have already submitted RSVPs
        const guestIds = guestsData.map(g => g.id);
        const { data: rsvpsData } = await supabase
          .from("rsvps")
          .select("guest_id")
          .in("guest_id", guestIds);

        const rsvpGuestIds = new Set(rsvpsData?.map(r => r.guest_id) || []);
        
        // Add hasRsvp flag to each guest
        const guestsWithRsvpStatus = guestsData.map(guest => ({
          ...guest,
          hasRsvp: rsvpGuestIds.has(guest.id)
        }));

        setSearchResults(guestsWithRsvpStatus);
        setShowDropdown(true);
      }
      setIsSearching(false);
    };

    const debounce = setTimeout(searchGuests, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, selectedGuest]);

  // Search for additional guests
  useEffect(() => {
    const searchAdditionalGuests = async () => {
      if (additionalSearchQuery.length < 2) {
        setAdditionalSearchResults([]);
        setShowAdditionalDropdown(false);
        return;
      }

      const supabase = getSupabase();
      if (!supabase) return;

      setIsSearchingAdditional(true);
      
      // Get IDs of already selected guests to exclude them
      const excludeIds = [
        selectedGuest?.id,
        ...formData.additionalGuests.map(g => g.id)
      ].filter(Boolean);

      let query = supabase
        .from("guests")
        .select("id, name, email")
        .ilike("name", `%${additionalSearchQuery}%`)
        .limit(5);

      if (excludeIds.length > 0) {
        query = query.not("id", "in", `(${excludeIds.join(",")})`);
      }

      const { data: guestsData, error: guestsError } = await query;

      if (!guestsError && guestsData) {
        // Check which guests have already submitted RSVPs
        const guestIds = guestsData.map(g => g.id);
        const { data: rsvpsData } = await supabase
          .from("rsvps")
          .select("guest_id")
          .in("guest_id", guestIds);

        const rsvpGuestIds = new Set(rsvpsData?.map(r => r.guest_id) || []);
        
        // Add hasRsvp flag to each guest
        const guestsWithRsvpStatus = guestsData.map(guest => ({
          ...guest,
          hasRsvp: rsvpGuestIds.has(guest.id)
        }));

        setAdditionalSearchResults(guestsWithRsvpStatus);
        setShowAdditionalDropdown(true);
      }
      setIsSearchingAdditional(false);
    };

    const debounce = setTimeout(searchAdditionalGuests, 300);
    return () => clearTimeout(debounce);
  }, [additionalSearchQuery, selectedGuest, formData.additionalGuests]);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (additionalSearchRef.current && !additionalSearchRef.current.contains(event.target as Node)) {
        setShowAdditionalDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
        setShowAdditionalDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setSearchQuery(guest.name);
    setShowDropdown(false);
    if (guest.email) {
      setFormData(prev => ({ ...prev, email: guest.email || "" }));
    }
  };

  const handleSelectAdditionalGuest = (guest: Guest) => {
    setFormData({
      ...formData,
      additionalGuests: [
        ...formData.additionalGuests,
        { id: guest.id, name: guest.name, dietaryRequirements: "" }
      ],
    });
    setAdditionalSearchQuery("");
    setShowAdditionalDropdown(false);
    setShowAddGuestInput(false);
  };

  const handleClearSelection = () => {
    setSelectedGuest(null);
    setSearchQuery("");
    setFormData({
      email: "",
      attending: "",
      additionalGuests: [],
      dietaryRequirements: "",
      songRequest: "",
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!selectedGuest) {
      setError("Please select your name from the guest list.");
      return;
    }
    
    if (!formData.email) {
      setError("Please enter your email address.");
      return;
    }
    
    if (!formData.attending) {
      setError("Please indicate whether you will be attending.");
      return;
    }
    
    const supabase = getSupabase();
    if (!supabase) {
      setError("Unable to connect. Please refresh the page and try again.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Update primary guest record with email
    await supabase
      .from("guests")
      .update({ email: formData.email })
      .eq("id", selectedGuest.id);

    // Build RSVP records for primary guest and all additional guests
    const rsvpRecords = [
      // Primary guest RSVP
      {
        guest_id: selectedGuest.id,
        name: selectedGuest.name,
        email: formData.email,
        attending: formData.attending,
        guest_count: 1 + formData.additionalGuests.length,
        dietary_requirements: formData.dietaryRequirements || null,
        song_request: formData.songRequest || null,
        message: formData.message || null,
        additional_guests: JSON.parse(JSON.stringify(formData.additionalGuests)),
      },
      // Additional guests RSVPs (same attending status, their own dietary requirements)
      ...formData.additionalGuests.map((guest) => ({
        guest_id: guest.id,
        name: guest.name,
        email: formData.email, // Use primary guest's email as contact
        attending: formData.attending,
        guest_count: 1,
        dietary_requirements: guest.dietaryRequirements || null,
        song_request: null,
        message: null,
        additional_guests: null,
      })),
    ];

    // Insert all RSVP records
    const { error: insertError } = await supabase.from("rsvps").insert(rsvpRecords);

    if (insertError) {
      console.error("RSVP Error:", {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint,
      });
      
      // Check for duplicate RSVP (unique constraint violation)
      if (insertError.code === "23505") {
        setError("You have already submitted an RSVP. If you need to make changes, please contact us.");
      } else {
        setError("There was an error submitting your RSVP. Please try again.");
      }
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Scroll to top to show thank you message
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Trigger canvas-confetti animation
    if (formData.attending === "yes") {
      const colors = ['#D4A5A5', '#B5C4B1', '#8BA8B8', '#E8C4C4', '#9DB4A0'];
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  };

  const removeGuest = (index: number) => {
    const newGuests = formData.additionalGuests.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      additionalGuests: newGuests,
    });
  };

  const updateGuestDietary = (index: number, value: string) => {
    const newGuests = [...formData.additionalGuests];
    newGuests[index] = { ...newGuests[index], dietaryRequirements: value };
    setFormData({ ...formData, additionalGuests: newGuests });
  };

  const totalGuests = 1 + formData.additionalGuests.length;

  // Get missing required fields for tooltip
  const getMissingFields = () => {
    const missing: string[] = [];
    if (!selectedGuest) missing.push("Select your name");
    if (!formData.email) missing.push("Enter your email");
    if (!formData.attending) missing.push("Select attendance");
    return missing;
  };

  const missingFields = getMissingFields();
  const isFormIncomplete = missingFields.length > 0;

  if (isSubmitted) {
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
                {formData.attending === "yes" 
                  ? "We're so excited to celebrate with you!"
                  : "We're sorry you can't make it. Thank you for letting us know."}
              </p>

              {/* Action */}
              <a 
                href="/"
                className="inline-block px-8 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      <div className="max-w-3xl mx-auto animate-float-in">
        {/* Content card - Classic elegant style */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--color-dusty-rose)]/30 p-10 md:p-16 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] relative">
          {/* Elegant inner border decoration */}
          <div className="absolute inset-4 md:inset-6 border border-[var(--color-dusty-rose)]/40 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl text-[var(--color-charcoal)] mb-6 font-serif tracking-wide">
                RSVP
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
                <div className="w-1.5 h-1.5 bg-[var(--color-dusty-rose)]/60 rotate-45"></div>
                <div className="h-px w-16 bg-[var(--color-dusty-rose)]/40"></div>
              </div>
              <p className="text-[var(--color-warm-gray)] text-lg tracking-wide">
                Please respond by 24th July 2026
              </p>
            </div>

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Error Message */}
            {error && (
              <div 
                role="alert" 
                aria-live="assertive"
                className="p-4 border-2 border-red-300 bg-red-50 text-red-700"
              >
                <p className="font-medium">{error}</p>
              </div>
            )}
            
            {/* Guest Search / Selection */}
            <div className="space-y-2" ref={searchRef}>
              <label htmlFor="guest-search" className="block text-[var(--color-charcoal)] font-medium">
                Your Name <span className="text-[var(--color-dusty-rose)]" aria-label="required">*</span>
              </label>
              
              {selectedGuest ? (
                <div className="px-4 py-2.5 border-2 border-[var(--color-dusty-rose)]/20 bg-[var(--color-cream)]/50 flex items-center justify-between min-h-[42px]">
                  <p className="font-medium text-[var(--color-charcoal)] leading-normal">{selectedGuest.name}</p>
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="text-sm text-[var(--color-dusty-rose)] hover:text-[var(--color-charcoal)] transition-colors underline decoration-[var(--color-dusty-rose)]/30 hover:decoration-[var(--color-dusty-rose)]"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-warm-gray)] pointer-events-none" aria-hidden="true" />
                    <input
                      id="guest-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 border-2 border-[var(--color-light-gray)] bg-white focus:border-[var(--color-dusty-rose)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)]/20 transition-colors text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]/60 leading-[1.5]"
                      placeholder="Start typing your name..."
                      aria-label="Search for your name"
                      aria-expanded={showDropdown}
                      aria-autocomplete="list"
                      aria-controls="guest-results"
                      autoComplete="off"
                      style={{ lineHeight: '1.5' }}
                    />
                    {isSearching && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-[var(--color-dusty-blue)]/30 border-t-[var(--color-dusty-blue)] rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {/* Dropdown Results - Overlay */}
                    {showDropdown && searchResults.length > 0 && (
                      <ul
                        id="guest-results"
                        role="listbox"
                        className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[var(--color-light-gray)] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden z-50 max-h-60 overflow-y-auto"
                        aria-label="Search results"
                      >
                      {searchResults.map((guest, index) => (
                        <li key={guest.id} role="option" aria-selected={false}>
                          {guest.hasRsvp ? (
                            <div className="w-full px-5 py-3 flex items-center justify-between border-b border-[var(--color-light-gray)]/50 last:border-b-0">
                              <span className="font-medium text-[var(--color-text-light)]">{guest.name}</span>
                              <span className="text-xs text-[var(--color-text-light)] italic">RSVP Sent</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSelectGuest(guest)}
                              className="w-full px-5 py-3 text-left hover:bg-[var(--color-cream)]/50 focus:bg-[var(--color-cream)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)]/20 transition-colors border-b border-[var(--color-light-gray)]/50 last:border-b-0"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleSelectGuest(guest);
                                }
                              }}
                            >
                              <span className="font-medium text-[var(--color-charcoal)]">{guest.name}</span>
                            </button>
                          )}
                        </li>
                      ))}
                      </ul>
                    )}

                    {/* No results message - Overlay */}
                    {showDropdown && searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
                      <div className="absolute top-full left-0 right-0 mt-1 p-5 border-2 border-[var(--color-light-gray)] bg-[var(--color-cream)]/30 text-center z-50" role="status" aria-live="polite">
                        <p className="text-[var(--color-warm-gray)]">
                          No guests found matching &ldquo;{searchQuery}&rdquo;
                        </p>
                        <p className="text-sm text-[var(--color-text-light)] mt-2">
                          Please check the spelling or contact us if you think this is an error.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-[var(--color-charcoal)] font-medium"
              >
                Your Email Address <span className="text-[var(--color-dusty-rose)]">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setError(null);
                }}
                className="w-full px-4 py-2.5 border-2 border-[var(--color-light-gray)] bg-white focus:border-[var(--color-dusty-rose)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)]/20 transition-colors text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]/60 leading-normal"
                placeholder="your@email.com"
                aria-required="true"
                autoComplete="email"
              />
            </div>

            {/* Attending */}
            <fieldset className="space-y-4">
              <legend className="block text-[var(--color-charcoal)] font-medium mb-2">
                Will you be attending? <span className="text-[var(--color-dusty-rose)]" aria-label="required">*</span>
              </legend>
              <div className="flex gap-4" role="radiogroup" aria-required="true">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === "yes"}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    className="sr-only peer"
                    required
                  />
                  <div className="w-full py-5 px-6 text-center border-2 border-[var(--color-light-gray)] bg-white cursor-pointer transition-all peer-checked:border-[var(--color-sage)] peer-checked:bg-[var(--color-cream)]/30 hover:border-[var(--color-sage)]/50 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-dusty-rose)]/20">
                    <span className="font-medium text-[var(--color-charcoal)] tracking-wide">Joyfully Accept</span>
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === "no"}
                    onChange={(e) => {
                      setFormData({ ...formData, attending: e.target.value });
                      setError(null);
                    }}
                    className="sr-only peer"
                    aria-label="Regretfully Decline"
                  />
                  <div className="w-full py-5 px-6 text-center border-2 border-[var(--color-light-gray)] bg-white cursor-pointer transition-all peer-checked:border-[var(--color-dusty-rose)] peer-checked:bg-[var(--color-cream)]/30 hover:border-[var(--color-dusty-rose)]/50 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-dusty-rose)]/20">
                    <span className="font-medium text-[var(--color-charcoal)] tracking-wide">Regretfully Decline</span>
                  </div>
                </label>
              </div>
            </fieldset>

            {/* Additional Guests - Only show if attending */}
            {formData.attending === "yes" && (
              <>
                {/* Others in Party */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-[var(--color-charcoal)] font-medium">
                      Others in Your Party
                    </label>
                    <span className="text-sm text-[var(--color-text-light)]">
                      Total: {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                  
                  <p className="text-sm text-[var(--color-warm-gray)]">
                    RSVPing for others on the guest list? Add them below.
                  </p>
                  
                  {/* Added guests */}
                  {formData.additionalGuests.map((guest, index) => (
                    <div key={guest.id} className="p-5 border-2 border-[var(--color-light-gray)] bg-[var(--color-cream)]/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[var(--color-charcoal)] text-lg">
                          {guest.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeGuest(index)}
                          className="text-[var(--color-dusty-rose)] hover:text-[var(--color-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)]/20 rounded transition-colors"
                          aria-label={`Remove ${guest.name}`}
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={guest.dietaryRequirements}
                        onChange={(e) => updateGuestDietary(index, e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-[var(--color-light-gray)] bg-white focus:border-[var(--color-dusty-rose)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)]/20 transition-colors leading-normal"
                        placeholder="Dietary requirements (if any)"
                        aria-label={`Dietary requirements for ${guest.name}`}
                      />
                    </div>
                  ))}

                  {/* Add guest search */}
                  {showAddGuestInput ? (
                    <div className="space-y-2" ref={additionalSearchRef}>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-warm-gray)]" />
                        <input
                          type="text"
                          value={additionalSearchQuery}
                          onChange={(e) => setAdditionalSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-2.5 border-2 border-[var(--color-light-gray)] bg-white focus:border-[var(--color-dusty-rose)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)]/20 transition-colors leading-normal"
                          placeholder="Search for guest..."
                          autoFocus
                          aria-label="Search for additional guest"
                          aria-expanded={showAdditionalDropdown}
                          aria-autocomplete="list"
                          autoComplete="off"
                        />
                        {isSearchingAdditional && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-[var(--color-dusty-blue)]/30 border-t-[var(--color-dusty-blue)] rounded-full animate-spin"></div>
                          </div>
                        )}
                        
                        {/* Dropdown Results - Overlay */}
                        {showAdditionalDropdown && additionalSearchResults.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[var(--color-light-gray)] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden z-50 max-h-60 overflow-y-auto">
                            {additionalSearchResults.map((guest) => (
                              guest.hasRsvp ? (
                                <div key={guest.id} className="w-full px-5 py-3 flex items-center justify-between border-b border-[var(--color-light-gray)]/50 last:border-b-0">
                                  <span className="font-medium text-[var(--color-text-light)]">{guest.name}</span>
                                  <span className="text-xs text-[var(--color-text-light)] italic">RSVP Sent</span>
                                </div>
                              ) : (
                                <button
                                  key={guest.id}
                                  type="button"
                                  onClick={() => handleSelectAdditionalGuest(guest)}
                                  className="w-full px-5 py-3 text-left hover:bg-[var(--color-cream)]/50 transition-colors border-b border-[var(--color-light-gray)]/50 last:border-b-0"
                                >
                                  <span className="font-medium text-[var(--color-charcoal)]">{guest.name}</span>
                                </button>
                              )
                            ))}
                          </div>
                        )}

                        {/* No results message - Overlay */}
                        {showAdditionalDropdown && additionalSearchQuery.length >= 2 && additionalSearchResults.length === 0 && !isSearchingAdditional && (
                          <div className="absolute top-full left-0 right-0 mt-1 p-4 border-2 border-[var(--color-light-gray)] bg-[var(--color-cream)]/30 text-center z-50">
                            <p className="text-sm text-[var(--color-warm-gray)]">
                              No guests found matching &ldquo;{additionalSearchQuery}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setShowAddGuestInput(false);
                          setAdditionalSearchQuery("");
                        }}
                        className="text-sm text-[var(--color-text-light)] hover:text-[var(--color-charcoal)]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAddGuestInput(true)}
                      className="w-full py-4 border-2 border-dashed border-[var(--color-light-gray)] text-[var(--color-warm-gray)] hover:border-[var(--color-dusty-rose)]/50 hover:text-[var(--color-dusty-rose)] transition-colors flex items-center justify-center gap-2 bg-white"
                    >
                      <UserPlus className="w-5 h-5" />
                      Add Another Guest
                    </button>
                  )}
                </div>

                {/* Dietary Requirements */}
                <div className="space-y-2">
                  <label 
                    htmlFor="dietary" 
                    className="block text-[var(--color-charcoal)] font-medium"
                  >
                    Your Dietary Requirements
                  </label>
                  <input
                    type="text"
                    id="dietary"
                    value={formData.dietaryRequirements}
                    onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-[var(--color-light-gray)] bg-white focus:border-[var(--color-dusty-rose)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)]/20 transition-colors text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]/60 leading-normal"
                    placeholder="e.g., Vegetarian, Gluten-free, Allergies..."
                    autoComplete="off"
                  />
                </div>

                {/* Song Request */}
                <div className="space-y-2">
                  <label 
                    htmlFor="song" 
                    className="block text-[var(--color-charcoal)] font-medium"
                  >
                    Song Request
                  </label>
                  <input
                    type="text"
                    id="song"
                    value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-[var(--color-light-gray)] bg-white focus:border-[var(--color-dusty-rose)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)]/20 transition-colors text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]/60 leading-normal"
                    placeholder="What song will get you on the dance floor?"
                    autoComplete="off"
                  />
                </div>
              </>
            )}

            {/* Message */}
            <div className="space-y-2">
              <label 
                htmlFor="message" 
                className="block text-[var(--color-charcoal)] font-medium"
              >
                Leave Us a Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-[var(--color-light-gray)] bg-white focus:border-[var(--color-dusty-rose)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)]/20 transition-colors resize-none text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]/60 leading-normal"
                placeholder="Share your well wishes or let us know if there's anything we should know..."
                aria-label="Leave us a message"
              />
            </div>

            {/* Submit Button - Classic elegant style */}
            <div className="relative group">
              <button
                type="submit"
                disabled={isSubmitting || isFormIncomplete}
                className="w-full py-4 px-8 border-2 border-[var(--color-dusty-rose)] bg-white text-[var(--color-dusty-rose)] hover:bg-[var(--color-dusty-rose)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-dusty-rose)] focus:ring-offset-2 transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[var(--color-dusty-rose)]"
                aria-label={isSubmitting ? "Submitting RSVP" : "Submit RSVP"}
              >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[var(--color-dusty-rose)]/30 border-t-[var(--color-dusty-rose)] rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send RSVP
                </>
              )}
              </button>
              
              {/* Tooltip for incomplete form */}
              {isFormIncomplete && !isSubmitting && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-[var(--color-charcoal)] text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-[200px]">
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[var(--color-charcoal)]"></div>
                  <p className="font-medium mb-2">Please complete:</p>
                  <ul className="space-y-1">
                    {missingFields.map((field, index) => (
                      <li key={index} className="text-xs flex items-start">
                        <span className="mr-2">•</span>
                        <span>{field}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>

            {/* Note */}
            <div className="mt-12 pt-8 border-t-2 border-[var(--color-light-gray)]">
              <p className="text-center text-[var(--color-text-light)] text-sm leading-relaxed">
                Can&apos;t find your name or have questions about plus ones? Please contact one of us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
