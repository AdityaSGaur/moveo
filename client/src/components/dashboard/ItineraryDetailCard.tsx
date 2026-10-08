"use client";

import React from "react";
import { Trip } from "./types";

interface ItineraryDetailCardProps {
  trip: Trip;
}

export const ItineraryDetailCard: React.FC<ItineraryDetailCardProps> = ({ trip }) => {
  return (
    <div className="bg-surface border border-text-tertiary/10 rounded-3xl p-5 shadow-lg flex flex-col justify-between h-full">
      {/* Header Title */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-text-primary truncate">
            One Week Itinerary - {trip.destination.split(" - ")[0]}
          </h3>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-text-tertiary font-medium">Traveller:</span>
          <div className="flex items-center gap-1.5">
            <img
              src={trip.travelBuddies[0]?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={trip.travelBuddies[0]?.name || "Traveller"}
              className="w-4 h-4 rounded-full object-cover"
            />
            <span className="text-xs font-semibold text-text-secondary">
              {trip.travelBuddies[0]?.name || "Mortis A."}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Media Cover */}
      <div className="relative w-full h-44 sm:h-48 my-4 rounded-2xl overflow-hidden shadow-md group">
        <img
          src={trip.image}
          alt={trip.destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <span className="px-2 py-0.5 rounded-full bg-orange-500 text-[10px] font-extrabold uppercase tracking-wider">
            Featured Itinerary
          </span>
          <h4 className="font-display font-bold text-sm mt-1">{trip.destination}</h4>
        </div>
      </div>

      {/* Details Stats Cards Row */}
      <div>
        <span className="text-xs text-text-tertiary font-semibold block mb-2">Details:</span>
        <div className="grid grid-cols-3 gap-2">
          {/* Budget */}
          <div className="p-3 rounded-2xl bg-surface-elevated/70 border border-white/5 text-center">
            <span className="text-[10px] text-text-tertiary font-medium uppercase tracking-wider block">
              Budget
            </span>
            <span className="font-bold text-xs sm:text-sm text-text-primary mt-0.5 block">
              ${trip.budget.toLocaleString()}
            </span>
          </div>

          {/* Persons */}
          <div className="p-3 rounded-2xl bg-surface-elevated/70 border border-white/5 text-center">
            <span className="text-[10px] text-text-tertiary font-medium uppercase tracking-wider block">
              Person
            </span>
            <span className="font-bold text-xs sm:text-sm text-text-primary mt-0.5 block">
              {trip.travelBuddies.length}
            </span>
          </div>

          {/* Durations */}
          <div className="p-3 rounded-2xl bg-surface-elevated/70 border border-white/5 text-center">
            <span className="text-[10px] text-text-tertiary font-medium uppercase tracking-wider block">
              Durations
            </span>
            <span className="font-bold text-xs sm:text-sm text-text-primary mt-0.5 block">
              7d, 6n
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
