"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createTextRevealTimeline } from "@/lib/animations";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const tl = createTextRevealTimeline(containerRef.current, { delay });
      // Clean up on unmount is handled by useGSAP
    }
  }, { scope: containerRef });

  // Split text by words for animation
  const words = children.split(" ").map((word, i) => (
    <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
      <span className="inline-block opacity-0 translate-y-full">
        {word}
      </span>
    </span>
  ));

  return (
    <Component ref={containerRef} className={`${className} flex flex-wrap`}>
      {words}
    </Component>
  );
};
