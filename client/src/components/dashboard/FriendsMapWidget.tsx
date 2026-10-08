"use client";

import React, { useState } from "react";

export interface FriendLocation {
  id: string;
  name: string;
  avatar: string;
  country: string;
  latPct: number; // percentage X on map
  lngPct: number; // percentage Y on map
  status?: string;
}

const DEFAULT_FRIENDS: FriendLocation[] = [
  {
    id: "f1",
    name: "Shelly A.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    country: "Japan",
    latPct: 78,
    lngPct: 38,
    status: "Exploring Tokyo",
  },
  {
    id: "f2",
    name: "Edgar P.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    country: "Argentina",
    latPct: 32,
    lngPct: 74,
    status: "Hiking Patagonia",
  },
  {
    id: "f3",
    name: "Evan G.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    country: "Germany",
    latPct: 52,
    lngPct: 30,
    status: "Attending festival",
  },
];

export const FriendsMapWidget: React.FC = () => {
  const [friends] = useState<FriendLocation[]>(DEFAULT_FRIENDS);
  const [activeFriend, setActiveFriend] = useState<FriendLocation | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-surface border border-text-tertiary/10 rounded-3xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden h-full min-h-[260px]">
      {/* Widget Header */}
      <div className="flex items-center justify-between gap-2 z-10">
        <div>
          <h3 className="font-display font-bold text-base text-text-primary">
            Friends Location
          </h3>
          <p className="text-xs text-text-tertiary font-medium">
            Check on your friend live location
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1.5 rounded-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-bold text-xs border border-orange-500/20 transition-all duration-200"
        >
          {isExpanded ? "Minimize" : "Expand"}
        </button>
      </div>

      {/* Stylized World Map Viewport */}
      <div className="relative w-full h-44 sm:h-52 my-3 rounded-2xl bg-surface-elevated/40 border border-white/5 overflow-hidden flex items-center justify-center">
        {/* World Map Dot Pattern Background SVG */}
        <svg
          className="w-full h-full opacity-20 text-text-tertiary"
          viewBox="0 0 1000 500"
          fill="currentColor"
        >
          <path d="M150,120 Q200,80 300,100 T450,150 T600,120 T800,100 T900,180" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
          {/* Simulated continent blobs */}
          <ellipse cx="250" cy="180" rx="120" ry="70" opacity="0.3" />
          <ellipse cx="320" cy="340" rx="80" ry="110" opacity="0.3" />
          <ellipse cx="530" cy="190" rx="110" ry="90" opacity="0.3" />
          <ellipse cx="580" cy="320" rx="90" ry="70" opacity="0.3" />
          <ellipse cx="780" cy="200" rx="130" ry="80" opacity="0.3" />
          <ellipse cx="820" cy="370" rx="60" ry="50" opacity="0.3" />
        </svg>

        {/* Live Friend Map Markers */}
        {friends.map((friend) => (
          <div
            key={friend.id}
            style={{ left: `${friend.latPct}%`, top: `${friend.lngPct}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            onClick={() => setActiveFriend(friend)}
          >
            {/* Pulsing ring */}
            <span className="absolute -inset-2 rounded-full bg-orange-500/20 animate-ping" />

            {/* Friend Card Badge on Map */}
            <div className="relative flex items-center gap-2 p-1.5 pr-3 rounded-full bg-surface border border-text-tertiary/20 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-7 h-7 rounded-full object-cover border border-white"
              />
              <div className="text-left">
                <div className="text-[11px] font-bold text-text-primary leading-tight">
                  {friend.name}
                </div>
                <div className="text-[9px] text-text-tertiary font-medium leading-tight">
                  {friend.country}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Fullscreen Overlay Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-surface border border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold font-display text-text-primary">
                  Live Friends Map
                </h2>
                <p className="text-xs text-text-tertiary">Real-time travel updates from your circle</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-full bg-surface-elevated text-text-primary hover:bg-surface"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full h-[400px] rounded-2xl bg-surface-elevated border border-white/10 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full opacity-30 text-text-tertiary" viewBox="0 0 1000 500" fill="currentColor">
                <ellipse cx="250" cy="180" rx="140" ry="80" />
                <ellipse cx="320" cy="340" rx="90" ry="120" />
                <ellipse cx="530" cy="190" rx="130" ry="100" />
                <ellipse cx="580" cy="320" rx="100" ry="80" />
                <ellipse cx="780" cy="200" rx="150" ry="90" />
              </svg>

              {friends.map((friend) => (
                <div
                  key={friend.id}
                  style={{ left: `${friend.latPct}%`, top: `${friend.lngPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2 p-2 pr-4 rounded-full bg-surface border border-orange-500/50 shadow-2xl"
                >
                  <img src={friend.avatar} alt={friend.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-text-primary">{friend.name}</div>
                    <div className="text-[10px] text-orange-400 font-semibold">{friend.status} ({friend.country})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
