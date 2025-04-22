"use client";

import React, { FC, useRef } from "react";
import { cn, getShuffledArray } from "@/shared/lib/utils";
import { useShallow } from "zustand/shallow";

import { usePlaylistsStore } from "@/shared/store/playlists";
import { PlaylistCard } from "@/shared/components/shared";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  title?: string;
  className?: string;
}

export const PlaylistsSlider: FC<Props> = ({
  title = "New & Noteworthy",
  className,
}) => {
  const sliderListRef = useRef<HTMLUListElement>(null);
  const [playlists, isLoading] = usePlaylistsStore(
    useShallow((state) => [state.items, state.isLoading]),
  );

  const onSlideButtonClick = (direction: "left" | "right") => {
    if (sliderListRef.current) {
      sliderListRef.current.scrollBy({
        left: direction === "left" ? -230 : 230,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("mt-10 text-4xl font-semibold", className)}>
      <div className="flex items-center gap-2">
        <h2>{title}</h2>
        <div className="flex items-center">
          <button
            className="group"
            onClick={() => onSlideButtonClick("left")}
            title="Previous playlist"
            aria-label="Previous playlist"
            type="button"
          >
            <ChevronLeft
              size={48}
              className="group-hover:text-accent text-gray-500 transition-colors duration-200"
            />
          </button>

          <button
            className="group"
            onClick={() => onSlideButtonClick("right")}
            title="Next playlist"
            aria-label="Next playlist"
            type="button"
          >
            <ChevronRight
              size={48}
              className="group-hover:text-accent text-gray-500 transition-colors duration-200"
            />
          </button>
        </div>
      </div>
      <ul
        ref={sliderListRef}
        className="scrollbar-hide mt-5 flex gap-7 overflow-x-scroll overflow-y-hidden p-1"
      >
        {!isLoading &&
          playlists.length > 0 &&
          getShuffledArray(playlists)
            .slice(0, 10)
            .map((playlist) => (
              <li key={playlist.id}>
                <PlaylistCard playlist={playlist} />
              </li>
            ))}
        {isLoading &&
          new Array(10).fill(0).map((_, index) => (
            <li key={index} className="flex flex-col">
              <div className="h-[200px] w-[190px] animate-pulse rounded-sm bg-gray-300" />
              <div className="mt-3 h-[24px] w-[140px] animate-pulse rounded-sm bg-gray-300" />
              <div className="mt-1 h-[20px] w-[80px] animate-pulse rounded-sm bg-gray-300" />
            </li>
          ))}
      </ul>
    </div>
  );
};
