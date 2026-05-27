"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { PrStar, PlantainBunch, HibiscusFlower } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";
import { useLanguage } from "@/components/LanguageContext";

export default function Ordering() {
  const { t } = useLanguage();

  const schedule = [
    { day: t.days.monday, available: true },
    { day: t.days.tuesday, available: false },
    { day: t.days.wednesday, available: true },
    { day: t.days.thursday, available: false },
    { day: t.days.friday, available: true },
    { day: t.days.saturday, available: false },
    { day: t.days.sunday, available: false },
  ];


  return (
    <section id="ordering" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Pattern texture */}
      <Image
        src="/pattern-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      {/* Deep red base — pattern peeks through for texture */}
      <div className="absolute inset-0 bg-[#6B0010]/91" />
      {/* Radial depth gradient: lighter at center, darker at edges for 3D feel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(160,10,30,0.35) 0%, rgba(30,0,5,0.60) 100%)",
        }}
      />

      {/* Background ghost star */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PrStar size={700} color="white" opacity={0.05} />
      </div>

      {/* Floating plantains */}
      <motion.div
        className="absolute right-8 top-16 pointer-events-none opacity-60 z-10"
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <PlantainBunch className="w-32 h-24 drop-glow-gold" />
      </motion.div>
      <motion.div
        className="absolute left-4 bottom-16 pointer-events-none opacity-30 scale-x-[-1] z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <PlantainBunch className="w-24 h-18" />
      </motion.div>

      {/* Floral clusters */}
      <FloralCluster
        variant="D"
        className="absolute bottom-8 right-36 opacity-40"
        glowColor="rgba(255,255,255,0.4)"
      />
      <FloralCluster
        variant="B"
        className="absolute top-10 left-36 opacity-30"
        flip
        glowColor="rgba(255,255,255,0.35)"
      />

      {/* Hibiscus flowers — white-tinted sides */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 z-10"
        animate={{ rotate: [-12, 12, -12], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <HibiscusFlower className="w-24 h-24" style={{ filter: "brightness(10)" }} />
      </motion.div>
      <motion.div
        className="absolute right-6 top-1/3 pointer-events-none opacity-12 z-10"
        animate={{ rotate: [10, -10, 10], y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <HibiscusFlower className="w-20 h-20" style={{ filter: "brightness(10)" }} />
      </motion.div>

      {/* Star accents */}
      {[
        { top: "10%", left: "2%", size: 22 },
        { top: "80%", left: "5%", size: 16 },
        { top: "20%", right: "3%", size: 18 },
        { bottom: "10%", right: "6%", size: 24 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: "top" in s ? s.top : undefined,
            bottom: "bottom" in s ? s.bottom : undefined,
            left: "left" in s ? s.left : undefined,
            right: "right" in s ? s.right : undefined,
          }}
        >
          <PrStar size={s.size} color="white" opacity={0.3} />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PrStar size={16} color="white" opacity={0.7} />
            <span className="text-white/70 text-sm font-bold tracking-widest uppercase">
              {t.ordering.badge}
            </span>
            <PrStar size={16} color="white" opacity={0.7} />
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              textShadow: "0 0 60px rgba(255,255,255,0.15)",
            }}
          >
            {t.ordering.heading}
          </h2>
          <p className="text-white/70 text-lg mt-4 max-w-xl mx-auto">
            {t.ordering.subtext}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Schedule */}
          <AnimatedSection direction="left">
            <h3 className="text-white/60 text-xs font-bold tracking-widest uppercase mb-5">
              {t.ordering.scheduleLabel}
            </h3>
            <div className="divide-y divide-white/10 border border-white/15">
              {schedule.map((day) => (
                <motion.div
                  key={day.day}
                  className={`flex items-center justify-between px-6 py-4 ${
                    day.available ? "bg-white/10 hover:bg-white/15" : "bg-white/5"
                  } transition-colors`}
                  whileHover={day.available ? { x: 4 } : {}}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-center gap-3">
                    {day.available && (
                      <PrStar size={12} color="white" opacity={0.7} />
                    )}
                    <span
                      className={`font-semibold text-base ${
                        day.available ? "text-white" : "text-white/30"
                      }`}
                    >
                      {day.day}
                    </span>
                  </div>
                  {day.available ? (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/70" />
                      <span className="text-white font-bold text-sm">11am – 2pm</span>
                    </div>
                  ) : (
                    <span className="text-white/25 text-sm">{t.ordering.closed}</span>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 border-l-4 border-white/30 pl-5 py-1">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Phone className="w-4 h-4" /> {t.ordering.callNote}
              </div>
              <p className="text-white/60 text-sm">{t.ordering.callSub}</p>
            </div>
          </AnimatedSection>

          {/* Pricing + CTA */}
          <AnimatedSection direction="right" delay={0.1}>
            <h3 className="text-white/60 text-xs font-bold tracking-widest uppercase mb-5">
              {t.ordering.pricingLabel}
            </h3>

            {/* Single price card */}
            <div className="flex items-center justify-between px-6 py-6 bg-white/10 border border-white/15 mb-4 relative"
              style={{ boxShadow: "0 0 40px rgba(200,149,44,0.15), inset 0 0 30px rgba(200,149,44,0.05)" }}
            >
              <div>
                <p className="font-bold text-white text-lg">{t.ordering.lunchPlate}</p>
                <p className="text-white/50 text-sm mt-0.5">{t.ordering.lunchPlateDesc}</p>
              </div>
              <span
                className="text-4xl font-bold text-[#C8952C]"
                style={{ fontFamily: "var(--font-display)", textShadow: "0 0 20px rgba(200,149,44,0.5)" }}
              >
                {t.ordering.lunchPrice}
              </span>
            </div>

            {/* Delivery note */}
            <div className="flex items-center gap-3 bg-white/10 border border-white/15 px-5 py-4 mb-8">
              <MapPin className="w-4 h-4 text-white/60 shrink-0" />
              <p className="text-white/70 text-sm">{t.ordering.deliveryNote}</p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                "Customizable Menu Options",
                "Fresh Ingredients",
                "Traditional Dishes",
                "Full-Service Drop-Off",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8952C] shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <a
              href="/order"
              className="flex items-center justify-center gap-3 w-full bg-white text-[#E8192C] font-bold text-lg py-5 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
              style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2), 0 8px 30px rgba(0,0,0,0.2)" }}
            >
              {t.ordering.callBtn}
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
