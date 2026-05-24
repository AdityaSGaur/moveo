"use client";

import React, { useState } from "react";
import { Tabs, Card, Button, Input } from "@/components/ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Calendar01Icon, Location01Icon, VideoReplayIcon, Bus01Icon, Train01Icon } from "@hugeicons/core-free-icons";

export const SmartSearch = () => {
  const [activeTab, setActiveTab] = useState("movie");

  const tabs = [
    { id: "movie", label: "Movies", icon: <HugeiconsIcon icon={VideoReplayIcon} size={24} /> },
    { id: "bus", label: "Buses", icon: <HugeiconsIcon icon={Bus01Icon} size={24} /> },
    { id: "train", label: "Trains", icon: <HugeiconsIcon icon={Train01Icon} size={24} /> },
  ];

  const renderSearchForm = () => {
    switch (activeTab) {
      case "movie":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <Input
                  icon={<HugeiconsIcon icon={Search01Icon} size={20} className="text-text-secondary" />}
                  placeholder="Search for Movies, Events, Plays, Sports and Activities"
                  className="h-14 bg-surface"
                />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button size="lg" className="h-14 px-8">
                  Search
                </Button>
                <div className="hidden lg:flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-widest text-accent-secondary font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse" /> Live
                  </span>
                  <span className="text-xs text-text-secondary whitespace-nowrap">12K+ bookings today</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-text-tertiary">Trending Searches:</span>
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="hover:text-text-primary cursor-pointer transition-colors">Avengers</span>
                <span className="text-text-tertiary/30">•</span>
                <span className="hover:text-text-primary cursor-pointer transition-colors">IMAX</span>
                <span className="text-text-tertiary/30">•</span>
                <span className="hover:text-text-primary cursor-pointer transition-colors">Delhi</span>
                <span className="text-text-tertiary/30">•</span>
                <span className="hover:text-text-primary cursor-pointer transition-colors">Horror</span>
              </div>
            </div>
          </div>
        );
      case "bus":
        return (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative min-w-0">
              <Input
                icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                placeholder="From City"
                className="h-14 bg-surface"
              />
            </div>
            <div className="flex-1 relative min-w-0">
              <Input
                icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                placeholder="To City"
                className="h-14 bg-surface"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Input
                type="date"
                icon={<HugeiconsIcon icon={Calendar01Icon} size={20} className="text-text-secondary" />}
                className="h-14 bg-surface"
              />
            </div>
            <Button size="lg" className="h-14 px-8 shrink-0">
              Search Buses
            </Button>
          </div>
        );
      case "train":
        return (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative min-w-0">
              <Input
                icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                placeholder="From Station"
                className="h-14 bg-surface"
              />
            </div>
            <div className="flex-1 relative min-w-0">
              <Input
                icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                placeholder="To Station"
                className="h-14 bg-surface"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Input
                type="date"
                icon={<HugeiconsIcon icon={Calendar01Icon} size={20} className="text-text-secondary" />}
                className="h-14 bg-surface"
              />
            </div>
            <Button size="lg" className="h-14 px-8 shrink-0">
              Search Trains
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative z-20 mb-16 px-4 w-full">
      <div className="container mx-auto max-w-5xl w-full">
        <div className="p-2 sm:p-4 backdrop-blur-2xl bg-surface/40 border border-white/5 rounded-[2.5rem]">
          
          {/* Sleek Left-aligned Tabs */}
          <div className="flex justify-center sm:justify-start mb-4 mt-2 px-2 sm:px-4">
            <div className="inline-flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-text-primary text-background shadow-lg scale-105"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface/80"
                  }`}
                >
                  {React.cloneElement(tab.icon as React.ReactElement, {
                    size: 18,
                  })}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 sm:p-6 bg-background/60 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-inner">
            {renderSearchForm()}
          </div>
        </div>

        {/* Integrated Quick Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["IMAX", "3D", "Trending", "Nearby", "Top Rated"].map(filter => (
            <button key={filter} className="px-6 py-2.5 rounded-full border border-text-tertiary/20 bg-surface/30 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-text-primary hover:bg-text-primary hover:text-background hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
