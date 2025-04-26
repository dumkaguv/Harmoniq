"use client";

import React, { ChangeEvent, FC, RefObject, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { Volume1, Volume2, VolumeOff } from "lucide-react";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { useShallow } from "zustand/shallow";

interface Props {
  audioRef: RefObject<HTMLAudioElement | null>;
  size?: number;
  className?: string;
}

export const PlaybarButtonVolume: FC<Props> = ({
  audioRef,
  size = 24,
  className,
}) => {
  const [currentVolume, setCurrentVolume] = useCurrentPlayingTrack(
    useShallow((state) => [state.currentVolume, state.setCurrentVolume]),
  );

  const handleVolumeIcon = () => {
    if (currentVolume === 0) {
      return <VolumeOff size={size} />;
    } else if (currentVolume > 0 && currentVolume < 0.5) {
      return <Volume1 size={size} />;
    } else if (currentVolume >= 0.5) {
      return <Volume2 size={size} />;
    } else {
      return <Volume2 size={size} />;
    }
  };

  const onVolumeButtonClick = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.volume === 0) {
      setCurrentVolume(1);
      audio.volume = 1;
    } else {
      setCurrentVolume(0);
      audio.volume = 0;
    }
  };

  const onVolumeSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const newVolume = parseFloat(event.target.value);
    setCurrentVolume(newVolume);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = currentVolume;
    }
  }, [audioRef, currentVolume]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={onVolumeButtonClick}
        className="hover:text-accent transition-colors"
        type="button"
        title="Volume"
        aria-label="Volume"
      >
        {handleVolumeIcon()}
      </button>
      <div className="relative flex h-full items-center">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={currentVolume}
          onChange={onVolumeSliderChange}
          className="appearance-none bg-transparent"
        />
        <div
          className="bg-accent pointer-events-none absolute top-1/2 left-0 h-[5px] -translate-y-1/2 rounded-full"
          style={{
            width: `${currentVolume * 100}%`,
          }}
        />
      </div>
    </div>
  );
};
