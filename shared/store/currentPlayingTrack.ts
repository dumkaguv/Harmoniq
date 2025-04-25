import { Track } from "@/types/audius";
import { RefObject } from "react";
import { create } from "zustand";
import { Api } from "../services/api-client";

export interface CurrentPlayingTrack {
  track: Track | null;
  trackDuration: number;
  currentTime: number;
  currentVolume: number;
  audioSrc: string;
  audioRef: RefObject<HTMLAudioElement | null> | null;

  isPlaying: boolean;
  isRepeating: boolean;
  isLoading: boolean;

  setTrack: (track: Track) => void;
  setTrackDuration: (trackDuration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setCurrentVolume: (currentVolume: number) => void;
  setAudioSrc: (track: Track) => void;
  setAudioRef: (audioRef: RefObject<HTMLAudioElement | null>) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsRepeating: (isRepeating: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useCurrentPlayingTrack = create<CurrentPlayingTrack>(
  (set, get) => ({
    track: null,
    trackDuration: 0,
    currentTime: 0,
    currentVolume: 1,
    audioSrc: "",
    audioRef: null,
    isPlaying: false,
    isRepeating: false,
    isLoading: false,

    setTrack: (track) => set({ track }),  
    setTrackDuration: (trackDuration) => set({ trackDuration }),
    setCurrentTime: (currentTime) => set({ currentTime }),
    setCurrentVolume: (currentVolume) => set({ currentVolume }),
    setAudioSrc: async (track) => {
      try {
        set({ isLoading: true });
        const audioSrc = await Api.tracks.getTrackAudioSrc(track.id);
        const audio = get().audioRef?.current;

        if (audio) {
          audio.src = audioSrc;
        }

        set({ audioSrc });
      } catch (e) {
        console.log("front getAudioSrc error", e);
      } finally {
        set({ isLoading: false });
      }
    },
    setAudioRef: (audioRef) => set({ audioRef }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setIsRepeating: (isRepeating) => set({ isRepeating }),
    setIsLoading: (isLoading) => set({ isLoading }),
  }),
);
