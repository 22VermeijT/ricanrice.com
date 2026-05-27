"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Star } from "lucide-react";
import { PrStar, HibiscusFlower, TropicalLeaf } from "@/components/ui/Illustrations";
import FloralCluster from "@/components/ui/FloralCluster";
import { useLanguage } from "@/components/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const go = (idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  const current = testimonials[active];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#001435] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PrStar size={800} color="white" opacity={0.02} />
      </div>
      <FloralCluster
        variant="A"
        className="absolute top-8 left-4 opacity-30"
        glowColor="rgba(232,25,44,0.5)"
      />
      <FloralCluster
        variant="B"
        className="absolute bottom-8 right-4 opacity-22"
        flip
        glowColor="rgba(200,149,44,0.4)"
      />
      <FloralCluster
        variant="C"
        className="absolute top-1/3 right-2 opacity-18"
        glowColor="rgba(232,25,44,0.4)"
      />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C8952C]"
        style={{ boxShadow: "0 0 12px rgba(200,149,44,0.6)" }} />

      {/* Tropical leaves — edges */}
      <div className="absolute -left-8 bottom-16 pointer-events-none opacity-10" style={{ transform: "rotate(-15deg)" }}>
        <TropicalLeaf className="w-36 h-48" />
      </div>
      <div className="absolute -right-8 top-16 pointer-events-none opacity-10" style={{ transform: "rotate(165deg)" }}>
        <TropicalLeaf className="w-28 h-40" />
      </div>

      {/* Hibiscus — subtle accents */}
      <motion.div
        className="absolute top-10 right-24 pointer-events-none opacity-15"
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 4px 16px rgba(232,25,44,0.4))" }}
      >
        <HibiscusFlower className="w-14 h-14" />
      </motion.div>
      <motion.div
        className="absolute bottom-16 left-20 pointer-events-none opacity-10"
        animate={{ rotate: [6, -6, 6], y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ filter: "drop-shadow(0 4px 12px rgba(200,149,44,0.3))" }}
      >
        <HibiscusFlower className="w-10 h-10" />
      </motion.div>

      {/* Scattered stars */}
      {[
        { top: "15%", right: "3%" },
        { top: "60%", left: "2%" },
        { bottom: "20%", right: "5%" },
      ].map((pos, i) => (
        <div key={i} className="absolute pointer-events-none" style={pos}>
          <PrStar size={20} color="#C8952C" opacity={0.4} />
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-8 sm:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-10 border-b border-white/10">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <PrStar size={14} color="#E8192C" className="drop-glow-red" />
              <div className="w-8 h-px bg-[#E8192C]" />
              <span className="text-[#E8192C] text-sm font-bold tracking-widest uppercase">
                {t.testimonials.badge}
              </span>
            </div>
            <h2
              className="text-5xl sm:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.testimonials.heading1}<br />
              <span style={{ color: "#C8952C", textShadow: "0 0 30px rgba(200,149,44,0.4)" }}>
                {t.testimonials.heading2}
              </span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === active ? 32 : 10,
                    height: 10,
                    borderRadius: i === active ? 5 : 5,
                    background: i === active ? "#E8192C" : "rgba(255,255,255,0.2)",
                    boxShadow: i === active ? "0 0 10px rgba(232,25,44,0.6)" : "none",
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Avatar + meta */}
                <div>
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${current.color} flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-2xl`}
                    style={{ boxShadow: "0 0 30px rgba(232,25,44,0.25), 0 8px 30px rgba(0,0,0,0.4)" }}
                  >
                    {current.initials}
                  </div>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#C8952C] fill-[#C8952C]" />
                    ))}
                  </div>
                  <p className="font-bold text-white text-lg">{current.name}</p>
                  <p className="text-white/50 text-sm">{current.role}</p>
                  <p className="text-[#C8952C] text-xs font-bold mt-1">{current.event}</p>
                </div>

                {/* Quote */}
                <div className="lg:col-span-2">
                  <div
                    className="text-8xl text-[#E8192C]/30 font-serif leading-none mb-2"
                    style={{ textShadow: "0 0 40px rgba(232,25,44,0.5), 0 0 80px rgba(232,25,44,0.2)" }}
                  >
                    &ldquo;
                  </div>
                  <p
                    className="text-white/85 text-2xl sm:text-3xl leading-relaxed font-medium"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {current.quote}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail row */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {testimonials.map((t2, i) => (
            <button
              key={t2.id}
              onClick={() => go(i)}
              className="p-3 text-left transition-all duration-200"
              style={{
                border: `2px solid ${i === active ? "#E8192C" : "rgba(255,255,255,0.08)"}`,
                background: i === active ? "rgba(232,25,44,0.12)" : "transparent",
                boxShadow: i === active ? "0 0 12px rgba(232,25,44,0.2)" : "none",
              }}
            >
              <div
                className={`w-7 h-7 bg-gradient-to-br ${t2.color} text-white text-xs font-bold flex items-center justify-center mb-2`}
              >
                {t2.initials}
              </div>
              <p className="text-white text-xs font-semibold truncate">{t2.name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
