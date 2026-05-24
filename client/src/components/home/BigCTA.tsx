"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

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
    <section ref={containerRef} className="relative w-full bg-background pt-32 pb-16 overflow-hidden flex flex-col items-center justify-center border-t border-text-tertiary/10">
      <div className="z-10 text-center mb-8 px-4 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary mb-6">
          Discover Places You'll<br/>Never Want to Leave
        </h2>
        <Button size="lg" className="px-8 py-6 text-lg rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
          Book Your Experience
        </Button>
      </div>

      {/* Massive overlapping text at the bottom */}
      <div className="cta-text w-full flex justify-center translate-y-1/4">
        <h1 className="text-[15vw] leading-none font-display font-black tracking-tighter text-text-primary/5 select-none drop-shadow-2xl">
          MOVEO
        </h1>
      </div>
    </section>
  );
};
