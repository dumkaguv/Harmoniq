import { usePlaybar } from "@/shared/store/playbar";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useIsUserInteracted } from "./";

export const useAutoPlay = () => {
  const [audioRef, setIsPlaying, isLoading] = usePlaybar(
    useShallow((state) => [
      state.audioRef,
      state.setIsPlaying,
      state.isLoading,
    ]),
  );
  const isUserInteracted = useIsUserInteracted();

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const handleCanPlay = () => {
      if (!isUserInteracted) {
        return;
      }

      audio.play();
      setIsPlaying(true);
    };

    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [audioRef, setIsPlaying, isLoading, isUserInteracted]);
};
