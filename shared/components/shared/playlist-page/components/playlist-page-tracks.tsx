"use client";

import React, { FC } from "react";
import { Playlist } from "@/types/audius";
import { usePlaylistPageTracks } from "../hooks";
import { TracksTable } from "@/shared/components/shared";

interface Props {
  playlist: Playlist;
}

export const PlaylistPageTracks: FC<Props> = ({ playlist }) => {
  const { tracks, setTracks, isLoading } = usePlaylistPageTracks(playlist.id);

  return (
    <TracksTable
      tracks={tracks}
      setTracks={setTracks}
      isLoading={isLoading}
      className="mt-10"
    />
  );
};
