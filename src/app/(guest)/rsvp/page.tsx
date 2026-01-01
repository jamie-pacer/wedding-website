"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Send, Check, Minus, Search, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdditionalGuest {
  id: string;
  name: string;
  dietaryRequirements: string;
}

interface Guest {
  id: string;
  name: string;
  email: string | null;
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
      const { data, error } = await supabase
        .from("guests")
        .select("id, name, email")
        .ilike("name", `%${searchQuery}%`)
        .limit(5);

      if (!error && data) {
        setSearchResults(data);
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

      const { data, error } = await query;

      if (!error && data) {
        setAdditionalSearchResults(data);
        setShowAdditionalDropdown(true);
      }
      setIsSearchingAdditional(false);
    };

    const debounce = setTimeout(searchAdditionalGuests, 300);
    return () => clearTimeout(debounce);
  }, [additionalSearchQuery, selectedGuest, formData.additionalGuests]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (additionalSearchRef.current && !additionalSearchRef.current.contains(event.target as Node)) {
        setShowAdditionalDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    if (!selectedGuest || !formData.email) return;
    
    const supabase = getSupabase();
    if (!supabase) {
      alert("Unable to connect. Please refresh the page.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Update primary guest record with email
    await supabase
      .from("guests")
      .update({ email: formData.email })
      .eq("id", selectedGuest.id);

    // Create RSVP record for primary guest
    const { error } = await supabase.from("rsvps").insert({
      guest_id: selectedGuest.id,
      name: selectedGuest.name,
      email: formData.email,
      attending: formData.attending,
      guest_count: 1 + formData.additionalGuests.length,
      dietary_requirements: formData.dietaryRequirements || null,
      song_request: formData.songRequest || null,
      message: formData.message || null,
      additional_guests: JSON.parse(JSON.stringify(formData.additionalGuests)),
    });

    if (error) {
      console.error("RSVP Error:", error);
      alert("There was an error submitting your RSVP. Please try again.");
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
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

  if (isSubmitted) {
    return (
      <div 
        className="min-h-screen px-6 pt-28 pb-16 flex items-center justify-center"
        style={{
          backgroundImage: "url('/Fabric Texture Background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg text-center animate-fade-in">
            <div className="w-20 h-20 bg-[var(--color-sage)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl text-[var(--color-charcoal)] mb-4">
              Thank You!
            </h1>
            <p className="text-[var(--color-warm-gray)] mb-6">
              {formData.attending === "yes" 
                ? "We're so excited to celebrate with you! You'll receive a confirmation email shortly."
                : "We're sorry you can't make it. Thank you for letting us know."}
            </p>
            <div className="flex items-center justify-center gap-2 text-[var(--color-dusty-rose)]">
              <Heart className="w-5 h-5 fill-current" />
              <span>Natalie & James</span>
              <Heart className="w-5 h-5 fill-current" />
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
              RSVP
            </h1>
            <div className="floral-divider w-24 mx-auto mb-6"></div>
            <p className="text-[var(--color-warm-gray)]">
              Please respond by 24th July 2026
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Guest Search / Selection */}
            <div className="space-y-2" ref={searchRef}>
              <label className="block text-[var(--color-charcoal)] font-medium">
                Your Name <span className="text-[var(--color-dusty-rose)]">*</span>
              </label>
              
              {selectedGuest ? (
                <div className="p-4 bg-[var(--color-ivory)] rounded-lg flex items-center justify-between">
                  <p className="font-medium text-[var(--color-charcoal)]">{selectedGuest.name}</p>
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="text-sm text-[var(--color-dusty-blue)] hover:underline"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-warm-gray)]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-[var(--color-light-gray)] rounded-lg bg-white focus:border-[var(--color-dusty-blue)] transition-colors"
                      placeholder="Start typing your name..."
                    />
                    {isSearching && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-[var(--color-dusty-blue)]/30 border-t-[var(--color-dusty-blue)] rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Dropdown Results */}
                  {showDropdown && searchResults.length > 0 && (
                    <div className="bg-white border border-[var(--color-light-gray)] rounded-lg shadow-lg overflow-hidden">
                      {searchResults.map((guest) => (
                        <button
                          key={guest.id}
                          type="button"
                          onClick={() => handleSelectGuest(guest)}
                          className="w-full px-4 py-3 text-left hover:bg-[var(--color-ivory)] transition-colors border-b border-[var(--color-light-gray)] last:border-b-0"
                        >
                          <span className="font-medium text-[var(--color-charcoal)]">{guest.name}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {showDropdown && searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
                    <div className="p-4 bg-[var(--color-ivory)] rounded-lg text-center">
                      <p className="text-[var(--color-warm-gray)]">
                        No guests found matching &ldquo;{searchQuery}&rdquo;
                      </p>
                      <p className="text-sm text-[var(--color-text-light)] mt-1">
                        Please check the spelling or contact us if you think this is an error.
                      </p>
                    </div>
                  )}
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg bg-white focus:border-[var(--color-dusty-blue)] transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Attending */}
            <div className="space-y-4">
              <label className="block text-[var(--color-charcoal)] font-medium">
                Will you be attending? <span className="text-[var(--color-dusty-rose)]">*</span>
              </label>
              <div className="flex gap-4">
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
                  <div className="w-full py-4 px-6 text-center border-2 border-[var(--color-light-gray)] rounded-lg cursor-pointer transition-all peer-checked:border-[var(--color-sage)] peer-checked:bg-[var(--color-sage)]/10 hover:border-[var(--color-sage)]">
                    <span className="font-medium text-[var(--color-charcoal)]">Joyfully Accept</span>
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === "no"}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    className="sr-only peer"
                  />
                  <div className="w-full py-4 px-6 text-center border-2 border-[var(--color-light-gray)] rounded-lg cursor-pointer transition-all peer-checked:border-[var(--color-dusty-rose)] peer-checked:bg-[var(--color-dusty-rose)]/10 hover:border-[var(--color-dusty-rose)]">
                    <span className="font-medium text-[var(--color-charcoal)]">Regretfully Decline</span>
                  </div>
                </label>
              </div>
            </div>

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
                    <div key={guest.id} className="p-4 bg-[var(--color-ivory)] rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[var(--color-charcoal)]">
                          {guest.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeGuest(index)}
                          className="text-[var(--color-dusty-rose)] hover:text-red-600 transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={guest.dietaryRequirements}
                        onChange={(e) => updateGuestDietary(index, e.target.value)}
                        className="w-full px-4 py-2 border border-[var(--color-light-gray)] rounded-lg bg-white"
                        placeholder="Dietary requirements (if any)"
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
                          className="w-full pl-12 pr-4 py-3 border border-[var(--color-light-gray)] rounded-lg bg-white focus:border-[var(--color-dusty-blue)] transition-colors"
                          placeholder="Search for guest..."
                          autoFocus
                        />
                        {isSearchingAdditional && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-[var(--color-dusty-blue)]/30 border-t-[var(--color-dusty-blue)] rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Dropdown Results */}
                      {showAdditionalDropdown && additionalSearchResults.length > 0 && (
                        <div className="bg-white border border-[var(--color-light-gray)] rounded-lg shadow-lg overflow-hidden">
                          {additionalSearchResults.map((guest) => (
                            <button
                              key={guest.id}
                              type="button"
                              onClick={() => handleSelectAdditionalGuest(guest)}
                              className="w-full px-4 py-3 text-left hover:bg-[var(--color-ivory)] transition-colors border-b border-[var(--color-light-gray)] last:border-b-0"
                            >
                              <span className="font-medium text-[var(--color-charcoal)]">{guest.name}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {showAdditionalDropdown && additionalSearchQuery.length >= 2 && additionalSearchResults.length === 0 && !isSearchingAdditional && (
                        <div className="p-3 bg-[var(--color-ivory)] rounded-lg text-center">
                          <p className="text-sm text-[var(--color-warm-gray)]">
                            No guests found matching &ldquo;{additionalSearchQuery}&rdquo;
                          </p>
                        </div>
                      )}

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
                      className="w-full py-3 border-2 border-dashed border-[var(--color-light-gray)] rounded-lg text-[var(--color-warm-gray)] hover:border-[var(--color-dusty-blue)] hover:text-[var(--color-dusty-blue)] transition-colors flex items-center justify-center gap-2"
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
                    className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg bg-white focus:border-[var(--color-dusty-blue)] transition-colors"
                    placeholder="e.g., Vegetarian, Gluten-free, Allergies..."
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
                    className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg bg-white focus:border-[var(--color-dusty-blue)] transition-colors"
                    placeholder="What song will get you on the dance floor?"
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
                className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg bg-white focus:border-[var(--color-dusty-blue)] transition-colors resize-none"
                placeholder="Share your well wishes or let us know if there's anything we should know..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.attending || !formData.email || !selectedGuest}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send RSVP
                </>
              )}
            </button>
          </form>

          {/* Note */}
          <p className="text-center text-[var(--color-text-light)] text-sm mt-8 pt-6 border-t border-[var(--color-light-gray)]">
            Can&apos;t find your name or have questions about plus ones? Please contact one of us directly.
          </p>
        </div>
      </div>
    </div>
  );
}
