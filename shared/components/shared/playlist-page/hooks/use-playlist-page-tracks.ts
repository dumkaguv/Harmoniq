import { Api } from "@/shared/services/api-client";
import { Track } from "@/types/audius";
import { useEffect, useState } from "react";

export const usePlaylistPageTracks = (playlistId: string) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        const data = await Api.playlists.fetchPlaylistTracks(playlistId);
        setTracks(data);
      } catch (e) {
        console.log("front fetchTracks error", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [playlistId]);

  return { tracks, isLoading };
};
