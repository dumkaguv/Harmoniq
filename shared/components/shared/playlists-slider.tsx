"use client";

import React, { FC, useMemo, useRef } from "react";
import { cn, getShuffledArray } from "@/shared/lib";
import { useShallow } from "zustand/shallow";
import * as PlaylistCard from "@/shared/components/shared/playlist-card";
import { usePlaylistsStore } from "@/shared/store/playlists";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
        left: direction === "left" ? -430 : 430,
        behavior: "smooth",
      });
    }
  };

  const shuffledPlaylists = getShuffledArray(playlists).slice(0, 10);

  const skeletons = useMemo(
    () =>
      new Array(10).fill(0).map((_, index) => (
        <li key={index} className="flex flex-col">
          <PlaylistCard.Skeleton classNameImage="max-lg:!w-[150px] max-lg:!h-[150px]" />
        </li>
      )),
    [],
  );

  return (
    <div className={cn("mt-10 text-4xl font-semibold max-xl:mt-7", className)}>
      <div className="flex items-center gap-2">
        <h2 className="max-sm:text-3xl">{title}</h2>
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
              className="group-hover:text-accent text-gray-500 transition-colors duration-200 max-sm:w-[32px]"
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
              className="group-hover:text-accent text-gray-500 transition-colors duration-200 max-sm:w-[32px]"
            />
          </button>
        </div>
      </div>
      <ul
        ref={sliderListRef}
        className="scrollbar-hide mt-5 flex max-w-full gap-7 overflow-x-scroll overflow-y-hidden p-1 max-xl:gap-5 max-md:w-full"
      >
        {!isLoading &&
          playlists.length > 0 &&
          shuffledPlaylists.map((playlist) => (
            <li key={playlist.id}>
              <Link
                href={`/playlist/${playlist.id}`}
                className={cn(
                  "flex w-[190px] flex-col gap-3 hover:scale-[1.025] hover:text-black max-lg:w-[150px]",
                  className,
                )}
              >
                <PlaylistCard.Image
                  imageSrc={playlist.artwork["480x480"]}
                  className="max-lg:!h-[150px] max-lg:!w-[150px]"
                />
                <div>
                  <PlaylistCard.Title
                    title={playlist.playlist_name}
                    className="truncate"
                  />
                  <PlaylistCard.Author
                    author={playlist.user.name}
                    className="truncate"
                  />
                </div>
              </Link>
            </li>
          ))}
        {isLoading && skeletons}
      </ul>
    </div>
  );
};
