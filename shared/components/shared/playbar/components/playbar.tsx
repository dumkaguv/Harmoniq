"use client";

import React, { FC, useRef } from "react";
import { cn } from "@/shared/lib/utils";
import * as PlaylistCard from "@/shared/components/shared/playlist-card";
import { Heart, Shuffle, SkipBack, SkipForward } from "lucide-react";
import Link from "next/link";
import { PlaybarButtonPlayPause } from "../playbar-buttons/components/playbar-button-play-pause";
import { formatTime } from "@/shared/lib/utils";
import { useAudio } from "../hooks";
import { PlaybarProgressBar } from "./playbar-progress-bar";
import {
  PlaybarButtonRepeat,
  PlaybarButtonVolume,
} from "../playbar-buttons/components";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { useShallow } from "zustand/shallow";
import { useAutoPlay } from "../../top-tracks/hooks";

interface Props {
  className?: string;
}

export const Playbar: FC<Props> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [track, audioSrc, trackDuration, currentTime, isLoading] =
    useCurrentPlayingTrack(
      useShallow((state) => [
        state.track,
        state.audioSrc,
        state.trackDuration,
        state.currentTime,
        state.isLoading,
      ]),
    );

  useAudio(audioRef);

  useAutoPlay();

  const MUSIC_CONTROLS = [
    {
      name: "Skip back",
      icon: <SkipBack size={24} />,
    },
    {
      name: "Skip forward",
      icon: <SkipForward size={24} />,
    },
    {
      name: "Shuffle",
      icon: <Shuffle size={24} />,
    },
  ];

  return (
    <>
      {track && (
        <div
          className={cn(
            "fixed bottom-0 left-0 z-100 flex h-[70px] w-full items-center justify-center bg-[#F5F4F7]",
            className,
          )}
        >
          {audioSrc && (
            <audio ref={audioRef} preload="metadata" src={audioSrc} />
          )}
          <div
            className={cn(
              "flex items-center justify-center gap-6",
              isLoading && "pointer-events-none blur-xs",
            )}
          >
            <ul className="flex items-center justify-center gap-5">
              <li>
                <PlaybarButtonPlayPause audioRef={audioRef} />
              </li>
              <li>
                <PlaybarButtonRepeat audioRef={audioRef} />
              </li>
            </ul>

            <div className="ml-5 flex items-center justify-center gap-3 font-semibold">
              <span className="text-accent">{formatTime(currentTime)}</span>
              <PlaybarProgressBar
                audioRef={audioRef}
                trackDuration={trackDuration}
                currentTime={currentTime}
              />
              <span className="text-gray-600">{formatTime(trackDuration)}</span>
            </div>

            <div className="flex items-center gap-5">
              <PlaybarButtonVolume audioRef={audioRef} />
              <button
                className="hover:text-accent transition-colors"
                type="button"
                title="Like"
                aria-label="Like"
              >
                <Heart size={24} />
              </button>
            </div>

            <Link href="/" className="ml-3 flex items-center gap-2">
              <PlaylistCard.Image
                imageSrc={track?.user.cover_photo["640x"]}
                width={50}
                height={50}
                className="shadow-lg"
              />
              <div className="max-w-[170px]">
                <PlaylistCard.Title title={""} />
                <PlaylistCard.Author author={track.user.name} />
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
