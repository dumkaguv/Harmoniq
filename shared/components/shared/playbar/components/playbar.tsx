"use client";

import React, { FC, useEffect, useRef } from "react";
import * as PlaylistCard from "@/shared/components/shared/playlist-card";
import { Shuffle, SkipBack, SkipForward } from "lucide-react";
import Link from "next/link";
import { cn, formatTime } from "@/shared/lib/utils";
import { useAudio, useAutoPlay } from "../hooks";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { useShallow } from "zustand/shallow";
import {
  ButtonLikeTrack,
  PlaybarButtonRepeat,
  PlaybarButtonVolume,
  PlaybarProgressBar,
  PlaybarButtonPlayPause,
} from "@/shared/components/shared";

interface Props {
  className?: string;
}

export const Playbar: FC<Props> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playbarRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const definePlaybarHeightVariable = () => {
      if (playbarRef.current) {
        const playbarHeight = playbarRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--playbar-height",
          `${playbarHeight}px`,
        );
      }
    };

    definePlaybarHeightVariable();
  }, [track]);

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
          ref={playbarRef}
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
              <ButtonLikeTrack track={track} />
            </div>

            <PlaylistCard.Image
              imageSrc={track.artwork["150x150"]}
              width={45}
              height={40}
              className="h-[40px] w-[45px] shadow-lg"
            />
            <div>
              <PlaylistCard.Title className="text-accent" title={track.title} />
              <Link href="/">
                <PlaylistCard.Author
                  className="hover:text-accent max-w-[170px] transition-colors duration-200"
                  author={track.user.name}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
