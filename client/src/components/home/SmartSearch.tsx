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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                icon={<HugeiconsIcon icon={Search01Icon} size={20} className="text-text-secondary" />}
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                className="h-14 bg-surface"
              />
            </div>
            <Button size="lg" className="h-14 px-8 shrink-0">
              Search
            </Button>
          </div>
        );
      case "bus":
        return (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                placeholder="From City"
                className="h-14 bg-surface"
              />
            </div>
            <div className="flex-1 relative">
              <Input
                icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                placeholder="To City"
                className="h-14 bg-surface"
              />
            </div>
            <div className="flex-1">
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
            <div className="flex-1 relative">
              <Input
                icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                placeholder="From Station"
                className="h-14 bg-surface"
              />
            </div>
            <div className="flex-1 relative">
              <Input
                icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                placeholder="To Station"
                className="h-14 bg-surface"
              />
            </div>
            <div className="flex-1">
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
    <section className="relative z-20 -mt-24 mb-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <Card variant="glass" padding="none" className="p-2 sm:p-4 backdrop-blur-xl bg-background/40 border-white/10 shadow-2xl">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="enclosed"
            fullWidth
            className="mb-4"
          />
          <div className="p-4 sm:p-6 bg-surface-elevated/50 rounded-xl border border-white/5">
            {renderSearchForm()}
          </div>
        </Card>
      </div>
    </section>
  );
};
