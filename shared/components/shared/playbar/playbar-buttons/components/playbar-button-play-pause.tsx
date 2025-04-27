"use client";

import React, { FC, useEffect } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/shared/lib";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { useShallow } from "zustand/shallow";

interface Props {
  size?: number;
  className?: string;
}

export const PlaybarButtonPlayPause: FC<Props> = ({ size = 24, className }) => {
  const [audioRef, isPlaying, isRepeating, setIsPlaying] =
    useCurrentPlayingTrack(
      useShallow((state) => [
        state.audioRef,
        state.isPlaying,
        state.isRepeating,
        state.setIsPlaying,
      ]),
    );

  const handleButtonClick = () => {
    const audio = audioRef?.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const handleEnded = () => {
      if (!isRepeating) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, isRepeating, setIsPlaying, isPlaying]);

  return (
    <button
      onClick={handleButtonClick}
      className={cn(
        "hover:text-accent flex items-center transition-colors",
        className,
      )}
      title={isPlaying ? "Pause" : "Play"}
      aria-label={isPlaying ? "Pause" : "Play"}
      type="button"
    >
      {isPlaying ? <Pause size={size} /> : <Play size={size} />}
    </button>
  );
};
