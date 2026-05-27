"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { menuItems, menuCategories, type MenuItem } from "@/data/menu";
import MenuModal from "./MenuModal";
import { Flame } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { PrStar } from "@/components/ui/Illustrations";
import { useLanguage } from "@/components/LanguageContext";

const categoryColors: Record<string, { bg: string; text: string; glow: string }> = {
  "Lunch Plates": { bg: "#7A2E0E", text: "white", glow: "rgba(122,46,14,0.5)" },
  "By the Dozen": { bg: "#1A5C2A", text: "white", glow: "rgba(26,92,42,0.5)" },
  "Desserts":     { bg: "#8B4A00", text: "white", glow: "rgba(139,74,0,0.5)" },
  "Sides":        { bg: "#1C3A5C", text: "white", glow: "rgba(28,58,92,0.5)" },
};

const getCatColor = (cat: string) =>
  categoryColors[cat] ?? { bg: "#001840", text: "white", glow: "rgba(0,24,64,0.5)" };

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
  index: number;
}

function MenuCard({ item, onClick, index }: MenuCardProps) {
  const { t, language } = useLanguage();
  const catColor = getCatColor(item.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4), ease: "easeOut" }}
      className="group bg-white border border-gray-200 cursor-pointer hover:border-transparent hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden flex flex-col"
      onClick={() => onClick(item)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card header — photo if available, else colour block */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={item.photo ? undefined : { backgroundColor: catColor.bg }}
      >
        {item.photo ? (
          <Image
            src={item.photo}
            alt={item.nameEn}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <>
            {/* Glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 50%, ${catColor.glow} 0%, transparent 70%)` }}
            />
            {/* Background star */}
            <div className="absolute bottom-2 right-2 opacity-10">
              <PrStar size={60} color="white" />
            </div>
            {/* Icon watermark */}
            {(() => {
              const I = (LucideIcons as Record<string, any>)[item.icon];
              return I ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <I className="w-28 h-28 text-white opacity-15 group-hover:opacity-25 transition-opacity duration-300" />
                </div>
              ) : null;
            })()}
          </>
        )}

        {/* Spice flames — always shown */}
        <div className="absolute top-3 right-3 flex gap-0.5">
          {Array.from({ length: item.spiceLevel }).map((_, i) => (
            <Flame key={i} className="w-3 h-3 text-white fill-white opacity-80" />
          ))}
        </div>

        {/* Catering badge — always shown */}
        {item.cateringAvailable && (
          <div className="absolute bottom-3 left-3">
            <span className="text-[9px] font-bold bg-white/20 text-white px-2 py-0.5 border border-white/30 tracking-widest uppercase backdrop-blur-sm">
              ✓ {t.menu.cateringBadge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-px" style={{ background: catColor.bg }} />
          <p className="text-[10px] tracking-widest uppercase font-bold" style={{ color: catColor.bg }}>
            {item.nameEs}
          </p>
        </div>
        <h3
          className="font-bold text-[#001840] text-lg leading-tight mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {item.nameEn}
        </h3>
        <p className="text-[#6E6E73] text-sm leading-relaxed line-clamp-2 flex-1">
          {language === "es" ? item.descriptionEs : item.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <span
            className="text-xs font-bold uppercase tracking-wide group-hover:translate-x-1 inline-block transition-transform duration-200"
            style={{ color: catColor.bg }}
          >
            {t.menu.viewDetails}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface Props {
  limit?: number;
  showFilters?: boolean;
}

export default function MenuGrid({ limit, showFilters = true }: Props) {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [gridKey, setGridKey] = useState(0);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleFilter = (cat: string) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    setGridKey((k) => k + 1);
  };

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-10">
          {menuCategories.map((cat) => {
            const cc = getCatColor(cat);
            const isActive = activeCategory === cat;
            const label = cat === "All"
              ? t.menu.allCategories
              : (t.menu.categoryNames as Record<string, string>)[cat] ?? cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className="px-5 py-2.5 text-sm font-bold border-2 transition-all duration-150"
                style={
                  isActive
                    ? { backgroundColor: cc.bg, borderColor: cc.bg, color: "white", boxShadow: `0 0 16px ${cc.glow}` }
                    : { backgroundColor: "white", borderColor: "#E5E5E5", color: "#6E6E73" }
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      <div
        key={gridKey}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {displayed.map((item, i) => (
          <MenuCard key={item.id} item={item} index={i} onClick={setSelectedItem} />
        ))}
      </div>

      <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
