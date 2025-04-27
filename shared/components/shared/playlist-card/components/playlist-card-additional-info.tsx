import React, { FC } from "react";
import { AudioLines, Heart, Play } from "lucide-react";
import { Playlist } from "@/types/audius";

interface Props {
  playlist: Playlist;
}

export const PlaylistCardAdditionalInfo: FC<Props> = ({ playlist }) => {
  return (
    <>
      <div className="mt-5 flex items-center gap-2">
        <AudioLines size={24} />
        <span className="text-neutral-600">
          Playlist track count:{" "}
          <span className="font-semibold">{playlist.track_count}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Play size={24} />
        <span className="text-neutral-600">
          Total play count:{" "}
          <span className="font-semibold">{playlist.total_play_count}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Heart size={24} />
        <span className="text-neutral-600">
          Favorite count:{" "}
          <span className="font-semibold">{playlist.favorite_count}</span>
        </span>
      </div>
    </>
  );
};
