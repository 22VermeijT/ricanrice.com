"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { CheckCircle, Info, Loader2, Phone, Send } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { formatPhone } from "@/lib/formatPhone";
import { translations } from "@/data/translations";

const DINNER_PRICE = 150;
const FLAN_PRICE = 15;
const DELIVERY_FEE = 10;

type FormData = {
  name: string;
  phone: string;
  email: string;
  dinners: number;
  rice: string;
  salad: string;
  protein: string;
  pastelesPork: number;
  pastelesChicken: number;
  plates: number;
  flanVanilla: number;
  flanCheese: number;
  fulfillment: "pickup" | "delivery";
  address: string;
  notes: string;
};

const inputClass =
  "w-full bg-white border border-gray-200 text-[#1C1C1E] px-4 py-3.5 text-sm placeholder-[#6E6E73]/60 focus:outline-none focus:border-[#001435] focus:ring-2 focus:ring-[#001435]/10 transition-colors";
const labelClass = "block text-sm font-semibold text-[#1C1C1E] mb-2";
const errorClass = "mt-1 text-xs text-[#E8192C] font-medium";

function QtyField({ label, field }: { label: string; field: React.InputHTMLAttributes<HTMLInputElement> }) {
  return (
    <label className="flex items-center justify-between gap-4 px-4 py-3 border border-gray-200 bg-white">
      <span className="text-sm font-semibold text-[#1C1C1E]">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        className="w-20 border border-gray-200 text-sm font-bold px-3 py-2 text-center focus:outline-none focus:border-[#001435]"
        {...field}
      />
    </label>
  );
}

