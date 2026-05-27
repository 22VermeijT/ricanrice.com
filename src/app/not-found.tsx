"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PrStar, HibiscusFlower, TropicalLeaf } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#001435] relative overflow-hidden flex items-center justify-center pt-24">

      {/* Ghost star */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PrStar size={800} color="white" opacity={0.025} />
      </div>

      {/* PR flag triangle — bottom left */}
      <svg className="absolute bottom-0 left-0 pointer-events-none" width="420" height="360" viewBox="0 0 420 360">
        <defs>
          <radialGradient id="triGlow404" cx="0%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#E8192C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E8192C" stopOpacity="0.06" />
          </radialGradient>
        </defs>
        <polygon points="0,0 420,180 0,360" fill="url(#triGlow404)" />
      </svg>

      {/* Floral clusters */}
      <FloralCluster variant="A" className="absolute top-8 right-6 opacity-30" glowColor="rgba(232,25,44,0.5)" />
      <FloralCluster variant="E" className="absolute bottom-8 left-6 opacity-20" flip glowColor="rgba(200,149,44,0.4)" />

      {/* Tropical leaves */}
      <div className="absolute -right-8 top-1/4 pointer-events-none opacity-10" style={{ transform: "rotate(165deg)" }}>
        <TropicalLeaf className="w-32 h-44" />
      </div>
      <div className="absolute -left-8 bottom-16 pointer-events-none opacity-10" style={{ transform: "rotate(-15deg)" }}>
        <TropicalLeaf className="w-28 h-40" />
      </div>

      {/* Hibiscus */}
      <motion.div
        className="absolute top-12 left-24 pointer-events-none opacity-15"
        animate={{ rotate: [-8, 8, -8], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 4px 16px rgba(232,25,44,0.5))" }}
      >
        <HibiscusFlower className="w-14 h-14" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-24 pointer-events-none opacity-12"
        animate={{ rotate: [6, -6, 6], y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ filter: "drop-shadow(0 4px 12px rgba(200,149,44,0.3))" }}
      >
        <HibiscusFlower className="w-10 h-10" />
      </motion.div>

      {/* Scattered stars */}
      {[
        { top: "15%", right: "4%" },
        { top: "65%", left: "3%" },
        { bottom: "18%", right: "7%" },
      ].map((pos, i) => (
        <div key={i} className="absolute pointer-events-none" style={pos}>
          <PrStar size={16} color="#C8952C" opacity={0.35} />
        </div>
      ))}

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C8952C]"
        style={{ boxShadow: "0 0 12px rgba(200,149,44,0.6)" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-2xl mx-auto">

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <PrStar size={14} color="#E8192C" className="drop-glow-red" />
            <span className="text-[#E8192C] text-sm font-bold tracking-widest uppercase">Page Not Found</span>
            <PrStar size={14} color="#E8192C" className="drop-glow-red" />
          </div>
          <h1
            className="text-[clamp(6rem,20vw,12rem)] font-bold leading-none mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "#E8192C",
              textShadow: "0 0 80px rgba(232,25,44,0.5), 0 0 160px rgba(232,25,44,0.2)",
            }}
          >
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Looks like this plate is empty.
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist, but our kitchen is still open. Head back home or check out the menu.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-[#E8192C] text-white font-bold px-9 py-4 transition-all hover:-translate-y-1"
              style={{ boxShadow: "0 0 24px rgba(232,25,44,0.45), 0 4px 16px rgba(0,0,0,0.3)" }}
            >
              Back to Home
            </Link>
            <Link
              href="/menu"
              className="border-2 border-white/30 hover:border-white text-white font-bold px-9 py-4 transition-all hover:-translate-y-1 hover:bg-white/10"
            >
              View Menu
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#C8952C]" />
            <PrStar size={12} color="#C8952C" />
            <div className="w-8 h-px bg-[#C8952C]" />
          </div>
          <p className="text-white/25 text-sm mt-4" style={{ fontFamily: "var(--font-accent)" }}>
            La Casa del Arroz · Madison, WI
          </p>
        </motion.div>

      </div>
    </section>
  );
}
