"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Location01Icon,
  Calendar01Icon,
  FilterIcon,
  StarIcon,
  ArrowRight01Icon,
  Airplane01Icon,
  BusIcon,
  TrainIcon,
  AiInnovation01Icon,
  Clock01Icon,
  Cancel01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import { cities } from "@/config/site";
import { BookingDetailsView } from "@/components/book/BookingDetailsView";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
import { SmartSearch } from "@/components/home/SmartSearch";

const CARD_CHUNK   = 4;   // flight/bus/train cards per batch
const LOAD_DELAY   = 900; // ms of skeleton before showing content

// ─── EXPANDED MOCK DATA ───────────────────────────────────────────────────────

const ALL_FLIGHTS = [
  { id: 1,  airline: "IndiGo",       flightNo: "6E-123", from: "Bangalore",   fromCode: "BLR", to: "Mumbai",      toCode: "BOM", departure: "10:00 AM", arrival: "11:45 AM", duration: "1h 45m", price: 3450, rating: 4.2, stops: "Non-stop", type: "Economy",    amenities: ["Snacks", "Standard Seat"] },
  { id: 2,  airline: "Vistara",      flightNo: "UK-456", from: "Delhi",       fromCode: "DEL", to: "Bangalore",   toCode: "BLR", departure: "08:30 AM", arrival: "11:00 AM", duration: "2h 30m", price: 5800, rating: 4.6, stops: "Non-stop", type: "Premium",    amenities: ["Meals", "Extra Legroom", "Lounge"] },
  { id: 3,  airline: "Air India",    flightNo: "AI-789", from: "Mumbai",      fromCode: "BOM", to: "London",      toCode: "LHR", departure: "02:00 AM", arrival: "06:45 AM", duration: "9h 15m", price: 45200,rating: 4.1, stops: "1 Stop",   type: "Economy",    amenities: ["Meals", "Entertainment", "Blanket"] },
  { id: 4,  airline: "Akasa Air",    flightNo: "QP-101", from: "Bangalore",   fromCode: "BLR", to: "Goa",         toCode: "GOX", departure: "03:15 PM", arrival: "04:25 PM", duration: "1h 10m", price: 2100, rating: 4.3, stops: "Non-stop", type: "Economy",    amenities: ["USB Charging"] },
  { id: 5,  airline: "SpiceJet",     flightNo: "SG-202", from: "Chennai",     fromCode: "MAA", to: "Hyderabad",   toCode: "HYD", departure: "06:00 PM", arrival: "07:15 PM", duration: "1h 15m", price: 2800, rating: 3.8, stops: "Non-stop", type: "Economy",    amenities: ["Snacks"] },
  { id: 6,  airline: "AirAsia",      flightNo: "I5-303", from: "Bangalore",   fromCode: "BLR", to: "Kochi",       toCode: "COK", departure: "09:45 AM", arrival: "10:50 AM", duration: "1h 05m", price: 2400, rating: 4.0, stops: "Non-stop", type: "Economy",    amenities: [] },
  { id: 7,  airline: "Emirates",     flightNo: "EK-500", from: "Mumbai",      fromCode: "BOM", to: "Dubai",       toCode: "DXB", departure: "04:30 AM", arrival: "06:00 AM", duration: "3h 00m", price: 14500,rating: 4.8, stops: "Non-stop", type: "Economy",    amenities: ["Meals", "Entertainment", "WiFi"] },
  { id: 8,  airline: "IndiGo",       flightNo: "6E-888", from: "Delhi",       fromCode: "DEL", to: "Goa",         toCode: "GOI", departure: "11:00 AM", arrival: "01:30 PM", duration: "2h 30m", price: 5200, rating: 4.1, stops: "Non-stop", type: "Economy",    amenities: ["Snacks"] },
  { id: 9,  airline: "Vistara",      flightNo: "UK-999", from: "Mumbai",      fromCode: "BOM", to: "Delhi",       toCode: "DEL", departure: "07:00 AM", arrival: "09:10 AM", duration: "2h 10m", price: 4900, rating: 4.5, stops: "Non-stop", type: "Business",   amenities: ["Meals", "Lounge", "Priority Boarding"] },
  { id: 10, airline: "Air India",    flightNo: "AI-101", from: "Delhi",       fromCode: "DEL", to: "New York",    toCode: "JFK", departure: "02:00 AM", arrival: "07:30 AM", duration: "16h 00m",price: 78000,rating: 4.0, stops: "Non-stop", type: "Economy",    amenities: ["Meals", "Entertainment", "Blanket"] },
  { id: 11, airline: "Akasa Air",    flightNo: "QP-202", from: "Mumbai",      fromCode: "BOM", to: "Ahmedabad",   toCode: "AMD", departure: "08:15 AM", arrival: "09:30 AM", duration: "1h 15m", price: 1900, rating: 4.4, stops: "Non-stop", type: "Economy",    amenities: ["USB Charging"] },
  { id: 12, airline: "SpiceJet",     flightNo: "SG-555", from: "Delhi",       fromCode: "DEL", to: "Pune",        toCode: "PNQ", departure: "05:45 PM", arrival: "07:55 PM", duration: "2h 10m", price: 3100, rating: 3.7, stops: "Non-stop", type: "Economy",    amenities: [] },
];

