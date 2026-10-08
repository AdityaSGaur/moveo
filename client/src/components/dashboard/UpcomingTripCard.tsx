import React from "react";
import { Trip } from "./types";

interface UpcomingTripCardProps {
  trip: Trip;
  isActive: boolean;
  onSelect: () => void;
}

export const UpcomingTripCard: React.FC<UpcomingTripCardProps> = ({
  trip,
  isActive,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`group relative p-4 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
        isActive
          ? "bg-surface-elevated border-orange-500/50 shadow-xl shadow-orange-500/5 ring-1 ring-orange-500/30"
          : "bg-surface border-text-tertiary/10 hover:border-text-tertiary/30 hover:bg-surface-elevated/70 shadow-md"
      }`}
    >
      {/* Top Media & Days Pill Row */}
      <div className="flex items-start justify-between gap-3">
        {/* Thumbnail */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
          <img
            src={trip.image}
            alt={trip.destination}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Days Remaining Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/30 text-orange-400">
          <div className="text-center border-r border-orange-500/20 pr-1.5">
            <span className="font-bold text-xs block leading-none">{trip.date.split(" ")[0]}</span>
            <span className="text-[9px] uppercase font-semibold text-orange-400/80 leading-none">
              {trip.date.split(" ")[1] || "Dec"}
            </span>
          </div>
          <div className="text-center pl-0.5">
            <span className="font-bold text-xs block leading-none">{trip.daysRemaining}</span>
            <span className="text-[9px] uppercase font-semibold text-orange-400/80 leading-none">
              Days
            </span>
          </div>
        </div>
      </div>

      {/* Middle Content */}
      <div className="mt-4">
        <h3 className="font-display font-bold text-base text-text-primary group-hover:text-orange-400 transition-colors">
          {trip.destination}
        </h3>
        <p className="text-xs text-text-tertiary font-medium mt-0.5">{trip.country}</p>
      </div>

      {/* Footer Info Row */}
      <div className="mt-4 pt-3 border-t border-text-tertiary/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-text-tertiary font-medium block uppercase tracking-wider">
            Budget
          </span>
          <span className="font-bold text-sm text-text-primary">
            ${trip.budget.toLocaleString()}
          </span>
        </div>

        {/* Travel Buddies Avatars */}
        <div className="flex items-center -space-x-2">
          {trip.travelBuddies.slice(0, 3).map((buddy: { name: string; avatar: string }, idx: number) => (
            <img
              key={idx}
              src={buddy.avatar}
              alt={buddy.name}
              className="w-7 h-7 rounded-full border-2 border-surface object-cover shadow-sm"
              title={buddy.name}
            />
          ))}
          {trip.travelBuddies.length > 3 && (
            <div className="w-7 h-7 rounded-full bg-surface-elevated border-2 border-surface flex items-center justify-center text-[9px] font-bold text-text-secondary">
              +{trip.travelBuddies.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
