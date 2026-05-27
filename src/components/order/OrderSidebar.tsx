"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { PrStar, HibiscusFlower } from "@/components/ui/Illustrations";
import { motion } from "framer-motion";

export default function OrderSidebar() {
  const { t } = useLanguage();

  const schedule = [
    { day: t.days.monday, open: true },
    { day: t.days.tuesday, open: false },
    { day: t.days.wednesday, open: true },
    { day: t.days.thursday, open: false },
    { day: t.days.friday, open: true },
    { day: t.days.saturday, open: false },
    { day: t.days.sunday, open: false },
  ];

  return (
    <div className="space-y-6">
      {/* Lunch hours */}
      <div className="bg-[#001435] text-white p-8 relative overflow-hidden">
        {/* Ghost star watermark */}
        <div className="absolute bottom-0 right-0 pointer-events-none opacity-[0.04]">
          <PrStar size={200} color="white" />
        </div>
        {/* Hibiscus corner accent */}
        <motion.div
          className="absolute top-3 right-3 pointer-events-none opacity-15"
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 2px 8px rgba(232,25,44,0.4))" }}
        >
          <HibiscusFlower className="w-10 h-10" />
        </motion.div>
        <div className="flex items-center gap-2 mb-6 relative z-10">
          <PrStar size={12} color="#E8192C" className="drop-glow-red" />
          <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            {t.orderPage.lunchHoursHeading}
          </h3>
        </div>
        <div className="space-y-3 relative z-10">
          {schedule.map(({ day, open }) => (
            <div key={day} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {open && <PrStar size={10} color="#E8192C" opacity={0.7} />}
                <span className={open ? "text-white font-semibold" : "text-white/30"}>{day}</span>
              </div>
              {open ? (
                <div className="flex items-center gap-2 text-white/70">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-bold text-white">{t.orderForm.pickupTime}</span>
                </div>
              ) : (
                <span className="text-white/25">{t.ordering.closed}</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 pt-6 border-t border-white/10 text-white/40 text-xs leading-relaxed relative z-10">
          {t.orderPage.lunchHoursNote}
        </p>
      </div>

      {/* Pricing */}
      <div className="bg-white border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-[#001435] mb-5" style={{ fontFamily: "var(--font-display)" }}>
          {t.orderPage.pricingHeading}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-bold text-[#1C1C1E]">{t.orderForm.lunchItem}</p>
            <p className="text-[#6E6E73] text-xs">{t.orderForm.lunchItemDesc}</p>
          </div>
          <span className="text-2xl font-bold text-[#C8952C]" style={{ fontFamily: "var(--font-display)" }}>
            {t.orderForm.lunchPrice}
          </span>
        </div>
        <p className="text-xs text-[#6E6E73] border-t border-gray-100 pt-3 mb-4">
          {t.orderForm.freeDeliveryThreshold}.
        </p>
        {[
          t.ordering.deliveryLabel + ": " + t.ordering.deliverySub,
          t.ordering.pickupLabel + ": " + t.ordering.pickupSub,
        ].map((f) => (
          <div key={f} className="flex items-center gap-2 text-[#3A3A3C] text-sm mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8952C] shrink-0" />
            {f}
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-white border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-[#001435] mb-5" style={{ fontFamily: "var(--font-display)" }}>
          {t.orderPage.contactHeading}
        </h3>
        <div className="space-y-4">
          <a
            href="tel:+16082199268"
            className="flex items-center gap-3 text-[#6E6E73] hover:text-[#001435] transition-colors text-sm"
          >
            <div className="w-9 h-9 bg-[#E8192C] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[#6E6E73] text-xs">{t.orderPage.callOrText}</p>
              <p className="font-semibold text-[#1C1C1E]">(608) 219-9268</p>
            </div>
          </a>
          <div className="flex items-center gap-3 text-[#6E6E73] text-sm">
            <div className="w-9 h-9 bg-[#001435]/10 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#001435]" />
            </div>
            <div>
              <p className="text-[#6E6E73] text-xs">{t.orderPage.serving}</p>
              <p className="font-semibold text-[#1C1C1E]">{t.orderPage.servingArea}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
