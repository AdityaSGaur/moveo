"use client";

import React, { useState } from "react";

export interface Story {
  id: string;
  title: string;
  image: string;
  userAvatar: string;
  userName: string;
  viewed?: boolean;
}

interface StoriesReelProps {
  stories: Story[];
}

export const StoriesReel: React.FC<StoriesReelProps> = ({ stories }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <>
      <div className="w-full overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-3 min-w-max">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group relative flex flex-col items-center gap-1.5 focus:outline-none"
            >
              {/* Outer Story Thumbnail Frame */}
              <div className="relative w-16 h-24 sm:w-20 sm:h-28 rounded-2xl overflow-hidden p-0.5 border-2 border-orange-500/80 group-hover:border-orange-500 group-hover:scale-105 transition-all duration-300 shadow-md">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* User Avatar Badge at Bottom */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-white overflow-hidden shadow-md">
                  <img
                    src={story.userAvatar}
                    alt={story.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Story Preview Modal */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="relative max-w-sm w-full bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 w-full">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

              {/* Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedStory.userAvatar}
                    alt={selectedStory.userName}
                    className="w-8 h-8 rounded-full border border-white object-cover"
                  />
                  <span className="font-bold text-xs">{selectedStory.userName}</span>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-white text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Footer */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-display font-bold text-xl">{selectedStory.title}</h3>
                <p className="text-xs text-white/80 mt-1">Shared destination story highlight</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
