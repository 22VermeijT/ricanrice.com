import type { Metadata } from "next";
import ThanksgivingDetails from "@/components/thanksgiving/ThanksgivingDetails";
import ThanksgivingOrderForm from "@/components/thanksgiving/ThanksgivingOrderForm";

export const metadata: Metadata = {
  title: "Thanksgiving Dinner for 8–10 · $150 — Puerto Rican Thanksgiving Madison WI",
  description:
    "Celebrate Thanksgiving with Rican Rice: a Puerto Rican dinner for 8–10 for $150 with rice, salad, and turkey or roast pork. Pasteles, flan, and individual plates available. Order by Nov 22.",
  openGraph: {
    title: "Thanksgiving Dinner from Rican Rice — $150 for 8–10",
    description: "Puerto Rican Thanksgiving dinner for 8–10 for $150. Pickup at 1226 Williamson St, Madison. Order by Nov 22.",
    url: "https://ricanrice.com/thanksgiving",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Rican Rice Thanksgiving Dinner" }],
  },
};

export default function ThanksgivingPage() {
  return (
    <div className="min-h-screen bg-white">
      <ThanksgivingDetails />
      <section id="thanksgiving-order" className="py-20 bg-white scroll-mt-32">
        <div className="max-w-3xl mx-auto px-8 sm:px-12">
          <div className="bg-white border border-gray-200 p-8 sm:p-10">
            <ThanksgivingOrderForm />
          </div>
        </div>
      </section>
    </div>
  );
}
