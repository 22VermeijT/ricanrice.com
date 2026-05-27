export interface Service {
  id: string;
  icon: string;
  nameEs: string;
  nameEn: string;
  description: string;
  details: string[];
  gradient: string;
  minGuests?: number;
  maxGuests?: number;
}

export const services: Service[] = [
  {
    id: "weddings",
    icon: "Gem",
    nameEs: "Bodas",
    nameEn: "Weddings",
    description:
      "Make your wedding day unforgettable with an authentic Puerto Rican feast. From intimate ceremonies to grand receptions, we deliver the flavors of the island to your celebration.",
    details: [
      "Full-service buffet or plated options",
      "Custom menu consultation",
      "On-site chefs and servers available",
      "Setup and breakdown included",
      "Wedding cake alternatives available",
    ],
    gradient: "from-rose-600 to-pink-500",
    minGuests: 25,
  },
  {
    id: "corporate",
    icon: "Building2",
    nameEs: "Eventos Corporativos",
    nameEn: "Corporate Events",
    description:
      "Elevate your next company event with catering that leaves a lasting impression. We specialize in corporate lunches, holiday parties, and client appreciation events.",
    details: [
      "Flexible drop-off or full-service",
      "Individual boxed lunch options",
      "Large-format buffet spreads",
      "Dietary accommodation support",
      "Professional presentation",
    ],
    gradient: "from-pr-blue to-blue-600",
    minGuests: 10,
  },
  {
    id: "quinceaneras",
    icon: "Crown",
    nameEs: "Quinceañeras",
    nameEn: "Quinceañeras",
    description:
      "Honor this once-in-a-lifetime milestone with the richest flavors of Puerto Rican tradition. We understand the cultural significance of a quinceañera and treat every celebration with deep respect.",
    details: [
      "Traditional Puerto Rican full spread",
      "Dessert table integration",
      "Custom family recipe accommodations",
      "Staffed service for formal occasions",
      "Extended family consultation included",
    ],
    gradient: "from-pr-red to-rose-500",
    minGuests: 30,
  },
  {
    id: "holiday",
    icon: "TreePine",
    nameEs: "Fiestas Navideñas",
    nameEn: "Holiday Parties",
    description:
      "Celebrate the season with Puerto Rican holiday staples — pernil, pasteles, arroz con gandules, and coquito. Transform any holiday party into a Boricua Christmas.",
    details: [
      "Holiday-specific menus available",
      "Pasteles by the batch",
      "Coquito service available",
      "Seasonal dessert options",
      "Perfect for office or home parties",
    ],
    gradient: "from-green-700 to-emerald-600",
    minGuests: 10,
  },
  {
    id: "festivals",
    icon: "PartyPopper",
    nameEs: "Festivales y Eventos Culturales",
    nameEn: "Festivals & Cultural Events",
    description:
      "High-volume, high-quality Puerto Rican street food and celebration fare for community festivals, cultural events, and large-scale outdoor gatherings.",
    details: [
      "High-volume catering capability",
      "Street food stations available",
      "Alcapurrias, tostones, and more",
      "Quick-service format options",
      "Festival-grade equipment provided",
    ],
    gradient: "from-gold to-amber-500",
    minGuests: 100,
  },
  {
    id: "dropoff",
    icon: "Truck",
    nameEs: "Entrega a Domicilio",
    nameEn: "Drop-Off Catering",
    description:
      "Professional-quality Puerto Rican food delivered hot and ready to your door. Perfect for smaller gatherings where you want the food done without the fuss.",
    details: [
      "Delivery within Madison metro area",
      "Hot, ready-to-serve packaging",
      "Full labeling and serving instructions",
      "Order 48 hours in advance",
      "Minimum 10-person orders",
    ],
    gradient: "from-zinc-800 to-zinc-600",
    minGuests: 10,
    maxGuests: 50,
  },
];