const ALL_BUSES = [
  { id: 1,  operator: "KSRTC Airavat",     type: "AC Sleeper",      departure: "10:00 PM", arrival: "06:00 AM", duration: "8h",    from: "Bangalore", to: "Mumbai",    rating: 4.4, seats: 28, price: 980,  amenities: ["WiFi","Charging","Water"],   busNumber: "KA-57-F-1234" },
  { id: 2,  operator: "VRL Travels",       type: "Volvo Multi-Axle",departure: "08:30 PM", arrival: "05:30 AM", duration: "9h",    from: "Bangalore", to: "Mumbai",    rating: 4.2, seats: 14, price: 1200, amenities: ["WiFi","Blanket","Snacks"],   busNumber: "KA-01-AB-5678" },
  { id: 3,  operator: "SRS Travels",       type: "Non-AC Sleeper",  departure: "09:00 PM", arrival: "07:00 AM", duration: "10h",   from: "Bangalore", to: "Mumbai",    rating: 3.8, seats: 42, price: 650,  amenities: ["Charging"],                 busNumber: "KA-14-C-9012" },
  { id: 4,  operator: "Chartered Bus",     type: "AC Seater",       departure: "11:00 PM", arrival: "07:30 AM", duration: "8.5h",  from: "Bangalore", to: "Mumbai",    rating: 4.0, seats: 6,  price: 850,  amenities: ["AC","Charging","Water"],     busNumber: "MH-12-AC-3456" },
  { id: 5,  operator: "Orange Travels",    type: "Volvo AC Sleeper",departure: "09:30 PM", arrival: "05:00 AM", duration: "7.5h",  from: "Bangalore", to: "Hyderabad", rating: 4.5, seats: 32, price: 750,  amenities: ["WiFi","AC","Blanket"],       busNumber: "KA-04-F-7890" },
  { id: 6,  operator: "IntrCity Smart Bus",type: "AC Seater",       departure: "07:00 PM", arrival: "01:00 AM", duration: "6h",    from: "Bangalore", to: "Chennai",   rating: 4.1, seats: 20, price: 600,  amenities: ["WiFi","Charging","Snacks"],  busNumber: "TN-07-AB-1234" },
  { id: 7,  operator: "Parveen Travels",   type: "Semi Sleeper AC", departure: "08:00 PM", arrival: "06:00 AM", duration: "10h",   from: "Chennai",   to: "Hyderabad", rating: 3.9, seats: 18, price: 700,  amenities: ["AC","Charging"],             busNumber: "AP-16-C-5678" },
  { id: 8,  operator: "SETC Express",      type: "Non-AC Seater",   departure: "06:00 AM", arrival: "12:00 PM", duration: "6h",    from: "Chennai",   to: "Pondicherry",rating: 3.6, seats: 55, price: 280,  amenities: [],                           busNumber: "TN-01-N-0001" },
  { id: 9,  operator: "Paulo Travels",     type: "Volvo AC Sleeper",departure: "10:30 PM", arrival: "08:30 AM", duration: "10h",   from: "Mumbai",    to: "Goa",       rating: 4.6, seats: 24, price: 1100, amenities: ["WiFi","Blanket","Snacks","AC"],busNumber: "MH-04-BT-9988" },
  { id: 10, operator: "Neeta Travels",     type: "Mercedes Sleeper",departure: "09:00 PM", arrival: "07:00 AM", duration: "10h",   from: "Mumbai",    to: "Pune",      rating: 4.3, seats: 10, price: 950,  amenities: ["WiFi","AC","Charger","Water"],busNumber: "MH-12-AB-4567" },
  { id: 11, operator: "Raj National",      type: "AC Sleeper",      departure: "07:30 PM", arrival: "07:30 AM", duration: "12h",   from: "Delhi",     to: "Jaipur",    rating: 4.0, seats: 38, price: 490,  amenities: ["AC","Charging"],             busNumber: "RJ-14-C-2020" },
  { id: 12, operator: "Rajasthan ST",      type: "Sleeper",         departure: "09:00 PM", arrival: "08:00 AM", duration: "11h",   from: "Delhi",     to: "Udaipur",   rating: 3.5, seats: 44, price: 540,  amenities: [],                           busNumber: "RJ-07-PA-5432" },
];

