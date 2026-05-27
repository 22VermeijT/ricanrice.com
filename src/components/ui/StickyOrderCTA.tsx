"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

export default function StickyOrderCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed bottom-5 left-4 right-4 z-40 md:hidden"
        >
          <a
            href="/order"
            aria-label="Order Now — Rican Rice"
            className="flex items-center justify-center gap-3 w-full text-white font-bold text-base py-4 transition-colors"
            style={{
              backgroundColor: "#E8192C",
              boxShadow: "0 0 30px rgba(232,25,44,0.6), 0 8px 30px rgba(0,0,0,0.3)",
            }}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Order Now · (608) 219-9268
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
