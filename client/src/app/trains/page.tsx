"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function TrainsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-warning blur-[150px] rounded-full" />
      </div>
      <h1 ref={textRef} className="text-6xl md:text-8xl lg:text-[11rem] font-display font-bold tracking-tighter uppercase text-center relative z-10 mix-blend-difference text-white">
        TRAINS
      </h1>
      <p className="mt-8 text-text-secondary font-mono tracking-widest uppercase relative z-10">
        Booking Module In Development
      </p>
    </section>
  );
}
