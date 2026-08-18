"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { PrStar, HibiscusFlower } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";
import { useLanguage } from "@/components/LanguageContext";

export default function SofritoSpotlight() {
  const { t } = useLanguage();
  const s = t.sofrito;

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]">
        <PrStar size={480} color="#E8192C" />
      </div>

      <FloralCluster
        variant="C"
        className="absolute top-8 right-4 opacity-50"
        glowColor="rgba(232,25,44,0.4)"
      />
      <FloralCluster
        variant="D"
        className="absolute bottom-6 left-2 opacity-35"
        flip
        glowColor="rgba(200,149,44,0.3)"
      />

      <motion.div
        className="absolute top-10 left-8 pointer-events-none opacity-25 z-10"
        animate={{ rotate: [-8, 8, -8], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 4px 16px rgba(232,25,44,0.3))" }}
      >
        <HibiscusFlower className="w-14 h-14" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-[#001840]/10 shadow-[0_24px_80px_rgba(0,20,53,0.12)]">
          <AnimatedSection direction="left" className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
            <Image
              src="/rican-sofrito.jpg"
              alt={s.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8192C]" />
            <div className="absolute bottom-6 left-6 bg-[#E8192C] text-white px-4 py-2.5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/70">{s.size}</p>
              <p
                className="text-3xl font-bold leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.price}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="relative h-full bg-[#001435] text-white px-8 py-12 sm:px-12 sm:py-16 flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-1 h-full bg-[#C8952C] opacity-50" />

              <div className="flex items-center gap-3 mb-5">
                <PrStar size={14} color="#E8192C" className="drop-glow-red" />
                <div className="w-8 h-px bg-[#E8192C]" />
                <span className="text-[#E8192C] text-sm font-bold tracking-widest uppercase">
                  {s.badge}
                </span>
              </div>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.heading}
              </h2>
              <p className="text-[#C8952C] text-sm font-bold tracking-[0.2em] uppercase mb-6">
                {s.tagline}
              </p>
              <p className="text-white/65 text-base leading-relaxed mb-8 max-w-md">
                {s.description}
              </p>

              <div className="flex flex-wrap items-end gap-6 mb-10">
                <div>
                  <p className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-1">
                    {s.sizeLabel}
                  </p>
                  <p className="text-white font-bold text-lg">{s.size}</p>
                </div>
                <div className="w-px h-10 bg-white/15" />
                <div>
                  <p className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-1">
                    {s.priceLabel}
                  </p>
                  <p
                    className="text-4xl font-bold text-[#C8952C] leading-none"
                    style={{ fontFamily: "var(--font-display)", textShadow: "0 0 24px rgba(200,149,44,0.4)" }}
                  >
                    {s.price}
                  </p>
                </div>
              </div>

              <Link
                href="/order"
                className="inline-flex items-center justify-center bg-[#E8192C] text-white font-bold text-base px-9 py-4 w-fit transition-all duration-200 hover:-translate-y-1 glow-red"
                style={{ boxShadow: "0 0 24px rgba(232,25,44,0.45), 0 4px 16px rgba(0,0,0,0.3)" }}
              >
                {s.cta}
              </Link>
              <p className="text-white/35 text-xs mt-5">{s.note}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
