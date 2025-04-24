import { Track } from "@/types/audius";
import { useAudioSrc } from "./useAudioSrc";
import { useEffect, useState } from "react";

export const useAudio = (
  track: Track,
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const { audioSrc, isLoading } = useAudioSrc(track);
  const [currentTime, setCurrentTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setTrackDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioSrc, audioRef]);

  return {
    audioSrc,
    currentTime,
    trackDuration,
    isLoading,
    setTrackDuration,
    setCurrentTime,
  };
};
