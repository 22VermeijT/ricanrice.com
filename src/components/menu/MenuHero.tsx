"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { PrStar, HibiscusFlower, TropicalLeaf, PlantainBunch } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";

export default function MenuHero() {
  const { t } = useLanguage();

  return (
    <section className="pt-36 pb-20 relative overflow-hidden">
      <Image
        src="/pattern-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#001435]/88" />

      {/* Ghost star */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PrStar size={700} color="white" opacity={0.025} />
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

      {/* Tropical leaves */}
      <div className="absolute -left-10 top-1/3 pointer-events-none opacity-15" style={{ transform: "rotate(-20deg)" }}>
        <TropicalLeaf className="w-32 h-44" />
      </div>
      <div className="absolute -right-8 bottom-8 pointer-events-none opacity-10" style={{ transform: "rotate(160deg)" }}>
        <TropicalLeaf className="w-28 h-40" />
      </div>

      {/* Floating plantains — right edge */}
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
        animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <PlantainBunch className="w-28 h-20 drop-glow-gold" />
      </motion.div>

      {/* Hibiscus — top right */}
      <motion.div
        className="absolute top-10 right-52 pointer-events-none opacity-20"
        animate={{ rotate: [-8, 8, -8], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 4px 16px rgba(232,25,44,0.5))" }}
      >
        <HibiscusFlower className="w-14 h-14" />
      </motion.div>

      {/* Hibiscus — bottom left */}
      <motion.div
        className="absolute bottom-8 left-24 pointer-events-none opacity-15"
        animate={{ rotate: [6, -6, 6], y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ filter: "drop-shadow(0 4px 12px rgba(200,149,44,0.4))" }}
      >
        <HibiscusFlower className="w-10 h-10" />
      </motion.div>

      {/* Scattered stars */}
      {[
        { top: "18%", right: "4%" },
        { top: "65%", left: "2%" },
        { bottom: "22%", right: "6%" },
      ].map((pos, i) => (
        <div key={i} className="absolute pointer-events-none" style={pos}>
          <PrStar size={18} color="#C8952C" opacity={0.4} />
        </div>
      ))}

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#E8192C] z-10" style={{ boxShadow: "0 0 10px rgba(232,25,44,0.6)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8952C] z-10" style={{ boxShadow: "0 0 10px rgba(200,149,44,0.5)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12">
        <div className="flex items-center gap-3 mb-6">
          <PrStar size={14} color="#E8192C" className="drop-glow-red" />
          <div className="w-8 h-px bg-[#E8192C]" />
          <span className="text-[#E8192C] text-sm font-bold tracking-widest uppercase">
            {t.menu.badge}
          </span>
        </div>
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.menu.pageHeading1}<br />
          <span style={{ color: "#C8952C", textShadow: "0 0 40px rgba(200,149,44,0.4)" }}>
            {t.menu.pageHeading2}
          </span>
        </h1>
        <p className="text-white/50 text-lg mt-6 max-w-xl">
          {t.menu.pageSubtext}
        </p>
      </div>
    </section>
  );
}
