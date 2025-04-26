"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Heart } from "lucide-react";
import { Track } from "@/types/audius";
import { useShallow } from "zustand/shallow";
import { useLikedTracksStore } from "@/shared/store/likedTracks";

interface Props {
  track: Track;
  size?: number;
  className?: string;
}

export const ButtonLikeTrack: FC<Props> = ({
  track,
  size = 24,
  className,
}) => {
  const [likedTracksIdsSet, likeTrack, unlikeTrack] = useLikedTracksStore(
    useShallow((state) => [
      state.likedTracksIdsSet,
      state.likeTrack,
      state.unlikeTrack,
    ]),
  );

  return (
    <button
      onClick={() => {
        if (likedTracksIdsSet.has(track.id)) {
          unlikeTrack(track.id);
        } else {
          likeTrack(track);
        }
      }}
      className={cn(
        "hover:text-accent transition-colors duration-200",
        className,
      )}
      title={likedTracksIdsSet.has(track.id) ? "Unlike" : "Like"}
      aria-label={likedTracksIdsSet.has(track.id) ? "Unlike" : "Like"}
      type="button"
    >
      <Heart
        className={`${likedTracksIdsSet.has(track.id) && "fill-red-600 text-red-700 transition-colors duration-200 hover:fill-red-300 hover:text-red-400"} `}
        size={size}
      />
    </button>
  );
};
