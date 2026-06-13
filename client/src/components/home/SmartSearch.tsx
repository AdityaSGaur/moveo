"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Tabs, Card, Button, Input } from "@/components/ui";
import places from "@/data/places";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Calendar01Icon, Location01Icon, Airplane01Icon, Bus01Icon, Train01Icon, UserMultipleIcon } from "@hugeicons/core-free-icons";
import { Annotation } from "@/components/ui/Annotation";

export const SmartSearch = ({ 
  variant = "default",
  onSearchSubmit,
  initialTab,
}: { 
  variant?: "default" | "inline";
  onSearchSubmit?: (params: { from: string, to: string, date: string, type?: string, available?: number }) => void;
  initialTab?: "flight" | "bus" | "train";
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(initialTab ?? "flight");

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Advanced Flight Search State
  const [tripType, setTripType] = useState("Return");
  const [cabinClass, setCabinClass] = useState("Economy");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showCabinMenu, setShowCabinMenu] = useState(false);
  
  // Toggle States for Search Options
  const [nearbyFrom, setNearbyFrom] = useState(false);
  const [nearbyTo, setNearbyTo] = useState(false);
  const [directFlights, setDirectFlights] = useState(false);
  const [addStay, setAddStay] = useState(false);

  // Input States
  const [fromCity, setFromCity] = useState("Delhi (DEL)");
  const [toCity, setToCity] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = () => {
    if (onSearchSubmit) {
      onSearchSubmit({ from: fromCity, to: toCity, date: departDate, type: "flight" });
    } else {
      const query = new URLSearchParams({
        category: activeTab,
        from: fromCity,
        to: toCity,
        depart: departDate,
        return: returnDate,
        class: cabinClass,
        adults: adults.toString(),
        children: children.toString(),
      });
      router.push(`/book?${query.toString()}`);
    }
  };

  // Close popover when clicking outside
  const popoverRef = useRef<HTMLDivElement>(null);
  const travellersRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showCabinMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        travellersRef.current && !travellersRef.current.contains(e.target as Node)
      ) {
        setShowCabinMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCabinMenu]);

  const tabs = [
    { id: "flight", label: "Flights", icon: Airplane01Icon },
    { id: "bus", label: "Buses", icon: Bus01Icon },
    { id: "train", label: "Trains", icon: Train01Icon },
  ];

  // --- Autocomplete input component ---
  const AutoCompleteInput = ({
    value,
    onChange,
    placeholder,
    icon,
    className,
    onSelect,
  }: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    className?: string;
    onSelect?: (v: string) => void;
  }) => {
    const [suggestions, setSuggestions] = useState<Array<{ id: number; name: string; subtitle?: string }>>([]);
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const container = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (!value || value.trim().length < 1) {
        setSuggestions([]);
        setVisible(false);
        setActiveIndex(-1);
        return;
      }
      const q = value.toLowerCase();
      // filter from static places dataset (src/data/places.ts)
      const all = places as Array<any>;
      const filtered = all
        .filter((p) => p.name.toLowerCase().includes(q) || (p.subtitle && p.subtitle.toLowerCase().includes(q)))
        .slice(0, 8);
      setSuggestions(filtered);
      setVisible(filtered.length > 0);
      setActiveIndex(-1);
    }, [value]);

    useEffect(() => {
      const onDocClick = (e: MouseEvent) => {
        if (container.current && !container.current.contains(e.target as Node)) {
          setVisible(false);
        }
      };
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    // Keep input focused while suggestions are visible (prevents accidental blur)
    useEffect(() => {
      if (visible) {
        // focus on next tick to ensure input is mounted
        const id = window.setTimeout(() => inputRef.current?.focus(), 0);
        return () => window.clearTimeout(id);
      }
    }, [visible]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        // If there are suggestions visible, select the highlighted/first one.
        if (visible && suggestions.length > 0) {
          e.preventDefault();
          const sel = suggestions[activeIndex] || suggestions[0];
          if (sel) {
            onChange(sel.name);
            onSelect?.(sel.name);
            setVisible(false);
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        } else {
          // No suggestions: treat Enter as submit/search
          e.preventDefault();
          // call parent search handler if present
          try { (handleSearch)(); } catch (err) { /* ignore if not callable */ }
        }
      } else if (e.key === "Escape") {
        setVisible(false);
      }
    };

    return (
      <div ref={container} className={`relative ${className || ""}`}>
        <div className="flex items-center gap-3">
          {icon}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => { onChange(e.target.value); }}
            onFocus={() => { if (suggestions.length) setVisible(true); }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent text-base md:text-lg font-bold text-text-primary focus:outline-none placeholder:font-medium placeholder:text-text-tertiary"
          />
        </div>
        {visible && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-2 bg-surface rounded-xl shadow-md border border-text-tertiary/10 z-50 max-h-56 overflow-auto">
            {suggestions.map((s, idx) => (
              <li
                key={s.id}
                onMouseDown={(ev) => {
                  ev.preventDefault();
                  onChange(s.name);
                  onSelect?.(s.name);
                  setVisible(false);
                  // ensure the input keeps focus after selection
                  setTimeout(() => inputRef.current?.focus(), 0);
                }}
                className={`px-4 py-3 cursor-pointer hover:bg-surface-elevated transition-colors ${idx === activeIndex ? 'bg-surface-elevated' : ''}`}>
                <div className="text-sm font-bold text-text-primary">{s.name}</div>
                {s.subtitle && <div className="text-xs text-text-tertiary mt-0.5">{s.subtitle}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderSearchForm = () => {
    switch (activeTab) {
      case "flight":
        return (
          <div className="flex flex-col gap-4 w-full">
            {/* Top row: Trip type */}
            <div className="flex items-center">
              <select 
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="bg-transparent text-text-primary text-sm font-semibold outline-none cursor-pointer hover:text-accent-primary transition-colors"
              >
                <option value="Return">Return</option>
                <option value="One way">One way</option>
                <option value="Multi-city">Multi-city</option>
              </select>
            </div>

            {/* Modern Spacious Multi-Row Search Engine */}
            <div className={variant === "default" ? "bg-surface-elevated p-2 md:p-3 rounded-[2rem] border border-text-tertiary/10 shadow-2xl mt-4 w-full relative" : "w-full relative"}>
              <div className="flex flex-col gap-2">
                
                {/* Row 1: Locations */}
                <div className="flex flex-col md:flex-row gap-2 relative">
                  {/* From */}
                  <div className="flex-1 relative bg-background rounded-3xl hover:bg-text-tertiary/5 border border-transparent hover:border-text-tertiary/10 transition-colors group px-5 md:px-6 h-[76px] flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <HugeiconsIcon icon={Location01Icon} size={14} className="text-text-secondary" /> From
                    </div>
                    <AutoCompleteInput
                      value={fromCity}
                      onChange={(v) => setFromCity(v)}
                      placeholder="Where from?"
                      className="w-full"
                    />
                  </div>
                  
                  {/* Swap button */}
                  <div className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                    <button 
                      onClick={handleSwap}
                      className="w-10 h-10 rounded-full bg-surface-elevated border border-text-tertiary/20 flex items-center justify-center hover:bg-background shadow-lg hover:shadow-xl hover:text-accent-primary hover:border-accent-primary transition-all group"
                    >
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 md:rotate-0 group-hover:rotate-[270deg] md:group-hover:rotate-180 transition-transform duration-300 text-text-primary group-hover:text-accent-primary">
                         <path d="M7 10h14l-4-4" />
                         <path d="M17 14H3l4 4" />
                       </svg>
                    </button>
                  </div>

                  {/* To */}
                  <div className="flex-1 relative bg-background rounded-3xl hover:bg-text-tertiary/5 border border-transparent hover:border-text-tertiary/10 transition-colors group px-5 md:pl-10 h-[76px] flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <HugeiconsIcon icon={Location01Icon} size={14} className="text-text-secondary" /> To
                    </div>
                    <AutoCompleteInput
                      value={toCity}
                      onChange={(v) => setToCity(v)}
                      placeholder="Where to?"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Row 2: Dates & Travellers */}
                <div className="flex flex-col lg:flex-row gap-2">
                  
                  {/* Dates Container */}
                  <div className="flex-[1.2] flex bg-background rounded-3xl hover:bg-text-tertiary/5 border border-transparent hover:border-text-tertiary/10 transition-colors h-[76px] relative">
                    <div className="flex-1 px-5 md:px-6 flex flex-col justify-center relative cursor-pointer">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-1">
                        <HugeiconsIcon icon={Calendar01Icon} size={14} className="text-text-secondary" /> Depart
                      </div>
                      <input
                        type="date"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="w-full bg-transparent text-base md:text-lg font-bold text-text-primary focus:outline-none relative z-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full cursor-pointer"
                      />
                    </div>
                    
                    <div className="w-px h-10 bg-text-tertiary/10 self-center" />
                    
                    <div className={`flex-1 px-5 md:px-6 flex flex-col justify-center relative cursor-pointer ${tripType === "One way" ? "opacity-30 pointer-events-none" : ""}`}>
                      <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-1">
                        <HugeiconsIcon icon={Calendar01Icon} size={14} className="text-text-secondary" /> Return
                      </div>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        disabled={tripType === "One way"}
                        className="w-full bg-transparent text-base md:text-lg font-bold text-text-primary focus:outline-none relative z-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Travellers */}
                  <div ref={travellersRef} className="flex-1 relative min-w-0">
                    <div 
                      onClick={() => setShowCabinMenu(!showCabinMenu)}
                      className="w-full h-[76px] bg-background rounded-3xl border border-transparent hover:border-text-tertiary/10 hover:bg-text-tertiary/5 transition-colors px-5 md:px-6 cursor-pointer flex flex-col justify-center"
                    >
                      <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-1">
                        <HugeiconsIcon icon={UserMultipleIcon} size={14} className="text-text-secondary" /> Travellers
                      </div>
                      <div className="text-base md:text-lg font-bold text-text-primary truncate">
                        {adults + children} {adults + children === 1 ? 'Guest' : 'Guests'}, {cabinClass}
                      </div>
                    </div>

                    {/* Popover */}
                    {showCabinMenu && (
                      <div ref={popoverRef} className="absolute top-[calc(100%+12px)] right-0 md:left-0 lg:right-0 lg:left-auto w-[320px] sm:w-[360px] bg-surface-elevated border border-text-tertiary/10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-[100] p-6 flex flex-col gap-6 transform origin-top transition-all">
                        
                        {/* Cabin Class Selection */}
                        <div>
                          <label className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-3 block">Cabin class</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Economy", "Premium Economy", "Business", "First"].map((cls) => (
                              <button
                                key={cls}
                                onClick={() => setCabinClass(cls)}
                                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                                  cabinClass === cls 
                                    ? "bg-accent-primary text-background shadow-md" 
                                    : "bg-background hover:bg-text-tertiary/10 border border-text-tertiary/10 text-text-secondary hover:text-text-primary"
                                }`}
                              >
                                {cls}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="w-full h-px bg-text-tertiary/10" />

                        {/* Travellers Counters */}
                        <div className="flex flex-col gap-5">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-bold text-text-primary">Adults</div>
                              <div className="text-xs text-text-tertiary mt-0.5">Aged 16+</div>
                            </div>
                            <div className="flex items-center gap-4 bg-background p-1 rounded-full border border-text-tertiary/10">
                              <button 
                                onClick={() => setAdults(Math.max(0, adults - 1))}
                                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-text-tertiary/10 transition-colors text-text-primary font-bold text-lg"
                              >-</button>
                              <span className="text-sm font-bold w-4 text-center">{adults}</span>
                              <button 
                                onClick={() => setAdults(adults + 1)}
                                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-text-tertiary/10 transition-colors text-text-primary font-bold text-lg"
                              >+</button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-bold text-text-primary">Children</div>
                              <div className="text-xs text-text-tertiary mt-0.5">Aged 0 to 15</div>
                            </div>
                            <div className="flex items-center gap-4 bg-background p-1 rounded-full border border-text-tertiary/10">
                              <button 
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-text-tertiary/10 transition-colors text-text-primary font-bold text-lg"
                              >-</button>
                              <span className="text-sm font-bold w-4 text-center">{children}</span>
                              <button 
                                onClick={() => setChildren(children + 1)}
                                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-text-tertiary/10 transition-colors text-text-primary font-bold text-lg"
                              >+</button>
                            </div>
                          </div>
                        </div>

                        <Button 
                          className="w-full rounded-2xl py-6 text-sm font-bold bg-accent-primary hover:bg-accent-secondary text-background border-none shadow-lg hover:shadow-xl transition-all mt-2" 
                          onClick={() => setShowCabinMenu(false)}
                        >
                          Done
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 3: Search Button */}
                <div className="mt-1 md:mt-2">
                  <Button onClick={handleSearch} size="lg" className="w-full h-[64px] bg-linear-to-r from-accent-primary to-accent-secondary hover:brightness-110 text-background rounded-3xl text-lg font-bold border-none transition-all shadow-[0_8px_20px_rgba(var(--accent-primary),0.3)] hover:shadow-[0_12px_28px_rgba(var(--accent-primary),0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <HugeiconsIcon icon={Airplane01Icon} size={22} className="hidden md:block" />
                    <span>Search Flights</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Toggle Tabs Rows */}
            <div className="flex flex-col gap-3 mt-4 px-1 w-full">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => setNearbyFrom(!nearbyFrom)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${nearbyFrom ? 'bg-blue-600/10 text-blue-500 border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : 'bg-surface/40 border-text-tertiary/20 text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${nearbyFrom ? 'bg-blue-500' : 'bg-text-tertiary/40'}`} />
                  + NEARBY AIRPORTS (FROM)
                </button>
                
                <button 
                  onClick={() => setNearbyTo(!nearbyTo)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${nearbyTo ? 'bg-blue-600/10 text-blue-500 border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : 'bg-surface/40 border-text-tertiary/20 text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${nearbyTo ? 'bg-blue-500' : 'bg-text-tertiary/40'}`} />
                  + NEARBY AIRPORTS (TO)
                </button>
                
                <button 
                  onClick={() => setDirectFlights(!directFlights)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${directFlights ? 'bg-blue-600/10 text-blue-500 border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : 'bg-surface/40 border-text-tertiary/20 text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`}
                >
                  <HugeiconsIcon icon={Airplane01Icon} size={14} className={directFlights ? 'text-blue-500' : 'text-text-tertiary/60'} />
                  DIRECT FLIGHTS ONLY
                </button>
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => setAddStay(!addStay)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${addStay ? 'bg-blue-600/10 text-blue-500 border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : 'bg-surface/40 border-text-tertiary/20 text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${addStay ? 'bg-blue-500' : 'bg-text-tertiary/40'}`} />
                  ADD A PLACE TO STAY
                </button>
              </div>
            </div>

          </div>
        );
      case "bus":
        return (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative min-w-0">
              <div className="h-14 bg-surface px-4 rounded-2xl flex items-center">
                <AutoCompleteInput
                  icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                  value={fromCity}
                  onChange={(v) => setFromCity(v)}
                  placeholder="From City"
                />
              </div>
            </div>
            <div className="flex-1 relative min-w-0">
              <div className="h-14 bg-surface px-4 rounded-2xl flex items-center">
                <AutoCompleteInput
                  icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                  value={toCity}
                  onChange={(v) => setToCity(v)}
                  placeholder="To City"
                />
              </div>
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
              <div className="h-14 bg-surface px-4 rounded-2xl flex items-center">
                <AutoCompleteInput
                  icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                  value={fromCity}
                  onChange={(v) => setFromCity(v)}
                  placeholder="From Station"
                />
              </div>
            </div>
            <div className="flex-1 relative min-w-0">
              <div className="h-14 bg-surface px-4 rounded-2xl flex items-center">
                <AutoCompleteInput
                  icon={<HugeiconsIcon icon={Location01Icon} size={20} className="text-text-secondary" />}
                  value={toCity}
                  onChange={(v) => setToCity(v)}
                  placeholder="To Station"
                />
              </div>
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

  if (variant === "inline") {
    return renderSearchForm();
  }

  return (
    <section className="relative z-20 mb-16 px-4 w-full">
      <div className="container mx-auto max-w-5xl w-full">
        <div ref={containerRef} className="search-container p-2 sm:p-4 bg-surface/95 border border-white/5 rounded-[2.5rem] relative overflow-visible">
          
          {/* Design Annotation */}
          <Annotation
            notes={["Smart discovery flow"]}
            arrowDirection="curve-left-down"
            className="-top-24 right-4 md:-top-32 md:-right-8"
            mobileVisible={true}
            delay={0.2}
          />

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
                  <HugeiconsIcon icon={tab.icon as any} size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 sm:p-6 bg-background/60 rounded-[2rem] border border-white/5 shadow-inner">
            {renderSearchForm()}
          </div>
        </div>
      </div>
    </section>
  );
};
