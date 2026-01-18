"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Drawer } from "vaul";
import { Bus, CheckCircle, AlertCircle, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Select } from "@/components/Select";

interface ShuttleBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PICKUP_OPTIONS = [
  { value: "Forresters Arms, Newlands", label: "Forresters Arms, Newlands" },
  { value: "The Gin Bar, City Center", label: "The Gin Bar, City Center" },
];

const COLLECT_TIME_OPTIONS = [
  { value: "14:00", label: "14:00" },
];

const RETURN_TIME_OPTIONS = [
  { value: "22:00", label: "22:00" },
  { value: "00:00", label: "00:00" },
];

const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8].map((num) => ({
  value: String(num),
  label: `${num} ${num === 1 ? "passenger" : "passengers"}`,
}));

// Hook to detect if we're on mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// Shared form component
function ShuttleForm({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  submitStatus,
  errorMessage,
}: {
  formData: {
    name: string;
    email: string;
    phone: string;
    passengerCount: number;
    pickupLocation: string;
    collectTime: string;
    returnTime: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<typeof formData>>;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  errorMessage: string;
}) {
  return (
    <>
      {/* Important Notice */}
      <div className="bg-[var(--color-cream)] border border-[var(--color-champagne)] p-3 sm:p-4 mb-5">
        <p className="text-xs sm:text-sm text-[var(--color-charcoal)] text-center">
          <span className="font-medium">Important:</span> Shuttle bookings must be confirmed by{" "}
          <span className="font-medium">1st August 2026</span>
        </p>
      </div>

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="flex items-start gap-3 p-3 sm:p-4 mb-5 bg-red-50 border border-red-200 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Form */}
      <form id="shuttle-form" onSubmit={onSubmit} className="space-y-4">
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-[var(--color-charcoal)] mb-1.5 font-medium">
              Full Name <span className="text-[var(--color-dusty-rose)]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-[var(--color-light-gray)] focus:ring-2 focus:ring-[var(--color-dusty-blue)] focus:border-transparent outline-none transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm text-[var(--color-charcoal)] mb-1.5 font-medium">
              Email <span className="text-[var(--color-dusty-rose)]">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-[var(--color-light-gray)] focus:ring-2 focus:ring-[var(--color-dusty-blue)] focus:border-transparent outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Phone & Passengers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-[var(--color-charcoal)] mb-1.5 font-medium">
              Phone Number <span className="text-[var(--color-dusty-rose)]">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-[var(--color-light-gray)] focus:ring-2 focus:ring-[var(--color-dusty-blue)] focus:border-transparent outline-none transition-all"
              placeholder="+27 XX XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm text-[var(--color-charcoal)] mb-1.5 font-medium">
              Passengers <span className="text-[var(--color-dusty-rose)]">*</span>
            </label>
            <Select
              value={String(formData.passengerCount)}
              onValueChange={(value) => setFormData({ ...formData, passengerCount: parseInt(value) })}
              placeholder="Select passengers"
              options={PASSENGER_OPTIONS}
            />
          </div>
        </div>

        {/* Collect/Return Point */}
        <div>
          <label className="block text-xs sm:text-sm text-[var(--color-charcoal)] mb-1.5 font-medium">
            Collect/Return Point <span className="text-[var(--color-dusty-rose)]">*</span>
          </label>
          <Select
            value={formData.pickupLocation}
            onValueChange={(value) => setFormData({ ...formData, pickupLocation: value })}
            placeholder="Select location"
            options={PICKUP_OPTIONS}
          />
        </div>

        {/* Collect Time & Return Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-[var(--color-charcoal)] mb-1.5 font-medium">
              Collect Time <span className="text-[var(--color-dusty-rose)]">*</span>
            </label>
            <Select
              value={formData.collectTime}
              onValueChange={(value) => setFormData({ ...formData, collectTime: value })}
              placeholder="Select time"
              options={COLLECT_TIME_OPTIONS}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm text-[var(--color-charcoal)] mb-1.5 font-medium">
              Return Time <span className="text-[var(--color-dusty-rose)]">*</span>
            </label>
            <Select
              value={formData.returnTime}
              onValueChange={(value) => setFormData({ ...formData, returnTime: value })}
              placeholder="Select time"
              options={RETURN_TIME_OPTIONS}
            />
          </div>
        </div>
      </form>
    </>
  );
}

// Desktop Modal Component
function DesktopModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  submitStatus,
  errorMessage,
}: {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    passengerCount: number;
    pickupLocation: string;
    collectTime: string;
    returnTime: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<typeof formData>>;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  errorMessage: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      // Small delay to ensure DOM is ready before triggering animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle unmounting after exit animation
  const handleTransitionEnd = () => {
    if (!isVisible && !isOpen) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 ease-out ${
        isVisible ? "bg-black/70" : "bg-black/0"
      }`}
      onClick={onClose}
      onTransitionEnd={handleTransitionEnd}
    >
      <div 
        className={`bg-white w-full max-w-xl shadow-2xl border-2 border-[var(--color-dusty-rose)]/30 relative max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-out ${
          isVisible 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative inner border */}
        <div className="absolute inset-3 border border-[var(--color-dusty-rose)]/40 pointer-events-none z-20"></div>

        {submitStatus === "success" ? (
          // Success State
          <div className="p-8 text-center relative z-10">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[var(--color-sage)]/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[var(--color-sage)]" />
            </div>
            <h2 className="text-2xl text-[var(--color-charcoal)] mb-3 font-serif">
              Booking Received
            </h2>
            <p className="text-base text-[var(--color-warm-gray)] mb-5 leading-relaxed">
              Thank you for your shuttle booking request. We&apos;ll be in touch to confirm your reservation.
            </p>
            <p className="text-sm text-[var(--color-charcoal)] font-medium mb-6">
              Please note: Shuttle bookings must be confirmed by 1st August 2026.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-5 border-b border-[var(--color-light-gray)] relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-dusty-blue)]/10 border border-[var(--color-dusty-blue)]/30 flex items-center justify-center flex-shrink-0">
                    <Bus className="w-6 h-6 text-[var(--color-dusty-blue)]" />
                  </div>
                  <div>
                    <h2 className="text-xl text-[var(--color-charcoal)] font-serif">
                      Book Shuttle
                    </h2>
                    <p className="text-sm text-[var(--color-warm-gray)]">
                      Cape Town to Die Woud
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors p-1"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 relative z-10">
              <ShuttleForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
                errorMessage={errorMessage}
              />
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-6 py-5 border-t border-[var(--color-light-gray)] bg-white relative z-10">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-[var(--color-warm-gray)] text-[var(--color-warm-gray)] text-xs tracking-[0.15em] uppercase hover:bg-[var(--color-cream)] transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="shuttle-form"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] text-white text-xs tracking-[0.15em] uppercase hover:bg-transparent hover:text-[var(--color-charcoal)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

// Mobile Sheet Component
function MobileSheet({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  submitStatus,
  errorMessage,
}: {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    passengerCount: number;
    pickupLocation: string;
    collectTime: string;
    returnTime: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<typeof formData>>;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  errorMessage: string;
}) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md" />
        <Drawer.Content className="fixed z-50 bg-white flex flex-col focus:outline-none inset-x-0 bottom-0 rounded-t-2xl max-h-[96vh] border-t-2 border-x-2 border-[var(--color-dusty-rose)]/30">
          {/* Drag handle */}
          <div className="mx-auto mt-3 mb-2 h-1.5 w-12 rounded-full bg-[var(--color-light-gray)]" />

          {submitStatus === "success" ? (
            // Success State
            <div className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[var(--color-sage)]/20 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-[var(--color-sage)]" />
              </div>
              <Drawer.Title className="text-xl text-[var(--color-charcoal)] mb-3 font-serif">
                Booking Received
              </Drawer.Title>
              <Drawer.Description className="text-sm text-[var(--color-warm-gray)] mb-5 leading-relaxed">
                Thank you for your shuttle booking request. We&apos;ll be in touch to confirm your reservation.
              </Drawer.Description>
              <p className="text-xs text-[var(--color-charcoal)] font-medium mb-6">
                Please note: Shuttle bookings must be confirmed by 1st August 2026.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex-shrink-0 px-5 py-4 border-b border-[var(--color-light-gray)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-dusty-blue)]/10 border border-[var(--color-dusty-blue)]/30 flex items-center justify-center flex-shrink-0">
                    <Bus className="w-5 h-5 text-[var(--color-dusty-blue)]" />
                  </div>
                  <div>
                    <Drawer.Title className="text-lg text-[var(--color-charcoal)] font-serif">
                      Book Shuttle
                    </Drawer.Title>
                    <Drawer.Description className="text-xs text-[var(--color-warm-gray)]">
                      Cape Town to Die Woud
                    </Drawer.Description>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <ShuttleForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  submitStatus={submitStatus}
                  errorMessage={errorMessage}
                />
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-5 py-4 border-t border-[var(--color-light-gray)] bg-white safe-area-bottom">
                <div className="flex flex-col-reverse gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full px-4 py-2.5 border border-[var(--color-warm-gray)] text-[var(--color-warm-gray)] text-xs tracking-[0.15em] uppercase hover:bg-[var(--color-cream)] transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="shuttle-form"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] text-white text-xs tracking-[0.15em] uppercase hover:bg-transparent hover:text-[var(--color-charcoal)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking"}
                  </button>
                </div>
              </div>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

// Main component that switches between mobile sheet and desktop modal
export function ShuttleBookingModal({ isOpen, onClose }: ShuttleBookingModalProps) {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    passengerCount: 1,
    pickupLocation: "",
    collectTime: "14:00",
    returnTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      
      const { error } = await supabase.from("shuttle_bookings").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        passenger_count: formData.passengerCount,
        pickup_location: formData.pickupLocation,
        collect_time: formData.collectTime,
        return_time: formData.returnTime,
      });

      if (error) throw error;

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        passengerCount: 1,
        pickupLocation: "",
        collectTime: "14:00",
        returnTime: "",
      });
    } catch (err: unknown) {
      // Extract meaningful error message from Supabase error
      const supabaseError = err as { message?: string; code?: string; details?: string; hint?: string };
      console.error("Error submitting shuttle booking:", {
        message: supabaseError?.message,
        code: supabaseError?.code,
        details: supabaseError?.details,
        hint: supabaseError?.hint,
        raw: err,
      });
      setSubmitStatus("error");
      setErrorMessage(
        supabaseError?.message || "There was an error submitting your booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitStatus("idle");
    setErrorMessage("");
    onClose();
  };

  const sharedProps = {
    isOpen,
    onClose: handleClose,
    formData,
    setFormData,
    onSubmit: handleSubmit,
    isSubmitting,
    submitStatus,
    errorMessage,
  };

  // Render mobile sheet or desktop modal based on screen size
  if (isMobile) {
    return <MobileSheet {...sharedProps} />;
  }

  return <DesktopModal {...sharedProps} />;
}
