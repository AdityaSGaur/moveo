"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock body scroll while loading
    document.body.style.overflow = "hidden";

    // Counter animation
    const duration = 2; // seconds
    const fps = 60;
    const totalFrames = duration * fps;
    let frame = 0;

    const animateCounter = () => {
      frame++;
      const currentProgress = Math.min(Math.round((frame / totalFrames) * 100), 100);
      setProgress(currentProgress);

      if (frame < totalFrames) {
        requestAnimationFrame(animateCounter);
      } else {
        // Counter finished, trigger split reveal
        triggerExitAnimation();
      }
    };

    // Start counter with slight delay
    const timer = setTimeout(() => {
      requestAnimationFrame(animateCounter);
    }, 300);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const triggerExitAnimation = () => {
    if (!topHalfRef.current || !bottomHalfRef.current || !textRef.current || !counterRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = ""; // Restore scroll
      },
    });

    // Fade out text and counter
    tl.to([textRef.current, counterRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    })
    // Split screen
    .to(
      topHalfRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.1"
    )
    .to(
      bottomHalfRef.current,
      {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      "<"
    );
  };

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      {/* Background Halves for Split Effect */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-background origin-top"
      />
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-background origin-bottom"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1
          ref={textRef}
          className="text-6xl md:text-8xl lg:text-[11rem] font-display font-bold text-text-primary tracking-tighter leading-none uppercase"
        >
          {/* Quddus-inspired text split layout */}
          <span className="block text-center">{`MOVEO`}</span>
        </h1>
        
        <div 
          ref={counterRef}
          className="flex items-center gap-2"
        >
          <div className="h-px w-12 bg-text-tertiary/20" />
          <span className="font-mono text-xl md:text-3xl font-medium text-text-primary w-16 text-center tabular-nums">
            {progress}%
          </span>
          <div className="h-px w-12 bg-text-tertiary/20" />
        </div>
      </div>
    </div>
  );
};
