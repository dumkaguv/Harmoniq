"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { InputIconSearch } from "@/shared/components/ui";
import { useHeaderSearch } from "../hooks";
import * as TrackCard from "@/shared/components/shared/track-card";
import { usePlaybar } from "@/shared/store/playbar";
import { useShallow } from "zustand/shallow";
import { Volume2 } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  const { foundTracks, searchValue, isLoading, setSearchValue } =
    useHeaderSearch();
  const [playingTrack, setTracks] = usePlaybar(
    useShallow((state) => [state.track, state.setTrack]),
  );

  return (
    <div className={cn("", className)}>
      <div className="relative w-fit">
        <InputIconSearch
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search for tracks e.g. 'Alan...'"
          className="rounded-b-none"
        />

        {!isLoading && foundTracks.length > 0 && searchValue && (
          <ul className="absolute top-full z-10 grid w-full items-center gap-1 bg-gray-100 p-0.5 pb-1">
            {foundTracks.slice(0, 7).map((track) => (
              <li
                key={track.id}
                onClick={() => setTracks(track, foundTracks)}
                className="hover:bg-accent/30 cursor-pointer transition-colors duration-200"
                title="Play track"
              >
                <div className="flex items-center gap-x-1.5">
                  <TrackCard.Image
                    imageUrl={track.artwork["150x150"]}
                    width={45}
                    height={45}
                  />
                  <div className="flex max-w-[460px] flex-col gap-0.5">
                    <span
                      className={`flex items-center gap-1 ${playingTrack?.id === track.id && "text-accent"}`}
                    >
                      {playingTrack?.id === track.id && (
                        <Volume2 className="text-accent" size={24} />
                      )}
                      <TrackCard.Title
                        title={track.title}
                        className="truncate"
                      />
                    </span>
                    <TrackCard.Artist
                      href={`/users/${track.user.id}`}
                      name={track.user.name}
                      onClick={(event) => event.stopPropagation()}
                      className="max-w-[400px] truncate overflow-hidden whitespace-nowrap"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isLoading && (
          <ul className="absolute top-full z-10 grid w-full items-center gap-1 bg-gray-100 p-0.5 pb-1">
            {[...Array(7)].map((_, index) => (
              <li
                key={index}
                className="cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center gap-x-1.5">
                  <div className="h-[45px] w-[45px] animate-pulse rounded-sm bg-gray-300" />
                  <div className="flex max-w-[460px] flex-col gap-1">
                    <div className="h-[16px] w-[460px] animate-pulse rounded-sm bg-gray-300" />
                    <div className="h-[14px] w-[150px] animate-pulse rounded-sm bg-gray-300" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!isLoading && foundTracks.length === 0 && searchValue && (
          <ul className="absolute top-full z-10 w-full items-center gap-1 bg-gray-100 p-0.5 pb-1">
            <li className="w-full text-center text-neutral-600">
              Nothing found. Try something else.
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
