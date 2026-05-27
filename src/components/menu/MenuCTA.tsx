"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { PrStar, HibiscusFlower, TropicalLeaf } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";

export default function MenuCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#E8192C] relative overflow-hidden">
      {/* Ghost star */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PrStar size={500} color="white" opacity={0.05} />
      </div>

      {/* Floral clusters */}
      <FloralCluster
        variant="A"
        className="absolute top-4 right-4 opacity-30"
        glowColor="rgba(255,255,255,0.4)"
      />
      <FloralCluster
        variant="E"
        className="absolute bottom-4 left-4 opacity-20"
        flip
        glowColor="rgba(255,255,255,0.3)"
      />

      {/* Tropical leaf accents */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-10" style={{ transform: "rotate(-15deg) translateY(-50%)" }}>
        <TropicalLeaf className="w-28 h-40" />
      </div>
      <div className="absolute -right-8 bottom-0 pointer-events-none opacity-8" style={{ transform: "rotate(165deg)" }}>
        <TropicalLeaf className="w-24 h-36" />
      </div>

      {/* Hibiscus — center-right area */}
      <motion.div
        className="absolute right-1/3 top-1/2 -translate-y-1/2 pointer-events-none opacity-15"
        animate={{ rotate: [-6, 6, -6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 4px 16px rgba(255,255,255,0.3))" }}
      >
        <HibiscusFlower className="w-16 h-16" style={{ filter: "brightness(10)" }} />
      </motion.div>

      {/* Scattered stars */}
      {[
        { top: "20%", left: "3%" },
        { bottom: "20%", right: "4%" },
        { top: "60%", left: "45%" },
      ].map((pos, i) => (
        <div key={i} className="absolute pointer-events-none" style={pos}>
          <PrStar size={16} color="white" opacity={0.3} />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <PrStar size={12} color="white" opacity={0.6} />
            <span className="text-white/70 text-xs font-bold tracking-widest uppercase">
              {t.menu.ctaBadge}
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)", textShadow: "0 0 40px rgba(255,255,255,0.15)" }}
          >
            {t.menu.ctaHeading}
          </h2>
        </div>
        <Link
          href="/order"
          className="relative z-10 shrink-0 bg-white text-[#E8192C] font-bold text-base px-10 py-4 hover:-translate-y-0.5 transition-all hover:shadow-2xl"
          style={{ boxShadow: "0 0 20px rgba(255,255,255,0.2), 0 8px 20px rgba(0,0,0,0.15)" }}
        >
          {t.menu.ctaBtn}
        </Link>
      </div>
    </section>
  );
}
