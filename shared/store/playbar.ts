import { Track } from "@/types/audius";
import { RefObject } from "react";
import { create } from "zustand";
import { Api } from "../services/api-client";
import { useRecentTracksStore } from "./recentTracks";

export interface Playbar {
  track: Track | null;
  trackQueue: Track[];
  currentPlayingTrackIndex: number;
  trackDuration: number;
  currentTime: number;
  currentVolume: number;
  audioSrc: string;
  audioRef: RefObject<HTMLAudioElement | null> | null;

  isPlaying: boolean;
  isRepeating: boolean;
  isShuffling: boolean;
  isLoading: boolean;

  setTrack: (track: Track, trackQueue?: Track[]) => void;
  setTrackQueue: (trackQueue: Track[]) => void;
  setCurrentPlayingTrackIndex: (index: number) => void;
  setTrackDuration: (trackDuration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setCurrentVolume: (currentVolume: number) => void;
  setAudioSrc: (track: Track) => void;
  setAudioRef: (audioRef: RefObject<HTMLAudioElement | null> | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsRepeating: (isRepeating: boolean) => void;
  setIsShuffling: (isShuffling: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  savePlaybarToLocalStorage: () => void;
  loadPlaybarFromLocalStorage: () => void;
}

export const usePlaybar = create<Playbar>((set, get) => ({
  track: null,
  trackQueue: [],
  currentPlayingTrackIndex: 0,
  trackDuration: 0,
  currentTime: 0,
  currentVolume: 1,
  audioSrc: "",
  audioRef: null,

  isPlaying: false,
  isRepeating: false,
  isShuffling: false,
  isLoading: true,

  setTrack: async (track, trackQueue) => {
    set({ isLoading: true });
    get().audioRef?.current?.pause();
    set({ track });

    await get().setAudioSrc(track);
    get().setTrackDuration(track.duration);

    if (trackQueue && trackQueue.length > 0) {
      const newIndex = trackQueue.findIndex(
        (track) => track.id === get().track?.id,
      );
      set({ trackQueue, currentPlayingTrackIndex: newIndex });
    }

    get().savePlaybarToLocalStorage();
    useRecentTracksStore.getState().addTrackToRecent(track.id, track);
    set({ isLoading: false });
  },
  setTrackQueue: (trackQueue) => set({ trackQueue }),
  setCurrentPlayingTrackIndex: (index) => {
    if (index < 0 || index >= get().trackQueue.length) {
      return;
    }

    set({ currentPlayingTrackIndex: index });
    get().setTrack(get().trackQueue[index]);
    get().savePlaybarToLocalStorage();
  },
  setTrackDuration: (trackDuration) => set({ trackDuration }),
  setCurrentTime: (currentTime) => set({ currentTime }),

  setCurrentVolume: (currentVolume) => {
    set({ currentVolume });
    get().savePlaybarToLocalStorage();
  },
  setAudioSrc: async (track) => {
    try {
      const audioSrc = await Api.tracks.getTrackAudioSrc(track.id);
      const audio = get().audioRef?.current;

      if (audio) {
        audio.src = audioSrc;
      }

      set({ audioSrc });
    } catch (e) {
      console.log("front getAudioSrc error", e);
      set({ isLoading: false });
    }
  },
  setAudioRef: (audioRef) => set({ audioRef }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsRepeating: (isRepeating) => {
    set({ isRepeating });
    get().savePlaybarToLocalStorage();
  },
  setIsShuffling: (isShuffling) => {
    set({ isShuffling });
    get().savePlaybarToLocalStorage();
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  savePlaybarToLocalStorage: () => {
    const settings = {
      track: get().track,
      trackQueue: get().trackQueue,
      currentPlayingTrackIndex: get().currentPlayingTrackIndex || 0,
      audioSrc: get().audioSrc,
      trackDuration: get().trackDuration,
      currentVolume: get().currentVolume || 1,
      isRepeating: Number(get().isRepeating) || 0,
      isShuffling: Number(get().isShuffling) || 0,
    };
    localStorage.setItem("playbarSettings", JSON.stringify(settings));
  },
  loadPlaybarFromLocalStorage: () => {
    set({ isLoading: true, isPlaying: false });
    const {
      track,
      trackQueue,
      currentPlayingTrackIndex,
      audioSrc,
      trackDuration,
      currentVolume,
      isRepeating,
      isShuffling,
    } = JSON.parse(localStorage.getItem("playbarSettings") || "[]");
    set({
      track,
      trackQueue,
      currentPlayingTrackIndex,
      audioSrc,
      trackDuration,
      currentVolume,
      isRepeating,
      isShuffling,
    });
    set({ isLoading: false, isPlaying: false });
  },
}));
