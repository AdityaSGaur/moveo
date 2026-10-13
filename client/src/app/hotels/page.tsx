import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Hotel01Icon, StarIcon } from "@hugeicons/core-free-icons";
import { SmartSearch } from "@/components/home/SmartSearch";

const FEATURED_DESTINATIONS = [
  {
    city: "Goa",
    detail: "Beachfront stays",
    price: "From ₹6,200 / night",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
  },
  {
    city: "Udaipur",
    detail: "Lake-view escapes",
    price: "From ₹8,400 / night",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    city: "Mumbai",
    detail: "Design-led city hotels",
    price: "From ₹5,100 / night",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function HotelsPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary pt-28 pb-24">
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-text-secondary mb-5">
            <HugeiconsIcon icon={Hotel01Icon} size={16} /> Hotel stays
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-4">
            Find a stay that fits the trip.
          </h1>
          <p className="text-text-secondary text-base max-w-xl">
            Search thoughtfully selected hotels, resorts, and city stays across India.
          </p>
        </div>
        <SmartSearch initialTab="hotel" />
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-tertiary mb-2">Stay somewhere memorable</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">Featured destinations</h2>
          </div>
          <Link href="/book?category=hotel" className="hidden sm:flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">
            Browse all stays <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED_DESTINATIONS.map((destination) => (
            <Link
              key={destination.city}
              href={`/book?category=hotel&destination=${encodeURIComponent(destination.city)}`}
              className="group relative min-h-90 overflow-hidden rounded-2xl bg-surface-elevated"
            >
              <img
                src={destination.image}
                alt={`${destination.detail} in ${destination.city}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                <HugeiconsIcon icon={StarIcon} size={13} className="text-amber-300 fill-amber-300" /> Curated stays
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">{destination.detail}</p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold">{destination.city}</h3>
                    <p className="text-sm text-white/75 mt-1">{destination.price}</p>
                  </div>
                  <span className="w-10 h-10 shrink-0 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/book?category=hotel" className="sm:hidden mt-6 flex items-center justify-center gap-2 rounded-xl border border-text-tertiary/20 px-4 py-3 text-sm font-bold text-text-secondary">
          Browse all stays <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        </Link>
      </section>
    </main>
  );
}
