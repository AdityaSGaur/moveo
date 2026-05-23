"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MovieCarousel, MovieItem } from "@/components/movies/MovieCarousel";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Location01Icon, Calendar01Icon, PlayIcon } from "@hugeicons/core-free-icons";

// MOCK DATA
const RECENT_RELEASES: MovieItem[] = [
  { id: 1, title: "Deadpool & Wolverine", subtitle: "Action / Comedy", image: "/images/grid-1.jpg" },
  { id: 2, title: "Raayan", subtitle: "Action / Thriller", image: "/images/grid-4.jpg" },
  { id: 3, title: "Kalki 2898 AD", subtitle: "Sci-Fi / Action", image: "/images/grid-5.jpg" },
  { id: 4, title: "Bad Newz", subtitle: "Comedy / Drama", image: "/images/grid-2.jpg" },
  { id: 5, title: "Avesham", subtitle: "Action / Comedy", image: "/images/grid-6.jpg" },
];

const PREMIERES: MovieItem[] = [
  { id: 11, title: "Ullozhukku", subtitle: "Drama / Thriller", image: "/images/grid-6.jpg" },
  { id: 12, title: "Maharaja", subtitle: "Action / Crime", image: "/images/grid-4.jpg" },
  { id: 13, title: "Garudan", subtitle: "Action / Thriller", image: "/images/grid-5.jpg" },
  { id: 14, title: "Turbo", subtitle: "Action / Comedy", image: "/images/grid-1.jpg" },
  { id: 15, title: "Bramayugam", subtitle: "Horror / Mystery", image: "/images/grid-2.jpg" },
];

const MUSIC_SHOWS: MovieItem[] = [
  { id: 21, title: "Arijit Singh Live", subtitle: "Concert • Bangalore", image: "/images/community-1.jpg" },
  { id: 22, title: "Karan Aujla - It Was All A Dream", subtitle: "Music • Delhi", image: "/images/community-2.jpg" },
  { id: 23, title: "CAS - Asia Tour 2024", subtitle: "Pop • Mumbai", image: "/images/community-3.jpg" },
  { id: 24, title: "Sunburn Arena", subtitle: "EDM • Goa", image: "/images/grid-5.jpg" },
];

const FUN_ACTIVITIES: MovieItem[] = [
  { id: 31, title: "Night Camping", subtitle: "Adventure • Lonavala", image: "/images/grid-2.jpg" },
  { id: 32, title: "Wonderla Amusement Park", subtitle: "Theme Park • Bangalore", image: "/images/community-2.jpg" },
  { id: 33, title: "Go Karting Championship", subtitle: "Sports • Pune", image: "/images/community-1.jpg" },
];

const CAROUSEL_IMAGES = [
  "https://static.tvmaze.com/uploads/images/original_untouched/6/16463.jpg",
  "https://static.tvmaze.com/uploads/images/original_untouched/3/9370.jpg",
  "https://static.tvmaze.com/uploads/images/original_untouched/4/10842.jpg",
  "https://static.tvmaze.com/uploads/images/original_untouched/38/96515.jpg",
  "https://static.tvmaze.com/uploads/images/original_untouched/529/1323819.jpg",
  "https://static.tvmaze.com/uploads/images/original_untouched/255/639009.jpg",
  "https://static.tvmaze.com/uploads/images/original_untouched/295/738675.jpg"
];

