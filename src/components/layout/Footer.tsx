"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Heart } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#002D62] text-white">
      {/* Gold top accent */}
      <div className="h-1 bg-[#C8952C]" />

      <div className="max-w-7xl mx-auto px-8 sm:px-12 pt-16 pb-0">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-4">
              <div
                className="relative w-[64px] h-[64px] rounded-full overflow-hidden shrink-0"
                style={{ boxShadow: "0 0 20px rgba(200,149,44,0.35)" }}
              >
                <Image src="/logo.png" alt="Rican Rice" fill className="object-cover scale-[1.42]" />
              </div>
              <div>
                <div className="text-white font-bold text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                  Rican Rice
                </div>
                <div className="text-[#C8952C] text-sm" style={{ fontFamily: "var(--font-accent)" }}>
                  La Casa del Arroz
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">{t.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-6 h-px bg-[#E8192C]" />
              <span className="text-white/30 text-xs">{t.footer.slogan}</span>
            </div>
            <div className="mt-5">
              <a
                href="https://www.facebook.com/profile.php?id=61567520785285"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rican Rice on Facebook"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#1464d8] transition-colors duration-200 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#C8952C] text-xs font-bold tracking-widest uppercase mb-5">
              {t.footer.navigate}
            </h3>
            <ul className="space-y-3">
              {[
                [t.footer.home, "/"],
                [t.footer.fullMenu, "/menu"],
                [t.footer.bookCatering, "/catering"],
                [t.footer.ourStory, "#about"],
                [t.footer.orderLunch, "/order"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-[#C8952C] text-xs font-bold tracking-widest uppercase mb-5">
              {t.footer.lunchHours}
            </h3>
            <div className="space-y-3 text-sm">
              {[
                [t.days.monday, "11am – 2pm"],
                [t.days.wednesday, "11am – 2pm"],
                [t.days.friday, "11am – 2pm"],
              ].map(([day, time]) => (
                <div key={day} className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#E8192C] shrink-0" />
                  <span className="text-white/60">
                    <span className="text-white font-medium">{day}</span> · {time}
                  </span>
                </div>
              ))}
              <p className="text-white/30 text-xs mt-4 leading-relaxed">{t.footer.cateringAvailable}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-[#C8952C] text-xs font-bold tracking-widest uppercase mb-5">
              {t.footer.contact}
            </h3>
            <div className="space-y-4 mb-6">
              <a href="tel:+16082199268" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 text-[#E8192C] shrink-0" />
                (608) 219-9268
              </a>
              <a href="mailto:ricanricecatering@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4 text-[#E8192C] shrink-0" />
                ricanricecatering@gmail.com
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-[#E8192C] shrink-0" />
                {t.orderPage.serving} {t.orderPage.servingArea}
              </div>
            </div>
            <Link
              href="/order"
              className="block text-center bg-[#E8192C] hover:bg-[#c8000f] text-white text-sm font-bold py-3 px-6 transition-colors"
            >
              {t.footer.bookBtn}
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 pb-6">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Rican Rice · La Casa del Arroz · Madison, WI
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            {t.footer.madeWith} <Heart className="inline w-3 h-3 text-[#E8192C] fill-[#E8192C]" /> {t.footer.pride}
          </p>
        </div>
      </div>

      {/* Built by Heel Digital */}
      <a
        href="https://heeldigital.com"
        target="_blank"
        rel="noopener noreferrer"
        className="py-4 border-t border-white/5 flex items-center justify-center gap-2.5 hover:opacity-100 transition-opacity duration-200 group"
      >
        <span className="text-white/30 text-xs group-hover:text-white/50 transition-colors">
          {t.footer.builtBy}
        </span>
        <Image
          src="/heel-digital-logo.png"
          alt="Heel Digital"
          width={100}
          height={26}
          className="object-contain brightness-0 invert opacity-40 group-hover:opacity-80 transition-opacity duration-200"
        />
      </a>
    </footer>
  );
}
