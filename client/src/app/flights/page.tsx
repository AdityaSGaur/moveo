"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Airplane01Icon,
  StarIcon,
  Clock01Icon,
  Ticket01Icon,
  Calendar01Icon,
  KnightShieldIcon,
  Notification01Icon,
  Location01Icon,
  CreditCardIcon,
} from "@hugeicons/core-free-icons";

const POPULAR_FLIGHTS = [
  { airline: "IndiGo",       flightNo: "6E-123", from: "Bangalore",   fromCode: "BLR", to: "Mumbai",      toCode: "BOM", duration: "1h 45m", price: 3450, rating: 4.2 },
  { airline: "Vistara",      flightNo: "UK-456", from: "Delhi",       fromCode: "DEL", to: "Bangalore",   toCode: "BLR", duration: "2h 30m", price: 5800, rating: 4.6 },
  { airline: "Air India",    flightNo: "AI-789", from: "Mumbai",      fromCode: "BOM", to: "London",      toCode: "LHR", duration: "9h 15m", price: 45200, rating: 4.1 },
  { airline: "Akasa Air",    flightNo: "QP-101", from: "Bangalore",   fromCode: "BLR", to: "Goa",         toCode: "GOX", duration: "1h 10m", price: 2100, rating: 4.3 },
  { airline: "SpiceJet",     flightNo: "SG-202", from: "Chennai",     fromCode: "MAA", to: "Hyderabad",   toCode: "HYD", duration: "1h 15m", price: 2800, rating: 3.8 },
  { airline: "AirAsia",      flightNo: "I5-303", from: "Bangalore",   fromCode: "BLR", to: "Kochi",       toCode: "COK", duration: "1h 05m", price: 2400, rating: 4.0 },
];

const FLIGHT_CLASSES = [
  { name: "Economy",        desc: "Affordable and comfortable seating for short trips" },
  { name: "Premium Economy",desc: "Extra legroom and priority boarding" },
  { name: "Business",       desc: "Lie-flat beds, lounge access, premium dining" },
  { name: "First Class",    desc: "Ultimate luxury, privacy, and exclusive service" },
];

const FEATURES = [
  { icon: KnightShieldIcon,   title: "Secure Booking",    desc: "100% secure payments and guaranteed ticketing." },
  { icon: Location01Icon,     title: "Global Reach",      desc: "Connect to over 1,500 destinations worldwide." },
  { icon: Notification01Icon, title: "Real-time Updates", desc: "Get instant alerts for gate changes and delays." },
  { icon: CreditCardIcon,     title: "Easy Refunds",      desc: "Hassle-free cancellation and refund process." },
];

export default function FlightsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".flight-hero > *", { y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out" });
    gsap.from(".flight-card", { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
    gsap.from(".feature-card", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".features-section", start: "top 80%" } });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-text-primary pt-28 pb-20">

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20 flight-hero">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-bold tracking-widest uppercase text-accent-primary">
            <HugeiconsIcon icon={Airplane01Icon} size={14} className="text-accent-primary" />
            Flight Booking
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 max-w-3xl leading-tight">
          Take off to<br />Your Next Adventure
        </h1>
        <p className="text-text-secondary text-base max-w-xl mb-10 leading-relaxed">
          Compare and book cheap flights from over 500 airlines. Enjoy a seamless booking experience and fly securely to your dream destinations.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/book?category=flight" className="flex items-center gap-2 px-8 py-4 bg-accent-primary text-background rounded-2xl text-sm font-bold tracking-wide hover:opacity-90 transition-opacity shadow-lg">
            <HugeiconsIcon icon={Ticket01Icon} size={16} />
            Search Flights
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
          <button className="px-8 py-4 border border-white/10 rounded-2xl text-sm font-bold text-text-secondary hover:text-text-primary hover:border-white/30 transition-all">
            Check Flight Status
          </button>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, i) => (
            <div key={i} className="feature-card p-6 rounded-2xl bg-surface border border-white/5 hover:bg-surface-elevated transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4 text-accent-primary">
                <HugeiconsIcon icon={feat.icon} size={24} />
              </div>
              <h3 className="font-bold mb-2">{feat.title}</h3>
              <p className="text-sm text-text-tertiary leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FLIGHT CLASSES ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl font-display font-bold mb-5">Browse by Cabin Class</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FLIGHT_CLASSES.map((t, i) => (
            <Link key={i} href={`/book?category=flight&class=${t.name}`}
              className="bg-surface-elevated border border-white/10 rounded-2xl p-5 hover:border-white/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 w-fit mb-4">
                <HugeiconsIcon icon={Airplane01Icon} size={18} className="text-blue-400" />
              </div>
              <div className="font-bold text-sm mb-1.5 group-hover:text-accent-primary transition-colors">{t.name}</div>
              <div className="text-xs text-text-tertiary leading-relaxed">{t.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POPULAR FLIGHTS ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-1">Popular Routes</h2>
            <p className="text-text-tertiary text-sm">Frequently booked flights across top destinations</p>
          </div>
          <Link href="/book?category=flight" className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
            View All <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POPULAR_FLIGHTS.map((flight, i) => (
            <Link key={i} href={`/book?category=flight&flight=${flight.flightNo}`}
              className="flight-card group bg-surface-elevated border border-white/10 rounded-2xl p-5 hover:border-white/25 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shrink-0">
                  <HugeiconsIcon icon={Airplane01Icon} size={18} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-sm">{flight.airline}</span>
                    <span className="text-[10px] text-text-tertiary font-mono">#{flight.flightNo}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div>
                      <div className="font-bold text-sm">{flight.from}</div>
                      <div className="text-[10px] font-bold text-accent-primary">{flight.fromCode}</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-[10px] text-text-tertiary mb-1">{flight.duration}</div>
                      <div className="flex items-center gap-1 w-full">
                        <div className="h-px flex-1 bg-white/20" />
                        <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="text-text-tertiary" />
                        <div className="h-px flex-1 bg-white/20" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">{flight.to}</div>
                      <div className="text-[10px] font-bold text-accent-primary">{flight.toCode}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-text-tertiary">
                      <HugeiconsIcon icon={Clock01Icon} size={11} />
                      <span>{flight.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <HugeiconsIcon icon={StarIcon} size={11} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold">{flight.rating}</span>
                      </div>
                      <span className="text-base font-display font-bold">₹{flight.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-accent-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-background mb-2">Book Now and Save</h2>
            <p className="text-background/70 text-sm">Get up to 20% off on your first flight booking with code FLY20.</p>
          </div>
          <Link href="/book?category=flight" className="flex items-center gap-2 px-8 py-4 bg-background text-foreground rounded-2xl text-sm font-bold whitespace-nowrap hover:opacity-90 transition-opacity shadow-xl">
            Claim Offer
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
