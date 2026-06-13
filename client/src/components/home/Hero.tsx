"use client";

import React, { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Airplane01Icon, Bus01Icon, Train01Icon, Location01Icon, Ticket01Icon, Calendar01Icon } from "@hugeicons/core-free-icons";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Annotation } from "@/components/ui/Annotation";
import Link from 'next/link';

export const Hero = () => {
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // Draw SVG squiggly lines (plays once)
    [path1Ref.current, path2Ref.current].forEach((path) => {
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, willChange: "stroke-dashoffset" });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
        delay: 2.5, // Wait for Preloader to finish
      });
    });

    // Reveal text and elements with a staggered bounce effect (plays once)
    gsap.fromTo(".hero-elem", 
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.5)",
        delay: 2.8, // Wait for Preloader
      }
    );
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-48">
      
      {/* Abstract Squiggly SVG Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none text-text-tertiary opacity-40" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <path 
          ref={path1Ref}
          d="M-100,150 C250,50 350,450 600,250 C850,50 1000,550 1300,350 C1500,200 1550,100 1600,150" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none" 
        />
        <path 
          ref={path2Ref}
          d="M-50,650 C200,800 400,350 700,550 C1000,750 1150,250 1450,450 C1600,550 1650,700 1700,650" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none" 
        />

      </svg>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto mt-16">
        
        {/* Main Title Container */}
        <div className="relative mb-8 w-full flex justify-center items-center">
          
          <div className="relative flex justify-center items-center">
            <Annotation
              notes={["Cinematic hero experience"]}
              arrowDirection="curve-right-down"
              arrowPosition="right"
              className="-top-24 -left-16 md:-top-20 md:-left-12 lg:-top-16 lg:-left-20"
              mobileVisible={true}
              delay={3}
            />
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] font-display font-bold tracking-tighter leading-none text-text-primary uppercase opacity-0 hero-elem">
              MOVEO
            </h1>
          </div>
          {/* Small side texts */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[10px] font-mono text-text-tertiary hidden lg:block tracking-widest uppercase opacity-0 hero-elem">
            Est. 2026
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[10px] font-mono text-text-tertiary hidden lg:block tracking-widest uppercase opacity-0 hero-elem">
            Booking Platform
          </div>

        </div>

        {/* Small Pills */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16 opacity-0 hero-elem">
          <span className="px-5 py-2 rounded-full border border-text-tertiary/20 text-xs font-medium bg-surface text-text-primary uppercase tracking-wide hover:scale-105 transition-transform cursor-pointer">Flights</span>
          <span className="px-5 py-2 rounded-full border border-text-tertiary/20 text-xs font-medium bg-surface text-text-primary uppercase tracking-wide hover:scale-105 transition-transform cursor-pointer">Buses</span>
          <span className="px-5 py-2 rounded-full border border-text-tertiary/20 text-xs font-medium bg-surface text-text-primary uppercase tracking-wide hover:scale-105 transition-transform cursor-pointer">Trains</span>
        </div>

        {/* Sub-heading */}
        <p className="text-xl md:text-2xl font-medium text-text-primary max-w-lg mb-16 leading-relaxed opacity-0 hero-elem">
          Empowering travelers worldwide with exceptional booking solutions.
        </p>

        {/* Small Icons Row */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-text-tertiary opacity-0 hero-elem">
          <HugeiconsIcon icon={Airplane01Icon} size={24} className="hover:text-text-primary hover:-translate-y-1 transition-all cursor-pointer" />
          <HugeiconsIcon icon={Bus01Icon} size={24} className="hover:text-text-primary hover:-translate-y-1 transition-all cursor-pointer" />
          <HugeiconsIcon icon={Train01Icon} size={24} className="hover:text-text-primary hover:-translate-y-1 transition-all cursor-pointer" />
          <HugeiconsIcon icon={Ticket01Icon} size={24} className="hover:text-text-primary hover:-translate-y-1 transition-all cursor-pointer" />
          <HugeiconsIcon icon={Calendar01Icon} size={24} className="hover:text-text-primary hover:-translate-y-1 transition-all cursor-pointer" />
          <HugeiconsIcon icon={Location01Icon} size={24} className="hover:text-text-primary hover:-translate-y-1 transition-all cursor-pointer" />
        </div>

        {/* Booking CTA */}
        <div className="mt-10 opacity-0 hero-elem flex flex-col items-center gap-3">
          <Link href="/book" className="px-8 py-4 bg-accent-primary text-background rounded-2xl text-lg font-bold tracking-wide hover:opacity-95 transition-opacity shadow-xl">Start Booking</Link>
          <div className="flex items-center gap-3 text-sm text-text-tertiary">
            <Link href="/book?category=flight" className="hover:text-text-primary">Flights</Link>
            <span>•</span>
            <Link href="/book?category=bus" className="hover:text-text-primary">Buses</Link>
            <span>•</span>
            <Link href="/book?category=train" className="hover:text-text-primary">Trains</Link>
          </div>
        </div>

      </div>
    </section>
  );
};
