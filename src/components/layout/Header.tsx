"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#001435] border-b border-white/10 py-3">
      {/* Red top line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#E8192C]" />

      <div className="max-w-7xl mx-auto px-8 sm:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="relative w-[52px] h-[52px] rounded-full overflow-hidden shrink-0 transition-all duration-300 group-hover:scale-105"
            style={{ boxShadow: "0 0 20px rgba(200,149,44,0.5), 0 0 40px rgba(200,149,44,0.2)" }}
          >
            <Image
              src="/logo.png"
              alt="Rican Rice"
              fill
              priority
              className="object-cover scale-[1.42]"
            />
          </div>
          <span
            className="text-white text-2xl font-bold"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Rican Rice
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#E8192C] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/order"
            className={`text-sm font-bold px-6 py-2.5 rounded-full transition-colors ${
              pathname === "/order"
                ? "bg-white text-[#E8192C]"
                : "bg-[#E8192C] hover:bg-[#c8000f] text-white"
            }`}
          >
            {t.nav.orderNow}
          </Link>

          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            aria-label={`Switch to ${language === "en" ? "Spanish" : "English"}`}
            className="flex items-center bg-white/10 border border-white/15 rounded-full p-1 gap-0.5"
          >
            {(["en", "es"] as const).map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 uppercase tracking-wider"
                style={
                  language === lang
                    ? { background: "#E8192C", color: "white", boxShadow: "0 0 8px rgba(232,25,44,0.5)" }
                    : { color: "rgba(255,255,255,0.4)" }
                }
              >
                {lang}
              </span>
            ))}
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

    </header>

    {/* Mobile Menu — slide in from right */}
    <AnimatePresence>
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <motion.div
            id="mobile-nav"
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#001435] border-l border-white/10 flex flex-col md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-end px-6 py-4 border-b border-white/10">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="px-6 py-6 flex flex-col gap-3 flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-medium py-3 border-b transition-colors flex items-center justify-between ${
                      isActive
                        ? "text-white border-[#E8192C]/40"
                        : "text-white/60 border-white/10 hover:text-white"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />}
                  </Link>
                );
              })}

              <Link
                href="/order"
                className={`mt-4 font-bold text-center py-3 rounded-full transition-colors ${
                  pathname === "/order"
                    ? "bg-white text-[#E8192C]"
                    : "bg-[#E8192C] text-white hover:bg-[#c8000f]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.orderNow}
              </Link>

              {/* Language toggle */}
              <button
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="mt-3 flex items-center justify-center bg-white/10 border border-white/15 rounded-full p-1 gap-0.5 w-full"
              >
                {(["en", "es"] as const).map((lang) => (
                  <span
                    key={lang}
                    className="flex-1 text-center px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-200 uppercase tracking-wider"
                    style={
                      language === lang
                        ? { background: "#E8192C", color: "white" }
                        : { color: "rgba(255,255,255,0.4)" }
                    }
                  >
                    {lang}
                  </span>
                ))}
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
