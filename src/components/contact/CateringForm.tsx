"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown, Loader2, Send } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: string;
  eventType: string;
  serviceType: "delivery" | "pickup" | "full-service";
  message: string;
  isCatering: boolean;
  // Catering-specific
  venue?: string;
  budget?: string;
  menuItems?: string;
  staffingNeeds?: string;
  serviceFormat?: "buffet" | "plated" | "stations";
  dietaryRestrictions?: string;
};

const eventTypes = [
  "Wedding",
  "Quinceañera",
  "Corporate Event",
  "Holiday Party",
  "Birthday Celebration",
  "Cultural Festival",
  "Community Event",
  "Family Gathering",
  "Other",
];

const inputClass =
  "w-full bg-white border border-[#F5EDD8] text-[#1C1C1E] rounded-xl px-4 py-3.5 text-sm placeholder-[#6E6E73]/60 focus:outline-none focus:border-[#002D62] focus:ring-2 focus:ring-[#002D62]/10 transition-all duration-200";

const labelClass = "block text-sm font-semibold text-[#1C1C1E] mb-2";

interface ToastProps {
  visible: boolean;
}
function SuccessToast({ visible }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-green-200 text-green-700 px-5 py-4 rounded-2xl shadow-2xl"
        >
          <CheckCircle className="w-5 h-5 fill-green-100" />
          <div>
            <p className="font-semibold text-sm">Message sent!</p>
            <p className="text-xs text-green-600">We&apos;ll be in touch within 24 hours.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CateringForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      isCatering: false,
      serviceType: "full-service",
    },
  });

  const isCatering = watch("isCatering");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1800));
    console.log("Form submitted:", data);
    setLoading(false);
    setSubmitted(true);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3
          className="text-3xl font-bold text-[#002D62] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ¡Gracias!
        </h3>
        <p className="text-[#6E6E73] text-lg leading-relaxed max-w-md mx-auto">
          We received your message and will be in touch within 24 hours.
          We can&apos;t wait to be part of your celebration!
        </p>
        <div className="mt-8 text-4xl">🇵🇷</div>
      </motion.div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Maria García"
              className={`${inputClass} ${errors.name ? "border-[#EF1B2E] ring-2 ring-[#EF1B2E]/10" : ""}`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-[#EF1B2E] font-medium">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
              })}
              placeholder="hello@example.com"
              className={`${inputClass} ${errors.email ? "border-[#EF1B2E] ring-2 ring-[#EF1B2E]/10" : ""}`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-[#EF1B2E] font-medium">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone Number *</label>
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="(608) 555-0123"
            className={`${inputClass} ${errors.phone ? "border-[#EF1B2E] ring-2 ring-[#EF1B2E]/10" : ""}`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-[#EF1B2E] font-medium">{errors.phone.message}</p>
          )}
        </div>

        {/* Event date + Guest count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Event Date</label>
            <input
              type="date"
              {...register("eventDate")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Estimated Guest Count</label>
            <input
              type="number"
              {...register("guestCount")}
              placeholder="e.g. 50"
              min={1}
              className={inputClass}
            />
          </div>
        </div>

        {/* Event type */}
        <div>
          <label className={labelClass}>Event Type</label>
          <div className="relative">
            <select {...register("eventType")} className={`${inputClass} appearance-none pr-10`}>
              <option value="">Select event type</option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6E73] pointer-events-none" />
          </div>
        </div>

        {/* Service type */}
        <div>
          <label className={labelClass}>Service Type</label>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { value: "delivery", label: "Delivery" },
                { value: "pickup", label: "Pickup" },
                { value: "full-service", label: "Full Service" },
              ] as const
            ).map((opt) => (
              <label key={opt.value} className="cursor-pointer">
                <input
                  type="radio"
                  value={opt.value}
                  {...register("serviceType")}
                  className="sr-only peer"
                />
                <div className="text-center py-3 px-2 rounded-xl border-2 border-[#F5EDD8] peer-checked:border-[#002D62] peer-checked:bg-[#002D62]/5 text-sm font-medium text-[#6E6E73] peer-checked:text-[#002D62] transition-all duration-200 cursor-pointer hover:border-[#002D62]/30">
                  {opt.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Catering inquiry checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="mt-0.5 shrink-0">
            <input
              type="checkbox"
              {...register("isCatering")}
              className="sr-only"
              id="isCatering"
            />
            <div
              className={`w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                isCatering
                  ? "bg-[#002D62] border-[#002D62]"
                  : "border-[#D0C9BB] group-hover:border-[#002D62]/40"
              }`}
            >
              {isCatering && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <div>
            <span className="font-semibold text-[#1C1C1E] text-sm">
              This is a catering inquiry
            </span>
            <p className="text-[#6E6E73] text-xs mt-0.5">
              Expand additional fields for venue, budget, staffing, and more.
            </p>
          </div>
        </label>

        {/* Expanded catering fields */}
        <AnimatePresence>
          {isCatering && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-5 border-t border-[#F5EDD8]">
                <h4 className="text-base font-bold text-[#002D62]">Catering Details</h4>

                {/* Venue + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Venue / Location</label>
                    <input
                      {...register("venue")}
                      placeholder="Restaurant name or address"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Estimated Budget</label>
                    <input
                      {...register("budget")}
                      placeholder="e.g. $500–$1,000"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Service format */}
                <div>
                  <label className={labelClass}>Service Format</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { value: "buffet", label: "Buffet" },
                        { value: "plated", label: "Plated" },
                        { value: "stations", label: "Stations" },
                      ] as const
                    ).map((opt) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input
                          type="radio"
                          value={opt.value}
                          {...register("serviceFormat")}
                          className="sr-only peer"
                        />
                        <div className="text-center py-3 px-2 rounded-xl border-2 border-[#F5EDD8] peer-checked:border-[#EF1B2E] peer-checked:bg-[#EF1B2E]/5 text-sm font-medium text-[#6E6E73] peer-checked:text-[#EF1B2E] transition-all cursor-pointer hover:border-[#EF1B2E]/30">
                          {opt.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Desired menu items */}
                <div>
                  <label className={labelClass}>Desired Menu Items</label>
                  <input
                    {...register("menuItems")}
                    placeholder="e.g. Arroz con Gandules, Pernil, Tostones..."
                    className={inputClass}
                  />
                </div>

                {/* Staffing + Dietary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Staffing Needs</label>
                    <input
                      {...register("staffingNeeds")}
                      placeholder="e.g. 2 servers, 1 chef"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Dietary Restrictions</label>
                    <input
                      {...register("dietaryRestrictions")}
                      placeholder="e.g. Vegan, gluten-free..."
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message */}
        <div>
          <label className={labelClass}>Your Message</label>
          <textarea
            {...register("message")}
            placeholder="Tell us about your event, any special requests, or questions..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-[#EF1B2E] hover:bg-[#ff2d42] disabled:opacity-70 text-white font-bold text-base py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 flex items-center justify-center gap-3"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </motion.button>
      </form>

      <SuccessToast visible={toastVisible} />
    </>
  );
}
