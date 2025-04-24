"use client";

import React, { FC, RefObject } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/shared/lib";

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
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleButtonClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

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
