"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import { SmartSearch } from "@/components/home/SmartSearch";
import {
  ArrowRight01Icon,
  TrainIcon,
  StarIcon,
  Clock01Icon,
  Ticket01Icon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";

const POPULAR_TRAINS = [
  { number: "12028", name: "Chennai Mail",              type: "Superfast", from: "Chennai",   fromCode: "MAS",  to: "Mumbai",   toCode: "CSMT", duration: "12h 30m", price: 485,  rating: 4.1 },
  { number: "12218", name: "Kerala Express",            type: "Rajdhani",  from: "Trivandrum", fromCode: "TVC",  to: "Delhi",    toCode: "NZM",  duration: "27h 15m", price: 1680, rating: 4.5 },
  { number: "12001", name: "Shatabdi Express",          type: "Shatabdi",  from: "Bhopal",    fromCode: "BPL",  to: "Delhi",    toCode: "NDLS", duration: "7h 30m",  price: 1040, rating: 4.4 },
  { number: "12609", name: "Navyug Express",            type: "Express",   from: "Bangalore", fromCode: "SBC",  to: "Mumbai",   toCode: "CSMT", duration: "13h 30m", price: 385,  rating: 3.8 },
  { number: "12622", name: "Tamil Nadu Express",        type: "Superfast", from: "Chennai",   fromCode: "MAS",  to: "Delhi",    toCode: "NDLS", duration: "33h 00m", price: 665,  rating: 4.2 },
  { number: "12953", name: "August Kranti Rajdhani",   type: "Rajdhani",  from: "Mumbai",    fromCode: "MMCT", to: "Delhi",    toCode: "NDLS", duration: "17h 00m", price: 2460, rating: 4.6 },
];

const TRAIN_TYPES = [
  { name: "Rajdhani",    desc: "Premium fast trains between major cities" },
  { name: "Shatabdi",    desc: "Day express with premium chair car" },
  { name: "Superfast",   desc: "Faster than regular express trains" },
  { name: "Vande Bharat",desc: "Semi-high speed self-propelled trains" },
];

export default function TrainsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".train-hero > *", { y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out" });
    gsap.from(".train-card", { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-text-primary pt-28 pb-20">

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20 train-hero">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-bold tracking-widest uppercase text-accent-primary">
            <HugeiconsIcon icon={TrainIcon} size={14} className="text-accent-primary" />
            Train Booking
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 max-w-3xl leading-tight">
          India by Rail,<br />Done Right
        </h1>
        <p className="text-text-secondary text-base max-w-xl mb-10 leading-relaxed">
          Search and book confirmed train tickets across 8,000+ stations. Check seat availability, PNR status, and travel class options instantly.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/book?category=train" className="flex items-center gap-2 px-8 py-4 bg-accent-primary text-background rounded-2xl text-sm font-bold tracking-wide hover:opacity-90 transition-opacity shadow-lg">
            <HugeiconsIcon icon={Ticket01Icon} size={16} />
            Search Trains
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
          <button className="px-8 py-4 border border-white/10 rounded-2xl text-sm font-bold text-text-secondary hover:text-text-primary hover:border-white/30 transition-all">
            Check PNR Status
          </button>
        </div>
      </section>

      {/* ── SEARCH ── */}
      {/* Search moved to the central Book page — use /book?category=train */}


      {/* ── TRAIN TYPES ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl font-display font-bold mb-5">Browse by Train Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRAIN_TYPES.map((t, i) => (
            <Link key={i} href={`/book?category=train&type=${t.name}`}
              className="bg-surface-elevated border border-white/10 rounded-2xl p-5 hover:border-white/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 w-fit mb-4">
                <HugeiconsIcon icon={TrainIcon} size={18} className="text-yellow-400" />
              </div>
              <div className="font-bold text-sm mb-1.5 group-hover:text-accent-primary transition-colors">{t.name}</div>
              <div className="text-xs text-text-tertiary leading-relaxed">{t.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POPULAR TRAINS ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-1">Popular Trains</h2>
            <p className="text-text-tertiary text-sm">Frequently booked trains across major routes</p>
          </div>
          <Link href="/book?category=train" className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
            View All <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POPULAR_TRAINS.map((train, i) => (
            <Link key={i} href={`/book?category=train&train=${train.number}`}
              className="train-card group bg-surface-elevated border border-white/10 rounded-2xl p-5 hover:border-white/25 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 shrink-0">
                  <HugeiconsIcon icon={TrainIcon} size={18} className="text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-sm">{train.name}</span>
                    <span className="text-[10px] text-text-tertiary font-mono">#{train.number}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-white/10 text-text-tertiary font-bold">{train.type}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div>
                      <div className="font-bold text-sm">{train.from}</div>
                      <div className="text-[10px] font-bold text-accent-primary">{train.fromCode}</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-[10px] text-text-tertiary mb-1">{train.duration}</div>
                      <div className="flex items-center gap-1 w-full">
                        <div className="h-px flex-1 bg-white/20" />
                        <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="text-text-tertiary" />
                        <div className="h-px flex-1 bg-white/20" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">{train.to}</div>
                      <div className="text-[10px] font-bold text-accent-primary">{train.toCode}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-text-tertiary">
                      <HugeiconsIcon icon={Clock01Icon} size={11} />
                      <span>{train.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <HugeiconsIcon icon={StarIcon} size={11} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold">{train.rating}</span>
                      </div>
                      <span className="text-base font-display font-bold">₹{train.price}</span>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-background mb-2">Book Tatkal Tickets Instantly</h2>
            <p className="text-background/70 text-sm">Rush bookings made easy — available 1 day before departure.</p>
          </div>
          <Link href="/book?category=train&quota=TQ" className="flex items-center gap-2 px-8 py-4 bg-background text-foreground rounded-2xl text-sm font-bold whitespace-nowrap hover:opacity-90 transition-opacity shadow-xl">
            Book Tatkal Now
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
