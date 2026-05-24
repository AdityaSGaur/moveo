"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon, Time01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const SHOWTIMES = [
  { id: 1, theater: "PVR Directors Cut", distance: "2.4 km", movie: "Oppenheimer", format: "IMAX 70mm", time: "19:30", seats: "Only 8 seats left", price: "₹850" },
  { id: 2, theater: "INOX Laserplex", distance: "3.1 km", movie: "Dune: Part Two", format: "4DX", time: "20:15", seats: "Filling fast", price: "₹650" },
  { id: 3, theater: "Cinepolis VIP", distance: "4.5 km", movie: "The Dark Knight", format: "Standard", time: "21:00", seats: "Available", price: "₹400" },
  { id: 4, theater: "PVR ICON", distance: "5.0 km", movie: "Interstellar", format: "IMAX 3D", time: "22:30", seats: "Only 12 seats left", price: "₹750" },
];

export const LiveShowtimes = () => {
  // Removed GSAP ScrollTrigger to fix rendering bugs and optimize lag.

  return (
    <section className="py-12 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto w-full bg-background relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 relative z-10">
        <div className="flex items-center gap-6 flex-1">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary flex items-center gap-3">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-secondary"></span>
            </span>
            Live Showtimes Near You
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-text-tertiary/20 to-transparent hidden md:block" />
        </div>
        <Link
          href="/movies"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-text-tertiary/10 hover:bg-text-primary hover:text-background transition-all duration-300 uppercase text-sm font-light tracking-wider shrink-0 group shadow-sm self-start sm:self-auto"
        >
          View All Showtimes <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {SHOWTIMES.map((show) => (
          <div key={show.id} className="showtime-item group relative overflow-hidden rounded-2xl bg-surface/50 border border-text-tertiary/10 backdrop-blur-sm p-4 md:p-6 transition-all duration-300 hover:bg-surface hover:shadow-lg hover:border-text-tertiary/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <HugeiconsIcon icon={Location01Icon} size={16} className="text-accent-secondary" />
                <h3 className="font-bold text-lg text-text-primary">{show.theater}</h3>
                <span className="text-xs text-text-tertiary bg-surface-elevated px-2 py-0.5 rounded-full">{show.distance}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-text-secondary">{show.movie}</span>
                <span className="w-1 h-1 rounded-full bg-text-tertiary/50" />
                <span className="text-xs font-mono tracking-wider text-accent-primary uppercase">{show.format}</span>
              </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-4 shrink-0 border-t border-text-tertiary/10 md:border-none pt-4 md:pt-0 mt-4 md:mt-0">
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-text-primary font-bold text-lg md:text-xl mb-1">
                  <HugeiconsIcon icon={Time01Icon} size={18} className="text-text-tertiary" />
                  {show.time}
                </div>
                <div className={`text-xs font-medium ${show.seats.includes('Only') ? 'text-red-400' : 'text-green-400'}`}>
                  {show.seats}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-xs text-text-tertiary mb-0.5">Starting from</div>
                  <div className="font-bold text-lg">{show.price}</div>
                </div>
                <Button className="shrink-0 group-hover:bg-accent-primary transition-colors px-6">
                  Book
                </Button>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};
