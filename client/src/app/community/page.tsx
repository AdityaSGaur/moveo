"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";

const TESTIMONIALS = [
  { id: 1, name: "Joao M.", role: "Startup Founder", quote: "Moveo makes finding a coworking space so easy! I can book a desk in minutes and get straight to work. Highly recommend!", image: "/images/grid-1.jpg" },
  { id: 2, name: "Bruno K.", role: "UX Designer", quote: "Our team needed a flexible meeting space, and Moveo delivered. The process was smooth, and the space was exactly what we needed!", image: "/images/grid-2.jpg" },
  { id: 3, name: "Lais A.", role: "Digital Marketer", quote: "I love the variety of spaces available! Whether I need a quiet spot or a collaborative space, Moveo always has the perfect option.", image: "/images/grid-3.jpg" },
];

// Added 100% to mt to compensate for removing the faint box
const COLUMNS = [
  { hideOnMobile: true, mt: "mt-[140%]", avatars: [{ src: "/images/grid-4.jpg", aspect: "aspect-[4/5]" }, { src: "/images/grid-5.jpg", aspect: "aspect-square" }] },
  { hideOnMobile: true, mt: "mt-[110%]", avatars: [{ src: "/images/grid-1.jpg", aspect: "aspect-[3/4]" }, { src: "/images/grid-2.jpg", aspect: "aspect-[3/4]" }] },
  { hideOnMobile: false, mt: "mt-[160%]", avatars: [{ src: "/images/grid-3.jpg", aspect: "aspect-[4/5]" }] },
  { hideOnMobile: false, mt: "mt-[120%]", avatars: [{ src: "/images/grid-4.jpg", aspect: "aspect-[3/4]" }] },
  { hideOnMobile: false, mt: "mt-[180%]", avatars: [{ src: "/images/grid-5.jpg", aspect: "aspect-[4/5]" }] }, // Center
  { hideOnMobile: false, mt: "mt-[120%]", avatars: [{ src: "/images/grid-6.jpg", aspect: "aspect-[4/5]" }] },
  { hideOnMobile: false, mt: "mt-[160%]", avatars: [{ src: "/images/grid-1.jpg", aspect: "aspect-[4/3]" }, { src: "/images/grid-2.jpg", aspect: "aspect-[3/4]" }] },
  { hideOnMobile: true, mt: "mt-[110%]", avatars: [{ src: "/images/grid-3.jpg", aspect: "aspect-[2/3]" }] },
  { hideOnMobile: true, mt: "mt-[140%]", avatars: [{ src: "/images/grid-4.jpg", aspect: "aspect-[4/5]" }, { src: "/images/grid-5.jpg", aspect: "aspect-square" }] },
];

export default function CommunityPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Only animate Y to prevent any faded/gradient look during stagger
    gsap.from(".gsap-wrapper", {
      y: 60,
      duration: 1,
      stagger: 0.05,
      ease: "power3.out",
    });

    gsap.from(".content-fade", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Custom Styles for Floating Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float-1 { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-2 { animation: float-slow 5s ease-in-out infinite 1s; }
        .animate-float-3 { animation: float-slow 6s ease-in-out infinite 2s; }
      `}} />

      <section ref={containerRef} className="flex-1 pt-24 pb-24 relative z-10 flex flex-col items-center">
        
        {/* Exact 9-Column Responsive Grid Container */}
        <div className="relative w-full max-w-[1400px] mx-auto min-h-[600px] md:min-h-[900px] px-2 md:px-4">
          
          {/* Grid Background & Avatars */}
          <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-5 md:grid-cols-9 z-0 pointer-events-none px-2 md:px-8">
            {COLUMNS.map((col, i) => (
              <div 
                key={i} 
                className={`${col.hideOnMobile ? "hidden md:flex" : "flex"} flex-col border-r border-black/[0.04] last:border-r-0 h-full`}
              >
                <div className="px-2 md:px-3 w-full h-full flex flex-col pointer-events-auto">
                  
                  {/* Avatars pushed down dynamically by percentage of column width */}
                  <div className={`w-full flex flex-col gap-4 ${col.mt}`}>
                    {col.avatars.map((avatar, j) => {
                      const floatClass = `animate-float-${(i + j) % 3 + 1}`;
                      
                      return (
                        <div key={j} className="gsap-wrapper relative w-full">
                          <div 
                            className={`w-full ${avatar.aspect} ${floatClass} rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-[var(--surface)] shrink-0 border border-[rgba(0,0,0,0.04)] cursor-pointer`}
                          >
                            <img 
                              src={avatar.src} 
                              className="w-full h-full object-cover" 
                              alt="Community Member" 
                              onError={(e) => { e.currentTarget.src = "/images/grid-1.jpg" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Text Section Overlay - Positioned securely using responsive padding */}
          <div className="relative z-20 flex justify-center pointer-events-none pt-[55vw] md:pt-[32vw] xl:pt-[450px]">
            <div className="text-center max-w-3xl px-4 pointer-events-auto content-fade">
              <div className="inline-flex items-center justify-center rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-widest bg-[var(--background)] text-[var(--text-secondary)] mb-6 shadow-sm border border-[rgba(0,0,0,0.04)]">
                Testimonials
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] leading-none font-display font-bold tracking-tight text-[var(--text-primary)] mb-2">
                Trusted by leaders
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] leading-none font-display font-medium tracking-tight text-[var(--text-secondary)] mb-8">
                from various industries
              </h2>
              <p className="text-[var(--text-tertiary)] text-base md:text-xl max-w-xl mx-auto mb-10">
                Learn why professionals trust our solutions to complete their customer journeys.
              </p>
              <Button className="rounded-full px-10 py-4 bg-[var(--accent-primary)] text-[var(--foreground)] hover:brightness-90 hover:scale-105 shadow-xl transition-all duration-300">
                Read Success Stories &rarr;
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Testimonials Row */}
        <div className="max-w-7xl mx-auto w-full px-4 md:px-12 lg:px-24 mt-20 relative z-30">
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 w-full content-fade">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="flex flex-col bg-[var(--surface-elevated)] p-8 rounded-3xl border border-[rgba(0,0,0,0.06)] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 text-[var(--text-primary)] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--text-primary)] font-medium leading-relaxed mb-8 flex-1 text-sm md:text-base">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--surface)] shrink-0 border-2 border-[rgba(0,0,0,0.06)] shadow-sm">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/images/grid-1.jpg" }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)]">{testimonial.name}</h4>
                    <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
