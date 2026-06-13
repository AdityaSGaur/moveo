"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import { SmartSearch } from "@/components/home/SmartSearch";
import {
  ArrowRight01Icon,
  BusIcon,
  Location01Icon,
  Clock01Icon,
  StarIcon,
  Ticket01Icon,
  KnightShieldIcon,
  Notification01Icon,
  CreditCardIcon,
} from "@hugeicons/core-free-icons";

const POPULAR_ROUTES = [
  { from: "Bangalore", to: "Mumbai",      duration: "8h 30m", price: 980,  rating: 4.4, buses: 28 },
  { from: "Delhi",     to: "Jaipur",      duration: "5h 00m", price: 450,  rating: 4.2, buses: 42 },
  { from: "Chennai",   to: "Hyderabad",   duration: "7h 00m", price: 720,  rating: 4.1, buses: 19 },
  { from: "Mumbai",    to: "Pune",        duration: "3h 30m", price: 320,  rating: 4.5, buses: 65 },
  { from: "Hyderabad", to: "Bangalore",   duration: "9h 00m", price: 850,  rating: 4.3, buses: 34 },
  { from: "Kolkata",   to: "Bhubaneswar", duration: "6h 00m", price: 580,  rating: 3.9, buses: 22 },
];

const FEATURES = [
  { icon: KnightShieldIcon,   title: "Safe & Verified",   desc: "All operators are GSRTC certified and GPS-tracked for your safety." },
  { icon: Location01Icon,     title: "Choose Your Seat",  desc: "Interactive seat map to select your preferred window or aisle seat." },
  { icon: Notification01Icon, title: "Live Tracking",     desc: "Real-time bus location tracking from departure to destination." },
  { icon: CreditCardIcon,     title: "Easy Cancellation", desc: "Hassle-free cancellations up to 2 hours before departure." },
];

export default function BusesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".bus-hero > *", { y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out" });
    gsap.from(".route-card", { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".routes-section", start: "top 80%" } });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-text-primary pt-28 pb-20">

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20 bus-hero">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-bold tracking-widest uppercase text-accent-primary">
            <HugeiconsIcon icon={BusIcon} size={14} className="text-accent-primary" />
            Bus Booking
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 max-w-3xl leading-tight">
          Travel Smarter,<br />Travel Greener
        </h1>
        <p className="text-text-secondary text-base max-w-xl mb-10 leading-relaxed">
          Book comfortable, safe, and affordable bus tickets to 5,000+ routes across India. Compare operators, choose your seat, and travel stress-free.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/book?category=bus" className="flex items-center gap-2 px-8 py-4 bg-accent-primary text-background rounded-2xl text-sm font-bold tracking-wide hover:opacity-90 transition-opacity shadow-lg">
            <HugeiconsIcon icon={Ticket01Icon} size={16} />
            Book Bus Ticket
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
          <button className="px-8 py-4 border border-white/10 rounded-2xl text-sm font-bold text-text-secondary hover:text-text-primary hover:border-white/30 transition-all">
            View All Routes
          </button>
        </div>
      </section>

      {/* ── SEARCH ── */}
      {/* Search moved to the central Book page — use /book?category=bus */}


      {/* ── POPULAR ROUTES ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20 routes-section">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-1">Popular Routes</h2>
            <p className="text-text-tertiary text-sm">Most booked routes this week</p>
          </div>
          <Link href="/book?category=bus" className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
            View All <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_ROUTES.map((route, i) => (
            <Link key={i} href={`/book?category=bus&from=${route.from}&to=${route.to}`}
              className="route-card group bg-surface-elevated border border-white/10 rounded-2xl p-5 hover:border-white/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-accent-primary/10 border border-accent-primary/20">
                  <HugeiconsIcon icon={BusIcon} size={18} className="text-accent-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="truncate">{route.from}</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-text-tertiary shrink-0" />
                    <span className="truncate">{route.to}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-tertiary mt-0.5">
                    <HugeiconsIcon icon={Clock01Icon} size={11} />
                    <span>{route.duration}</span>
                    <span>·</span>
                    <span>{route.buses} buses</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-tertiary block">Starting from</span>
                  <span className="text-xl font-display font-bold">₹{route.price}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HugeiconsIcon icon={StarIcon} size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold">{route.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl font-display font-bold mb-8">Why Book with Moveo?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-surface-elevated border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
              <div className="p-3 rounded-xl bg-accent-primary/10 border border-accent-primary/20 w-fit mb-4">
                <HugeiconsIcon icon={f.icon} size={20} className="text-accent-primary" />
              </div>
              <h3 className="font-bold text-sm mb-2">{f.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-accent-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-background mb-2">Ready to Hit the Road?</h2>
            <p className="text-background/70 text-sm">Compare 500+ operators. Choose your seat. Travel in style.</p>
          </div>
          <Link href="/book?category=bus" className="flex items-center gap-2 px-8 py-4 bg-background text-foreground rounded-2xl text-sm font-bold whitespace-nowrap hover:opacity-90 transition-opacity shadow-xl">
            Search Buses
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
