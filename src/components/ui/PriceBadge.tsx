"use client";

import { useLanguage } from "@/components/LanguageContext";

export default function PriceBadge({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const p = t.pricing;

  return (
    <div className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 border-2 border-[#C8952C] px-5 py-3 ${className}`}>
      <span className="text-white/80 text-xs font-bold tracking-widest uppercase">{p.label}</span>
      <span className="text-white/60 text-sm">{p.from}</span>
      <span className="text-[#C8952C] text-2xl font-bold leading-none" style={{ fontFamily: "var(--font-display)" }}>
        {p.price}
      </span>
      <span className="text-white/60 text-sm">{p.unit}</span>
    </div>
  );
}
