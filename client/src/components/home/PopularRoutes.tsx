"use client";

import React from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Bus01Icon, Train01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const ROUTES = [
  {
    id: 1,
    type: "bus",
    fromCity: "Mumbai",
    toCity: "Pune",
    subtitle: "AC Volvo",
    duration: "3h 15m",
    image: "/images/grid-2.jpg",
    href: "/buses?from=Mumbai&to=Pune",
  },
  {
    id: 2,
    type: "bus",
    fromCity: "Delhi",
    toCity: "Jaipur",
    subtitle: "Sleeper",
    duration: "5h 30m",
    image: "/images/grid-6.jpg",
    href: "/buses?from=Delhi&to=Jaipur",
  },
  {
    id: 3,
    type: "train",
    fromCity: "Delhi",
    toCity: "Varanasi",
    subtitle: "Vande Bharat",
    duration: "8h 00m",
    image: "/images/vande-bharat.png",
    href: "/trains?from=Delhi&to=Varanasi",
  },
  {
    id: 4,
    type: "train",
    fromCity: "Mumbai",
    toCity: "Delhi",
    subtitle: "Rajdhani",
    duration: "15h 00m",
    image: "/images/grid-5.jpg",
    href: "/trains?from=Mumbai&to=Delhi",
  },
];

export const PopularRoutes = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto w-full bg-background relative z-10">

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 md:mb-16 gap-4">
        <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-text-primary">
            Popular Routes
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-text-tertiary/20 to-transparent hidden sm:block" />
        </div>
        <Link
          href="/buses"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-text-tertiary/10 hover:bg-text-primary hover:text-background transition-all duration-300 uppercase text-sm font-light tracking-wider shrink-0 group shadow-sm self-start sm:self-auto"
        >
          View All Routes
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Cards Grid — horizontally scrollable on mobile, grid on tablet/desktop */}
      <div className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar py-8 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 -mx-4 px-4 md:mx-0 md:px-0">
        {ROUTES.map((route) => (
          <Link
            key={route.id}
            href={route.href}
            className="route-item shrink-0 snap-center w-[85vw] md:w-auto group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-[300px] sm:h-[340px] md:h-[380px] isolate focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={route.image}
                alt={`${route.fromCity} to ${route.toCity}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            </div>

            {/* Top-right circular arrow — stays white always for contrast */}
            <div className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-black transition-all duration-300 group-hover:bg-white group-hover:scale-110">
              <HugeiconsIcon icon={ArrowRight01Icon} size={15} className="-rotate-45" />
            </div>

            {/* Bottom text — always white, no color change on hover */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 flex flex-col items-start text-left">
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-1.5 tracking-tight leading-tight">
                {route.fromCity}
                <span className="mx-2 text-white/40 font-light">→</span>
                {route.toCity}
              </h3>
              <div className="flex items-center gap-1.5 text-white/65 text-xs font-medium">
                <HugeiconsIcon
                  icon={route.type === "bus" ? Bus01Icon : Train01Icon}
                  size={12}
                  className="text-white/80 shrink-0"
                />
                <span>{route.subtitle}</span>
                <span className="w-1 h-1 rounded-full bg-white/30 mx-0.5" />
                <span>{route.duration}</span>
              </div>
            </div>
          </Link>
        ))}
        {/* Trailing padding for horizontal scroll to prevent shadow clipping on the last item */}
        <div className="w-1 shrink-0 md:hidden" />
      </div>
    </section>
  );
};
