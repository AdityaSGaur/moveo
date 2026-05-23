// ============================================
// Moveo — Site Configuration
// ============================================

export const siteConfig = {
  name: "Moveo",
  tagline: "Book. Ride. Watch. Repeat.",
  description:
    "Your all-in-one ticket booking platform for movies, buses, and trains.",
  url: "https://moveo.app",
  ogImage: "/images/og-image.png",

  creator: "Moveo Team",
  version: "1.0.0",

  social: {
    instagram: "https://instagram.com/moveo.app",
    twitter: "https://twitter.com/moveo_app",
    linkedin: "https://linkedin.com/company/moveo",
    youtube: "https://youtube.com/@moveo",
    github: "https://github.com/moveo-app",
  },

  support: {
    email: "support@moveo.app",
    phone: "+91-1800-MOVEO",
    helpCenter: "/help",
  },
};

export const navLinks = [
  { href: "/movies", label: "Movies", icon: "🎬", module: "movie" as const },
  { href: "/buses", label: "Buses", icon: "🚌", module: "bus" as const },
  { href: "/trains", label: "Trains", icon: "🚆", module: "train" as const },
];

export const footerLinks = {
  quickLinks: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/press", label: "Press" },
    { href: "/partners", label: "Partners" },
  ],
  services: [
    { href: "/movies", label: "Movies" },
    { href: "/buses", label: "Bus Booking" },
    { href: "/trains", label: "Train Booking" },
    { href: "/offers", label: "Offers" },
    { href: "/gift-cards", label: "Gift Cards" },
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/contact", label: "Contact Us" },
    { href: "/cancellation-policy", label: "Cancellation Policy" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
};

export const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi",
  "Indore",
  "Bhopal",
  "Goa",
];

export const movieGenres = [
  "Action",
  "Comedy",
  "Drama",
  "Thriller",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Animation",
  "Documentary",
  "Adventure",
  "Fantasy",
  "Mystery",
];

export const movieLanguages = [
  "Hindi",
  "English",
  "Telugu",
  "Tamil",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
];

export const movieFormats = ["2D", "3D", "IMAX", "4DX", "IMAX 3D", "Dolby Atmos"];

export const trainClasses = [
  { code: "SL", name: "Sleeper" },
  { code: "3A", name: "3rd AC" },
  { code: "2A", name: "2nd AC" },
  { code: "1A", name: "1st AC" },
  { code: "CC", name: "Chair Car" },
  { code: "EC", name: "Executive Chair" },
  { code: "2S", name: "Second Sitting" },
];

export const trainQuotas = [
  { code: "GN", name: "General" },
  { code: "TQ", name: "Tatkal" },
  { code: "LD", name: "Ladies" },
  { code: "SS", name: "Senior Citizen" },
  { code: "HP", name: "Handicapped" },
];

export const busTypes = [
  "AC Sleeper",
  "AC Seater",
  "Non-AC Sleeper",
  "Non-AC Seater",
  "Volvo Multi-Axle",
  "Volvo AC Seater",
  "Semi-Sleeper",
  "Mercedes Multi-Axle",
];

export const busAmenities = [
  { id: "charging", label: "Charging Point", icon: "🔌" },
  { id: "wifi", label: "WiFi", icon: "📶" },
  { id: "water", label: "Water Bottle", icon: "💧" },
  { id: "blanket", label: "Blanket", icon: "🛏️" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "snacks", label: "Snacks", icon: "🍿" },
  { id: "reading_light", label: "Reading Light", icon: "💡" },
  { id: "ac", label: "Air Conditioned", icon: "❄️" },
  { id: "track", label: "Live Tracking", icon: "📍" },
  { id: "cctv", label: "CCTV", icon: "📷" },
];
