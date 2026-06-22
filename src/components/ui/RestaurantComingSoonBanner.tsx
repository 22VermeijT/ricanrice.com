"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export default function RestaurantComingSoonBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (dismissed) return null;

  return (
    <>
      {/* Banner */}
      <motion.div
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.45, ease: "easeOut" }}
        className="fixed top-[73px] left-0 right-0 z-[45] bg-[#E8192C] border-b border-black/15"
        style={{ boxShadow: "0 4px 24px rgba(232,25,44,0.45)" }}
      >
        <div />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center gap-3">
          {/* Pulsing white dot */}
          <div className="relative shrink-0 flex items-center justify-center w-5 h-5">
            <motion.div
              className="absolute w-5 h-5 rounded-full bg-white/30"
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
            <div className="w-2.5 h-2.5 rounded-full bg-white" style={{ boxShadow: "0 0 8px rgba(255,255,255,0.8)" }} />
          </div>

          {/* Text */}
          <p className="flex-1 text-xs sm:text-sm text-white min-w-0 font-medium">
            We&apos;re opening a restaurant!
            <span className="hidden sm:inline font-normal text-white/75"> — Tap to read an update from us.</span>
          </p>

          {/* CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="shrink-0 text-xs font-bold text-[#E8192C] bg-white hover:bg-white/90 px-3 py-1 rounded-full transition-all duration-200 cursor-pointer"
          >
            Read more
          </button>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
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
                style={{ boxShadow: "0 0 80px rgba(0,0,0,0.7), 0 0 40px rgba(232,25,44,0.08)" }}
              >
                {/* Red top accent */}
                <div className="h-1 bg-[#E8192C]" style={{ boxShadow: "0 0 16px rgba(232,25,44,0.7)" }} />

                {/* Gold left accent */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-1 bg-[#C8952C]"
                  style={{ boxShadow: "0 0 12px rgba(200,149,44,0.5)" }}
                />

                <div className="px-8 py-7 pl-10">
                  <button
                    onClick={() => setModalOpen(false)}
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
                    Stay tuned for updates on our opening! We are currently waiting on final city approval to continue construction and open our doors to you soon. Thank you for your patience! In the meantime, follow our Facebook page to stay updated on our food pop-ups and other events we are involved in, where you can come and enjoy our food around Madison.
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
    </>
  );
}
