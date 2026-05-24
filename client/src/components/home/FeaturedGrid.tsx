"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const ITEMS = [
  { id: 1, title: "Oppenheimer", subtitle: "Biography / Drama", image: "/images/poster-1.jpg?v=2", tag: "IMAX", format: "3D", price: "₹450", rating: 8.9 },
  { id: 2, title: "Dune: Part Two", subtitle: "Action / Sci-Fi", image: "/images/poster-2.jpg?v=2", tag: "Trending", format: "IMAX", price: "₹350", rating: 9.1 },
  { id: 3, title: "Interstellar", subtitle: "Sci-Fi / Thriller", image: "/images/poster-3.jpg?v=2", tag: "Classic", format: "4DX", price: "₹300", rating: 8.6 },
  { id: 4, title: "The Dark Knight", subtitle: "Action / Horror", image: "/images/poster-4.jpg?v=2", tag: "Popular", format: "2D", price: "₹250", rating: 9.0 },
  { id: 5, title: "Avatar: The Way of Water", subtitle: "Comedy / Adventure", image: "/images/poster-5.jpg?v=2", tag: "Must Watch", format: "IMAX 3D", price: "₹500", rating: 7.8 },
  { id: 6, title: "Spider-Man: Across the Spider-Verse", subtitle: "Animation / Action", image: "/images/poster-6.jpg?v=2", tag: "New", format: "4DX", price: "₹400", rating: 8.8 },
  { id: 7, title: "Inception", subtitle: "Sci-Fi / Thriller", image: "/images/poster-7.jpg?v=2", tag: "Mind-Bending", format: "IMAX", price: "₹300", rating: 8.8 },
  { id: 8, title: "Parasite", subtitle: "Thriller / Drama", image: "/images/poster-8.jpg?v=2", tag: "Oscar Winner", format: "2D", price: "₹250", rating: 8.5 },
  { id: 9, title: "Deadpool & Wolverine", subtitle: "Action / Comedy", image: "/images/poster-9.jpg?v=2", tag: "Blockbuster", format: "3D", price: "₹400", rating: 8.0 },
  { id: 10, title: "The Conjuring", subtitle: "Horror / Thriller", image: "/images/poster-10.jpg?v=2", tag: "Scary", format: "2D", price: "₹200", rating: 7.5 },
  { id: 11, title: "Joker", subtitle: "Drama / Thriller", image: "/images/poster-11.jpg?v=2", tag: "Must Watch", format: "IMAX", price: "₹350", rating: 8.4 },
  { id: 12, title: "Avengers: Endgame", subtitle: "Action / Sci-Fi", image: "/images/poster-12.jpg?v=2", tag: "Epic", format: "3D", price: "₹500", rating: 8.4 }
];

const CATEGORIES = ["All", "Action", "Sci-Fi", "Drama", "Comedy", "Thriller", "Horror"];