const ALL_TRAINS = [
  { id: 1,  number: "12028", name: "Chennai Mail",            type: "Superfast",from: "Chennai Central",     fromCode: "MAS",  to: "Mumbai CSMT",           toCode: "CSMT", departure: "22:00", arrival: "10:30+1", duration: "12h 30m", classes: [{code:"SL",name:"Sleeper",price:485,status:"AVL",count:124},{code:"3A",name:"3rd AC",price:1285,status:"AVL",count:64},{code:"2A",name:"2nd AC",price:1840,status:"WL",count:8}],  rating: 4.1, runDays: "Mon, Tue, Thu, Sat" },
  { id: 2,  number: "12218", name: "Kerala Express",          type: "Rajdhani", from: "Trivandrum Central",  fromCode: "TVC",  to: "Delhi Hazrat Nizamuddin",toCode: "NZM",  departure: "11:15", arrival: "14:30+1", duration: "27h 15m", classes: [{code:"1A",name:"1st AC",price:4200,status:"AVL",count:6},{code:"2A",name:"2nd AC",price:2460,status:"AVL",count:22},{code:"3A",name:"3rd AC",price:1680,status:"GNWL",count:12}], rating: 4.5, runDays: "Daily" },
  { id: 3,  number: "12609", name: "Navyug Express",          type: "Express",  from: "Bangalore City",      fromCode: "SBC",  to: "Mumbai CSMT",           toCode: "CSMT", departure: "21:30", arrival: "11:00+1", duration: "13h 30m", classes: [{code:"SL",name:"Sleeper",price:385,status:"AVL",count:210},{code:"3A",name:"3rd AC",price:1040,status:"AVL",count:48}],                                                       rating: 3.8, runDays: "Mon, Wed, Fri, Sun" },
  { id: 4,  number: "12001", name: "Shatabdi Express",        type: "Shatabdi", from: "Bhopal Junction",     fromCode: "BPL",  to: "New Delhi",             toCode: "NDLS", departure: "06:00", arrival: "13:30",   duration: "7h 30m",  classes: [{code:"CC",name:"Chair Car",price:1040,status:"AVL",count:80},{code:"EC",name:"Executive",price:1890,status:"AVL",count:18}],                                              rating: 4.4, runDays: "Daily except Tue" },
  { id: 5,  number: "12622", name: "Tamil Nadu SF Express",   type: "Superfast",from: "Chennai Central",     fromCode: "MAS",  to: "New Delhi",             toCode: "NDLS", departure: "22:00", arrival: "07:00+2", duration: "33h",     classes: [{code:"SL",name:"Sleeper",price:665,status:"AVL",count:280},{code:"3A",name:"3rd AC",price:1740,status:"AVL",count:90},{code:"2A",name:"2nd AC",price:2490,status:"WL",count:4}],    rating: 4.2, runDays: "Daily" },
  { id: 6,  number: "12953", name: "August Kranti Rajdhani",  type: "Rajdhani", from: "Mumbai Central",      fromCode: "MMCT", to: "New Delhi",             toCode: "NDLS", departure: "17:40", arrival: "10:55+1", duration: "17h 15m", classes: [{code:"2A",name:"2nd AC",price:2460,status:"AVL",count:22},{code:"3A",name:"3rd AC",price:1680,status:"AVL",count:54},{code:"1A",name:"1st AC",price:4100,status:"AVL",count:8}],  rating: 4.6, runDays: "Daily except Wed" },
  { id: 7,  number: "12259", name: "Sealdah Duronto",         type: "Duronto",  from: "Sealdah",             fromCode: "SDAH", to: "New Delhi",             toCode: "NDLS", departure: "20:05", arrival: "09:55+1", duration: "13h 50m", classes: [{code:"SL",name:"Sleeper",price:735,status:"GNWL",count:14},{code:"3A",name:"3rd AC",price:1880,status:"AVL",count:36}],                                                      rating: 4.0, runDays: "Tue, Thu, Sat" },
  { id: 8,  number: "12431", name: "Rajdhani Express",        type: "Rajdhani", from: "Trivandrum Central",  fromCode: "TVC",  to: "New Delhi",             toCode: "NDLS", departure: "19:00", arrival: "17:45+2", duration: "46h 45m", classes: [{code:"1A",name:"1st AC",price:6100,status:"AVL",count:4},{code:"2A",name:"2nd AC",price:3580,status:"AVL",count:16},{code:"3A",name:"3rd AC",price:2420,status:"GNWL",count:5}], rating: 4.3, runDays: "Wed, Sun" },
  { id: 9,  number: "12563", name: "Bihar Sampark Kranti",    type: "Superfast",from: "New Delhi",           fromCode: "NDLS", to: "Patna Junction",        toCode: "PNBE", departure: "09:15", arrival: "22:45",   duration: "13h 30m", classes: [{code:"SL",name:"Sleeper",price:310,status:"AVL",count:185},{code:"3A",name:"3rd AC",price:790,status:"AVL",count:62}],                                                        rating: 3.7, runDays: "Daily" },
  { id: 10, number: "12057", name: "Jan Shatabdi Express",    type: "Shatabdi", from: "New Delhi",           fromCode: "NDLS", to: "Una Himachal",          toCode: "UHL",  departure: "05:50", arrival: "12:35",   duration: "6h 45m",  classes: [{code:"CC",name:"Chair Car",price:440,status:"AVL",count:110},{code:"SL",name:"Sleeper",price:185,status:"AVL",count:200}],                                              rating: 4.2, runDays: "Daily except Sun" },
];

