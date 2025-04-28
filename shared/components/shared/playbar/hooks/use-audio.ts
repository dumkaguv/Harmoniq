import { useEffect } from "react";
import { usePlaybar } from "@/shared/store/playbar";
import { useShallow } from "zustand/shallow";

export const useAudio = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const [track, audioSrc, setCurrentTime, setTrackDuration, setAudioRef] =
    usePlaybar(
      useShallow((state) => [
        state.track,
        state.audioSrc,
        state.setCurrentTime,
        state.setTrackDuration,
        state.setAudioRef,
      ]),
    );

  useEffect(() => {
    setAudioRef(audioRef);
  }, [audioRef, setAudioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [track, audioSrc, audioRef, setCurrentTime, setTrackDuration]);
};
