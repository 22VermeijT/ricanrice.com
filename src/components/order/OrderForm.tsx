"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown, Loader2, Send, Info, UtensilsCrossed, PartyPopper } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

type OrderType = "lunch" | "catering";

type FormData = {
  name: string;
  email: string;
  phone: string;
  notes: string;
  // Lunch-specific
  pickupDay: "Monday" | "Wednesday" | "Friday";
  lunchQty: number;
  // Catering-specific
  eventDate: string;
  guestCount: string;
  eventType: string;
  serviceType: "delivery" | "pickup";
  venue: string;
  budget: string;
};

const inputClass =
  "w-full bg-white border border-gray-200 text-[#1C1C1E] px-4 py-3.5 text-sm placeholder-[#6E6E73]/60 focus:outline-none focus:border-[#001435] focus:ring-2 focus:ring-[#001435]/10 transition-all duration-200";

const labelClass = "block text-sm font-semibold text-[#1C1C1E] mb-2";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatDate(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  const trailingSlash = /\/\s*$/.test(raw);
  if (digits.length === 0) return "";
  if (digits.length < 2)  return digits;
  if (digits.length === 2) return trailingSlash ? `${digits} / ` : digits;
  if (digits.length < 4)  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  if (digits.length === 4) return trailingSlash ? `${digits.slice(0, 2)} / ${digits.slice(2)} / ` : `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  return `${digits.slice(0, 2)} / ${digits.slice(2, 4)} / ${digits.slice(4)}`;
}

export default function OrderForm() {
  const { t } = useLanguage();
  const f = t.orderForm;

  const [orderType, setOrderType] = useState<OrderType>("lunch");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      pickupDay: "Monday",
      lunchQty: 1,
      serviceType: "delivery",
    },
  });

  const lunchQty = Number(watch("lunchQty")) || 0;
  const total = lunchQty * 14.99;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderType, ...data }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please call or text us at (608) 219-9268.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <div className="w-20 h-20 bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-bold text-[#001435] mb-3" style={{ fontFamily: "var(--font-display)" }}>
          {f.successHeading}
        </h3>
        <p className="text-[#6E6E73] text-lg leading-relaxed max-w-md mx-auto">
          {orderType === "lunch" ? f.successLunch : f.successCatering}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

      <div className="mb-2">
        <h2
          className="text-3xl font-bold text-[#001435] mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.orderPage.formHeading}
        </h2>
        <p className="text-[#6E6E73] text-sm">
          {t.orderPage.formSubtext}
        </p>
      </div>

      {/* Type toggle */}
      <div className="grid grid-cols-2 gap-3">
        {([
          { type: "lunch" as const, label: f.typeLunch, sub: f.typeLunchSub, Icon: UtensilsCrossed },
          { type: "catering" as const, label: f.typeCatering, sub: f.typeCateringSub, Icon: PartyPopper },
        ]).map(({ type, label, sub, Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => setOrderType(type)}
            aria-pressed={orderType === type}
            aria-label={label}
            className="flex flex-col items-center gap-2 py-5 px-4 border-2 transition-all duration-200"
            style={
              orderType === type
                ? { borderColor: "#E8192C", background: "rgba(232,25,44,0.04)", color: "#E8192C" }
                : { borderColor: "#E5E5E5", color: "#6E6E73" }
            }
          >
            <Icon className="w-6 h-6" />
            <span className="font-bold text-sm">{label}</span>
            <span className="text-xs opacity-60">{sub}</span>
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex gap-3 bg-[#001435]/5 border border-[#001435]/15 px-4 py-4">
        <Info className="w-5 h-5 text-[#001435] shrink-0 mt-0.5" />
        <p className="text-sm text-[#1C1C1E] leading-relaxed">
          <span className="font-bold">{f.disclaimerBold}</span>{" "}
          {orderType === "lunch" ? f.disclaimerLunch : f.disclaimerCatering}
        </p>
      </div>

      {/* Common: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{f.nameLabel} *</label>
          <input
            {...register("name", { required: f.errorNameRequired })}
            placeholder="Maria García"
            className={`${inputClass} ${errors.name ? "border-[#E8192C] ring-2 ring-[#E8192C]/10" : ""}`}
          />
          {errors.name && <p className="mt-1 text-xs text-[#E8192C] font-medium">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{f.phoneLabel} *</label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: f.errorPhoneRequired,
              validate: (v) => v.replace(/\D/g, "").length >= 10 || f.errorPhoneInvalid,
            }}
            render={({ field }) => (
              <input
                type="tel"
                inputMode="numeric"
                placeholder="(608) 555-0123"
                value={field.value}
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                className={`${inputClass} ${errors.phone ? "border-[#E8192C] ring-2 ring-[#E8192C]/10" : ""}`}
              />
            )}
          />
          {errors.phone && <p className="mt-1 text-xs text-[#E8192C] font-medium">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Common: Email */}
      <div>
        <label className={labelClass}>{f.emailLabel} *</label>
        <input
          type="email"
          {...register("email", {
            required: f.errorEmailRequired,
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: f.errorEmailInvalid },
          })}
          placeholder="hello@example.com"
          className={`${inputClass} ${errors.email ? "border-[#E8192C] ring-2 ring-[#E8192C]/10" : ""}`}
        />
        {errors.email && <p className="mt-1 text-xs text-[#E8192C] font-medium">{errors.email.message}</p>}
      </div>

      {/* Conditional fields */}
      <AnimatePresence mode="wait">
        {orderType === "lunch" ? (
          <motion.div
            key="lunch"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Pickup day */}
            <div>
              <label className={labelClass}>{f.pickupDayLabel} *</label>
              <div className="grid grid-cols-3 gap-3">
                {(["Monday", "Wednesday", "Friday"] as const).map((day) => (
                  <label key={day} className="cursor-pointer">
                    <input type="radio" value={day} {...register("pickupDay")} className="sr-only peer" />
                    <div className="text-center py-3 px-2 border-2 border-gray-200 peer-checked:border-[#E8192C] peer-checked:bg-[#E8192C]/5 text-sm font-bold text-[#6E6E73] peer-checked:text-[#E8192C] transition-all duration-200 cursor-pointer hover:border-[#E8192C]/40">
                      {day}
                      <div className="text-[10px] font-normal mt-0.5 opacity-60">{f.pickupTime}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order item */}
            <div>
              <label className={labelClass}>{f.numLunchesLabel}</label>
              <div className="flex items-center justify-between px-5 py-5 border border-gray-200">
                <div>
                  <p className="font-bold text-[#1C1C1E] text-base">{f.lunchItem}</p>
                  <p className="text-[#6E6E73] text-xs mt-0.5">{f.lunchItemDesc}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#C8952C] font-bold text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                    {f.lunchPrice}
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    {...register("lunchQty", { valueAsNumber: true, min: 1 })}
                    className="w-20 bg-white border border-gray-200 text-[#1C1C1E] text-sm font-bold px-3 py-2 text-center focus:outline-none focus:border-[#001435] transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 px-1">
                <p className="text-xs text-[#6E6E73]">
                  {lunchQty >= 3 ? f.freeDeliveryEarned : f.freeDeliveryThreshold}
                </p>
                <span className="text-sm text-[#6E6E73]">
                  {f.estTotal} <span className="font-bold text-[#001435]">${total.toFixed(2)}</span>
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="catering"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Event date + Guest count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{f.eventDateLabel}</label>
                <Controller
                  name="eventDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM / DD / YYYY"
                      maxLength={14}
                      value={field.value}
                      onChange={(e) => field.onChange(formatDate(e.target.value))}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && field.value.endsWith(" / ")) {
                          e.preventDefault();
                          field.onChange(field.value.slice(0, -3));
                        }
                      }}
                      className={inputClass}
                    />
                  )}
                />
              </div>
              <div>
                <label className={labelClass}>{f.guestCountLabel}</label>
                <input
                  type="number"
                  {...register("guestCount")}
                  placeholder={f.guestCountPlaceholder}
                  min={1}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Event type */}
            <div>
              <label className={labelClass}>{f.eventTypeLabel}</label>
              <div className="relative">
                <select {...register("eventType")} className={`${inputClass} appearance-none pr-10`}>
                  <option value="">{f.eventTypeDefault}</option>
                  {f.eventTypes.map((et) => <option key={et} value={et}>{et}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6E73] pointer-events-none" />
              </div>
            </div>

            {/* Service type */}
            <div>
              <label className={labelClass}>{f.serviceTypeLabel}</label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { value: "delivery", label: f.deliveryOption },
                  { value: "pickup", label: f.pickupOption },
                ] as const).map((opt) => (
                  <label key={opt.value} className="cursor-pointer">
                    <input type="radio" value={opt.value} {...register("serviceType")} className="sr-only peer" />
                    <div className="text-center py-3 px-2 border-2 border-gray-200 peer-checked:border-[#001435] peer-checked:bg-[#001435]/5 text-sm font-bold text-[#6E6E73] peer-checked:text-[#001435] transition-all duration-200 cursor-pointer">
                      {opt.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Venue + Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{f.venueLabel}</label>
                <input {...register("venue")} placeholder={f.venuePlaceholder} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{f.budgetLabel}</label>
                <input {...register("budget")} placeholder={f.budgetPlaceholder} className={inputClass} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Common: Notes */}
      <div>
        <label className={labelClass}>
          {orderType === "lunch" ? f.notesLunchLabel : f.notesCateringLabel}
          {" "}<span className="text-[#E8192C]">*</span>
        </label>
        <textarea
          {...register("notes", {
            required: f.errorNotesMin,
            minLength: { value: 5, message: f.errorNotesMin },
          })}
          placeholder={orderType === "lunch" ? f.notesLunchPlaceholder : f.notesCateringPlaceholder}
          rows={4}
          className={`${inputClass} resize-none ${errors.notes ? "border-[#E8192C] ring-2 ring-[#E8192C]/10" : ""}`}
        />
        {errors.notes && <p className="mt-1 text-xs text-[#E8192C] font-medium">{errors.notes.message}</p>}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full bg-[#E8192C] hover:bg-[#c8000f] disabled:opacity-70 text-white font-bold text-base py-4 transition-all duration-200 hover:shadow-xl flex items-center justify-center gap-3"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> {f.sending}</>
        ) : (
          <><Send className="w-5 h-5" /> {orderType === "lunch" ? f.submitLunch : f.submitCatering}</>
        )}
      </motion.button>
    </form>
  );
}
