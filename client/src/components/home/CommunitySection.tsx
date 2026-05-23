"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REVIEWS = [
  { id: 1, name: "Arjun Mehta", role: "Frequent Traveler", rating: 5, quote: "Moveo makes my weekly trips completely frictionless. The AI seat selection is absolute magic.", image: "/images/community-1.jpg" },
  { id: 2, name: "Priya Sharma", role: "Movie Critic", rating: 5, quote: "I've never missed a major premiere since switching to Moveo. Flawless.", image: "/images/community-2.jpg" },
  { id: 3, name: "Rahul Verma", role: "Daily Commuter", rating: 4, quote: "The absolute best booking experience, period. Everything is lightning fast.", image: "/images/community-3.jpg" },
  { id: 4, name: "Simran Kaur", role: "Backpacker", rating: 5, quote: "From bus tickets to movie nights, Moveo is the only app I need.", image: "/images/grid-4.jpg" },
  { id: 5, name: "Sameer Choudhury", role: "Business Executive", rating: 5, quote: "The UI is breathtaking. It feels more like a luxury experience than a booking app.", image: "/images/grid-5.jpg" },
];

const MARQUEE_ITEMS = [...REVIEWS, ...REVIEWS, ...REVIEWS];

export const CommunitySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Heading animation
    gsap.from(".community-text", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
      force3D: true
    });

    // Infinite horizontal scrolling marquee for the top row
    gsap.to(".marquee-row-1", {
      xPercent: -33.33,
      ease: "none",
      duration: 30,
      repeat: -1,
      force3D: true
    });
    
    // Infinite horizontal scrolling marquee for the bottom row (reverse direction)
    gsap.to(".marquee-row-2", {
      xPercent: 33.33,
      ease: "none",
      duration: 35,
      repeat: -1,
      force3D: true
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-surface text-text-primary overflow-hidden relative border-t border-text-tertiary/10">
      
      {/* Optimized Background Gradient (No massive blurs) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-primary/5 via-background to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 lg:px-24 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="community-text">
            <p className="text-text-tertiary mb-2 font-display text-sm tracking-widest uppercase">Community Reviews</p>
            <div className="flex items-center gap-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                Stories From Our Community
              </h2>
            </div>
          </div>
          <div className="community-text max-w-sm text-sm text-text-secondary">
            <p>Don't just take our word for it. Here is what thousands of travelers, moviegoers, and daily commuters have to say.</p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 relative z-10 hover:[&>div]:pause cursor-grab active:cursor-grabbing">
        
        {/* Top Marquee Row */}
        <div className="w-max flex gap-6 marquee-row-1" style={{ willChange: "transform" }}>
          {MARQUEE_ITEMS.map((review, idx) => (
            <div 
              key={`row1-${idx}`} 
              className="w-80 md:w-96 shrink-0 bg-background/95 border border-text-tertiary/20 rounded-3xl p-6 md:p-8 flex flex-col gap-6 group hover:border-accent-primary/50 transition-colors shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div>
                  <h4 className="font-display font-bold text-xl">{review.name}</h4>
                  <p className="text-xs font-mono text-text-tertiary uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
              <div className="flex gap-1 text-accent-secondary">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-secondary leading-relaxed flex-1">
                "{review.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Marquee Row (Offset and Reverse) */}
        <div className="w-max flex gap-6 marquee-row-2 -translate-x-[33.33%]" style={{ willChange: "transform" }}>
          {[...MARQUEE_ITEMS].reverse().map((review, idx) => (
            <div 
              key={`row2-${idx}`} 
              className="w-80 md:w-96 shrink-0 bg-background/95 border border-text-tertiary/20 rounded-3xl p-6 md:p-8 flex flex-col gap-6 group hover:border-accent-primary/50 transition-colors shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div>
                  <h4 className="font-display font-bold text-xl">{review.name}</h4>
                  <p className="text-xs font-mono text-text-tertiary uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
              <div className="flex gap-1 text-accent-secondary">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-secondary leading-relaxed flex-1">
                "{review.quote}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
