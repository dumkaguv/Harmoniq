"use client";

import React, { FC, RefObject, useEffect } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/shared/lib";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { useShallow } from "zustand/shallow";

interface Props {
  audioRef: RefObject<HTMLAudioElement | null>;
  size?: number;
  className?: string;
}

export const PlaybarButtonPlayPause: FC<Props> = ({
  audioRef,
  size = 24,
  className,
}) => {
  const [isPlaying, isRepeating, setIsPlaying] = useCurrentPlayingTrack(
    useShallow((state) => [
      state.isPlaying,
      state.isRepeating,
      state.setIsPlaying,
    ]),
  );

  const handleButtonClick = () => {
    const audio = audioRef.current;
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
    const audio = audioRef.current;
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
      className={cn("hover:text-accent transition-colors", className)}
      title={isPlaying ? "Pause" : "Play"}
      aria-label={isPlaying ? "Pause" : "Play"}
      type="button"
    >
      {isPlaying ? <Pause size={size} /> : <Play size={size} />}
    </button>
  );
};
