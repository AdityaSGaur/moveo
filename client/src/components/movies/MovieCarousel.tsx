"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export interface MovieItem {
  id: string | number;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
}

interface MovieCarouselProps {
  title: string;
  items: MovieItem[];
  viewAllLink?: string;
  className?: string;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, items, viewAllLink, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    const cards = gsap.utils.toArray('.carousel-item', containerRef.current);
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={`w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-12 ${className}`}>
      <div ref={headingRef} className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-text-primary">
          {title}
        </h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-sm uppercase font-light tracking-wider text-[var(--accent-primary)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1 group">
            View All
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {items.map((item) => (
          <Link 
            key={item.id} 
            href={item.link || "/movies/book"}
            className="group cursor-pointer carousel-item flex flex-col min-w-[45vw] sm:min-w-[30vw] md:min-w-[200px] lg:min-w-[240px] snap-start"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-surface border border-text-tertiary/10 mb-3 shrink-0">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Optional Gradient Overlay for text readability if we wanted text inside */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-base md:text-lg font-semibold text-text-primary group-hover:text-text-secondary transition-colors truncate">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-text-secondary truncate mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
