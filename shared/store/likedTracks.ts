import { Track } from "@/types/audius";
import { create } from "zustand";

interface LikedTracksState {
  likedTracks: Track[];
  likedTracksIdsSet: Set<string>;
  isLoading: boolean;
  likeTrack: (track: Track) => void;
  unlikeTrack: (trackId: string) => void;
  initializeLikedTracks: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLikedTracksStore = create<LikedTracksState>((set, get) => ({
  likedTracks: [],
  likedTracksIdsSet: new Set(),
  isLoading: true,

  likeTrack: (track) => {
    const updated = [...get().likedTracks, track];
    localStorage.setItem("likedTracks", JSON.stringify(updated));
    set({ likedTracks: updated });
    set({ likedTracksIdsSet: new Set(updated.map((track) => track.id)) });
  },

  unlikeTrack: (trackId) => {
    const updated = get().likedTracks.filter((track) => track.id !== trackId);
    localStorage.setItem("likedTracks", JSON.stringify(updated));
    set({ likedTracks: updated });
    set({ likedTracksIdsSet: new Set(updated.map((track) => track.id)) });
  },

  initializeLikedTracks: () => {
    set({ isLoading: true });

    const storedTracks = JSON.parse(
      localStorage.getItem("likedTracks") || "[]",
    ) as Track[];
    set({
      likedTracks: storedTracks,
      likedTracksIdsSet: new Set(storedTracks.map((track) => track.id)),
    });
    set({ isLoading: false });
  },

  setIsLoading: (isLoading) => set({ isLoading }),
}));
