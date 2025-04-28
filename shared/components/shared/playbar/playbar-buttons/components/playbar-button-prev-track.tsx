"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { SkipBack } from "lucide-react";
import { usePlaybar } from "@/shared/store/playbar";
import { useShallow } from "zustand/shallow";

interface Props {
  size?: number;
  className?: string;
}

export const PlaybarButtonPrevTrack: FC<Props> = ({ size = 24, className }) => {
  const [currentPlayingTrackIndex, setCurrentPlayingTrackIndex] = usePlaybar(
    useShallow((state) => [
      state.currentPlayingTrackIndex,
      state.setCurrentPlayingTrackIndex,
    ]),
  );

  return (
    <button
      disabled={currentPlayingTrackIndex === 0}
      onClick={() => setCurrentPlayingTrackIndex(currentPlayingTrackIndex - 1)}
      className={cn(
        "hover:text-accent flex items-center transition-colors",
        currentPlayingTrackIndex === 0 &&
          "pointer-events-none cursor-not-allowed opacity-20 hover:!text-transparent",
        className,
      )}
      title="Previous Track"
      aria-label="Previous Track"
      type="button"
    >
      <SkipBack size={size} />
    </button>
  );
};
