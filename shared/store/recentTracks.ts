import { Track } from "@/types/audius";
import { create } from "zustand";

interface RecentTracksState {
  recentTracks: Track[];
  recentTracksIdsSet: Set<string>;
  isLoading: boolean;
  addTrackToRecent: (trackId: string, track: Track) => void;
  initializeRecentTracks: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useRecentTracksStore = create<RecentTracksState>((set, get) => ({
  recentTracks: [],
  recentTracksIdsSet: new Set(),
  isLoading: true,

  addTrackToRecent: (trackId, track) => {
    if (!get().recentTracksIdsSet.has(trackId)) {
      const updated = [track, ...get().recentTracks];
      localStorage.setItem("recentTracks", JSON.stringify(updated));
      set({ recentTracks: updated });
      set({ recentTracksIdsSet: new Set(updated.map((track) => track.id)) });
    }
  },

  initializeRecentTracks: () => {
    set({ isLoading: true });

    const storedTracks = JSON.parse(
      localStorage.getItem("recentTracks") || "[]",
    ) as Track[];
    set({
      recentTracks: storedTracks,
      recentTracksIdsSet: new Set(storedTracks.map((track) => track.id)),
    });
    set({ isLoading: false });
  },

  setIsLoading: (isLoading) => set({ isLoading }),
}));