const FLIGHT_SUBCATEGORIES= ["All Classes", "Economy", "Premium Economy", "Business", "First Class"];
const BUS_SUBCATEGORIES   = ["All Types","AC Sleeper","AC Seater","Volvo","Non-AC Sleeper","Semi-Sleeper"];
const TRAIN_SUBCATEGORIES = ["All Classes","Sleeper (SL)","3rd AC (3A)","2nd AC (2A)","1st AC (1A)","Chair Car (CC)"];
const RATING_FILTERS      = ["Any Rating","4.5+","4.0+","3.5+"];
const STOPS_FILTERS       = ["All", "Non-stop", "1 Stop", "2+ Stops"];

// ─── SKELETON COMPONENTS ──────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-elevated animate-pulse">
      <div className="h-28 bg-surface" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-surface rounded-lg w-3/5" />
          <div className="h-4 bg-surface rounded-lg w-1/6" />
        </div>
        <div className="h-3 bg-surface rounded-lg w-2/5" />
        <div className="flex gap-2">
          {[1,2].map(i => <div key={i} className="h-5 bg-surface rounded-lg w-14" />)}
        </div>
        <div className="flex justify-between pt-1">
          <div className="h-5 bg-surface rounded-lg w-1/4" />
          <div className="h-8 bg-surface rounded-xl w-1/3" />
        </div>
      </div>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function TrainStatusBadge({ status }: { status: string }) {
  const m: Record<string,string> = {
    AVL:"text-green-400 bg-green-500/10 border border-green-500/20",
    RAC:"text-yellow-400 bg-yellow-500/10 border border-yellow-500/20",
    WL:"text-orange-400 bg-orange-500/10 border border-orange-500/20",
    GNWL:"text-orange-400 bg-orange-500/10 border border-orange-500/20",
    REGRET:"text-red-400 bg-red-500/10 border border-red-500/20",
  };
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${m[status]??"text-white/60"}`}>{status}</span>;
}

function Stars({ rating, size=12 }: { rating:number;size?:number }) {
  return (
    <div className="flex items-center gap-1">
      <HugeiconsIcon icon={StarIcon} size={size} className="text-yellow-400 fill-yellow-400" />
      <span className="text-[11px] font-bold text-text-primary">{rating.toFixed(1)}</span>
    </div>
  );
}

function SuggestionIcon({ type }: { type: string }) {
  const map: Record<string,React.ReactNode> = {
    city:    <HugeiconsIcon icon={Location01Icon} size={16} className="text-text-secondary" />,
    route:   <HugeiconsIcon icon={BusIcon} size={16} className="text-text-secondary" />,
    flight:  <HugeiconsIcon icon={Airplane01Icon} size={16} className="text-text-secondary" />,
    station: <HugeiconsIcon icon={TrainIcon} size={16} className="text-text-secondary" />,
  };
  return (
    <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
      {map[type] ?? <HugeiconsIcon icon={Search01Icon} size={16} className="text-text-secondary" />}
    </div>
  );
}

// ─── CARD COMPONENTS ──────────────────────────────────────────────────────────

function FlightCard({ flight, onBook }: { flight: typeof ALL_FLIGHTS[0], onBook: (item: any) => void }) {
  return (
    <div onClick={() => onBook(flight)} className="group bg-surface-elevated rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative h-28 bg-gradient-to-br from-surface to-surface-elevated flex items-center justify-center px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />
        <div className="flex items-center gap-3 w-full relative z-10">
          <div className="text-left">
            <div className="text-xl font-bold font-mono leading-none">{flight.departure}</div>
            <div className="text-xs text-text-tertiary mt-1">{flight.fromCode}</div>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] text-text-tertiary font-mono">{flight.duration}</span>
            <div className="flex items-center gap-1 w-full">
              <div className="h-px flex-1 bg-white/20" />
              <div className="p-1.5 rounded-full bg-surface border border-white/10">
                <HugeiconsIcon icon={Airplane01Icon} size={12} className="text-accent-primary" />
              </div>
              <div className="h-px flex-1 bg-white/20" />
            </div>
            <span className="text-[10px] text-text-tertiary">{flight.stops}</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold font-mono leading-none">{flight.arrival}</div>
            <div className="text-xs text-text-tertiary mt-1">{flight.toCode}</div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <div className="font-bold text-sm">{flight.airline}</div>
            <div className="text-[11px] text-text-tertiary mt-0.5">{flight.flightNo} • {flight.type}</div>
          </div>
          <Stars rating={flight.rating} />
        </div>
        <div className="flex items-center gap-2 text-xs text-text-tertiary mb-3 mt-2">
          {flight.amenities.slice(0,2).map(a=>(
            <span key={a} className="px-2 py-0.5 bg-surface rounded-full border border-white/10 text-[10px]">{a}</span>
          ))}
          {flight.amenities.length>2&&<span className="text-[10px] text-text-tertiary">+{flight.amenities.length-2}</span>}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div><span className="text-xs text-text-tertiary">per adult · </span><span className="text-base font-display font-bold">₹{flight.price}</span></div>
          <button onClick={(e) => { e.stopPropagation(); onBook(flight); }} className="flex items-center gap-1.5 px-4 py-2 bg-accent-primary text-background rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
            Book Now <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function BusCard({ bus, onBook }: { bus: typeof ALL_BUSES[0], onBook: (item: any) => void }) {
  return (
    <div onClick={() => onBook(bus)} className="group bg-surface-elevated rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative h-28 bg-gradient-to-br from-surface to-surface-elevated flex items-center justify-center px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent" />
        <div className="flex items-center gap-3 w-full relative z-10">
          <div className="text-left">
            <div className="text-xl font-bold font-mono leading-none">{bus.departure}</div>
            <div className="text-xs text-text-tertiary mt-1">{bus.from}</div>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] text-text-tertiary font-mono">{bus.duration}</span>
            <div className="flex items-center gap-1 w-full">
              <div className="h-px flex-1 bg-white/20" />
              <div className="p-1.5 rounded-full bg-surface border border-white/10">
                <HugeiconsIcon icon={BusIcon} size={12} className="text-accent-primary" />
              </div>
              <div className="h-px flex-1 bg-white/20" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold font-mono leading-none">{bus.arrival}</div>
            <div className="text-xs text-text-tertiary mt-1">{bus.to}</div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <div className="font-bold text-sm">{bus.operator}</div>
            <div className="text-[11px] text-text-tertiary mt-0.5">{bus.type}</div>
          </div>
          <Stars rating={bus.rating} />
        </div>
        <div className="flex items-center gap-2 text-xs text-text-tertiary mb-3 mt-2">
          <span className="text-green-400 font-bold">{bus.seats} seats left</span>
          <span className="text-white/20">·</span>
          {bus.amenities.slice(0,2).map(a=>(
            <span key={a} className="px-2 py-0.5 bg-surface rounded-full border border-white/10 text-[10px]">{a}</span>
          ))}
          {bus.amenities.length>2&&<span className="text-[10px] text-text-tertiary">+{bus.amenities.length-2}</span>}
        </div>
        <div className="flex items-center justify-between">
          <div><span className="text-xs text-text-tertiary">per seat · </span><span className="text-base font-display font-bold">₹{bus.price}</span></div>
          <button onClick={(e) => { e.stopPropagation(); onBook(bus); }} className="flex items-center gap-1.5 px-4 py-2 bg-accent-primary text-background rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
            Select Seats <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TrainCard({ train, onBook }: { train: typeof ALL_TRAINS[0], onBook: (item: any) => void }) {
  return (
    <div onClick={() => onBook(train)} className="group bg-surface-elevated rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative h-28 bg-gradient-to-br from-surface to-surface-elevated flex items-center justify-center px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent" />
        <div className="flex items-center gap-3 w-full relative z-10">
          <div className="text-left">
            <div className="text-xl font-bold font-mono leading-none">{train.departure}</div>
            <div className="text-xs text-accent-primary font-bold mt-0.5">{train.fromCode}</div>
            <div className="text-[10px] text-text-tertiary">{train.from.split(" ")[0]}</div>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] text-text-tertiary font-mono">{train.duration}</span>
            <div className="flex items-center gap-1 w-full">
              <div className="w-2 h-2 rounded-full border-2 border-accent-primary shrink-0" />
              <div className="h-px flex-1 bg-white/20" />
              <div className="p-1.5 rounded-full bg-surface border border-white/10">
                <HugeiconsIcon icon={TrainIcon} size={12} className="text-accent-primary" />
              </div>
              <div className="h-px flex-1 bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-accent-primary shrink-0" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold font-mono leading-none">{train.arrival}</div>
            <div className="text-xs text-accent-primary font-bold mt-0.5">{train.toCode}</div>
            <div className="text-[10px] text-text-tertiary">{train.to.split(" ")[0]}</div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <div className="font-bold text-sm">{train.name}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-text-tertiary font-mono">#{train.number}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface border border-white/10 text-text-tertiary font-bold">{train.type}</span>
            </div>
          </div>
          <Stars rating={train.rating} />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-text-tertiary mb-3 mt-1.5">
          <HugeiconsIcon icon={Calendar01Icon} size={10} />
          <span>{train.runDays}</span>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-4">
          {train.classes.map(cls=>(
            <div key={cls.code} className="flex flex-col items-start px-2.5 py-1.5 rounded-lg bg-surface border border-white/10 hover:border-accent-primary/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold text-text-secondary">{cls.name}</span>
                <TrainStatusBadge status={cls.status} />
              </div>
              <span className="text-xs font-display font-bold">₹{cls.price}</span>
            </div>
          ))}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onBook(train); }} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-accent-primary text-background rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
          Book Now <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
        </button>
      </div>
    </div>
  );
}

// ─── INFINITE SCROLL HOOK ─────────────────────────────────────────────────────
function useInfiniteScroll(onLoadMore: () => void) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) onLoadMore(); },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore]);
  return sentinelRef;
}

// ─── SUGGESTIONS DATA ─────────────────────────────────────────────────────────

const FLIGHT_SUGGESTIONS  = [
  {type:"flight",label:"Delhi to Bangalore",   sub:"Vistara • Non-stop"},
  {type:"flight",label:"Mumbai to London",     sub:"Air India • 1 Stop"},
  {type:"flight",label:"Bangalore to Goa",     sub:"Akasa Air • Non-stop"},
  {type:"city",  label:"Bangalore (BLR)",      sub:"Kempegowda International"},
  {type:"city",  label:"Mumbai (BOM)",         sub:"Chhatrapati Shivaji Maharaj"},
  {type:"city",  label:"Delhi (DEL)",          sub:"Indira Gandhi International"},
];
const BUS_SUGGESTIONS    = [
  {type:"route",  label:"Bangalore to Mumbai",  sub:"8h 30min • 1,000 km"},
  {type:"route",  label:"Delhi to Jaipur",       sub:"5h • 280 km"},
  {type:"route",  label:"Chennai to Hyderabad",  sub:"7h • 630 km"},
  {type:"city",   label:"Bangalore",             sub:"Karnataka"},
  {type:"city",   label:"Mumbai",                sub:"Maharashtra"},
];
const TRAIN_SUGGESTIONS  = [
  {type:"station",label:"Bangalore City Jn (SBC)",sub:"Karnataka"},
  {type:"station",label:"Chennai Central (MAS)",  sub:"Tamil Nadu"},
  {type:"station",label:"Mumbai CSMT (CSMT)",     sub:"Maharashtra"},
  {type:"station",label:"New Delhi (NDLS)",        sub:"Delhi"},
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
function BookingHubContent() {
  const searchParams  = useSearchParams();
  const initCat       = (searchParams.get("category") as "flight"|"bus"|"train") ?? "flight";

  const [category,      setCategory]      = useState<"flight"|"bus"|"train">(initCat);
  const [subcat,        setSubcat]        = useState("All Classes");
  const [searchQuery,   setSearchQuery]   = useState("");
  const [cityQuery,     setCityQuery]     = useState("");
  const [showSugg,      setShowSugg]      = useState(false);
  const [showCitySugg,  setShowCitySugg]  = useState(false);
  const [showFilters,   setShowFilters]   = useState(false);
  const [ratingFilter,  setRatingFilter]  = useState("Any Rating");
  const [stopsFilter,   setStopsFilter]   = useState("All");
  const [priceMax,      setPriceMax]      = useState(10000);
  const [selectedDate,  setSelectedDate]  = useState("");
  const [cardCount,     setCardCount]     = useState(CARD_CHUNK);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedItem,  setSelectedItem]  = useState<any | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const cityInputRef = useRef<HTMLInputElement | null>(null);

  const subcats     = category==="flight" ? FLIGHT_SUBCATEGORIES : category==="bus" ? BUS_SUBCATEGORIES : TRAIN_SUBCATEGORIES;
  const suggestions = category==="flight" ? FLIGHT_SUGGESTIONS   : category==="bus" ? BUS_SUGGESTIONS   : TRAIN_SUGGESTIONS;

  // Reset counts when category or filters change
  useEffect(() => { 
    setSubcat(subcats[0]); 
    setSearchQuery(""); 
    setCityQuery(""); 
    setCardCount(CARD_CHUNK); 
    setPriceMax(category === "flight" ? 50000 : 5000);
  }, [category]);
  
  useEffect(() => { setCardCount(CARD_CHUNK); }, [subcat, ratingFilter, priceMax, stopsFilter]);

  useEffect(() => {
    const onClick = (e:MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSugg(false); setShowCitySugg(false);
      }
    };
    document.addEventListener("mousedown",onClick);
    return ()=>document.removeEventListener("mousedown",onClick);
  },[]);

  // Ensure the search inputs keep focus when their suggestion panels are visible
  useEffect(() => {
    if (showSugg) {
      const id = window.setTimeout(() => searchInputRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [showSugg]);

  useEffect(() => {
    if (showCitySugg) {
      const id = window.setTimeout(() => cityInputRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [showCitySugg]);

  const filteredCities = cities.filter(c=>c.toLowerCase().includes(cityQuery.toLowerCase())).slice(0,6);
  const filteredSugg   = suggestions.filter(s=>!searchQuery||s.label.toLowerCase().includes(searchQuery.toLowerCase()));

  // Filtered arrays
  const flightsAll = ALL_FLIGHTS.filter(f=>{
    const r = ratingFilter==="Any Rating"?0:parseFloat(ratingFilter);
    const s = stopsFilter==="All"?true:f.stops===stopsFilter;
    const c = subcat==="All Classes"||f.type===subcat;
    const q = !searchQuery||f.airline.toLowerCase().includes(searchQuery.toLowerCase())||f.to.toLowerCase().includes(searchQuery.toLowerCase())||f.from.toLowerCase().includes(searchQuery.toLowerCase());
    return f.rating>=r && f.price<=priceMax && s && c && q;
  });
  const busesAll    = ALL_BUSES.filter(b=>{
    const r = ratingFilter==="Any Rating"?0:parseFloat(ratingFilter);
    const t = subcat==="All Types"||b.type.toLowerCase().includes(subcat.toLowerCase());
    return b.rating>=r && b.price<=priceMax && t;
  });
  const trainsAll   = ALL_TRAINS.filter(t=>{
    const r = ratingFilter==="Any Rating"?0:parseFloat(ratingFilter);
    const c = subcat==="All Classes"||t.classes.some(cl=>subcat.includes(cl.code));
    return t.rating>=r && c;
  });

  // Visible slices
  const flightsVisible  = flightsAll.slice(0,cardCount);
  const busesVisible    = busesAll.slice(0,cardCount);
  const trainsVisible   = trainsAll.slice(0,cardCount);

  const hasMoreCards    = cardCount    < (category==="flight"?flightsAll.length : category==="bus"?busesAll.length : trainsAll.length);

  // Load more callback
  const loadMoreCards = useCallback(()=>{
    if (isLoadingMore||!hasMoreCards) return;
    setIsLoadingMore(true);
    const total = category==="flight"?flightsAll.length:category==="bus"?busesAll.length:trainsAll.length;
    setTimeout(()=>{ setCardCount(c=>Math.min(c+CARD_CHUNK,total)); setIsLoadingMore(false); },LOAD_DELAY);
  },[isLoadingMore,hasMoreCards,category,flightsAll.length,busesAll.length,trainsAll.length]);

  const cardSentinelRef  = useInfiniteScroll(loadMoreCards);

  return (
    <div className="min-h-screen bg-background text-text-primary pt-24 pb-20">
      {selectedItem ? (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <BookingDetailsView
            item={selectedItem}
            type={category}
            onBack={() => setSelectedItem(null)}
            recommendedOptions={
              category === "flight" ? flightsAll.filter(f => f.id !== selectedItem.id).slice(0, 3) :
              category === "bus" ? busesAll.filter(b => b.id !== selectedItem.id).slice(0, 3) :
              trainsAll.filter(t => t.id !== selectedItem.id).slice(0, 3)
            }
            onSelectRecommended={(item) => setSelectedItem(item)}
            CardComponent={category === "flight" ? FlightCard : category === "bus" ? BusCard : TrainCard}
          />
        </div>
      ) : (
        <>
          {/* ── HEADER ── */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/" className="p-2 rounded-full bg-surface border border-white/10 hover:bg-surface-elevated transition-colors">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
          </Link>
          <span className="text-text-tertiary text-sm">Home</span>
          <span className="text-text-tertiary text-sm">/</span>
          <span className="text-sm font-medium capitalize">{category} Booking</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-2">Find & Book Tickets</h1>
        <p className="text-text-secondary text-sm">Discover flights, buses, and trains — curated just for you</p>
      </div>

      {/* ── CATEGORY TABS ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <div className="flex gap-2 p-1.5 bg-surface rounded-2xl w-fit border border-white/10">
          {(["flight","bus","train"] as const).map(cat=>{
            const icons   = {flight:Airplane01Icon, bus:BusIcon, train:TrainIcon};
            const labels  = {flight:"Flights",     bus:"Buses",  train:"Trains"};
            const active  = category===cat;
            return (
              <button key={cat} onClick={()=>setCategory(cat)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${active?"bg-accent-primary text-background shadow-lg":"text-text-secondary hover:text-text-primary hover:bg-surface-elevated"}`}>
                <HugeiconsIcon icon={icons[cat]} size={16} />
                {labels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SEARCH BAR ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6" ref={searchRef}>
        <div className="bg-surface-elevated border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl">
          <div className="mb-4 relative z-40">
            <SmartSearch
              variant="inline"
              initialTab={category}
              onSearchSubmit={(p) => {
                setSearchQuery(p.to || p.from || "");
                if (p.date) setSelectedDate(p.date);
              }}
            />
            <div className="flex justify-end mt-4 border-t border-white/10 pt-4">
              <button onClick={()=>setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold border transition-all ${showFilters?"bg-accent-primary text-background border-accent-primary":"bg-background border-white/10 text-text-secondary hover:text-text-primary hover:border-white/30"}`}>
                <HugeiconsIcon icon={FilterIcon} size={16} /> Filters
              </button>
            </div>
          </div>

          {/* Subcategory pills */}
          <div className="flex gap-2 flex-wrap">
            {subcats.map(sc=>(
              <button key={sc} onClick={()=>setSubcat(sc)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${subcat===sc?"bg-accent-primary text-background":"bg-surface border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/30"}`}>
                {sc}
              </button>
            ))}
          </div>

          {/* Filter Panel */}
          {showFilters&&(
            <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-2 block">Min Rating</label>
                <div className="flex flex-col gap-1.5">
                  {RATING_FILTERS.map(r=>(
                    <button key={r} onClick={()=>setRatingFilter(r)}
                      className={`flex items-center gap-2 text-xs py-1.5 px-3 rounded-lg transition-all text-left ${ratingFilter===r?"bg-accent-primary/20 text-accent-primary border border-accent-primary/30":"text-text-secondary hover:text-text-primary"}`}>
                      {r!=="Any Rating"&&<HugeiconsIcon icon={StarIcon} size={12} className="text-yellow-400" />}
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-2 block">Max Price: ₹{priceMax}</label>
                <input type="range" min={500} max={category === "flight" ? 100000 : 5000} step={category === "flight" ? 1000 : 50} value={priceMax}
                  onChange={e=>setPriceMax(Number(e.target.value))} className="w-full accent-accent-primary" />
                <div className="flex justify-between text-[10px] text-text-tertiary mt-1"><span>₹500</span><span>₹{category === "flight" ? 100000 : 5000}</span></div>
              </div>
              {category==="flight"&&(
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-2 block">Stops</label>
                  <div className="flex flex-col gap-1.5">
                    {STOPS_FILTERS.map(s=>(
                      <button key={s} onClick={()=>setStopsFilter(s)}
                        className={`text-xs py-1.5 px-3 rounded-lg transition-all text-left ${stopsFilter===s?"bg-accent-primary/20 text-accent-primary border border-accent-primary/30":"text-text-secondary hover:text-text-primary"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {category==="bus"&&(
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-2 block">Amenities</label>
                  <div className="flex flex-wrap gap-1.5">
                    {["WiFi","AC","Charging","Blanket","Snacks"].map(a=>(
                      <span key={a} className="text-[11px] px-2 py-1 rounded-full bg-surface border border-white/10 text-text-secondary cursor-pointer hover:border-accent-primary/30 transition-colors">{a}</span>
                    ))}
                  </div>
                </div>
              )}
              {category==="train"&&(
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-2 block">Quota</label>
                  <div className="flex flex-col gap-1.5">
                    {["General (GN)","Tatkal (TQ)","Ladies (LD)","Senior Citizen (SS)"].map(q=>(
                      <span key={q} className="text-xs px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-text-secondary cursor-pointer hover:border-accent-primary/30 transition-colors">{q}</span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-2 block">Sort By</label>
                <div className="flex flex-col gap-1.5">
                  {["Relevance","Rating: High to Low","Price: Low to High","Duration: Shortest"].map((s,i)=>(
                    <button key={s} className={`text-xs py-1.5 px-3 rounded-lg text-left transition-colors ${i===0?"text-accent-primary bg-accent-primary/10 border border-accent-primary/20":"text-text-secondary hover:text-text-primary"}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── FLIGHTS ── */}
        {category==="flight"&&(
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-bold">Available Flights</h2>
              <span className="text-xs bg-accent-primary/10 text-accent-primary border border-accent-primary/20 px-2 py-0.5 rounded-full font-bold">{flightsAll.length} found</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {flightsVisible.map(f=><FlightCard key={f.id} flight={f} onBook={(item) => setSelectedItem(item)} />)}
              {isLoadingMore&&Array.from({length:Math.min(CARD_CHUNK,flightsAll.length-cardCount)}).map((_,i)=><SkeletonCard key={`sk-fl-${i}`} />)}
            </div>
            {hasMoreCards&&<div ref={cardSentinelRef} className="h-4 mt-6" />}
            {!hasMoreCards&&flightsAll.length>CARD_CHUNK&&(
              <p className="text-center text-xs text-text-tertiary mt-6">All {flightsAll.length} flights loaded</p>
            )}
          </div>
        )}

        {/* ── BUSES ── */}
        {category==="bus"&&(
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-bold">Available Buses</h2>
              <span className="text-xs bg-accent-primary/10 text-accent-primary border border-accent-primary/20 px-2 py-0.5 rounded-full font-bold">{busesAll.length} found</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {busesVisible.map(b=><BusCard key={b.id} bus={b} onBook={(item) => setSelectedItem(item)} />)}
              {isLoadingMore&&Array.from({length:Math.min(CARD_CHUNK,busesAll.length-cardCount)}).map((_,i)=><SkeletonCard key={`sk-bus-${i}`} />)}
            </div>
            {hasMoreCards&&<div ref={cardSentinelRef} className="h-4 mt-6" />}
            {!hasMoreCards&&busesAll.length>CARD_CHUNK&&(
              <p className="text-center text-xs text-text-tertiary mt-6">All {busesAll.length} buses loaded</p>
            )}
          </div>
        )}

        {/* ── TRAINS ── */}
        {category==="train"&&(
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-bold">Available Trains</h2>
              <span className="text-xs bg-accent-primary/10 text-accent-primary border border-accent-primary/20 px-2 py-0.5 rounded-full font-bold">{trainsAll.length} found</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trainsVisible.map(t=><TrainCard key={t.id} train={t} onBook={(item) => setSelectedItem(item)} />)}
              {isLoadingMore&&Array.from({length:Math.min(CARD_CHUNK,trainsAll.length-cardCount)}).map((_,i)=><SkeletonCard key={`sk-tr-${i}`} />)}
            </div>
            {hasMoreCards&&<div ref={cardSentinelRef} className="h-4 mt-6" />}
            {!hasMoreCards&&trainsAll.length>CARD_CHUNK&&(
              <p className="text-center text-xs text-text-tertiary mt-6">All {trainsAll.length} trains loaded</p>
            )}
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-text-tertiary">Loading...</div></div>}>
      <BookingHubContent />
    </Suspense>
  );
}