export const FeaturedGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  // Compute filtered items dynamically
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      // In 'All' tab, show only the top 5 highest rated movies overall
      return [...ITEMS].sort((a, b) => b.rating - a.rating).slice(0, 5);
    }

    // For specific categories, strictly filter by that category,
    // sort by rating to get the "most trending" in that genre,
    // and take the top 5.
    return ITEMS
      .filter(item => item.subtitle.includes(activeCategory))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [activeCategory]);

  const next = () => {
    if (filteredItems.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % filteredItems.length);
  };
  
  const prev = () => {
    if (filteredItems.length <= 1) return;
    setCurrentIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  // Reset index when category changes
  useEffect(() => {
    if (filteredItems.length > 0) {
      setCurrentIndex(Math.floor(filteredItems.length / 2));
    } else {
      setCurrentIndex(0);
    }
  }, [activeCategory]);

  // Auto-play interval
  useEffect(() => {
    if (isPaused || filteredItems.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, filteredItems.length]);

  const getCardStyle = (index: number) => {
    if (filteredItems.length === 0) return { opacity: 0, pointerEvents: 'none' as const };

    let diff = index - currentIndex;
    const half = Math.floor(filteredItems.length / 2);
    
    if (diff > half) {
      diff -= filteredItems.length;
    } else if (diff < -half) {
      diff += filteredItems.length;
    }

    const absDiff = Math.abs(diff);
    const sign = Math.sign(diff);

    if (filteredItems.length === 1) {
      return {
        transform: `translateX(0%) scale(1)`,
        zIndex: 30,
        opacity: 1,
        filter: `brightness(1)`,
        transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      };
    }

    if (absDiff > 2) {
      return {
        opacity: 0,
        transform: `translateX(${sign * 120}%) scale(0.5)`,
        zIndex: 0,
        pointerEvents: 'none' as const,
        transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      };
    }

    const scale = 1 - absDiff * 0.15;
    const translateX = sign * absDiff * 60;
    const zIndex = 30 - absDiff * 10;
    const brightness = 1 - absDiff * 0.3;

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      opacity: 1,
      filter: `brightness(${brightness})`,
      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
    };
  };

  return (
    <section className="py-24 px-4 overflow-hidden w-full bg-background relative z-10 flex flex-col items-center">
      
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-tertiary mb-3">Trending</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-primary mb-4">
          Trending Movies
        </h2>
        <p className="text-text-secondary text-sm md:text-base max-w-lg">
          Catch the most anticipated releases in theaters now.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl w-full px-4">
        {CATEGORIES.map((cat, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${
              activeCategory === cat 
                ? "bg-text-primary text-background border-text-primary shadow-lg" 
                : "border-text-tertiary/20 bg-surface/50 backdrop-blur-md text-text-primary hover:bg-surface-elevated hover:border-text-tertiary/40"
            }`}
          >
            {cat}
          </button>
        ))}
        <button className="px-5 py-2 rounded-full border border-text-tertiary/20 bg-surface/50 backdrop-blur-md text-xs font-light text-text-primary hover:bg-surface-elevated hover:border-text-tertiary/40 transition-all duration-300 flex items-center gap-2">
          View More <FiArrowRight strokeWidth={1} />
        </button>
      </div>

      <div 
        className="relative w-full h-[450px] md:h-[500px] flex justify-center items-center perspective-1000 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {filteredItems.map((item, index) => {
          const isCenter = index === currentIndex;
          
          return (
            <div 
              key={item.id} 
              className="absolute overflow-hidden rounded-3xl bg-surface border border-text-tertiary/10 shadow-2xl flex flex-col h-[400px] md:h-[460px] w-[280px] md:w-[320px] p-0 transition-transform duration-500"
              style={getCardStyle(index)}
            >
              {!isCenter && (
                <div 
                  className="absolute inset-0 z-50 cursor-pointer" 
                  onClick={() => setCurrentIndex(index)}
                />
              )}

              <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover scale-[1.15] md:scale-125 origin-center transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20 transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              
              <div className={`relative z-10 flex flex-col h-full px-6 pb-8 pt-32 justify-end pointer-events-auto transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-accent-secondary/90 backdrop-blur-md px-2 py-1 rounded-md text-[9px] font-bold text-white uppercase tracking-widest shadow-xl">
                    {item.tag}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md border border-white/20 px-2 py-1 rounded-md text-[9px] font-bold text-white uppercase tracking-widest shadow-xl">
                    ⭐ {item.rating.toFixed(1)}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="text-xl font-bold text-white truncate mb-2 drop-shadow-md">{item.title}</h3>
                  
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 text-white px-2.5 py-1 rounded-full text-[10px] font-medium drop-shadow-md">{item.format}</span>
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 text-white px-2.5 py-1 rounded-full text-[10px] font-medium drop-shadow-md">Dolby Atmos</span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-white/90 mb-4 font-medium drop-shadow-md">
                    <span className="truncate">{item.subtitle}</span>
                    <span className="shrink-0 ml-1 text-green-400 font-bold">Fast Filling</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t border-white/20 pt-4 relative z-20">
                  <div className="flex items-baseline gap-0.5 drop-shadow-md">
                    <span className="font-bold text-lg text-white">{item.price}</span>
                    <span className="text-[10px] text-white/90">/ticket</span>
                  </div>
                  <Button size="sm" className="!bg-white !text-black hover:bg-gray-100 px-4 py-2 text-xs font-bold shrink-0 whitespace-nowrap h-auto shadow-lg rounded-full">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Circular Next/Prev Controls */}
      <div className="flex items-center gap-4 mt-12 relative z-50">
        <button 
          onClick={prev} 
          className="w-12 h-12 rounded-full border border-text-tertiary/30 flex items-center justify-center text-text-primary hover:bg-surface-elevated hover:border-text-primary transition-all duration-300 cursor-pointer"
        >
          <FiArrowLeft size={20} />
        </button>
        <button 
          onClick={next} 
          className="w-12 h-12 rounded-full border border-text-tertiary/30 flex items-center justify-center text-text-primary hover:bg-surface-elevated hover:border-text-primary transition-all duration-300 cursor-pointer"
        >
          <FiArrowRight size={20} />
        </button>
      </div>

      <div className="mt-10 relative z-50 flex justify-center">
        <Link
          href="/movies"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-text-tertiary/10 hover:bg-text-primary hover:text-background transition-all duration-300 uppercase text-sm font-light tracking-wider group shadow-sm"
        >
          View All Movies
          <FiArrowRight size={16} strokeWidth={1} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

    </section>
  );
};
