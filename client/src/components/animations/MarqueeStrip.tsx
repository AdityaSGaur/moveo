"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createMarquee } from "@/lib/animations";

export interface MarqueeStripProps {
  text?: string;
  items?: (string | React.ReactNode)[];
  children?: React.ReactNode;
  speed?: number; // duration in seconds for one full scroll
  direction?: 1 | -1; // 1 for right, -1 for left
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({
  text,
  items,
  children,
  speed = 120,
  direction = -1,
  pauseOnHover = true,
  className = "",
  itemClassName = "text-4xl md:text-6xl font-display font-bold uppercase tracking-tight",
  separator = null,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        const tween = createMarquee(containerRef.current, {
          duration: speed,
          direction,
        });
        if (tween) {
          tweenRef.current = tween as gsap.core.Tween;
        }
      }
    },
    { scope: containerRef, dependencies: [speed, direction] }
  );

  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      tweenRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      tweenRef.current.play();
    }
  };

  // Determine content list
  let contentList: React.ReactNode[] = [];
  if (children) {
    contentList = [children];
  } else if (items && items.length > 0) {
    contentList = items;
  } else if (text) {
    contentList = [text];
  }

  if (contentList.length > 0) {
    const minItems = 12;
    const multiplier = Math.ceil(minItems / contentList.length);
    if (multiplier > 1) {
      const baseList = [...contentList];
      for (let i = 1; i < multiplier; i++) {
        contentList = contentList.concat(baseList);
      }
    }
  }

  const renderTrack = (trackKey: string) => (
    <div key={trackKey} className="flex shrink-0 items-center whitespace-nowrap">
      {contentList.map((item, index) => (
        <React.Fragment key={`${trackKey}-${index}`}>
          <span className={`inline-flex items-center px-4 ${itemClassName}`}>
            {item}
          </span>
          {separator && (
            <span className="opacity-40 px-2 select-none">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={`overflow-hidden whitespace-nowrap flex w-full select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={containerRef} className="flex min-w-max shrink-0">
        {renderTrack("track-1")}
        {renderTrack("track-2")}
      </div>
    </div>
  );
};

