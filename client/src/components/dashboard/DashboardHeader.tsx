"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Notification01Icon,
  Coins01Icon,
} from "@hugeicons/core-free-icons";
import { useAppSelector } from "@/store/store";

interface DashboardHeaderProps {
  onSearchQuery?: (query: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onSearchQuery }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notificationsCount, setNotificationsCount] = useState(2);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const firstName = user?.name ? user.name.split(" ")[0] : "Aditya";

  return (
    <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
      {/* Greeting Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-text-primary flex items-center gap-2">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-xs sm:text-sm text-text-tertiary mt-0.5 font-medium">
          Manage your travel bookings, e-tickets & active passes
        </p>
      </div>

      {/* Top Controls & Widgets */}
      <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
        {/* Wallet Cash & Coins Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
          <HugeiconsIcon icon={Coins01Icon} className="w-4 h-4 text-amber-400" />
          <span>1,200 Moveo Coins</span>
          <span className="text-text-tertiary">|</span>
          <span>₹1,250 Wallet</span>
        </div>

        {/* Search Bar / Icon */}
        <div className="relative">
          {isSearchOpen ? (
            <div className="flex items-center bg-surface border border-text-tertiary/20 rounded-full px-3 py-1.5 shadow-md animate-in fade-in duration-200">
              <HugeiconsIcon icon={Search01Icon} className="w-4 h-4 text-text-tertiary shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  onSearchQuery?.(e.target.value);
                }}
                placeholder="Search PNR, tickets, cities..."
                className="bg-transparent border-none text-xs text-text-primary focus:outline-none ml-2 w-36 sm:w-48 placeholder:text-text-tertiary"
                autoFocus
                onBlur={() => {
                  if (!searchValue) setIsSearchOpen(false);
                }}
              />
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full bg-surface border border-text-tertiary/10 hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all duration-200"
              title="Search Bookings"
            >
              <HugeiconsIcon icon={Search01Icon} className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setNotificationsCount(0)}
          className="relative p-2.5 rounded-full bg-surface border border-text-tertiary/10 hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all duration-200"
          title="Booking Alerts"
        >
          <HugeiconsIcon icon={Notification01Icon} className="w-4 h-4" />
          {notificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-background animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
};
