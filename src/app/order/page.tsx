import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import OrderForm from "@/components/order/OrderForm";
import OrderHero from "@/components/order/OrderHero";
import OrderSidebar from "@/components/order/OrderSidebar";

export const metadata: Metadata = {
  title: "Order & Book Catering — Puerto Rican Catering Madison WI",
  description:
    "Place a lunch order or book catering with Rican Rice. Authentic Puerto Rican food for weddings, corporate events, quinceañeras, and more in Madison, Wisconsin.",
  openGraph: {
    title: "Order & Book Catering — Rican Rice",
    description: "Place a lunch order or book catering with Rican Rice. Authentic Puerto Rican food in Madison, Wisconsin.",
    url: "https://ricanrice.com/order",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Order Rican Rice Catering" }],
  },
};

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-white">
      <OrderHero />

      {/* Form + sidebar */}
      <section className="py-20 bg-[#f9f6f0]">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="left">
                <div className="bg-white border border-gray-200 p-8 sm:p-10">
                  <OrderForm />
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="right">
                <OrderSidebar />
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
