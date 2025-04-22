import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Playlist } from "@/types/audius";
import Link from "next/link";

interface Props {
  playlist: Playlist;
  className?: string;
}

export const PlaylistCard: FC<Props> = ({ playlist, className }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex w-[190px] flex-col gap-3 hover:scale-[1.025] hover:text-black",
        className,
      )}
    >
      <img
        src={playlist.artwork["480x480"]}
        className="h-[200px] w-[190px] shrink-0 rounded-sm shadow-md"
        alt=""
        width={190}
        height={200}
      />
      <div>
        <h3 className="truncate text-base text-gray-600">{playlist.playlist_name}</h3>
        <p className="truncate text-sm text-neutral-500">
          {playlist.user.name}
        </p>
      </div>
    </Link>
  );
};


