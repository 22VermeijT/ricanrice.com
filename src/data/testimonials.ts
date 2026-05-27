export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: 5 | 4 | 3;
  event: string;
  initials: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Maria G.",
    role: "Wedding Client",
    quote:
      "Rican Rice made our wedding unforgettable. The pernil was so tender it fell apart at the touch of a fork, and every single guest came back for seconds. The food tasted exactly like what my grandmother made in Puerto Rico — I cried happy tears.",
    rating: 5,
    event: "Wedding Reception • 120 Guests",
    initials: "MG",
    color: "from-pr-red to-rose-600",
  },
  {
    id: "2",
    name: "James T.",
    role: "Corporate Event Coordinator",
    quote:
      "We hired Rican Rice for our annual company holiday party and the response was unlike anything we'd seen before. People are still talking about the mofongo months later. Professional, punctual, and the food was absolutely extraordinary.",
    rating: 5,
    event: "Corporate Holiday Party • 200 Guests",
    initials: "JT",
    color: "from-pr-blue to-blue-600",
  },
  {
    id: "3",
    name: "Sofia R.",
    role: "Quinceañera Mom",
    quote:
      "My daughter's quinceañera was a dream, and Rican Rice was a huge part of that. They understood our culture, they understood the occasion, and they delivered a feast that honored our Puerto Rican heritage. The arroz con gandules was perfection.",
    rating: 5,
    event: "Quinceañera Celebration • 85 Guests",
    initials: "SR",
    color: "from-pr-red to-pink-600",
  },
  {
    id: "4",
    name: "David M.",
    role: "Festival Organizer",
    quote:
      "We've worked with many food vendors for our community festivals, but Rican Rice operates on a completely different level. Their energy, their pride in their food, and their ability to serve hundreds of guests without missing a beat is remarkable.",
    rating: 5,
    event: "Cultural Festival • 500+ Guests",
    initials: "DM",
    color: "from-gold to-amber-600",
  },
  {
    id: "5",
    name: "Ana & Luis P.",
    role: "Regular Customers",
    quote:
      "We order from Rican Rice every Monday and Wednesday. The lunch plates are generous, fresh, and priced fairly. The pollo guisado over arroz con gandules is honestly one of the best meals we have every week. Madison is so lucky to have this.",
    rating: 5,
    event: "Weekly Lunch Regulars",
    initials: "AP",
    color: "from-green-700 to-emerald-500",
  },
  {
    id: "6",
    name: "Rachel K.",
    role: "Office Manager",
    quote:
      "Brought Rican Rice in for a team lunch and watched 15 food-savvy Madisonians experience Puerto Rican food for the first time. Every single person asked for the catering info immediately. The alcapurrias disappeared in under two minutes.",
    rating: 5,
    event: "Corporate Lunch • 15 Guests",
    initials: "RK",
    color: "from-purple-700 to-indigo-600",
  },
];
