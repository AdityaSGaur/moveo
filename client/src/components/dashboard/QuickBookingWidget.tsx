"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Airplane01Icon,
  Bus01Icon,
  Train01Icon,
  SparklesIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

export const QuickBookingWidget: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"flights" | "buses" | "trains">("buses");
  const [fromCity, setFromCity] = useState("Mumbai");
  const [toCity, setToCity] = useState("Goa");
  const [date, setDate] = useState("2026-09-01");

  const POPULAR_ROUTES = [
    { from: "Mumbai", to: "Goa", mode: "buses", label: "Mumbai ➔ Goa (Bus)" },
    { from: "Delhi", to: "Manali", mode: "buses", label: "Delhi ➔ Manali (Volvo)" },
    { from: "Bangalore", to: "Chennai", mode: "trains", label: "Bangalore ➔ Chennai (Train)" },
    { from: "Mumbai", to: "Delhi", mode: "flights", label: "Mumbai ➔ Delhi (Flight)" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${activeTab}?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${date}`);
  };

  return (
    <div className="bg-surface border border-text-tertiary/10 rounded-3xl p-5 sm:p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-display font-bold text-text-primary flex items-center gap-2">
            <span>Quick Travel Search</span>
            <HugeiconsIcon icon={SparklesIcon} className="w-5 h-5 text-orange-400" />
          </h2>
          <p className="text-xs text-text-tertiary">Book flight, bus, or train tickets instantly</p>
        </div>

        {/* Transport Type Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-surface-elevated border border-white/5">
          <button
            onClick={() => { setActiveTab("flights"); setFromCity("Mumbai"); setToCity("Delhi"); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "flights"
                ? "bg-orange-500 text-white shadow-md"
                : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            <HugeiconsIcon icon={Airplane01Icon} className="w-3.5 h-3.5" />
            <span>Flights</span>
          </button>
          <button
            onClick={() => { setActiveTab("buses"); setFromCity("Mumbai"); setToCity("Goa"); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "buses"
                ? "bg-orange-500 text-white shadow-md"
                : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            <HugeiconsIcon icon={Bus01Icon} className="w-3.5 h-3.5" />
            <span>Buses</span>
          </button>
          <button
            onClick={() => { setActiveTab("trains"); setFromCity("Bangalore"); setToCity("Chennai"); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "trains"
                ? "bg-orange-500 text-white shadow-md"
                : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            <HugeiconsIcon icon={Train01Icon} className="w-3.5 h-3.5" />
            <span>Trains</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
        {/* From */}
        <div className="sm:col-span-4">
          <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block mb-1">
            From City
          </label>
          <input
            type="text"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary focus:outline-none focus:border-orange-500 font-semibold"
            placeholder="Origin"
            required
          />
        </div>

        {/* To */}
        <div className="sm:col-span-4">
          <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block mb-1">
            To Destination
          </label>
          <input
            type="text"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary focus:outline-none focus:border-orange-500 font-semibold"
            placeholder="Destination"
            required
          />
        </div>

        {/* Date */}
        <div className="sm:col-span-2">
          <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500 font-medium"
            required
          />
        </div>

        {/* Submit */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>Search</span>
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Popular Routes Pills */}
      <div className="mt-4 pt-3 border-t border-text-tertiary/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider shrink-0">
          Popular:
        </span>
        {POPULAR_ROUTES.map((route, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setActiveTab(route.mode as any);
              setFromCity(route.from);
              setToCity(route.to);
            }}
            className="px-2.5 py-1 rounded-full bg-surface-elevated hover:bg-surface border border-white/5 text-[11px] font-medium text-text-secondary hover:text-orange-400 shrink-0 transition-colors"
          >
            {route.label}
          </button>
        ))}
      </div>
    </div>
  );
};
