import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const useAutoPlay = () => {
  const [audioRef, setIsPlaying, isLoading] = useCurrentPlayingTrack(
    useShallow((state) => [
      state.audioRef,
      state.setIsPlaying,
      state.isLoading,
    ]),
  );

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const handleCanPlay = () => {
      audio.play();
      setIsPlaying(true);
    };

    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [audioRef, setIsPlaying, isLoading]);
};
