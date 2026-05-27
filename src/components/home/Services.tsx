"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { PrStar, HibiscusFlower, TropicalLeaf } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";
import { useLanguage } from "@/components/LanguageContext";

const cardColors = [
  { bg: "#8B1A4A", accent: "#FF4080" },   // Weddings — deep rose
  { bg: "#0B3D91", accent: "#4080FF" },   // Corporate — blue
  { bg: "#5B0D8B", accent: "#A040FF" },   // Quinceañeras — purple
  { bg: "#1A5C2A", accent: "#40C060" },   // Holiday — forest green
  { bg: "#8B4A00", accent: "#E8A020" },   // Festivals — amber
  { bg: "#1C3A5C", accent: "#4080B0" },   // Drop-off — slate blue
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section className="py-24 sm:py-32 bg-[#001435] relative overflow-hidden">
      {/* Background star */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PrStar size={700} color="white" opacity={0.02} />
      </div>

      {/* Floral clusters */}
      <FloralCluster
        variant="A"
        className="absolute top-6 right-6 opacity-35"
        glowColor="rgba(232,25,44,0.5)"
      />
      <FloralCluster
        variant="E"
        className="absolute bottom-6 left-6 opacity-25"
        flip
        glowColor="rgba(200,149,44,0.4)"
      />
      <FloralCluster
        variant="C"
        className="absolute top-1/2 -translate-y-1/2 left-2 opacity-20"
        glowColor="rgba(255,255,255,0.3)"
      />

      {/* Tropical leaves — edges */}
      <div className="absolute -left-10 top-1/4 pointer-events-none opacity-10" style={{ transform: "rotate(-20deg)" }}>
        <TropicalLeaf className="w-32 h-44" />
      </div>
      <div className="absolute -right-8 bottom-24 pointer-events-none opacity-10" style={{ transform: "rotate(160deg)" }}>
        <TropicalLeaf className="w-28 h-40" />
      </div>

      {/* Hibiscus — top accent */}
      <motion.div
        className="absolute top-10 left-28 pointer-events-none opacity-15"
        animate={{ rotate: [-8, 8, -8], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 4px 16px rgba(232,25,44,0.5))" }}
      >
        <HibiscusFlower className="w-14 h-14" />
      </motion.div>

{/* Scattered stars */}
      {[
        { top: "12%", left: "3%" },
        { top: "55%", right: "2%" },
        { bottom: "15%", left: "6%" },
      ].map((pos, i) => (
        <div key={i} className="absolute pointer-events-none" style={pos}>
          <PrStar size={18} color="#C8952C" opacity={0.35} />
        </div>
      ))}

      {/* Red top line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#E8192C]" style={{ boxShadow: "0 0 12px rgba(232,25,44,0.6)" }} />

      <div className="relative max-w-7xl mx-auto px-8 sm:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-10 border-b border-white/10">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <PrStar size={14} color="#E8192C" className="drop-glow-red" />
              <div className="w-8 h-px bg-[#E8192C]" />
              <span className="text-[#E8192C] text-sm font-bold tracking-widest uppercase">
                {t.services.badge}
              </span>
            </div>
            <h2
              className="text-5xl sm:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.services.heading1}<br />
              <span style={{ color: "#C8952C", textShadow: "0 0 30px rgba(200,149,44,0.4)" }}>
                {t.services.heading2}
              </span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <p className="text-white/40 text-base leading-relaxed max-w-xs sm:text-right">
              {t.services.subtext}
            </p>
          </AnimatedSection>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const { bg, accent } = cardColors[i] ?? cardColors[0];
            const serviceT = (t.services as unknown as Record<string, { title: string; desc: string }>)[service.id];
            return (
              <AnimatedSection key={service.id} delay={i * 0.07}>
                <motion.div
                  className="group relative overflow-hidden p-8 cursor-default"
                  style={{ backgroundColor: bg }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${accent}22 0%, transparent 60%)`,
                    }}
                  />

                  {/* Background icon — large watermark */}
                  {(() => {
                    const I = (LucideIcons as Record<string, any>)[service.icon];
                    return I ? (
                      <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                        <I style={{ width: 160, height: 160, color: accent }} />
                      </div>
                    ) : null;
                  })()}

                  {/* Accent top line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
                  />
                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {serviceT?.title ?? service.nameEn}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {serviceT?.desc ?? service.description}
                  </p>

                  {service.minGuests && (
                    <p className="text-xs font-bold mb-5" style={{ color: accent }}>
                      {t.services.fromGuests} {service.minGuests}{service.maxGuests ? `–${service.maxGuests}` : "+"} {t.services.guests}
                    </p>
                  )}

                  <Link
                    href="/order"
                    className="inline-flex items-center gap-2 text-sm font-bold transition-colors"
                    style={{ color: accent }}
                  >
                    {t.services.quoteBtn} <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* CTA strip */}
        <AnimatedSection>
          <div
            className="mt-12 bg-[#E8192C] p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(232,25,44,0.4), 0 0 120px rgba(232,25,44,0.15)" }}
          >
            {/* Ghost star inside CTA */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <PrStar size={400} color="white" opacity={0.05} />
            </div>
            {/* Hibiscus — right side decoration */}
            <motion.div
              className="absolute right-48 top-1/2 -translate-y-1/2 pointer-events-none opacity-20"
              animate={{ rotate: [-6, 6, -6], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 4px 16px rgba(255,255,255,0.3))" }}
            >
              <HibiscusFlower className="w-16 h-16" style={{ filter: "brightness(10)" }} />
            </motion.div>
<div className="relative z-10">
              <h3
                className="text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.services.ctaHeading}
              </h3>
              <p className="text-white/70 text-sm">{t.services.ctaSubtext}</p>
            </div>
            <Link
              href="/order"
              className="relative z-10 shrink-0 bg-white text-[#E8192C] font-bold px-8 py-4 flex items-center gap-3 hover:-translate-y-0.5 transition-all hover:shadow-xl"
            >
              {t.services.ctaBtn} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
