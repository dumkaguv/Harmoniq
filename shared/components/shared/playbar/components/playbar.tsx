"use client";

import React, { FC, useRef } from "react";
import { cn } from "@/shared/lib/utils";
import * as PlaylistCard from "@/shared/components/shared/playlist-card";
import {
  Heart,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import { Track } from "@/types/audius";
import { testTrack } from "./testTrack";
import { PlaybarButtonPlayPause } from "../playbar-buttons/components/playbar-button-play-pause";
import { formatTime } from "../utils";
import { useAudio } from "../hooks";
import { PlaybarProgressBar } from "./playbar-progress-bar";

interface Props {
  track: Track;
  className?: string;
}

export const Playbar: FC<Props> = ({ track = testTrack, className }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { audioSrc, currentTime, trackDuration } = useAudio(track, audioRef);

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
      name: "Repeat",
      icon: <Repeat size={24} />,
    },
    {
      name: "Shuffle",
      icon: <Shuffle size={24} />,
    },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-100 flex h-[70px] w-full items-center justify-center bg-[#F5F4F7]",
        className,
      )}
    >
      {audioSrc && <audio ref={audioRef} preload="metadata" src={audioSrc} />}
      <div className="flex items-center justify-center gap-6">
        <ul className="flex items-center justify-center gap-5">
          <li>
            <PlaybarButtonPlayPause audioRef={audioRef} />
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
          <button
            className="hover:text-accent transition-colors"
            type="button"
            title="Volume"
            aria-label="Volume"
          >
            <Volume2 size={24} />
          </button>
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
            imageSrc={track.user.cover_photo["640x"]}
            width={50}
            height={50}
            className="shadow-lg"
          />
          <div className="max-w-[170px]">
            <PlaylistCard.Title title={""} />
            <PlaylistCard.Author author={""} />
          </div>
        </Link>
      </div>
    </div>
  );
};
