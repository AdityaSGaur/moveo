"use client";

import React, { useRef } from "react";
import { MarqueeStrip } from "@/components/animations";

const PARTNERS = [
  "PVR Cinemas", "INOX", "RedBus", "IRCTC", "Paytm", "BookMyShow"
];

export const PartnersSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const partnerElements = PARTNERS.map((partner, idx) => (
    <a
      key={idx}
      href={`https://${partner.replace(/\s+/g, '').toLowerCase()}.com`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-display font-bold uppercase tracking-tighter text-text-tertiary hover:text-accent-primary transition-colors duration-300 mx-8 md:mx-16 leading-none py-4"
    >
      {partner}
    </a>
  ));

  return (
    <section ref={containerRef} className="py-24 w-full bg-background border-t border-text-tertiary/10 relative overflow-hidden">
      
      <div className="flex flex-col items-center justify-center mb-16 px-4 max-w-7xl mx-auto relative">
        <p className="text-text-tertiary font-display text-sm tracking-widest uppercase mb-4">Sponsored By</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-primary text-center">
          Our Partners
        </h2>
      </div>

      <div className="w-full opacity-60 hover:opacity-100 transition-opacity duration-500">
        <MarqueeStrip items={partnerElements} speed={25} pauseOnHover={true} />
      </div>
    </section>
  );
};

