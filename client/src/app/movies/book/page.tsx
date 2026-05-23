"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, Calendar01Icon, Clock01Icon } from "@hugeicons/core-free-icons";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const COLS = 14;

export default function CinematicBookingPage() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>(["F7", "F8"]);
  
  // Mock booked seats
  const bookedSeats = new Set(["A1", "A2", "A13", "A14", "B5", "B6", "C7", "C8", "D1", "D2", "E11", "E12", "F3", "F4", "G9", "G10", "H7", "H8"]);

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.has(seatId)) return;
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-body -mt-16 relative overflow-hidden flex flex-col">
      
      {/* IMMERSIVE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/grid-4.jpg" 
          alt="Raayan Background" 
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        {/* Heavy Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-12 relative z-20 flex-1 flex flex-col">
        
        {/* TOP NAVIGATION / BREADCRUMB */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/movies">
            <button className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full transition-colors backdrop-blur-md group">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Booking Details</span>
            <span className="text-lg font-display font-bold">RAAYAN</span>
          </div>
        </div>

        {/* MAIN CINEMATIC LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1">
          
          {/* LEFT: MOVIE INFO */}
          <div className="w-full lg:w-[300px] flex flex-col gap-6 shrink-0">
            <div className="relative rounded-2xl overflow-hidden aspect-[2/3] border border-white/10 shadow-2xl group">
              <img src="/images/grid-4.jpg" alt="Raayan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] uppercase font-bold tracking-widest border border-white/20">U/A</span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] uppercase font-bold tracking-widest border border-white/20">IMAX 2D</span>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-display font-bold mb-2">RAAYAN</h2>
              <p className="text-sm text-white/60 mb-6">Action / Thriller • 2h 45m</p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                    <HugeiconsIcon icon={Calendar01Icon} size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Date</span>
                    <span className="text-sm font-medium">Sat, 10 Aug 2024</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                    <HugeiconsIcon icon={Clock01Icon} size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Time</span>
                    <span className="text-sm font-medium">08:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: THEATRE SEATING */}
          <div className="flex-1 flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Ambient screen glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-accent-primary/20 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="w-full max-w-3xl mb-20 relative z-10">
              {/* Massive Curved Screen */}
              <div className="w-full h-12 border-t-[4px] border-accent-primary/80 rounded-t-[50%] relative shadow-[0_-20px_50px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/30 to-transparent opacity-80 rounded-t-[50%]" />
              </div>
              <p className="text-center text-xs uppercase tracking-widest text-white/40 mt-6 font-bold">Screen</p>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-3xl relative z-10 perspective-1000">
              {ROWS.map((row, rowIndex) => {
                // Create a curve effect by calculating translate-y based on row index
                const curveOffset = Math.abs(rowIndex - ROWS.length / 2) * 2;
                
                return (
                  <div key={row} className="flex justify-center items-center w-full gap-2 md:gap-3" style={{ transform: `translateY(${-curveOffset}px)` }}>
                    <span className="w-6 text-[10px] font-bold text-white/30 text-center">{row}</span>
                    
                    <div className="flex gap-1 md:gap-2">
                      {Array.from({length: COLS}).map((_, i) => {
                        const seatId = `${row}${i+1}`;
                        const isBooked = bookedSeats.has(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        
                        // Add aisles
                        const margin = (i === 3 || i === 10) ? "ml-6 md:ml-12" : "";

                        return (
                          <button
                            key={seatId}
                            disabled={isBooked}
                            onClick={() => toggleSeat(seatId)}
                            className={`w-6 h-8 md:w-8 md:h-10 rounded-t-xl rounded-b-sm flex flex-col items-center justify-center transition-all duration-300 relative group ${margin} ${
                              isBooked 
                                ? "bg-white/5 border border-white/5 text-transparent cursor-not-allowed" 
                                : isSelected 
                                  ? "bg-accent-primary border-accent-primary shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110 z-10" 
                                  : "bg-white/10 border border-white/20 hover:border-white/50 hover:bg-white/20"
                            }`}
                          >
                            <span className={`text-[9px] md:text-[10px] font-bold ${isSelected ? 'text-black' : 'text-transparent group-hover:text-white/80'}`}>{i+1}</span>
                          </button>
                        )
                      })}
                    </div>
                    
                    <span className="w-6 text-[10px] font-bold text-white/30 text-center">{row}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 flex gap-8 text-[10px] uppercase tracking-widest text-white/50 font-bold bg-black/40 px-8 py-4 rounded-full backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-white/10 border border-white/20 rounded-sm" /> Available</div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-accent-primary rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.3)]" /> Selected</div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-white/5 border border-white/5 rounded-sm" /> Booked</div>
            </div>
          </div>

          {/* RIGHT: CHECKOUT PANEL */}
          <div className="w-full lg:w-[350px] shrink-0 flex flex-col h-full">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex-1 flex flex-col shadow-2xl">
              <h3 className="text-xl font-display font-bold mb-8">Booking Summary</h3>
              
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Selected Seats</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.length > 0 ? (
                      selectedSeats.map(seat => (
                        <span key={seat} className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-sm font-bold">
                          {seat}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-white/30">No seats selected</span>
                    )}
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Tickets ({selectedSeats.length})</span>
                    <span className="font-mono tracking-wider font-bold">₹{selectedSeats.length * 350}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Convenience Fee</span>
                    <span className="font-mono tracking-wider font-bold">₹{selectedSeats.length > 0 ? 50 : 0}</span>
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-bold">Total Pay</span>
                  <span className="text-3xl font-display font-bold text-accent-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    ₹{selectedSeats.length > 0 ? (selectedSeats.length * 350) + 50 : 0}
                  </span>
                </div>

                <button 
                  disabled={selectedSeats.length === 0}
                  className="w-full py-5 bg-accent-primary text-black rounded-2xl font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed mt-4 shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
