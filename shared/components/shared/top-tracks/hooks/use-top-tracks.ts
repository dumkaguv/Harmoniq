import { Api } from "@/shared/services/api-client";
import { Track } from "@/types/audius";
import { useEffect, useState } from "react";

export const useTopTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        const data = await Api.tracks.fetchTracks("trending", "time=week");
        setTracks(data);
      } catch (e) {
        console.log("front fetchTracks error", e);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTracks();
  }, []);

  return {
    tracks,
    isLoading,
  };
};