export default function ThanksgivingOrderForm() {
  const { t } = useLanguage();
  const tg = t.thanksgiving;
  const f = tg.form;
  const of = t.orderForm;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      dinners: 1,
      rice: "0",
      salad: "0",
      protein: "0",
      pastelesPork: 0,
      pastelesChicken: 0,
      plates: 0,
      flanVanilla: 0,
      flanCheese: 0,
      fulfillment: "pickup",
    },
  });

  const [dinners, flanVanilla, flanCheese, fulfillment] = useWatch({
    control,
    name: ["dinners", "flanVanilla", "flanCheese", "fulfillment"],
  });
  const dinnerCount = Number(dinners) || 0;
  const total =
    dinnerCount * DINNER_PRICE +
    ((Number(flanVanilla) || 0) + (Number(flanCheese) || 0)) * FLAN_PRICE +
    (fulfillment === "delivery" ? DELIVERY_FEE : 0);

  const qty = (name: keyof FormData) => register(name, { valueAsNumber: true, min: 0 });

  const onSubmit = async (data: FormData) => {
    const itemCount =
      (data.dinners || 0) + (data.pastelesPork || 0) + (data.pastelesChicken || 0) +
      (data.plates || 0) + (data.flanVanilla || 0) + (data.flanCheese || 0);
    if (itemCount <= 0) {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);
    setLoading(true);
    const en = translations.en.thanksgiving;
    const choices =
      data.dinners > 0
        ? {
            rice: en.riceOptions[Number(data.rice)],
            salad: en.saladOptions[Number(data.salad)],
            protein: en.proteinOptions[Number(data.protein)],
          }
        : { rice: "", salad: "", protein: "" };
    try {
      const res = await fetch("https://formspree.io/f/xnjrowyg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Thanksgiving Order",
          orderType: "thanksgiving",
          ...data,
          ...choices,
          estimatedTotal: `$${total}`,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.errors) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please call or text us at (608) 419-7840.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-8">
        <div className="w-20 h-20 bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-bold text-[#001435] mb-3" style={{ fontFamily: "var(--font-display)" }}>
          {of.successHeading}
        </h3>
        <p className="text-[#6E6E73] text-lg leading-relaxed max-w-md mx-auto">{f.successText}</p>
      </div>
    );
  }

  const choiceGroup = (name: "rice" | "salad" | "protein", label: string, options: readonly string[]) => (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, i) => (
          <label key={i} className="cursor-pointer">
            <input type="radio" value={String(i)} {...register(name)} className="sr-only peer" />
            <div className="text-center py-3 px-2 border-2 border-gray-200 peer-checked:border-[#3B160D] peer-checked:bg-[#3B160D]/5 peer-checked:text-[#3B160D] text-sm font-bold text-[#6E6E73] transition-colors">
              {opt}
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <h2 className="text-3xl font-bold text-[#001435] mb-2" style={{ fontFamily: "var(--font-display)" }}>
          {f.heading}
        </h2>
        <p className="text-[#6E6E73] text-sm">{f.subtext}</p>
      </div>

      <div className="flex gap-3 bg-[#001435]/5 border border-[#001435]/15 px-4 py-4">
        <Info className="w-5 h-5 text-[#001435] shrink-0 mt-0.5" />
        <p className="text-sm text-[#1C1C1E] leading-relaxed">
          <span className="font-bold">{of.disclaimerBold}</span> {f.disclaimer}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{of.nameLabel} *</label>
          <input {...register("name", { required: of.errorNameRequired })} placeholder="Maria García" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{of.phoneLabel} *</label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: of.errorPhoneRequired,
              validate: (v) => v.replace(/\D/g, "").length >= 10 || of.errorPhoneInvalid,
            }}
            render={({ field }) => (
              <input
                type="tel"
                inputMode="numeric"
                placeholder="(608) 555-0123"
                value={field.value}
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                className={inputClass}
              />
            )}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>{of.emailLabel} *</label>
        <input
          type="email"
          {...register("email", {
            required: of.errorEmailRequired,
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: of.errorEmailInvalid },
          })}
          placeholder="hello@example.com"
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <QtyField label={f.dinnersLabel} field={qty("dinners")} />

      {dinnerCount > 0 && (
        <div className="space-y-5 border-l-4 border-[#C8952C] pl-5">
          {choiceGroup("rice", tg.riceLabel, tg.riceOptions)}
          {choiceGroup("salad", tg.saladLabel, tg.saladOptions)}
          {choiceGroup("protein", tg.proteinLabel, tg.proteinOptions)}
          {dinnerCount > 1 && <p className="text-xs text-[#6E6E73]">{f.dinnerChoicesNote}</p>}
        </div>
      )}

      <div className="space-y-3">
        <QtyField label={f.pastelesPorkLabel} field={qty("pastelesPork")} />
        <QtyField label={f.pastelesChickenLabel} field={qty("pastelesChicken")} />
        <QtyField label={f.platesLabel} field={qty("plates")} />
        <QtyField label={f.flanVanillaLabel} field={qty("flanVanilla")} />
        <QtyField label={f.flanCheeseLabel} field={qty("flanCheese")} />
      </div>

      <div>
        <p className={labelClass}>{f.fulfillmentLabel}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {([
            { value: "pickup", label: f.pickupOption },
            { value: "delivery", label: f.deliveryOption },
          ] as const).map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input type="radio" value={opt.value} {...register("fulfillment")} className="sr-only peer" />
              <div className="text-center py-3 px-2 border-2 border-gray-200 peer-checked:border-[#001435] peer-checked:bg-[#001435]/5 peer-checked:text-[#001435] text-sm font-bold text-[#6E6E73] transition-colors">
                {opt.label}
              </div>
            </label>
          ))}
        </div>
      </div>

      {fulfillment === "delivery" && (
        <div>
          <label className={labelClass}>{f.addressLabel} *</label>
          <input
            {...register("address", { required: f.errorAddress })}
            placeholder={f.addressPlaceholder}
            className={inputClass}
          />
          {errors.address && <p className={errorClass}>{errors.address.message}</p>}
        </div>
      )}

      <div>
        <label className={labelClass}>{f.notesLabel}</label>
        <textarea {...register("notes")} placeholder={f.notesPlaceholder} rows={3} className={`${inputClass} resize-none`} />
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <p className="text-xs text-[#6E6E73] max-w-xs">{f.totalNote}</p>
        <p className="text-sm text-[#6E6E73]">
          {f.estTotal} <span className="text-2xl font-bold text-[#001435]">${total}</span>
        </p>
      </div>

      {emptyError && <p className={errorClass}>{f.errorEmpty}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#E8192C] hover:bg-[#c8000f] disabled:opacity-70 text-white font-bold text-base py-4 transition-colors flex items-center justify-center gap-3"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> {of.sending}</>
        ) : (
          <><Send className="w-5 h-5" /> {f.submit}</>
        )}
      </button>

      <a
        href="tel:+16084197840"
        className="flex items-center justify-center gap-2 text-sm font-semibold text-[#001435] hover:text-[#E8192C] transition-colors"
      >
        <Phone className="w-4 h-4" />
        {f.orCall}
      </a>
    </form>
  );
}
