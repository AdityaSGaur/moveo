"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Direction = 
  | "top-left" 
  | "top-right" 
  | "bottom-left" 
  | "bottom-right" 
  | "left" 
  | "right" 
  | "top" 
  | "bottom"
  | "curve-right-down"
  | "curve-left-down"
  | "curve-right-up"
  | "curve-left-up"
  | "loop-down-left";

interface AnnotationProps {
  title?: string;
  notes: string[];
  arrowDirection?: Direction;
  align?: "left" | "right" | "center";
  className?: string;
  delay?: number;
  mobileVisible?: boolean;
  layout?: "col" | "row" | "row-reverse";
}

export const Annotation = ({
  title,
  notes,
  arrowDirection = "bottom-left",
  align = "left",
  className = "",
  delay = 0.2,
  mobileVisible = false,
  layout = "col",
}: AnnotationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      delay,
    });

    // Animate label
    tl.fromTo(
      ".annotation-label",
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    // Draw arrow path
    if (arrowRef.current) {
      const path = arrowRef.current.querySelector("path");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.4");
        
        // Fade in arrow head
        const head = arrowRef.current.querySelector("polygon, polyline");
        if (head) {
          gsap.fromTo(head, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2");
        }
      }
    }
  }, { scope: containerRef });

  const getAlignClass = () => {
    if (align === "right") return "items-end text-right";
    if (align === "center") return "items-center text-center";
    return "items-start text-left";
  };

  const getLayoutClass = () => {
    if (layout === "row") return "flex-row items-center gap-2";
    if (layout === "row-reverse") return "flex-row-reverse items-center gap-2";
    return "flex-col";
  };

  const getArrowSVG = () => {
    const strokeProps = {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5", // Thicker marker feel
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
    };

    const svgClass = "text-text-secondary opacity-90 drop-shadow-sm";
    const size = "65"; // Larger bounds for organic curves

    switch (arrowDirection) {
      case "curve-right-down":
        return (
          <svg ref={arrowRef} width={size} height={size} viewBox="0 0 100 100" className={`${svgClass} mt-1`}>
            {/* Organic swooping curve */}
            <path d="M 10,20 C 40,-10 80,10 85,75" {...strokeProps} />
            <path d="M 65,65 L 85,75 L 90,50" {...strokeProps} />
          </svg>
        );
      case "curve-left-down":
        return (
          <svg ref={arrowRef} width={size} height={size} viewBox="0 0 100 100" className={`${svgClass} mt-1`}>
            <path d="M 90,20 C 60,-10 20,10 15,75" {...strokeProps} />
            <path d="M 35,65 L 15,75 L 10,50" {...strokeProps} />
          </svg>
        );
      case "curve-right-up":
        return (
          <svg ref={arrowRef} width={size} height={size} viewBox="0 0 100 100" className={`${svgClass} mb-1`}>
            <path d="M 10,80 C 40,110 80,90 85,25" {...strokeProps} />
            <path d="M 65,35 L 85,25 L 90,50" {...strokeProps} />
          </svg>
        );
      case "curve-left-up":
        return (
          <svg ref={arrowRef} width={size} height={size} viewBox="0 0 100 100" className={`${svgClass} mb-1`}>
            <path d="M 90,80 C 60,110 20,90 15,25" {...strokeProps} />
            <path d="M 35,35 L 15,25 L 10,50" {...strokeProps} />
          </svg>
        );
      case "top-left":
        return (
          <svg ref={arrowRef} width={size} height={size} viewBox="0 0 100 100" className={`${svgClass} -translate-y-2`}>
            {/* Wavy S-curve pointing top left */}
            <path d="M 80,90 C 20,90 90,30 15,15" {...strokeProps} />
            <path d="M 15,35 L 15,15 L 35,10" {...strokeProps} />
          </svg>
        );
      case "bottom-right":
        return (
          <svg ref={arrowRef} width={size} height={size} viewBox="0 0 100 100" className={`${svgClass} translate-y-2`}>
            {/* Wavy S-curve pointing bottom right */}
            <path d="M 10,10 C 80,20 20,80 85,85" {...strokeProps} />
            <path d="M 65,85 L 85,85 L 80,65" {...strokeProps} />
          </svg>
        );
      case "right":
        return (
          <svg ref={arrowRef} width={size} height={size} viewBox="0 0 100 100" className={`${svgClass} translate-x-2`}>
            {/* Bouncy horizontal wave */}
            <path d="M 10,50 C 30,10 60,90 85,50" {...strokeProps} />
            <path d="M 65,40 L 85,50 L 70,70" {...strokeProps} />
          </svg>
        );
      case "left":
        return (
          <svg ref={arrowRef} width={size} height={size} viewBox="0 0 100 100" className={`${svgClass} -translate-x-2`}>
            {/* Bouncy horizontal wave */}
            <path d="M 90,50 C 70,10 40,90 15,50" {...strokeProps} />
            <path d="M 35,40 L 15,50 L 30,70" {...strokeProps} />
          </svg>
        );
      case "loop-down-left":
        return (
          <svg ref={arrowRef} width="65" height="85" viewBox="0 0 100 120" className={`${svgClass} -ml-8 mt-2`}>
            {/* Hand-drawn spiral loop pointing down-left */}
            <path d="M 30,20 C 70,-10 90,40 60,60 C 30,80 10,30 40,40 C 70,50 50,100 20,110" {...strokeProps} />
            <path d="M 20,85 L 20,110 L 40,100" {...strokeProps} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute z-40 flex pointer-events-none ${getAlignClass()} ${getLayoutClass()} ${
        mobileVisible ? "flex" : "hidden md:flex"
      } ${className}`}
    >
      {/* Arrow rendered above if it's a bottom-pointing arrow */}
      {arrowDirection.includes("bottom") || arrowDirection.includes("down") ? null : getArrowSVG()}

      <div className="annotation-label relative px-2">
        <div className="font-writing text-2xl md:text-3xl text-text-secondary whitespace-nowrap transform -rotate-6 tracking-wide opacity-90 drop-shadow-sm">
          {notes[0]}
        </div>
      </div>

      {/* Arrow rendered below if it's a bottom-pointing arrow */}
      {arrowDirection.includes("bottom") || arrowDirection.includes("down") ? getArrowSVG() : null}
    </div>
  );
};
