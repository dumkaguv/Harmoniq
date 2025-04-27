import React, { FC } from "react";
import { cn, formatTrackTime } from "@/shared/lib";
import { Clock, Heart, Play } from "lucide-react";

interface Props {
  trackDuration?: number;
  playCount?: number;
  favoriteCount?: number;
  className?: string;
}

export const TrackCardAdditionalInfo: FC<Props> = ({
  trackDuration,
  playCount,
  favoriteCount,
  className,
}) => {
  return (
    <div className={cn("", className)}>
      {trackDuration && (
        <span className="flex items-center gap-2 text-neutral-500">
          <Clock size={20} /> Duration:
          <span className="font-semibold">
            {formatTrackTime(trackDuration)}
          </span>
        </span>
      )}
      {playCount && (
        <span className="flex items-center gap-2 text-neutral-500">
          <Play size={20} /> Total play count:
          <span className="font-semibold">{playCount}</span>
        </span>
      )}
      {favoriteCount && (
        <span className="flex items-center gap-2 text-neutral-500">
          <Heart size={20} /> Favorite count:
          <span className="font-semibold">{favoriteCount}</span>
        </span>
      )}
    </div>
  );
};
