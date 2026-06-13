"use client";

import React, { useRef } from "react";

const PARTNERS = [
  "PVR Cinemas", "INOX", "RedBus", "IRCTC", "Paytm", "BookMyShow"
];

const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

export const PartnersSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // No more GSAP infinite marquee — using pure CSS animation instead

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto w-full bg-background border-t border-text-tertiary/10 relative overflow-visible">
      
      <div className="flex flex-col items-center justify-center mb-16 px-4 relative">
        <p className="text-text-tertiary font-display text-sm tracking-widest uppercase mb-4">Sponsored By</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-primary text-center">
          Our Partners
        </h2>
      </div>

      <div className="w-full flex whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity duration-700">
        <div className="marquee-content flex items-center marquee marquee-slow">
          {MARQUEE_ITEMS.map((partner, idx) => (
            <a 
              key={idx} 
              href={`https://${partner.replace(/\s+/g, '').toLowerCase()}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter text-text-tertiary hover:text-text-primary transition-colors duration-300 mx-8 md:mx-16"
            >
              {partner}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
