import { getRandomInt } from "@/shared/lib";
import { usePlaybar } from "@/shared/store/playbar";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const useCheckAndSwitchTrack = () => {
  const [
    audioRef,
    trackQueue,
    currentPlayingTrackIndex,
    isRepeating,
    isShuffling,
    setCurrentPlayingTrackIndex,
    setTrack,
  ] = usePlaybar(
    useShallow((state) => [
      state.audioRef,
      state.trackQueue,
      state.currentPlayingTrackIndex,
      state.isRepeating,
      state.isShuffling,
      state.setCurrentPlayingTrackIndex,
      state.setTrack,
    ]),
  );

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) {
      return;
    }

    const handleEnded = () => {
      if (trackQueue.length > 1 && !isRepeating) {
        const nextTrackIndex = !isShuffling
          ? currentPlayingTrackIndex + 1
          : getRandomInt(0, trackQueue.length);

        if (nextTrackIndex < trackQueue.length) {
          setCurrentPlayingTrackIndex(nextTrackIndex);
          setTrack(trackQueue[nextTrackIndex]);
        }
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => audio.removeEventListener("ended", handleEnded);
  }, [
    audioRef,
    trackQueue,
    isRepeating,
    setCurrentPlayingTrackIndex,
    setTrack,
    currentPlayingTrackIndex,
    isShuffling,
  ]);
};
