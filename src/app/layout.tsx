import type { Metadata } from "next";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/LanguageContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ricanrice.com"),
  title: {
    default: "Rican Rice — La Casa del Arroz | Puerto Rican Catering Madison WI",
    template: "%s | Rican Rice",
  },
  description:
    "Madison's premier Puerto Rican catering experience. Authentic family recipes, handcrafted meals for weddings, corporate events, quinceañeras, and every celebration. Order lunch Mon/Wed/Fri.",
  keywords:
    "Puerto Rican catering Madison WI, Puerto Rican food Wisconsin, catering Madison Wisconsin, authentic Puerto Rican catering, Puerto Rican lunch delivery Madison",
  authors: [{ name: "Rican Rice" }],
  openGraph: {
    title: "Rican Rice — La Casa del Arroz | Puerto Rican Catering Madison WI",
    description:
      "Authentic Puerto Rican flavor for every celebration. Madison's premier catering experience.",
    type: "website",
    url: "https://ricanrice.com",
    siteName: "Rican Rice",
    locale: "en_US",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rican Rice — Authentic Puerto Rican Catering Madison WI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rican Rice — La Casa del Arroz",
    description: "Authentic Puerto Rican flavor for every celebration. Madison's premier catering experience.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${dancingScript.variable}`}
    >
      <body>
        <LanguageProvider>
<Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
