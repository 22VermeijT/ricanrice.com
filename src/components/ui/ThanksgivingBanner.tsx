"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { PrStar } from "@/components/ui/Illustrations";

export default function ThanksgivingBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [flyerOpen, setFlyerOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const tg = t.thanksgiving;

  useEffect(() => {
    if (!flyerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFlyerOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [flyerOpen]);

  if (dismissed || pathname === "/thanksgiving") return null;

  return (
    <>
      <div
        className="fixed top-[73px] left-0 right-0 z-[45] bg-[#6B2E1F] border-b border-[#C8952C]/40"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center gap-3">
          <PrStar size={12} color="#C8952C" className="shrink-0" />

          <button
            onClick={() => setFlyerOpen(true)}
            className="flex-1 min-w-0 text-left text-xs sm:text-sm text-white font-medium truncate cursor-pointer"
          >
            {tg.bannerText}
            <span className="hidden sm:inline font-normal text-white/70"> · {tg.bannerSub}</span>
          </button>

          <button
            onClick={() => setFlyerOpen(true)}
            className="shrink-0 text-xs font-bold text-[#6B2E1F] bg-[#C8952C] hover:bg-[#d9a63d] px-3 py-1 rounded-full transition-colors cursor-pointer"
          >
            {tg.bannerCta}
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {flyerOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFlyerOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={tg.flyerAlt}
          >
            <motion.div
              className="relative w-full max-w-md bg-white shadow-2xl flex flex-col max-h-[92vh]"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setFlyerOpen(false)}
                className="absolute -top-3 -right-3 z-10 w-9 h-9 bg-white text-[#1C1C1E] flex items-center justify-center shadow-lg hover:bg-gray-100 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto">
                <Image
                  src="/thanksgiving-flyer.webp"
                  alt={tg.flyerAlt}
                  width={1081}
                  height={1400}
                  sizes="(max-width: 480px) 100vw, 448px"
                  className="w-full h-auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 border-t border-gray-100">
                <Link
                  href="/thanksgiving"
                  onClick={() => setFlyerOpen(false)}
                  className="text-center border-2 border-[#3B160D] text-[#3B160D] font-bold text-sm py-3 hover:bg-[#3B160D] hover:text-white transition-colors"
                >
                  {tg.flyerDetails}
                </Link>
                <Link
                  href="/thanksgiving#thanksgiving-order"
                  onClick={() => setFlyerOpen(false)}
                  className="text-center bg-[#E8192C] hover:bg-[#c8000f] text-white font-bold text-sm py-3 transition-colors"
                >
                  {tg.orderCta}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
