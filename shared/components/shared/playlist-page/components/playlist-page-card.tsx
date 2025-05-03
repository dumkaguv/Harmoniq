import React, { FC } from "react";
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
    <div className={cn("flex gap-5 max-md:flex-col", className)}>
      <Link href={`/playlist/${playlist.id}`}>
        <PlaylistCard.Image
          imageSrc={playlist.artwork["480x480"]}
          width={350}
          height={350}
          className="w-[350px] min-w-[350px] max-xl:!h-[250px] max-xl:!w-[250px] max-xl:!min-w-[250px]"
          alt={playlist.playlist_name}
        />
      </Link>
      <div className="flex flex-col gap-3 max-md:gap-1">
        <Link href={`/playlist/${playlist.id}`}>
          <PlaylistCard.Title
            title={playlist.playlist_name || "Error"}
            className="text-accent text-4xl font-semibold capitalize"
          />
        </Link>
        <Link className="w-fit" href={`/users/${playlist.user.id}`}>
          <PlaylistCard.Author
            author={playlist.user.name || "Error"}
            className="hover:text-accent flex gap-2 text-lg transition-colors duration-200"
          />
        </Link>
        {playlist.description && (
          <PlaylistCard.Description description={playlist.description} />
        )}
        <div className="flex flex-col gap-2 max-md:gap-1">
          <PlaylistCard.AdditionalInfo playlist={playlist} />
        </div>
      </div>
    </div>
  );
};
