"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const REVIEWS = [
  { id: 1, name: "Arjun Mehta", role: "Frequent Traveler", rating: 5, quote: "Moveo makes my weekly trips completely frictionless. The AI seat selection is absolute magic.", image: "/images/community-1.jpg" },
  { id: 2, name: "Priya Sharma", role: "Movie Critic", rating: 5, quote: "I've never missed a major premiere since switching to Moveo. Flawless.", image: "/images/community-2.jpg" },
  { id: 3, name: "Rahul Verma", role: "Daily Commuter", rating: 4, quote: "The absolute best booking experience, period. Everything is lightning fast.", image: "/images/community-3.jpg" },
  { id: 4, name: "Simran Kaur", role: "Backpacker", rating: 5, quote: "From bus tickets to movie nights, Moveo is the only app I need.", image: "/images/grid-4.jpg" },
  { id: 5, name: "Sameer Choudhury", role: "Business Executive", rating: 5, quote: "The UI is breathtaking. It feels more like a luxury experience than a booking app.", image: "/images/grid-5.jpg" },
];

export default function CommunityPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".review-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      force3D: true
    });
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />
      
      <section ref={containerRef} className="flex-1 pt-40 pb-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
        
        {/* Optimized Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-primary/10 via-background to-background pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase mb-6">
              Our Community
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto">
              Real stories from real travelers, commuters, and moviegoers. See how Moveo is changing the way people book their experiences.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {REVIEWS.map((review, idx) => (
              <div 
                key={idx} 
                className="review-card break-inside-avoid bg-surface-elevated border border-text-tertiary/10 rounded-3xl p-8 flex flex-col gap-6 group hover:border-text-primary/30 transition-colors shadow-lg"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="flex items-center gap-4">
                  <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h4 className="font-display font-bold text-xl">{review.name}</h4>
                    <p className="text-xs font-mono text-text-tertiary uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 text-accent-primary">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-text-secondary leading-relaxed text-lg">
                  "{review.quote}"
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="px-10 py-5 bg-text-primary text-background rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300">
              Share Your Experience
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}
