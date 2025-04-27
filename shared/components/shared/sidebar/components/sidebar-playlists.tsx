"use client";

import React, { FC, useEffect } from "react";

import Link from "next/link";
import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/components/ui";
import { usePlaylistsStore } from "@/shared/store/playlists";
import { useShallow } from "zustand/shallow";
import { usePathname } from "next/navigation";

interface Props {
  activeLinkStyles?: string;
  className?: string;
}

export const SidebarPlaylists: FC<Props> = ({
  activeLinkStyles,
  className,
}) => {
  const [playlists, isLoading, fetchPlaylists] = usePlaylistsStore(
    useShallow((state) => [state.items, state.isLoading, state.fetchPlaylists]),
  );

  const pathname = usePathname();

  useEffect(() => {
    fetchPlaylists("trending", "time=week");
  }, [fetchPlaylists]);

  return (
    <div className={cn("p-4", className)}>
      <h3 className="font-semibold text-neutral-600">Playlists</h3>
      <ul className="mt-3 grid gap-3">
        {isLoading && !playlists.length
          ? new Array(12)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="h-6 w-[220px]" />
              ))
          : playlists.map((playlist) => (
              <li
                className={`relative before:-left-4 ${pathname.includes(playlist.id) && activeLinkStyles}`}
                key={playlist.id}
              >
                <Link
                  href={`/playlist/${playlist.id}`}
                  className="hover:text-accent flex text-neutral-600"
                >
                  {playlist.playlist_name}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};
