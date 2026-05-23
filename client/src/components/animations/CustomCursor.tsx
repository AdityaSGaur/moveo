"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop devices
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use GSAP xPercent and yPercent to center perfectly without CSS conflicts
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    // Use quickSetter for instant tracking on the main dot for pixel-perfect accuracy
    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([cursor, follower], { autoAlpha: 1, duration: 0.3 });
      }
      
      // Instant update for the dot
      setCursorX(e.clientX);
      setCursorY(e.clientY);

      // Smooth follow for the ring
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out"
      });
    };

    const onMouseEnter = () => {
      isVisible = true;
      gsap.to([cursor, follower], { autoAlpha: 1, duration: 0.3 });
    };
    
    const onMouseLeave = () => {
      isVisible = false;
      gsap.to([cursor, follower], { autoAlpha: 0, duration: 0.3 });
    };

    // Event delegation for dynamic hover effects
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, [role='button'], .cursor-pointer")) {
        gsap.to(follower, {
          width: 64,
          height: 64,
          backgroundColor: "#ffffff",
          borderColor: "transparent",
          duration: 0.3,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, [role='button'], .cursor-pointer")) {
        gsap.to(follower, {
          width: 40,
          height: 40,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.5)",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);
  
  return (
    <>
      {/* Main accurate dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block opacity-0"
        style={{ willChange: 'transform' }}
      />
      {/* Smooth follower ring */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 bg-transparent border border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block opacity-0"
        style={{ willChange: 'transform, width, height' }}
      />
    </>
  );
};
