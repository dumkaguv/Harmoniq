import { Api } from "@/shared/services/api-client";
import { Track } from "@/types/audius";
import { useEffect, useState } from "react";

export const useAudioSrc = (track: Track) => {
  const [audioSrc, setAudioSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAudioSrc = async () => {
      try {
        setIsLoading(true);
        const audioSrc = await Api.tracks.getTrackAudioSrc(track.id);
        setAudioSrc(audioSrc);
      } catch (e) {
        console.log("front getAudioSrc error", e);
      } finally {
        setIsLoading(false);
      }
    };

    getAudioSrc();
  }, []);

  return {
    audioSrc,
    setAudioSrc,
    isLoading,
  };
};
