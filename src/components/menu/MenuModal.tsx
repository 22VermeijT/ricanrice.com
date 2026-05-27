"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, CheckCircle, Users, Leaf } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { PrStar } from "@/components/ui/Illustrations";
import { useLanguage } from "@/components/LanguageContext";

const categoryColors: Record<string, { bg: string; glow: string }> = {
  "Lunch Plates":  { bg: "#7A2E0E", glow: "rgba(122,46,14,0.4)" },
  "By the Dozen":  { bg: "#1A5C2A", glow: "rgba(26,92,42,0.4)" },
  "Desserts":      { bg: "#8B4A00", glow: "rgba(139,74,0,0.4)" },
  "Sides":         { bg: "#1C3A5C", glow: "rgba(28,58,92,0.4)" },
};

function SpiceLevel({ level, labels }: { level: number; labels: readonly string[] }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Flame
          key={i}
          className="w-4 h-4"
          style={{
            color: i < level ? "#E8192C" : "#E5E5E5",
            fill: i < level ? "#E8192C" : "transparent",
          }}
        />
      ))}
      <span className="ml-1 text-sm text-[#6E6E73]">{labels[level]}</span>
    </div>
  );
}

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: Props) {
  const { t, language } = useLanguage();
  const m = t.menuModal;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, handleKeyDown]);

  const cc = item ? (categoryColors[item.category] ?? { bg: "#001840", glow: "rgba(0,24,64,0.4)" }) : null;
  const categoryLabel = item
    ? (t.menu.categoryNames as Record<string, string>)[item.category] ?? item.category
    : "";

  const description    = item ? (language === "es" ? item.descriptionEs    : item.description)    : "";
  const longDesc       = item ? (language === "es" ? item.longDescriptionEs : item.longDescription) : "";
  const culturalCtx    = item ? (language === "es" ? item.culturalContextEs : item.culturalContext) : "";

  return (
    <AnimatePresence>
      {item && cc && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative bg-white w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              initial={{ y: "100%", scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: "100%", scale: 0.95 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero header */}
              <div
                className="relative h-56 sm:h-64 flex-shrink-0 overflow-hidden"
                style={item.photo ? undefined : { backgroundColor: cc.bg }}
              >
                {item.photo ? (
                  <Image
                    src={item.photo}
                    alt={item.nameEn}
                    fill
                    sizes="(max-width: 640px) 100vw, 672px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 60%, ${cc.glow} 0%, transparent 65%)` }}
                    />
                    <div className="absolute bottom-4 right-4 opacity-10">
                      <PrStar size={100} color="white" />
                    </div>
                    <svg className="absolute left-0 top-0 bottom-0 h-full pointer-events-none" viewBox="0 0 120 256" preserveAspectRatio="none">
                      <polygon points="0,0 120,128 0,256" fill="white" opacity="0.06" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: "spring", damping: 18 }}
                        style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.4))" }}
                      >
                        {(() => {
                          const I = (LucideIcons as Record<string, any>)[item.icon];
                          return I ? <I className="w-28 h-28 text-white opacity-80" /> : null;
                        })()}
                      </motion.div>
                    </div>
                  </>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 border border-white/25 tracking-wider uppercase">
                    {categoryLabel}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 px-6 py-6 sm:px-8 space-y-6">
                {/* Title */}
                <div>
                  <p className="text-[10px] tracking-widest uppercase font-bold mb-1" style={{ color: cc.bg }}>
                    {item.nameEs}
                  </p>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#001840] leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {language === "es" ? item.nameEs : item.nameEn}
                  </h2>
                  <p className="mt-2 text-[#6E6E73] text-sm sm:text-base leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-100 p-3">
                    <p className="text-[10px] text-[#6E6E73] mb-1 font-bold uppercase tracking-wide">{m.spiceLevel}</p>
                    <SpiceLevel level={item.spiceLevel} labels={m.spiceLevels} />
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-3">
                    <p className="text-[10px] text-[#6E6E73] mb-1 font-bold uppercase tracking-wide">{m.cateringLabel}</p>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className={`w-4 h-4 ${item.cateringAvailable ? "text-green-500" : "text-gray-400"}`} />
                      <span className="text-sm font-bold text-[#001840]">
                        {item.cateringAvailable ? m.available : m.limited}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Long desc */}
                <div>
                  <h3 className="text-xs font-bold text-[#001840] uppercase tracking-widest mb-3">{m.aboutDish}</h3>
                  <p className="text-[#3A3A3C] text-sm leading-relaxed">{longDesc}</p>
                </div>

                {/* Flavor profile */}
                <div>
                  <h3 className="text-xs font-bold text-[#001840] uppercase tracking-widest mb-3">{m.flavorProfile}</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.flavorProfile.map((flavor) => (
                      <span
                        key={flavor}
                        className="text-xs font-bold px-3 py-1.5 border-2"
                        style={{ color: cc.bg, borderColor: cc.bg + "40", background: cc.bg + "0C" }}
                      >
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-xs font-bold text-[#001840] uppercase tracking-widest mb-3">{m.keyIngredients}</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ing) => (
                      <span key={ing} className="bg-gray-50 text-[#3A3A3C] text-xs px-3 py-1.5 border border-gray-200">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cultural context */}
                <div
                  className="relative overflow-hidden p-5"
                  style={{ backgroundColor: cc.bg }}
                >
                  <div className="absolute bottom-2 right-2 opacity-10">
                    <PrStar size={60} color="white" />
                  </div>
                  <h3 className="text-[10px] font-bold text-[#C8952C] uppercase tracking-widest mb-3">
                    🇵🇷 {m.culturalHeritage}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed relative z-10">{culturalCtx}</p>
                </div>

                {/* Pairings */}
                <div>
                  <h3 className="text-xs font-bold text-[#001840] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" /> {m.pairsWell}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.pairingSuggestions.map((pair) => (
                      <span key={pair} className="bg-[#E8192C]/8 text-[#E8192C] text-xs font-bold px-3 py-1.5 border border-[#E8192C]/20">
                        {pair}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dietary */}
                {item.dietaryNotes.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-[#001840] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Leaf className="w-4 h-4" /> {m.dietaryNotes}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.dietaryNotes.map((note) => (
                        <span key={note} className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 border border-green-200">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="pb-6">
                  <a
                    href="/order"
                    className="block w-full font-bold text-base text-center py-4 text-white transition-all hover:-translate-y-0.5"
                    style={{
                      backgroundColor: cc.bg,
                      boxShadow: `0 0 24px ${cc.glow}, 0 8px 24px rgba(0,0,0,0.2)`,
                    }}
                  >
                    {m.orderForEvent}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
