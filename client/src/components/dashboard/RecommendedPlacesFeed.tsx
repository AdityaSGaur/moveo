"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  Share01Icon,
} from "@hugeicons/core-free-icons";

export interface RecommendedPlace {
  id: string;
  name: string;
  destination: string;
  description: string;
  rating: number;
  reviewsCount: number;
  image: string;
  guideName: string;
  guideAvatar: string;
  tags: string[];
}

interface RecommendedPlacesFeedProps {
  destination: string;
  flag?: string;
  places: RecommendedPlace[];
}

const HeartIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const RecommendedPlacesFeed: React.FC<RecommendedPlacesFeedProps> = ({
  destination,
  flag = "🇲🇾",
  places,
}) => {
  const [favorites, setFavorites] = useState<{ [id: string]: boolean }>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-display font-bold text-text-primary flex items-center gap-2">
            For your <span className="text-orange-500 font-extrabold">{destination}</span>{" "}
            <span>{flag}</span> Trip
          </h2>
          <p className="text-xs text-text-tertiary font-medium mt-0.5">
            These can't be missed places!
          </p>
        </div>

        <button className="px-3.5 py-1.5 rounded-full bg-surface border border-text-tertiary/10 hover:bg-surface-elevated text-xs font-bold text-text-secondary hover:text-text-primary transition-all">
          Details
        </button>
      </div>

      {/* Places Cards List */}
      <div className="space-y-4">
        {places.map((place) => {
          const isFav = Boolean(favorites[place.id]);
          return (
            <div
              key={place.id}
              className="p-4 rounded-3xl bg-surface border border-text-tertiary/10 hover:border-text-tertiary/30 hover:bg-surface-elevated/70 transition-all duration-300 shadow-md flex flex-col sm:flex-row items-start gap-4 group"
            >
              {/* Media Image */}
              <div className="w-full sm:w-44 h-40 sm:h-32 rounded-2xl overflow-hidden shrink-0 relative shadow-md">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={(e) => toggleFavorite(place.id, e)}
                  className="sm:hidden absolute top-2 right-2 p-2 rounded-full bg-black/40 backdrop-blur-md text-white"
                >
                  <HeartIcon className={`w-4 h-4 ${isFav ? "text-red-500 fill-red-500" : "text-white fill-none"}`} />
                </button>
              </div>

              {/* Body Info */}
              <div className="flex-1 w-full flex flex-col justify-between h-full min-h-[120px]">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-base text-text-primary group-hover:text-orange-400 transition-colors">
                      {place.name}
                    </h3>

                    {/* Action icons desktop */}
                    <div className="hidden sm:flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleFavorite(place.id, e)}
                        className="p-2 rounded-full bg-surface-elevated border border-text-tertiary/10 hover:bg-surface text-text-tertiary hover:text-red-400 transition-all"
                        title="Save to favorites"
                      >
                        <HeartIcon className={`w-3.5 h-3.5 ${isFav ? "text-red-500 fill-red-500" : "text-text-tertiary fill-none"}`} />
                      </button>
                      <button
                        className="p-2 rounded-full bg-orange-500 text-white shadow-md shadow-orange-500/25 hover:scale-105 transition-transform"
                        title="Share place"
                      >
                        <HugeiconsIcon icon={Share01Icon} className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-text-tertiary line-clamp-2 mt-1 font-medium">
                    {place.description}
                  </p>
                </div>

                {/* Rating & Guide */}
                <div className="flex items-center gap-4 mt-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <HugeiconsIcon icon={StarIcon} className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{place.rating}</span>
                    <span className="text-text-tertiary font-normal">({place.reviewsCount})</span>
                  </div>

                  {/* Guide info */}
                  <div className="flex items-center gap-1.5 text-xs text-text-tertiary font-medium">
                    <span>Guide by:</span>
                    <img
                      src={place.guideAvatar}
                      alt={place.guideName}
                      className="w-4 h-4 rounded-full object-cover border border-text-tertiary/20"
                    />
                    <span className="font-semibold text-text-secondary">{place.guideName}</span>
                  </div>
                </div>

                {/* Category Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mt-3 pt-2 border-t border-text-tertiary/10">
                  {place.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-surface-elevated text-[10px] font-semibold text-text-tertiary border border-white/5 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
