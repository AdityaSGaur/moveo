"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Remove01Icon } from "@hugeicons/core-free-icons";

const FAQS = [
  { id: 1, question: "How do I find the best deal on Moveo?", answer: "Our AI-powered engine constantly scans for the best deals across all our partners. Just enter your destination and dates, and we'll highlight the most cost-effective and premium options.", image: "/images/grid-4.jpg" },
  { id: 2, question: "Is there a flexible cancellation policy?", answer: "Yes, many of our bookings offer free cancellation up to 24 hours before your trip or event. Always check the specific policy mentioned on the booking page.", image: "/images/grid-5.jpg" },
  { id: 3, question: "Can I book for a large group?", answer: "Absolutely. Our Group Booking feature allows you to seamlessly reserve multiple seats or rooms, split payments, and invite friends to collaborate on the itinerary.", image: "/images/grid-1.jpg" },
  { id: 4, question: "What is the Moveo rewards program?", answer: "Earn points on every flight ticket, bus ride, or hotel stay. Redeem these points for exclusive discounts, free upgrades, and VIP experiences.", image: "/images/grid-2.jpg" },
];

export const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".faq-content", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-12 lg:px-24 bg-background relative z-10 border-t border-text-tertiary/10">
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start max-w-7xl mx-auto w-full">
        
        {/* FAQ List */}
        <div className="w-full lg:w-1/2 faq-content">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-primary mb-2">
            Got Questions?
          </h2>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-secondary mb-12">
            We're Here to Help.
          </h2>

          <div className="flex flex-col gap-6">
            {FAQS.map((faq, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={faq.id} 
                  className={`border-b border-text-tertiary/20 pb-6 transition-all duration-300`}
                >
                  <button 
                    onClick={() => setActiveIndex(index)}
                    className="flex items-center justify-between w-full text-left focus:outline-none group"
                  >
                    <span className={`text-xl font-bold font-display transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-text-primary text-background' : 'bg-surface-elevated text-text-secondary group-hover:text-text-primary'}`}>
                      <HugeiconsIcon icon={isActive ? Remove01Icon : Add01Icon} size={20} />
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-text-secondary leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Image */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] faq-content relative rounded-[2rem] overflow-hidden shadow-2xl">
          {FAQS.map((faq, index) => (
            <img 
              key={faq.id}
              src={faq.image}
              alt="FAQ illustration"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
};
