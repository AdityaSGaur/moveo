"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const TestimonialBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".testimonial-img", {
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
      force3D: true
    });

    gsap.from(".testimonial-content", {
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
      force3D: true
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-12 lg:px-24 bg-background">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="testimonial-img w-48 h-64 shrink-0 bg-surface border border-text-tertiary/10 p-2">
          <img 
            src="/images/testimonial-1.jpg" 
            alt="User testimonial" 
            className="w-full h-full object-cover filter grayscale"
          />
        </div>
        
        <div className="flex-1 border-y border-text-tertiary/20 py-12 relative">
          <div className="absolute top-8 left-0 text-6xl text-text-tertiary/30 font-display font-bold leading-none">
            &ldquo;
          </div>
          <p className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed relative z-10 pl-6">
            Moveo completely changed how I book my weekend getaways. The interface is buttery smooth, and I can book a movie and my return bus ticket in less than a minute. It's powerful, fast, and simply beautiful to use.
          </p>
          <div className="absolute bottom-8 right-0 text-6xl text-text-tertiary/30 font-display font-bold leading-none rotate-180">
            &ldquo;
          </div>
        </div>
      </div>
    </section>
  );
};
