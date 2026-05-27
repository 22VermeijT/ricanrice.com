"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MenuGrid from "@/components/menu/MenuGrid";
import { PrStar, HibiscusFlower } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";
import { useLanguage } from "@/components/LanguageContext";

export default function FeaturedMenu() {
  const { t } = useLanguage();

  return (
    <section id="menu" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Light toile pattern */}
      <Image
        src="/pattern-light.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      {/* Soft cream overlay — keeps dark text readable, pattern shows through */}
      <div className="absolute inset-0 bg-[#f9f6f0]/78" />

      {/* Faint star background */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] z-10">
        <PrStar size={500} color="#E8192C" />
      </div>

      {/* Floral clusters */}
      <FloralCluster
        variant="D"
        className="absolute top-10 right-4 opacity-55 z-10"
        glowColor="rgba(232,25,44,0.4)"
      />
      <FloralCluster
        variant="B"
        className="absolute bottom-10 right-2 opacity-35 z-10"
        flip
        glowColor="rgba(200,149,44,0.35)"
      />

      {/* Hibiscus — top-left */}
      <motion.div
        className="absolute top-8 left-6 pointer-events-none opacity-30 z-10"
        animate={{ rotate: [-10, 10, -10], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 4px 16px rgba(232,25,44,0.3))" }}
      >
        <HibiscusFlower className="w-20 h-20" />
      </motion.div>

      {/* Hibiscus — bottom-left, smaller */}
      <motion.div
        className="absolute bottom-12 left-16 pointer-events-none opacity-20 z-10"
        animate={{ rotate: [8, -8, 8], y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{ filter: "drop-shadow(0 4px 12px rgba(200,149,44,0.2))" }}
      >
        <HibiscusFlower className="w-12 h-12" />
      </motion.div>

<div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-10 border-b-2 border-[#E8192C]/15">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <PrStar size={14} color="#E8192C" className="drop-glow-red" />
              <div className="w-8 h-px bg-[#E8192C]" />
              <span className="text-[#E8192C] text-sm font-bold tracking-widest uppercase">{t.menu.badge}</span>
            </div>
            <h2
              className="text-5xl sm:text-6xl font-bold text-[#001840] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.menu.heading1}{" "}
              <span style={{ color: "#E8192C", textShadow: "0 0 20px rgba(232,25,44,0.2)" }}>
                {t.menu.heading2}
              </span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <p className="text-[#6E6E73] text-base leading-relaxed max-w-xs sm:text-right">
              {t.menu.subtext}
            </p>
          </AnimatedSection>
        </div>

        <MenuGrid limit={8} showFilters={false} />

        <AnimatedSection className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-[#001840] text-white font-bold text-base px-10 py-4 transition-all hover:-translate-y-1"
            style={{ boxShadow: "0 0 30px rgba(0,24,64,0.2), 0 8px 24px rgba(0,0,0,0.2)" }}
          >
            {t.menu.viewFull}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
