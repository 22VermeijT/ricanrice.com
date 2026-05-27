"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PrStar, PlantainBunch, HibiscusFlower, TropicalLeaf } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";
import { useLanguage } from "@/components/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen bg-[#001435] overflow-hidden flex flex-col">

      {/* Background photo — greyscale */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ filter: "grayscale(100%)" }}
        />
      </div>

      {/* Navy overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,20,53,0.82)" }} />

      {/* Huge ghost star */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PrStar size={900} color="white" opacity={0.025} />
      </div>

      {/* PR flag red triangle — bottom left */}
      <svg className="absolute bottom-0 left-0 pointer-events-none" width="480" height="420" viewBox="0 0 480 420">
        <defs>
          <radialGradient id="triGlow" cx="0%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#E8192C" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E8192C" stopOpacity="0.08" />
          </radialGradient>
        </defs>
        <polygon points="0,0 480,210 0,420" fill="url(#triGlow)" />
      </svg>

      {/* Tropical leaf — far left, behind triangle */}
      <div className="absolute bottom-16 left-0 pointer-events-none opacity-20 z-[1]" style={{ transform: "rotate(30deg) translateX(-30%)" }}>
        <TropicalLeaf className="w-40 h-52" />
      </div>

      {/* Gold stripes — right edge */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#C8952C] opacity-40" />
      <div className="absolute right-4 top-0 bottom-0 w-px bg-[#C8952C] opacity-20" />

      {/* Red top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8192C]" />

      {/* Floral clusters */}
      <FloralCluster variant="B" className="absolute top-20 left-0 z-10 opacity-40" glowColor="rgba(200,149,44,0.4)" />
      <FloralCluster variant="E" className="absolute bottom-24 left-8 z-10 opacity-30" flip glowColor="rgba(232,25,44,0.35)" />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,8,30,0.55) 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-8 sm:px-12 w-full pt-28 pb-10">

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT — Typography */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-7"
            >
              <PrStar size={18} color="#E8192C" className="drop-glow-red" />
              <span className="text-[#E8192C] text-xs font-bold tracking-[0.25em] uppercase">
                {t.hero.badge}
              </span>
              <PrStar size={18} color="#E8192C" className="drop-glow-red" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.06 }}
              className="text-[clamp(3.5rem,8vw,6.5rem)] font-bold text-white leading-[1.0] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.hero.line1}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12 }}
              className="text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[1.0] mb-2 whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)", color: "#E8192C", textShadow: "0 0 60px rgba(232,25,44,0.5), 0 0 120px rgba(232,25,44,0.2)" }}
            >
              {t.hero.line2}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="text-[clamp(3.5rem,8vw,6.5rem)] font-bold text-white leading-[1.0] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.hero.line3}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="text-white/55 text-base leading-relaxed mb-10 max-w-md"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/order"
                className="relative bg-[#E8192C] text-white font-bold text-base px-9 py-4 transition-all duration-200 hover:-translate-y-1 glow-red"
                style={{ boxShadow: "0 0 24px rgba(232,25,44,0.45), 0 4px 16px rgba(0,0,0,0.3)" }}
              >
                {t.hero.orderBtn}
              </Link>
              <Link
                href="/order"
                className="border-2 border-white/30 hover:border-white text-white font-bold text-base px-9 py-4 transition-all duration-200 hover:-translate-y-1 hover:bg-white/10"
              >
                {t.hero.cateringBtn}
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(200,149,44,0.18) 0%, rgba(232,25,44,0.1) 40%, transparent 70%)" }}
            />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[400px] h-[400px] rounded-full overflow-hidden"
              style={{ boxShadow: "0 0 60px rgba(200,149,44,0.5), 0 0 120px rgba(200,149,44,0.2), 0 30px 80px rgba(0,0,0,0.5)" }}
            >
              <Image src="/logo.png" alt="Rican Rice" fill priority className="object-cover scale-[1.42]" />
            </motion.div>

            <motion.div
              className="absolute -top-4 left-4 z-20"
              animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.4))" }}
            >
              <PlantainBunch className="w-28 h-20" />
            </motion.div>

            <FloralCluster variant="C" className="absolute -top-4 -right-4 z-20" glowColor="rgba(232,25,44,0.5)" />

            {[
              { top: "15%", left: "5%", size: 22, delay: 0 },
              { top: "70%", right: "5%", size: 18, delay: 0.4 },
              { top: "40%", right: "-2%", size: 14, delay: 0.8 },
              { top: "85%", left: "35%", size: 16, delay: 1.2 },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ top: s.top, left: "left" in s ? s.left : undefined, right: "right" in s ? s.right : undefined }}
                animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
              >
                <PrStar size={s.size} color="#C8952C" className="drop-glow-gold" />
              </motion.div>
            ))}

            {/* Hibiscus — top-left of logo */}
            <motion.div
              className="absolute -top-2 left-8 z-20 pointer-events-none"
              animate={{ rotate: [-6, 6, -6], y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 4px 16px rgba(232,25,44,0.5))" }}
            >
              <HibiscusFlower className="w-14 h-14 opacity-80" />
            </motion.div>

<motion.div
              className="absolute -bottom-4 right-4 z-30 bg-[#E8192C] text-white px-5 py-3 shadow-2xl"
              style={{ boxShadow: "0 0 30px rgba(232,25,44,0.5), 0 8px 30px rgba(0,0,0,0.4)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/70">Lunch Available</p>
              <p className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>Mon · Wed · Fri</p>
              <p className="text-xs text-white/70">11am – 2pm</p>
            </motion.div>
          </motion.div>

        </div>{/* end grid */}

      </div>{/* end max-w-7xl */}

      {/* Stats marquee — inside hero, above wave */}
      <div className="relative z-10 overflow-hidden border-t border-white/10 py-4 mb-[70px] bg-black/20 backdrop-blur-sm">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
          {[...Array(4)].map((_, copy) =>
            [
              [t.marquee.stat1, t.marquee.label1],
              [t.marquee.stat2, t.marquee.label2],
              [t.marquee.stat3, t.marquee.label3],
            ].map(([stat, label]) => (
              <span key={`${copy}-${stat}`} className="inline-flex items-center gap-3 mx-10">
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "#C8952C", textShadow: "0 0 16px rgba(200,149,44,0.6)" }}
                >
                  {stat}
                </span>
                <span className="text-white/50 text-sm font-medium tracking-widest uppercase">{label}</span>
                <PrStar size={10} color="#E8192C" className="opacity-60" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full" style={{ display: "block" }}>
          <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="white" />
        </svg>
      </div>

    </section>
  );
}
