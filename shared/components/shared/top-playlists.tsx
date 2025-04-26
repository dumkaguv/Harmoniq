"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import * as PlaylistCard from "@/shared/components/shared/playlist-card";
import { usePlaylistsStore } from "@/shared/store/playlists";
import { useShallow } from "zustand/shallow";
import Link from "next/link";

interface Props {
  className?: string;
}

export const TopPlaylists: FC<Props> = ({ className }) => {
  const [playlists, isLoading] = usePlaylistsStore(
    useShallow((state) => [state.items, state.isLoading]),
  );

  const skeletons = new Array(12)
    .fill(0)
    .map((_, index) => (
      <PlaylistCard.Skeleton
        key={index}
        imageHeight={56}
        imageWidth={56}
        titleHeight={22}
        titleWidth={170}
        authorHeight={20}
        authorWidth={95}
        isHorizontal={true}
      />
    ));

  return (
    <div className={cn("", className)}>
      <h3 className="text-2xl font-semibold text-black">Top Playlists</h3>
      <ul
        className={cn(
          "mt-5 grid w-fit grid-cols-3 grid-rows-4 gap-x-8 gap-y-5",
          isLoading && "gap-x-9",
        )}
      >
        {!isLoading &&
          playlists.length > 0 &&
          playlists.slice(0, 12).map((playlist) => (
            <li
              key={playlist.id}
              className="p-0.5 duration-200 hover:scale-[1.02]"
            >
              <Link href={`/playlist/${playlist.id}`} className="flex items-center gap-2">
                <PlaylistCard.Image
                  imageSrc={playlist.artwork["150x150"]}
                  width={56}
                  height={56}
                  className="shadow-lg"
                />
                <div className="max-w-[170px]">
                  <PlaylistCard.Title
                    title={playlist.playlist_name}
                    className="truncate"
                  />
                  <PlaylistCard.Author
                    author={playlist.user.name}
                    className="truncate"
                  />
                </div>
              </Link>
            </li>
          ))}
        {isLoading && skeletons}
      </ul>
    </div>
  );
};
