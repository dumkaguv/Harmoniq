import React, { FC } from "react";
import { AudioLines, ExternalLink, Heart, Play } from "lucide-react";
import * as PlaylistCard from "@/shared/components/shared/playlist-card";
import Link from "next/link";
import { Playlist } from "@/types/audius";
import { cn } from "@/shared/lib";

interface Props {
  playlist: Playlist;
  className?: string;
}


export const PlaylistPageCard: FC<Props> = ({ playlist, className }) => {
  return (
    <div className={cn("flex gap-5", className)}>
      <PlaylistCard.Image
        imageSrc={playlist.artwork["1000x1000"]}
        width={350}
        height={350}
        className={cn("w-[350px] h-[350px]",)}
        alt={playlist.playlist_name}
      />
      <div className="flex flex-col gap-3">
        <PlaylistCard.Title
          title={playlist.playlist_name || "Error"}
          className="text-accent text-4xl font-semibold capitalize"
        />
        <Link className="w-fit" href="/">
          <PlaylistCard.Author
            author={playlist.user.name || "Error"}
            className="hover:text-accent flex gap-2 text-lg transition-colors duration-200"
            endAdornment={<ExternalLink size={12} />}
          />
        </Link>
        {playlist.description && (
          <PlaylistCard.Description description={playlist.description} />
        )}
        <div className="flex flex-col gap-2">
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
        </div>
      </div>
    </div>
  );
};
