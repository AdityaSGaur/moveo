"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Badge, Card, Button } from "@/components/ui";
const StarIcon = (props: any) => <span style={{fontSize: props.size}}>★</span>;
const PlayIcon = (props: any) => <span style={{fontSize: props.size}}>▶</span>;
import { useGSAP } from "@gsap/react";
import { createScrollFadeIn } from "@/lib/animations";

// Mock Data
const trendingMovies = [
  {
    id: "1",
    title: "Dune: Part Two",
    image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGqqUT1e.jpg", // Replace with high-quality remote/local image later
    rating: 9.2,
    votes: "124K",
    tags: ["Action", "Sci-Fi", "IMAX"],
    color: "#D97736",
  },
  {
    id: "2",
    title: "Deadpool & Wolverine",
    image: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    rating: 8.8,
    votes: "350K",
    tags: ["Action", "Comedy", "3D"],
    color: "#E53935",
  },
  {
    id: "3",
    title: "Oppenheimer",
    image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 9.5,
    votes: "500K",
    tags: ["Biography", "Drama", "IMAX"],
    color: "#FFB74D",
  },
  {
    id: "4",
    title: "Kalki 2898 AD",
    image: "https://image.tmdb.org/t/p/w500/yCmtNXicJ8EZKxZEnG7U1pGev2L.jpg",
    rating: 8.5,
    votes: "1.2M",
    tags: ["Action", "Sci-Fi", "3D"],
    color: "#8E24AA",
  },
];

export const TrendingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Fade in section title
    createScrollFadeIn(sectionRef.current?.querySelector('.section-header') as HTMLElement);
    
    // Stagger cards
    cardsRef.current.forEach((card, index) => {
      createScrollFadeIn(card as HTMLElement, {
        y: 50,
        delay: index * 0.1,
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto">
        <div className="section-header flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <Badge variant="movie" className="mb-4">Trending Now</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Recommended Movies</h2>
          </div>
          <Button variant="ghost" className="hidden md:flex uppercase text-sm font-light tracking-wider">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingMovies.map((movie, index) => (
            <div
              key={movie.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative"
            >
              <Card 
                padding="none" 
                className="overflow-hidden border-none bg-surface/50 aspect-[2/3] relative transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl cursor-pointer"
              >
                {/* Fallback color while image loads or if no image */}
                <div className="absolute inset-0 bg-surface-elevated animate-pulse" />
                
                {/* The actual image would be here, using an img tag for placeholder. In prod use next/image with proper domains configured */}
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-2 mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      Book Tickets
                    </Button>
                    <Button size="sm" variant="ghost" className="bg-black/50 backdrop-blur-md px-3 border border-white/20">
                      <PlayIcon size={18} />
                    </Button>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-white mb-2 line-clamp-2 leading-tight">
                    {movie.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-3 text-sm font-medium text-warning">
                    <StarIcon size={16} variant="solid" />
                    <span>{movie.rating}</span>
                    <span className="text-text-tertiary ml-1">({movie.votes} votes)</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {movie.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-text-secondary border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden flex justify-center">
           <Button variant="outline" className="w-full sm:w-auto uppercase text-sm font-light tracking-wider">
            View All Movies
          </Button>
        </div>
      </div>
    </section>
  );
};
