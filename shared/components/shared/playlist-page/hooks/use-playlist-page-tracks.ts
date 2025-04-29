import { Api } from "@/shared/services/api-client";
import { Track } from "@/types/audius";
import { useEffect, useState } from "react";

export interface TrackWithIndexes extends Track {
  index: number;
}

export const usePlaylistPageTracks = (playlistId: string) => {
  const [tracks, setTracks] = useState<TrackWithIndexes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        const data = await Api.playlists.fetchPlaylistTracks(playlistId);

        setTracks(
          data.map((item: Track, index: number) => ({
            ...item,
            index,
          })),
        );
      } catch (e) {
        console.log("front fetchTracks error", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [playlistId]);

  return { tracks, setTracks, isLoading };
};
