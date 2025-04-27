"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import * as TrackCard from "./track-card";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { ButtonLikeTrack } from "./button-like-track";
import { useShallow } from "zustand/shallow";
import { Volume2 } from "lucide-react";
import { Track } from "@/types/audius";

interface Props {
  tracks: Track[];
  className?: string;
}

export const TrackList: FC<Props> = ({ tracks, className }) => {
  const [playingTrack, setTrack] = useCurrentPlayingTrack(
    useShallow((state) => [state.track, state.setTrack]),
  );

  const emptyLoader = (
    <div className="border-accent mt-10 h-15 w-15 animate-spin rounded-full border-4 border-t-transparent" />
  );

  return (
    <ul className={cn("grid grid-cols-4 gap-x-5 gap-y-10 pr-5", className)}>
      {tracks.map((track) => (
        <li
          key={track.id}
          className="flex w-full cursor-pointer flex-col gap-1 p-1 transition-transform duration-200 hover:scale-[1.015]"
          onClick={() => setTrack(track)}
          title="Play track"
        >
          <TrackCard.Image
            imageUrl={track.artwork["480x480"]}
            className="w-full"
            width={240}
            height={260}
          />
          <span className="text-accent flex items-center gap-1">
            {playingTrack?.id === track.id && (
              <Volume2 className="text-accent" size={24} />
            )}
            Title: <TrackCard.Title title={track.title} />
            <ButtonLikeTrack track={track} />
          </span>
          <span className="flex items-center gap-1 text-neutral-500">
            Artist:
            <TrackCard.Artist name={track.user.name} />
          </span>
          <span className="flex items-center gap-1 text-neutral-500">
            Genre:
            <TrackCard.Genre genre={track.genre} />
          </span>
          <TrackCard.AdditionalInfo
            trackDuration={track.duration}
            playCount={track.play_count}
            favoriteCount={track.favorite_count}
          />
        </li>
      ))}
      <li className="col-span-4 flex items-center justify-center self-center">
        {tracks.length === 0 && emptyLoader}
      </li>
    </ul>
  );
};
