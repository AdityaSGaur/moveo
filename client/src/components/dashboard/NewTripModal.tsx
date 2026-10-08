"use client";

import React, { useState } from "react";
import { Trip } from "./types";

interface NewTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrip: (trip: Trip) => void;
}

const FLAG_OPTIONS = ["🇲🇾", "🇯🇵", "🇹🇭", "🇻🇳", "🇫🇷", "🇮🇹", "🇮🇳", "🇺🇸", "🇬🇧", "🇦🇺"];

export const NewTripModal: React.FC<NewTripModalProps> = ({
  isOpen,
  onClose,
  onAddTrip,
}) => {
  const [destination, setDestination] = useState("");
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState("🇲🇾");
  const [duration, setDuration] = useState("7 Days");
  const [date, setDate] = useState("15 Dec 2024");
  const [budget, setBudget] = useState(1200);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || !country.trim()) return;

    const newTrip: Trip = {
      id: `trip_${Date.now()}`,
      destination: destination.trim(),
      country: country.trim(),
      flag,
      duration: duration.trim(),
      date: date.trim(),
      daysRemaining: Math.floor(Math.random() * 15) + 2,
      budget: Number(budget) || 1000,
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop&q=80",
      travelBuddies: [
        {
          name: "You",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        },
        {
          name: "Alex",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        },
      ],
    };

    onAddTrip(newTrip);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-surface border border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 border-b border-text-tertiary/10 pb-4">
          <h2 className="text-xl font-bold font-display text-text-primary">
            Plan a New Trip ✨
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center text-text-primary hover:bg-surface text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Destination */}
          <div>
            <label className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1.5">
              Destination City / Region
            </label>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Kuala Lumpur - Ipoh"
              className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Country & Flag */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1.5">
                Country
              </label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Malaysia"
                className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1.5">
                Flag
              </label>
              <select
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-3 py-3 text-lg text-text-primary focus:outline-none focus:border-orange-500"
              >
                {FLAG_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1.5">
                Duration
              </label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 5 Days"
                className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1.5">
                Start Date
              </label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 24 Dec 2024"
                className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1.5">
              Estimated Budget ($)
            </label>
            <input
              type="number"
              required
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3.5 rounded-2xl bg-surface-elevated hover:bg-surface border border-text-tertiary/20 font-bold text-xs text-text-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25"
            >
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