export default function MoviesLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    gsap.from(".hero-content > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    });

    // Infinite Scrolling Carousel Logic
    const slots = gsap.utils.toArray('.carousel-slot') as HTMLElement[];
    const items = gsap.utils.toArray('.carousel-item') as HTMLElement[];
    
    if (slots.length && wrapperRef.current) {
      // 1. Infinite Scroll Animation
      // We have 4 identical sets, so moving by -25% shifts exactly one full set left.
      // This makes the seamless loop mathematically perfect.
      const animation = gsap.to(wrapperRef.current, {
        xPercent: -25,
        ease: "none",
        duration: 45, // Slowed down for a relaxing, cinematic speed
        repeat: -1
      });

      // Pause on hover
      wrapperRef.current.addEventListener('mouseenter', () => animation.pause());
      wrapperRef.current.addEventListener('mouseleave', () => animation.play());

      // 2. Dynamic Curve Calculation (runs every frame)
      const updateCurve = () => {
        const containerCenter = window.innerWidth / 2;
        const containerHalfWidth = Math.min(1400, window.innerWidth) / 2;

        // Fast DOM read from stable slots
        const centers = slots.map(slot => {
          const rect = slot.getBoundingClientRect();
          return rect.left + rect.width / 2;
        });

        // Fast DOM write to animated items
        centers.forEach((itemCenter, i) => {
          let distance = (itemCenter - containerCenter) / containerHalfWidth;
          distance = Math.max(-1.5, Math.min(1.5, distance));
          
          // Reverted back to the original linear V-shape curve that the user liked
          const rotate = distance * 12; // 12deg max rotation
          const translateY = Math.abs(distance) * 80; // 80px drop
          const smoothScale = 1.05 - Math.abs(distance) * 0.1; // 1.05 scale at center
          const zIndex = Math.round(100 - Math.abs(distance) * 10);
          
          gsap.set(items[i], {
            y: translateY,
            rotation: rotate,
            scale: smoothScale,
            opacity: 1, // Removed edge fading
            zIndex: zIndex
          });
        });
      };

      gsap.ticker.add(updateCurve);
    }

    // Ticket Search Animations
    gsap.from(".ticket-search", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.5)",
      delay: 0.6
    });

    // Promo Banner Animation
    gsap.from(".promo-banner", {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".promo-banner",
        start: "top 80%",
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-text-primary pb-20 pt-32">
      
      {/* TYPOGRAPHIC HERO (BrandLyft Structure + Moveo Theme) */}
      <section className="relative w-full flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden mb-32">
        
        {/* Floating Accents */}
        <div className="absolute top-1/4 left-[20%] text-text-tertiary font-writing text-xl transform -rotate-12 hidden lg:block">
          //
        </div>
        
        <div className="absolute top-[28%] right-[10%] lg:right-[15%] hidden sm:block z-10 scale-75 lg:scale-100 origin-bottom-right transition-transform">
          <div className="relative">
            <span className="relative z-10 font-writing text-2xl whitespace-nowrap transform -rotate-6 text-text-secondary inline-block">Step into<br/>the magic</span>
            <svg width="140" height="140" viewBox="0 0 140 140" className="absolute top-[20px] -left-[20px] text-text-tertiary -z-10">
              <path d="M0,60 C50,60 120,70 90,130" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M85,110 L90,130 L110,125" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Top Label */}
        <div className="bg-accent-primary/20 text-accent-primary border border-accent-primary/30 px-5 py-2 rounded-full text-[13px] font-bold tracking-widest uppercase mb-8">
          Join millions of movie lovers
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-display font-bold tracking-tight text-center max-w-4xl mx-auto mb-6">
          Experience the Magic<br />of Cinema
        </h1>
        
        <p className="text-text-secondary text-sm md:text-base text-center max-w-xl mx-auto mb-16 leading-relaxed font-medium">
          Book tickets for the latest blockbusters, highly anticipated premieres, and exclusive screenings. Your premium movie experience starts here.
        </p>

        {/* Arched Gallery (Infinite Scroll) */}
        <div ref={carouselRef} className="relative w-full max-w-[1400px] h-[350px] md:h-[450px] flex justify-center items-center mb-24 overflow-visible">
          <div ref={wrapperRef} className="flex w-max items-center will-change-transform">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 md:gap-6 shrink-0 pr-4 md:pr-6">
                {CAROUSEL_IMAGES.map((src, index) => (
                  <div 
                    key={index} 
                    className="carousel-slot relative w-[35vw] md:w-[200px] lg:w-[220px] aspect-[2/3] shrink-0"
                  >
                    <div className="carousel-item absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 cursor-pointer will-change-transform">
                      <img src={src} alt="Gallery image" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button with Dashed Border and Arrow */}
        <div className="relative flex items-center justify-center mt-8">
          <div className="absolute right-full mr-4 md:mr-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 scale-75 lg:scale-100 origin-right transition-transform">
            <span className="font-writing text-2xl whitespace-nowrap text-text-secondary transform -rotate-12 -mt-4">Skip the line</span>
            <svg width="60" height="40" viewBox="0 0 60 40" className="text-text-tertiary">
              <path d="M0,10 C15,35 40,35 55,20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M45,18 L55,20 L52,28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="p-1.5 border border-dashed border-text-tertiary/50 rounded-full">
            <button className="px-10 py-4 text-[15px] font-bold tracking-widest uppercase bg-accent-primary hover:bg-accent-primary/90 text-background rounded-full transition-colors shadow-sm">
              Book Tickets
            </button>
          </div>
        </div>

      </section>

      {/* TICKET SEARCH BLOCK */}
      <section className="relative z-30 max-w-5xl mx-auto px-4 md:px-0 mb-24 ticket-search perspective-1000">
        <div className="bg-surface-elevated border border-text-tertiary/20 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden transition-transform duration-500 hover:shadow-2xl">
          <div className="p-8 md:p-12 relative overflow-hidden">
            
            {/* Dashed lines for subtle ticket effect */}
            <div className="absolute top-0 bottom-0 left-8 md:left-16 border-l-2 border-dashed border-text-tertiary/20 hidden sm:block" />
            <div className="absolute top-0 bottom-0 right-8 md:right-16 border-r-2 border-dashed border-text-tertiary/20 hidden sm:block" />
            
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10 uppercase tracking-widest text-text-primary">Find Theatre</h2>
            
            <div className="flex flex-col md:flex-row gap-5 md:px-24">
              <div className="flex-1 relative group">
                <HugeiconsIcon icon={Search01Icon} size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search movies..." 
                  className="w-full bg-background border border-text-tertiary/20 rounded-2xl py-4 pl-14 pr-5 text-sm focus:outline-none focus:border-accent-primary transition-colors text-text-primary placeholder:text-text-tertiary"
                />
              </div>
              <div className="flex-1 relative group">
                <HugeiconsIcon icon={Location01Icon} size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Select City" 
                  className="w-full bg-background border border-text-tertiary/20 rounded-2xl py-4 pl-14 pr-5 text-sm focus:outline-none focus:border-accent-primary transition-colors text-text-primary placeholder:text-text-tertiary cursor-pointer"
                  readOnly
                />
              </div>
              <div className="flex-1 relative group">
                <HugeiconsIcon icon={Calendar01Icon} size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Select Date" 
                  className="w-full bg-background border border-text-tertiary/20 rounded-2xl py-4 pl-14 pr-5 text-sm focus:outline-none focus:border-accent-primary transition-colors text-text-primary placeholder:text-text-tertiary cursor-pointer"
                  readOnly
                />
              </div>
            </div>
            
            <div className="mt-10 flex justify-center relative z-10">
              <Button className="w-full md:w-auto md:px-20 py-7 uppercase tracking-widest text-sm font-bold bg-text-primary hover:scale-[1.02] text-background rounded-2xl shadow-xl transition-transform duration-300">
                Search Shows
              </Button>
            </div>
            
          </div>
        </div>
      </section>

      {/* RECENT RELEASES CAROUSEL */}
      <MovieCarousel 
        title="Recent Releases" 
        items={RECENT_RELEASES} 
        viewAllLink="/movies/all" 
      />

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-12">
        <div className="promo-banner w-full bg-accent-primary text-background rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12 relative shadow-2xl">
          <div className="absolute -right-20 -top-20 opacity-10 blur-2xl">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M45.7,-76.1C58.9,-68.8,69.2,-55.5,76.5,-41.2C83.8,-26.9,88.1,-11.5,86.2,3.3C84.3,18.1,76.2,32.4,66.2,44.5C56.2,56.6,44.3,66.5,30.7,72.4C17.1,78.3,1.8,80.2,-13.4,78.6C-28.6,77,-43.7,71.9,-55.8,62.5C-67.9,53.1,-77.1,39.4,-81.8,24.3C-86.5,9.2,-86.7,-7.4,-81.3,-22.3C-75.9,-37.2,-64.9,-50.4,-51.7,-57.8C-38.5,-65.2,-23.1,-66.8,-7.4,-67.2C8.3,-67.6,26.6,-66.8,45.7,-76.1Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="z-10 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter uppercase mb-4">
              Exclusive Offers<br/>On Your First Ticket
            </h2>
            <div className="inline-flex items-center gap-4 bg-background text-foreground px-6 py-3 rounded-full font-mono text-sm tracking-widest font-bold">
              <span>CODE :</span>
              <span className="text-accent-primary opacity-80 select-all border-b border-dashed border-accent-primary/50">MOVEO2026</span>
            </div>
          </div>
          <div className="z-10 w-full max-w-xs md:max-w-sm">
            {/* Visual representation of tickets instead of the actual screenshot's graphic */}
            <div className="flex justify-center -space-x-8 transform rotate-12">
              <div className="w-24 h-40 bg-surface text-text-primary rounded-xl border border-white/20 shadow-xl flex flex-col justify-between p-4 -rotate-12 transition-transform hover:rotate-0">
                <div className="text-xs font-mono border-b border-white/10 pb-2">ADM ONE</div>
                <div className="w-8 h-8 rounded-full border border-dashed border-white/30 mx-auto" />
                <div className="text-xs font-mono border-t border-white/10 pt-2 text-right">001</div>
              </div>
              <div className="w-24 h-40 bg-surface-elevated text-text-primary rounded-xl border border-white/20 shadow-2xl flex flex-col justify-between p-4 rotate-6 transition-transform hover:rotate-0 mt-8">
                <div className="text-xs font-mono border-b border-white/10 pb-2">ADM ONE</div>
                <div className="w-8 h-8 rounded-full border border-dashed border-accent-primary mx-auto" />
                <div className="text-xs font-mono border-t border-white/10 pt-2 text-right text-accent-primary">002</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIERES CAROUSEL */}
      <MovieCarousel 
        title="Premieres" 
        items={PREMIERES} 
        viewAllLink="/movies/premieres" 
      />

      {/* MUSIC SHOWS CAROUSEL */}
      <MovieCarousel 
        title="Music Shows" 
        items={MUSIC_SHOWS} 
        viewAllLink="/music" 
      />

      {/* FUN ACTIVITIES CAROUSEL */}
      <MovieCarousel 
        title="Fun Activities" 
        items={FUN_ACTIVITIES} 
        viewAllLink="/activities" 
      />

    </div>
  );
}
