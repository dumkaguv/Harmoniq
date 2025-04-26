import { useEffect } from "react";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { useShallow } from "zustand/shallow";
import { useAudioSrc } from "./";

export const useAudio = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const [track, audioSrc, setCurrentTime, setTrackDuration, setAudioRef] =
    useCurrentPlayingTrack(
      useShallow((state) => [
        state.track,
        state.audioSrc,
        state.setCurrentTime,
        state.setTrackDuration,
        state.setAudioRef,
      ]),
    );

  useAudioSrc(track);

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
  }, [track, audioSrc, audioRef, setCurrentTime, setTrackDuration]);

  useEffect(() => {
    setAudioRef(audioRef);
  }, [audioRef, setAudioRef]);
};
