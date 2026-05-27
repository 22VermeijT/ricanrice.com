import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MenuGrid from "@/components/menu/MenuGrid";
import MenuHero from "@/components/menu/MenuHero";
import MenuCTA from "@/components/menu/MenuCTA";

export const metadata: Metadata = {
  title: "Full Menu — Authentic Puerto Rican Food Madison WI",
  description:
    "Explore our full menu of authentic Puerto Rican dishes — arroz con gandules, pernil, mofongo, pasteles, and more. Available for catering and lunch delivery in Madison, Wisconsin.",
  openGraph: {
    title: "Full Menu — Rican Rice | Authentic Puerto Rican Food Madison WI",
    description: "Explore our full menu of authentic Puerto Rican dishes. Available for catering and lunch delivery in Madison, Wisconsin.",
    url: "https://ricanrice.com/menu",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rican Rice Full Menu" }],
  },
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white">
      <MenuHero />

      {/* Menu */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <AnimatedSection>
            <MenuGrid showFilters={true} />
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <MenuCTA />
    </div>
  );
}
