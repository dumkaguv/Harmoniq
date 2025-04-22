"use client";

import React, { FC, useEffect, useState } from "react";

import { Playlist } from "@/types/audius";
import { Api } from "@/shared/services/api-client";
import Link from "next/link";
import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface Props {
  className?: string;
}

export const SidebarPlaylists: FC<Props> = ({ className }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setIsLoading(true);
        const data = await Api.playlists.fetchPlaylists("trending");
        setPlaylists(data);
      } catch (e) {
        console.log("front fetchPlaylists error", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  console.log(isLoading);

  return (
    <div className={cn("p-4", className)}>
      <h3 className="font-semibold text-neutral-600">Playlists</h3>
      <ul className="mt-3 grid gap-3">
        {isLoading && !playlists.length
          ? new Array(12)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="h-6 w-[250px]" />
              ))
          : playlists.map((playlist) => (
              <li key={playlist.id}>
                <Link href="/" className="hover:text-accent text-neutral-600">
                  {playlist.playlist_name}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};
