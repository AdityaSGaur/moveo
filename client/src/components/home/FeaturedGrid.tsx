"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ITEMS = [
  { id: 1, title: "Inception", subtitle: "Action / Sci-Fi", image: "/images/grid-1.jpg" },
  { id: 2, title: "Mumbai to Pune", subtitle: "Premium AC Volvo", image: "/images/grid-2.jpg" },
  { id: 3, title: "Vande Bharat Express", subtitle: "Delhi ↔ Varanasi", image: "/images/vande-bharat.png" },
  { id: 4, title: "The Dark Knight", subtitle: "IMAX 3D", image: "/images/grid-4.jpg" },
  { id: 5, title: "Interstellar", subtitle: "Sci-Fi / Drama", image: "/images/grid-5.jpg" },
  { id: 6, title: "Bangalore to Goa", subtitle: "Sleeper Coach", image: "/images/grid-6.jpg" },
];

export const FeaturedGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Heading animation
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Grid items staggered animation
    const items = gsap.utils.toArray('.grid-item');
    gsap.from(items, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto w-full bg-background">
      <div className="flex items-center gap-6 mb-12">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-primary">
          Trending Now
        </h2>
        <div className="h-px flex-1 bg-text-tertiary/20" />
      </div>

      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {ITEMS.map((item) => (
          <div key={item.id} className="group cursor-pointer grid-item flex flex-col h-full min-w-[75vw] sm:min-w-[60vw] md:min-w-0 snap-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface border border-text-tertiary/10 mb-4 shrink-0">
              {/* Note: Using standard img for placeholder. Use Next/Image in production */}
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between flex-1">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-xl font-medium text-text-primary group-hover:text-text-secondary transition-colors truncate">{item.title}</h3>
                <p className="text-sm text-text-secondary truncate">{item.subtitle}</p>
              </div>
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="text-text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shrink-0" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Button variant="outline" className="rounded-full px-8 uppercase tracking-widest text-xs">
          View All Options
        </Button>
      </div>
    </section>
  );
};
