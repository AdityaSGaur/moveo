"use client";

import React, { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ZapIcon, BrainIcon, UserMultipleIcon } from "@hugeicons/core-free-icons";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FEATURES = [
  { id: 1, title: "Real-time booking", description: "Lightning fast seat reservations with instant confirmation.", icon: ZapIcon },
  { id: 2, title: "AI recommendations", description: "Smart suggestions tailored exactly to your travel & entertainment taste.", icon: BrainIcon },
  { id: 3, title: "Group booking", description: "Split costs and coordinate seamlessly with friends and family.", icon: UserMultipleIcon },
];

export const WhyMoveo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray('.feature-item');
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto w-full bg-background border-t border-text-tertiary/10 relative overflow-visible">
      
      <div className="text-center mb-16 relative">
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary mb-4">
          Why Moveo?
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">Experience the next generation of seamless booking.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="feature-item text-center flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-text-tertiary/20 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-accent-primary/50 transition-all duration-300 group-hover:shadow-accent-primary/20">
                <HugeiconsIcon icon={Icon} size={28} className="text-text-primary group-hover:text-accent-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
