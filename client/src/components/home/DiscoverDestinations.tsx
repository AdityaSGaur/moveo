"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Annotation } from "@/components/ui/Annotation";

const DESTINATIONS = [
  { id: 1, name: "Vista Grand Suites", price: "$150,000", image: "/images/grid-1.jpg", span: "md:col-span-2 md:row-span-2" },
  { id: 2, name: "Ocean View Resort", price: "$85,000", image: "/images/grid-2.jpg", span: "" },
  { id: 3, name: "Mountain Retreat", price: "$120,000", image: "/images/grid-4.jpg", span: "" },
  { id: 4, name: "Skyline Penthouse", price: "$250,000", image: "/images/grid-5.jpg", span: "md:col-span-2" },
  { id: 5, name: "Cozy Cabin", price: "$45,000", image: "/images/grid-6.jpg", span: "" },
  { id: 6, name: "Desert Oasis", price: "$95,000", image: "/images/community-1.jpg", span: "" },
];

export const DiscoverDestinations = () => {
  // Removed GSAP ScrollTrigger to fix rendering bugs and optimize lag.

  return (
    <section className="py-24 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto w-full bg-background border-t border-text-tertiary/10 relative">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative">
        <div className="relative">
          {/* Design Annotation */}
          <Annotation
            notes={["Visual storytelling layout"]}
            arrowDirection="curve-right-down"
            className="absolute -top-16 left-0 md:-top-12 md:left-32 scale-75 md:scale-100 origin-left"
            layout="row"
            mobileVisible={true}
          />
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-text-primary mb-2 mt-8 md:mt-0">
            Our most Amazing Destination
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl">
            Discover Your Ideal Destination. From city escapes to beachside retreats, we connect you with hotels that fit your lifestyle wherever the journey takes you.
          </p>
        </div>
        
        {/* Step into the magic funky arrow */}
        <div className="absolute right-[5%] lg:right-[15%] bottom-full mb-4 hidden md:block">
          <div className="relative">
            <span className="relative z-10 font-writing text-2xl whitespace-nowrap transform -rotate-6 text-text-secondary inline-block">Step into<br/>the magic</span>
            <svg width="140" height="140" viewBox="0 0 140 140" className="absolute top-[20px] -left-[20px] text-text-tertiary -z-10">
              <path d="M0,60 C50,60 120,70 90,130" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M85,110 L90,130 L110,125" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-surface-elevated hover:bg-text-primary hover:text-background transition-all duration-300 font-light shrink-0 group shadow-sm">
          Explore All <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Mobile: horizontal scroll | Tablet+: fancy multi-span grid */}
      <div className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar gap-4 md:grid md:grid-cols-4 md:gap-6 md:grid-rows-3 md:h-[600px] py-8 -mx-4 px-4 md:mx-0 md:px-0">
        {DESTINATIONS.map((dest) => (
          <div 
            key={dest.id} 
            className={`dest-card shrink-0 snap-center w-[85vw] md:w-auto group relative overflow-hidden rounded-2xl sm:rounded-[2rem] cursor-pointer shadow-md hover:shadow-xl transition-shadow h-[220px] sm:h-[250px] md:h-auto ${dest.span}`}
          >
            <img 
              src={dest.image} 
              alt={dest.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end justify-between text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-display">{dest.name}</h3>
                <p className="text-sm text-white/80">{dest.price}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
        {/* Trailing padding for horizontal scroll to prevent shadow clipping on the last item */}
        <div className="w-1 shrink-0 md:hidden" />
      </div>

      {/* Mobile only: Explore All button below cards */}
      <div className="flex justify-center mt-8 md:hidden">
        <button className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-surface-elevated hover:bg-text-primary hover:text-background transition-all duration-300 font-light group shadow-sm">
          Explore All <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
