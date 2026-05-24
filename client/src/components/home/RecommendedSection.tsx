"use client";

import React from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const RECOMMENDATIONS = [
  { id: 1, type: "movie", title: "Because you watched Inception", match: "98% Match", recommendation: "Interstellar", image: "/images/grid-5.jpg" },
  { id: 2, type: "travel", title: "Based on your searches", match: "High Match", recommendation: "Weekend Getaway to Jaipur", image: "/images/grid-6.jpg" },
  { id: 3, type: "event", title: "Trending near you", match: "Popular", recommendation: "Coldplay: Music of the Spheres", image: "/images/community-1.jpg" },
];

export const RecommendedSection = () => {


  return (
    <section className="py-24 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto w-full relative z-10 bg-background overflow-visible">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent-secondary/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <div className="bg-surface-elevated p-3 rounded-2xl border border-text-tertiary/10 shadow-lg">
            <HugeiconsIcon icon={SparklesIcon} size={28} className="text-accent-secondary animate-pulse" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-primary">
              Recommended For You
            </h2>
            <p className="text-text-secondary mt-1">AI-powered suggestions based on your preferences</p>
          </div>
        </div>
        <Link
          href="/movies"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-text-tertiary/10 hover:bg-text-primary hover:text-background transition-all duration-300 uppercase text-sm font-light tracking-wider shrink-0 group shadow-sm self-start md:self-auto"
        >
          View More <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar gap-4 md:grid md:grid-cols-3 md:gap-8 relative z-10 py-8 -mx-4 px-4 md:mx-0 md:px-0">
        {RECOMMENDATIONS.map((rec) => (
          <div key={rec.id} className="rec-item shrink-0 snap-center w-[85vw] md:w-auto group relative overflow-hidden rounded-3xl bg-surface border border-text-tertiary/10 transition-transform duration-500 hover:-translate-y-2 shadow-lg flex flex-col h-[400px]">
            <div className="absolute inset-0 z-0 bg-black">
              <img 
                src={rec.image} 
                alt={rec.recommendation}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10" />
            </div>
            
            <div className="relative z-10 p-6 flex flex-col h-full">
              <div className="mb-auto">
                <div className="inline-block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white mb-3 shadow-lg">
                  {rec.match}
                </div>
                <p className="text-sm font-bold text-white/70 uppercase tracking-widest drop-shadow-md">{rec.title}</p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-accent-secondary transition-colors drop-shadow-xl tracking-tight leading-tight">{rec.recommendation}</h3>
                <Link
                  href="/movies"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full font-display font-light text-sm tracking-wide text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group/btn shadow-xl"
                >
                  <span>Explore Now</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Trailing padding for horizontal scroll to prevent shadow clipping on the last item */}
        <div className="w-1 shrink-0 md:hidden" />
      </div>
    </section>
  );
};
