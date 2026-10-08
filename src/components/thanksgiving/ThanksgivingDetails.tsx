"use client";

import Image from "next/image";
import { CalendarClock, MapPin, Phone, Truck } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloralCluster from "@/components/ui/FloralCluster";
import { PrStar } from "@/components/ui/Illustrations";
import { useLanguage } from "@/components/LanguageContext";

export default function ThanksgivingDetails() {
  const { t } = useLanguage();
  const tg = t.thanksgiving;

  const includes = [
    { label: tg.riceLabel, options: tg.riceOptions },
    { label: tg.saladLabel, options: tg.saladOptions },
    { label: tg.proteinLabel, options: tg.proteinOptions },
  ];

  const extras = [
    { title: tg.pastelesTitle, desc: tg.pastelesDesc, price: null },
    { title: tg.platesTitle, desc: tg.platesDesc, price: null },
    { title: tg.flanTitle, desc: tg.flanDesc, price: tg.flanPrice },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <Image src="/pattern-bg.webp" alt="" fill sizes="100vw" className="object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#3B160D]/90" />
        <FloralCluster variant="B" className="absolute top-6 right-8 opacity-35" glowColor="rgba(200,149,44,0.5)" />
        <FloralCluster variant="D" className="absolute bottom-4 left-4 opacity-25" flip glowColor="rgba(200,149,44,0.4)" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C8952C] z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8952C] z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12">
          <div className="flex items-center gap-3 mb-6">
            <PrStar size={14} color="#C8952C" className="drop-glow-gold" />
            <div className="w-8 h-px bg-[#C8952C]" />
            <span className="text-[#C8952C] text-sm font-bold tracking-widest uppercase">{tg.badge}</span>
          </div>
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {tg.heading1}
            <br />
            <span style={{ color: "#C8952C", textShadow: "0 0 40px rgba(200,149,44,0.4)" }}>{tg.heading2}</span>
          </h1>
          <p className="text-white/70 text-lg mt-6 max-w-xl">{tg.subtext}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#thanksgiving-order"
              className="bg-[#E8192C] text-white font-bold text-base px-9 py-4 transition-transform duration-200 hover:-translate-y-1"
              style={{ boxShadow: "0 0 24px rgba(232,25,44,0.45), 0 4px 16px rgba(0,0,0,0.3)" }}
            >
              {tg.orderCta}
            </a>
            <a
              href="tel:+16084197840"
              className="flex items-center gap-2 border-2 border-white/70 text-white font-bold text-base px-7 py-[14px] transition-colors hover:bg-white hover:text-[#3B160D]"
            >
              <Phone className="w-4 h-4" />
              {tg.callCta}
            </a>
            <span className="border-2 border-[#C8952C] text-[#C8952C] font-bold text-sm px-5 py-3 tracking-wide uppercase">
              {tg.deadline}
            </span>
          </div>
        </div>
      </section>

      {/* Dinner package */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <AnimatedSection direction="left" className="lg:col-span-2">
            <div className="bg-[#3B160D] text-white p-10 h-full flex flex-col justify-center">
              <p className="text-[#C8952C] text-xs font-bold tracking-widest uppercase mb-3">{tg.serves}</p>
              <p className="text-7xl font-bold leading-none mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {tg.price}
              </p>
              <p className="text-white/60 text-sm leading-relaxed">{tg.subtext}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="lg:col-span-3">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#001840] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tg.includesHeading}
            </h2>
            <div className="space-y-6">
              {includes.map(({ label, options }) => (
                <div key={label} className="border-l-4 border-[#C8952C] pl-5">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#6E6E73] mb-1">
                    {label} · {tg.chooseOne}
                  </p>
                  <p className="text-lg font-semibold text-[#1C1C1E]">{options.join("  /  ")}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Extras + pickup */}
      <section className="py-20 bg-[#f9f6f0]">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#001840] mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {tg.extrasHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {extras.map(({ title, desc, price }) => (
              <div key={title} className="bg-white border border-gray-200 p-7">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-xl font-bold text-[#001840]" style={{ fontFamily: "var(--font-display)" }}>
                    {title}
                  </h3>
                  {price && (
                    <span className="text-2xl font-bold text-[#C8952C]" style={{ fontFamily: "var(--font-display)" }}>
                      {price}
                    </span>
                  )}
                </div>
                <p className="text-[#6E6E73] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <h3
              className="md:col-span-2 text-2xl font-bold text-[#001840]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tg.pickupHeading}
            </h3>
            {[
              { Icon: MapPin, text: tg.pickupAddress },
              { Icon: CalendarClock, text: tg.pickupTime },
              { Icon: Truck, text: tg.deliveryNote },
              { Icon: Phone, text: tg.callNote, href: "tel:+16084197840" },
            ].map(({ Icon, text, href }) => {
              const content = (
                <>
                  <div className="w-9 h-9 bg-[#3B160D] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#C8952C]" />
                  </div>
                  <span className="text-[#1C1C1E] text-sm font-medium">{text}</span>
                </>
              );
              return href ? (
                <a key={text} href={href} className="flex items-center gap-3 hover:text-[#E8192C]">
                  {content}
                </a>
              ) : (
                <div key={text} className="flex items-center gap-3">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How reserving works */}
      <section className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#001840] mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {tg.howHeading}
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tg.howSteps.map(({ title, desc }, i) => (
              <li key={title} className="border-t-4 border-[#C8952C] bg-[#f9f6f0] p-7">
                <span
                  className="block text-4xl font-bold text-[#C8952C] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-[#001840] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {title}
                </h3>
                <p className="text-[#6E6E73] text-sm leading-relaxed">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
