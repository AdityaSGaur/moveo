"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { Annotation } from "@/components/ui/Annotation";

export const BigCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".cta-text", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-background pt-32 pb-16 flex flex-col items-center justify-center border-t border-text-tertiary/10 overflow-visible">
      <div className="z-10 text-center mb-8 px-4 flex flex-col items-center relative">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary mb-12 mt-16 md:mt-0">
          Discover Places You'll<br/>Never Want to Leave
        </h2>
        
        {/* Dashed Border Button with Skip the line arrow */}
        <div className="relative flex items-center justify-center">
          <div className="absolute right-full mr-4 md:mr-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 scale-75 lg:scale-100 origin-right transition-transform">
            <span className="font-writing text-2xl whitespace-nowrap text-text-secondary transform -rotate-12 -mt-4">Skip the line</span>
            <svg width="60" height="40" viewBox="0 0 60 40" className="text-text-tertiary">
              <path d="M0,10 C15,35 40,35 55,20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M45,18 L55,20 L52,28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Design Annotation (Desktop) */}
          <Annotation
            notes={["Conversion CTA"]}
            arrowDirection="left"
            className="absolute left-full ml-4 md:ml-6 top-1/2 -translate-y-1/2 scale-75 lg:scale-100 origin-left hidden md:flex"
            mobileVisible={false}
          />
          {/* Design Annotation (Mobile) */}
          <Annotation
            notes={["Conversion CTA"]}
            arrowDirection="top-left"
            className="absolute top-full mt-4 right-4 scale-75 origin-right flex md:hidden"
            align="right"
            mobileVisible={true}
          />

          <div className="p-1.5 border border-dashed border-text-tertiary/50 rounded-full">
            <Link href="/book" className="block px-10 py-5 text-[15px] font-bold tracking-widest uppercase bg-accent-primary hover:bg-accent-primary/90 text-background rounded-full transition-colors shadow-sm">
              Book Your Experience
            </Link>
          </div>
        </div>
      </div>

      {/* Massive overlapping text at the bottom */}
      <div className="cta-text w-full flex justify-center translate-y-1/4">
        <h1 className="text-[15vw] leading-none font-display font-black tracking-tighter text-text-primary/5 select-none">
          MOVEO
        </h1>
      </div>
    </section>
  );
};
