"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const FOOTER_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Buses", href: "/buses" },
  { label: "Trains", href: "/trains" },
  { label: "Community", href: "/community" },
];

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const pathname = usePathname();

  const visibleNavLinks = FOOTER_NAV_LINKS.filter((link) => pathname !== link.href);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // Fade in text elements
    gsap.from(".footer-item", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
      force3D: true
    });

    // Floating animation for MOVEO text logo
    gsap.to(textRef.current, {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // SVG Line drawing animation
    if (path1Ref.current) {
      const length = path1Ref.current.getTotalLength();
      gsap.set(path1Ref.current, { strokeDasharray: length, strokeDashoffset: length });
      if (dot1Ref.current) gsap.set(dot1Ref.current, { opacity: 0 });

      gsap.to(path1Ref.current, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        onComplete: () => {
          if (dot1Ref.current && path1Ref.current) {
            gsap.to(dot1Ref.current, { opacity: 1, duration: 0.5 });
            gsap.to(dot1Ref.current, {
              motionPath: {
                path: path1Ref.current,
                align: path1Ref.current,
                alignOrigin: [0.5, 0.5],
              },
              duration: 15,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      });
    }
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="w-full bg-background relative overflow-visible py-24">
      
      {/* Background SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none text-text-tertiary opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <path 
          ref={path1Ref}
          d="M-50,650 C200,800 400,350 700,550 C1000,750 1150,250 1450,450 C1600,550 1650,700 1700,650" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none" 
        />
        <circle ref={dot1Ref} r="4" className="fill-text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 lg:px-24 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        
        {/* Logo Branding */}
        <div className="flex flex-col gap-6 w-full lg:w-auto">
          <h2 ref={textRef} className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-text-primary uppercase mb-2 wrap-break-word">
            MOVEO
          </h2>
          <div className="font-display font-medium text-xs md:text-sm tracking-widest uppercase text-text-tertiary footer-item">
            &copy; {siteConfig.name} {new Date().getFullYear()}
          </div>
        </div>

        {/* Minimalist Navigation & Socials */}
        <div className="flex w-full flex-col gap-8 lg:w-auto lg:flex-row lg:items-start lg:justify-end lg:gap-16 lg:flex-nowrap">
          
          <div className="flex w-full flex-col gap-6 lg:min-w-48 lg:max-w-xs lg:flex-1">
            <span className="text-text-tertiary text-xs font-mono uppercase tracking-widest footer-item">Navigation</span>
            <ul className="flex flex-col gap-3 font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter">
              {visibleNavLinks.map((link) => (
                <li key={link.href} className="footer-item">
                  <Link href={link.href} className="hover:text-text-secondary transition-colors block cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col gap-6 lg:min-w-48 lg:max-w-xs lg:flex-1">
            <span className="text-text-tertiary text-xs font-mono uppercase tracking-widest footer-item">Socials</span>
            <ul className="flex flex-col gap-3 font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter">
              <li className="footer-item">
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-text-secondary transition-colors block cursor-pointer">Instagram</a>
              </li>
              <li className="footer-item">
                <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" className="hover:text-text-secondary transition-colors block cursor-pointer">Twitter</a>
              </li>
              <li className="footer-item">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-text-secondary transition-colors block cursor-pointer">LinkedIn</a>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
};
