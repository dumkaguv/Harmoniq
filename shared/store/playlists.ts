import { Playlist } from "@/types/audius";
import { create } from "zustand";
import { Api } from "../services/api-client";

export interface PlaylistsState {
  items: Playlist[];
  isLoading: boolean;
  isError: boolean;

  fetchPlaylists: (query: string) => Promise<void>;
}

export const usePlaylistsStore = create<PlaylistsState>((set) => ({
  items: [],
  isError: false,
  isLoading: true,

  fetchPlaylists: async (query: string) => {
    try {
      set({ isLoading: true, isError: false });
      const data = await Api.playlists.fetchPlaylists(query);
      set({ items: data });
    } catch (e) {
      console.log("front fetchPlaylists error", e);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));
