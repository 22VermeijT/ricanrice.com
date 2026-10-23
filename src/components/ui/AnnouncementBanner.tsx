"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { PrStar } from "@/components/ui/Illustrations";

const ROTATE_MS = 5500;

type SlideId = "restaurant" | "thanksgiving";

const SLIDE_STYLES: Record<
  SlideId,
  { bg: string; border: string; shadow: string }
> = {
  restaurant: {
    bg: "bg-[#E8192C]",
    border: "border-black/15",
    shadow: "0 4px 24px rgba(232,25,44,0.45)",
  },
  thanksgiving: {
    bg: "bg-[#6B2E1F]",
    border: "border-[#C8952C]/40",
    shadow: "0 4px 20px rgba(0,0,0,0.25)",
  },
};

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [restaurantOpen, setRestaurantOpen] = useState(false);
  const [flyerOpen, setFlyerOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const tg = t.thanksgiving;
  const bannerRef = useRef<HTMLDivElement>(null);

  const slides = useMemo<SlideId[]>(() => {
    if (pathname === "/thanksgiving") return ["restaurant"];
    return ["restaurant", "thanksgiving"];
  }, [pathname]);

  const safeIndex = slides.length > 0 ? index % slides.length : 0;
  const activeId = slides[safeIndex] ?? "restaurant";
  const style = SLIDE_STYLES[activeId];
  const modalOpen = restaurantOpen || flyerOpen;
  const visible = !dismissed;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Auto-rotate when more than one slide and not paused / reduced-motion / modal open.
  useEffect(() => {
    if (!visible || slides.length < 2 || paused || reduceMotion || modalOpen) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [visible, slides.length, paused, reduceMotion, modalOpen]);

  // Reserve body padding so the fixed strip doesn't cover content.
  useEffect(() => {
    const el = bannerRef.current;
    if (!visible || !el) return;
    const apply = () => {
      document.body.style.paddingTop = `${el.offsetHeight}px`;
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.body.style.paddingTop = "";
    };
  }, [visible, activeId]);

  // Escape closes whichever modal is open; lock scroll while a modal is open.
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setRestaurantOpen(false);
      setFlyerOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={bannerRef}
        className={`fixed top-[73px] left-0 right-0 z-[45] border-b transition-colors duration-300 ${style.bg} ${style.border}`}
        style={{ boxShadow: style.shadow }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center gap-3">
          <div className="relative flex-1 min-w-0 min-h-[1.75rem]">
            <AnimatePresence mode="wait" initial={false}>
              {activeId === "restaurant" ? (
                <motion.div
                  key="restaurant"
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                >
                  <div className="relative shrink-0 flex items-center justify-center w-5 h-5">
                    {!reduceMotion && (
                      <motion.div
                        className="absolute w-5 h-5 rounded-full bg-white/30"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      />
                    )}
                    <div
                      className="w-2.5 h-2.5 rounded-full bg-white"
                      style={{ boxShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setRestaurantOpen(true)}
                    className="flex-1 min-w-0 text-left text-xs sm:text-sm text-white font-medium truncate cursor-pointer"
                  >
                    We&apos;re opening a restaurant!
                    <span className="hidden sm:inline font-normal text-white/75">
                      {" "}
                      — Tap to read an update from us.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRestaurantOpen(true)}
                    className="shrink-0 text-xs font-bold text-[#E8192C] bg-white hover:bg-white/90 px-3 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    Read more
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="thanksgiving"
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                >
                  <PrStar size={12} color="#C8952C" className="shrink-0" />
                  <button
                    type="button"
                    onClick={() => setFlyerOpen(true)}
                    className="flex-1 min-w-0 text-left text-xs sm:text-sm text-white font-medium truncate cursor-pointer"
                  >
                    {tg.bannerText}
                    <span className="hidden sm:inline font-normal text-white/70">
                      {" "}
                      · {tg.bannerSub}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlyerOpen(true)}
                    className="shrink-0 text-xs font-bold text-[#6B2E1F] bg-[#C8952C] hover:bg-[#d9a63d] px-3 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    {tg.bannerCta}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {slides.length > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 shrink-0" role="tablist" aria-label="Announcements">
              {slides.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={i === safeIndex}
                  aria-label={id === "restaurant" ? "Restaurant announcement" : "Thanksgiving announcement"}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === safeIndex ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="shrink-0 p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Restaurant modal */}
      <AnimatePresence>
        {restaurantOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setRestaurantOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-[61] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-lg bg-[#001435] border border-white/10 overflow-hidden"
                initial={{ scale: 0.94, y: 24 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 24 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Restaurant coming soon"
                style={{ boxShadow: "0 0 80px rgba(0,0,0,0.7), 0 0 40px rgba(232,25,44,0.08)" }}
              >
                <div className="h-1 bg-[#E8192C]" style={{ boxShadow: "0 0 16px rgba(232,25,44,0.7)" }} />
                <div
                  className="absolute left-0 top-6 bottom-6 w-1 bg-[#C8952C]"
                  style={{ boxShadow: "0 0 12px rgba(200,149,44,0.5)" }}
                />
                <div className="px-8 py-7 pl-10">
                  <button
                    type="button"
                    onClick={() => setRestaurantOpen(false)}
                    className="absolute top-4 right-4 p-2 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h2
                    className="text-white text-2xl font-bold leading-tight mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    We&apos;re Opening!
                  </h2>
                  <p className="text-[#C8952C] text-xs font-bold tracking-widest uppercase mb-5">
                    Rican Rice — Madison, WI
                  </p>
                  <div className="border-t border-white/10 mb-5" />
                  <p className="text-white/65 text-sm leading-relaxed mb-6">
                    Stay tuned for updates on our opening! We are currently waiting on final city
                    approval to continue construction and open our doors to you soon. Thank you for
                    your patience! In the meantime, follow our Facebook page to stay updated on our
                    food pop-ups and other events we are involved in, where you can come and enjoy
                    our food around Madison.
                  </p>
                  <a
                    href="https://www.facebook.com/profile.php?id=61567520785285"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full bg-[#1877F2] hover:bg-[#1464d8] text-white font-bold text-sm py-3.5 transition-colors duration-200"
                    style={{ boxShadow: "0 4px 20px rgba(24,119,242,0.25)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                    Follow us on Facebook
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Thanksgiving flyer modal */}
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
                type="button"
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
