"use client";

import type { ReactNode } from "react";

import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Utensils, TreePalm, Heart, PartyPopper } from "lucide-react";
import { PrStar, HibiscusFlower, TropicalLeaf } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";
import { useLanguage } from "@/components/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const tiles = [
    { icon: <Utensils className="w-8 h-8" />, color: "#E8192C", bg: "#001840", title: t.about.tile1Title, desc: t.about.tile1Desc },
    { icon: <TreePalm className="w-8 h-8" />, color: "#C8952C", bg: "#E8192C", title: t.about.tile2Title, desc: t.about.tile2Desc },
    { icon: <Heart className="w-8 h-8" />, color: "#001840", bg: "#C8952C", title: t.about.tile3Title, desc: t.about.tile3Desc },
    { icon: <PartyPopper className="w-8 h-8" />, color: "#E8192C", bg: "#1A5C2A", title: t.about.tile4Title, desc: t.about.tile4Desc },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative background star */}
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]">
        <PrStar size={520} color="#E8192C" />
      </div>

      {/* Tropical leaf — left edge peeking in */}
      <div className="absolute -left-10 top-1/3 pointer-events-none opacity-[0.12]" style={{ transform: "rotate(-20deg)" }}>
        <TropicalLeaf className="w-32 h-44" />
      </div>
      {/* Tropical leaf — bottom right */}
      <div className="absolute -right-8 bottom-20 pointer-events-none opacity-[0.08]" style={{ transform: "rotate(160deg)" }}>
        <TropicalLeaf className="w-28 h-40" />
      </div>

      {/* Hibiscus — top right accent */}
      <motion.div
        className="absolute top-12 right-28 pointer-events-none opacity-60"
        animate={{ rotate: [-8, 8, -8], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 4px 20px rgba(232,25,44,0.45))" }}
      >
        <HibiscusFlower className="w-16 h-16" />
      </motion.div>

      {/* Floral clusters */}
      <FloralCluster
        variant="A"
        className="absolute top-10 right-6 opacity-75"
        glowColor="rgba(232,25,44,0.4)"
      />
      <FloralCluster
        variant="D"
        className="absolute bottom-10 left-4 opacity-55"
        flip
        glowColor="rgba(232,25,44,0.35)"
      />
      <FloralCluster
        variant="C"
        className="absolute top-1/2 right-0 -translate-y-1/2 opacity-30"
        glowColor="rgba(200,149,44,0.4)"
      />

      <div className="relative max-w-7xl mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT — Visual composition */}
          <AnimatedSection direction="left">
            <div className="relative">
              {/* Main blue block */}
              <div className="relative bg-[#001840] aspect-[3/4] overflow-hidden">
                {/* Red block top-right */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#E8192C]" style={{ boxShadow: "0 0 40px rgba(232,25,44,0.6)" }} />
                {/* Gold bottom strip */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#C8952C]" style={{ boxShadow: "0 0 20px rgba(200,149,44,0.6)" }} />

                {/* Floating stars inside block */}
                {[
                  { top: "15%", left: "8%", size: 30, delay: 0 },
                  { top: "25%", right: "12%", size: 20, delay: 0.6 },
                  { bottom: "20%", left: "12%", size: 16, delay: 1.2 },
                  { bottom: "30%", right: "8%", size: 24, delay: 0.3 },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    className="absolute pointer-events-none"
                    style={{
                      top: "top" in s ? s.top : undefined,
                      bottom: "bottom" in s ? s.bottom : undefined,
                      left: "left" in s ? s.left : undefined,
                      right: "right" in s ? s.right : undefined,
                    }}
                    animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
                  >
                    <PrStar size={s.size} color="#C8952C" className="drop-glow-gold" />
                  </motion.div>
                ))}

                {/* Food photo — no overlays */}
                <Image
                  src="/about-rice-bowl-v2.png"
                  alt="Arroz con Gandules, Puerto Rico's national dish"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Red floating card */}
              <div
                className="absolute -bottom-8 -right-8 bg-[#E8192C] text-white p-6 max-w-[190px] shadow-2xl"
                style={{ boxShadow: "0 0 40px rgba(232,25,44,0.4), 0 16px 40px rgba(0,0,0,0.3)" }}
              >
                <PrStar size={28} color="white" className="mb-2" />
                <p className="text-sm font-bold leading-snug">{t.about.since}</p>
                <p className="text-white/60 text-xs mt-1">{t.about.location}</p>
              </div>

              {/* Floral cluster — image corner */}
              <FloralCluster
                variant="C"
                className="absolute -top-8 -left-8"
                glowColor="rgba(232,25,44,0.5)"
              />
            </div>
          </AnimatedSection>

          {/* RIGHT — Text */}
          <AnimatedSection direction="right" delay={0.1}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <PrStar size={16} color="#E8192C" className="drop-glow-red" />
                <div className="w-8 h-px bg-[#E8192C]" />
                <span className="text-[#E8192C] text-sm font-bold tracking-widest uppercase">
                  {t.about.badge}
                </span>
              </div>

              <h2
                className="text-5xl sm:text-6xl font-bold text-[#001840] leading-tight mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.about.heading1}<br />
                <span style={{ color: "#E8192C", textShadow: "0 0 30px rgba(232,25,44,0.25)" }}>
                  {t.about.heading2}
                </span>
              </h2>

              <div className="space-y-5 text-[#3A3A3C] leading-relaxed text-base">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>

              <blockquote className="mt-8 pl-6 py-2 border-l-4 border-[#C8952C] relative">
                <PrStar size={12} color="#C8952C" className="absolute -left-1.5 top-2 drop-glow-gold" />
                <p className="text-xl text-[#001840] italic" style={{ fontFamily: "var(--font-accent)" }}>
                  &ldquo;{t.about.quote}&rdquo;
                </p>
              </blockquote>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="/order"
                  className="bg-[#001840] text-white font-bold px-8 py-4 transition-all hover:-translate-y-0.5"
                  style={{ boxShadow: "0 0 20px rgba(0,24,64,0.3)" }}
                >
                  {t.about.bookBtn}
                </Link>
                <Link
                  href="/menu"
                  className="border-2 border-[#E8192C] text-[#E8192C] font-bold px-8 py-4 hover:bg-[#E8192C] hover:text-white transition-all"
                >
                  {t.about.menuBtn}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Value tiles */}
        <div className="mt-28 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
          {tiles.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.08}>
              <motion.div
                className="relative overflow-hidden p-8 group cursor-default h-full"
                style={{ backgroundColor: v.bg }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 32px ${v.color}55, 0 8px 32px rgba(0,0,0,0.3)` }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4 text-white">{v.icon}</div>
                <h4
                  className="font-bold text-white text-base mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
                {/* Corner star */}
                <div className="absolute bottom-3 right-3 opacity-20">
                  <PrStar size={28} color={v.color} />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
