"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createMarquee } from "@/lib/animations";

interface MarqueeStripProps {
  text: string;
  speed?: number; // duration in seconds for one full scroll
  direction?: 1 | -1; // 1 for right, -1 for left
  className?: string;
  itemClassName?: string;
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({
  text,
  speed = 20,
  direction = -1,
  className = "",
  itemClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      createMarquee(containerRef.current, { duration: speed, direction });
    }
  }, { scope: containerRef });

  // Duplicate the text multiple times to ensure seamless scrolling
  // For a truly infinite feel without JS cloning logic, we render enough copies
  // to cover the screen twice, and animate -50% to 0 or 0 to -50%
  const items = Array(10).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <div ref={containerRef} className="flex min-w-max">
        {items.map((item, index) => (
          <span key={index} className={`px-4 inline-block ${itemClassName}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
