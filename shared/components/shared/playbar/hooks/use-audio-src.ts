import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { Track } from "@/types/audius";
import { useEffect } from "react";

export const useAudioSrc = (track: Track | null) => {
  const setAudioSrc = useCurrentPlayingTrack((state) => state.setAudioSrc);

  useEffect(() => {
    if (track) {
      setAudioSrc(track);
    }
  }, [track, setAudioSrc]);
};
