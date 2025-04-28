import { RefObject } from "react";
import { useShallow } from "zustand/shallow";
import {
  useAudio,
  useAutoPlay,
  useCheckAndSwitchTrack,
  usePlaybarHeight,
  usePlaybarLocalStorage,
} from "../hooks";

import { usePlaybar as usePlaybarStore } from "@/shared/store/playbar";

export const usePlaybar = (
  audioRef: RefObject<HTMLAudioElement | null>,
  playbarRef: RefObject<HTMLDivElement | null>,
) => {
  const [track, audioSrc, trackDuration, currentTime, isLoading] =
    usePlaybarStore(
      useShallow((state) => [
        state.track,
        state.audioSrc,
        state.trackDuration,
        state.currentTime,
        state.isLoading,
      ]),
    );
  useAudio(audioRef);
  usePlaybarLocalStorage();
  useAutoPlay();
  useCheckAndSwitchTrack();
  usePlaybarHeight(playbarRef);

  return { track, audioSrc, trackDuration, currentTime, isLoading };
};
