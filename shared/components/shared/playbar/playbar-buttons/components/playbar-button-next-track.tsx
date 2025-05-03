"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { SkipForward } from "lucide-react";
import { usePlaybar } from "@/shared/store/playbar";
import { useShallow } from "zustand/shallow";

interface Props {
  size?: number;
  className?: string;
}

export const PlaybarButtonNextTrack: FC<Props> = ({ size = 24, className }) => {
  const [trackQueue, currentPlayingTrackIndex, setCurrentPlayingTrackIndex] =
    usePlaybar(
      useShallow((state) => [
        state.trackQueue,
        state.currentPlayingTrackIndex,
        state.setCurrentPlayingTrackIndex,
      ]),
    );

  return (
    <button
      disabled={currentPlayingTrackIndex === trackQueue?.length - 1}
      onClick={() => setCurrentPlayingTrackIndex(currentPlayingTrackIndex + 1)}
      className={cn(
        "hover:text-accent flex items-center transition-colors",
        trackQueue?.length - 1 === currentPlayingTrackIndex &&
          "pointer-events-none cursor-not-allowed opacity-20 hover:!text-transparent",
        className,
      )}
      title="Next Track"
      aria-label="Next Track"
      type="button"
    >
      <SkipForward size={size} />
    </button>
  );
};
