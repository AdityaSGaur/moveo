"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const CTABanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".cta-content", {
      scale: 0.95,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
      force3D: true
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-12 lg:px-24 bg-background">
      <div className="cta-content max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-text-tertiary/20 pt-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-2">
            Book your Tickets
          </h2>
          <h3 className="text-3xl md:text-4xl font-display text-text-secondary">
            Enjoy your Journey
          </h3>
          <div className="flex items-center gap-4 mt-6">
            <span className="text-xl font-medium">Apply Now</span>
            <div className="w-12 h-px bg-text-primary" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-6 max-w-sm text-right">
          <p className="text-text-secondary text-sm">
            We have been helping millions of users book their travel and entertainment seamlessly and fast in the first place.
          </p>
          <Button variant="primary" className="rounded-none px-8">
            Book Now &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
};
