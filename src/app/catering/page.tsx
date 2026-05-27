import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CateringForm from "@/components/contact/CateringForm";
import { Phone, Mail, Clock, MapPin, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Book Catering — Rican Rice | Puerto Rican Catering Madison WI",
  description:
    "Book Rican Rice for your next event. Weddings, corporate events, quinceañeras, holiday parties, and more. Authentic Puerto Rican catering in Madison, Wisconsin.",
};

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <section className="bg-[#001435] pt-36 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#E8192C]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8952C]" />

        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#E8192C]" />
            <span className="text-[#E8192C] text-sm font-semibold tracking-widest uppercase">
              Catering & Events
            </span>
          </div>
          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s Make Your<br />
            <span className="text-[#C8952C]">Event Unforgettable</span>
          </h1>
          <p className="text-white/50 text-lg mt-6 max-w-xl">
            Fill out the form and we&apos;ll respond within 24 hours.
            Every celebration deserves authentic Puerto Rican flavor.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-20 bg-[#f9f6f0]">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="left">
                <div className="bg-white border border-gray-200 p-8 sm:p-10">
                  <h2
                    className="text-3xl font-bold text-[#002D62] mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Get in Touch
                  </h2>
                  <p className="text-[#6E6E73] text-sm mb-8">
                    Tell us about your event. We respond within 24 hours.
                  </p>
                  <CateringForm />
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact */}
              <AnimatedSection direction="right">
                <div className="bg-[#002D62] p-7 text-white">
                  <h3
                    className="text-xl font-bold mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Reach Us Directly
                  </h3>
                  <div className="space-y-4">
                    <a href="tel:+16082199268" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                      <div className="w-9 h-9 bg-[#E8192C] flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Call or text</p>
                        <p className="text-white font-semibold text-sm">(608) 219-9268</p>
                      </div>
                    </a>
                    <a href="mailto:ricanricecatering@gmail.com" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                      <div className="w-9 h-9 bg-[#E8192C] flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Email us</p>
                        <p className="text-white font-semibold text-sm">ricanricecatering@gmail.com</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 text-white/60">
                      <div className="w-9 h-9 bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Based in</p>
                        <p className="text-white font-semibold text-sm">Madison, Wisconsin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Hours */}
              <AnimatedSection direction="right" delay={0.08}>
                <div className="bg-white border border-gray-200 p-7">
                  <h3 className="text-sm font-bold text-[#002D62] tracking-widest uppercase mb-5 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#E8192C]" /> Lunch Schedule
                  </h3>
                  <div className="divide-y divide-gray-100">
                    {[
                      { day: "Monday", time: "11am – 2pm" },
                      { day: "Wednesday", time: "11am – 2pm" },
                      { day: "Friday", time: "11am – 2pm" },
                    ].map(({ day, time }) => (
                      <div key={day} className="flex justify-between py-3">
                        <span className="font-medium text-[#002D62] text-sm">{day}</span>
                        <span className="text-[#E8192C] font-bold text-sm">{time}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[#6E6E73] text-xs">Catering available 7 days/week by appointment.</p>
                </div>
              </AnimatedSection>

              {/* How it works */}
              <AnimatedSection direction="right" delay={0.16}>
                <div className="bg-white border border-gray-200 p-7">
                  <h3 className="text-sm font-bold text-[#002D62] tracking-widest uppercase mb-5">
                    How It Works
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Fill out the form or give us a call",
                      "We discuss your event and menu options",
                      "Receive a custom quote within 24 hours",
                      "Confirm and enjoy authentic Puerto Rican food!",
                    ].map((step, i) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#002D62] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-[#3A3A3C] text-sm leading-relaxed mt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Promise */}
              <AnimatedSection direction="right" delay={0.24}>
                <div className="border-l-4 border-[#C8952C] pl-6 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-[#002D62] font-bold text-sm">Our Promise</span>
                  </div>
                  <p className="text-[#6E6E73] text-sm leading-relaxed">
                    We treat every event like our own family celebration. Authentic food, warm
                    service, and guests who ask for the catering info before the night ends.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <AnimatedSection>
            <h2
              className="text-3xl font-bold text-[#002D62] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Events We Love to Cater
            </h2>
          </AnimatedSection>
          <div className="flex flex-wrap gap-3">
            {[
              "Weddings",
              "Quinceañeras",
              "Corporate Events",
              "Holiday Parties",
              "Festivals",
              "Birthdays",
              "Community Events",
              "Food Fairs",
              "Graduations",
              "Fundraisers",
            ].map((event) => (
              <span
                key={event}
                className="border-2 border-gray-200 text-[#002D62] text-sm font-semibold px-5 py-2.5 hover:border-[#002D62] transition-colors cursor-default"
              >
                {event}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
