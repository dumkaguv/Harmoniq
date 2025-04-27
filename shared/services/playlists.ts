import { Playlist, Track } from "@/types/audius";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";
import axios from "axios";

export const fetchPlaylists = async (query: string, params?: string) => {
  const { data } = await axiosInstance.get<Playlist[]>(
    `${ApiRoutes.PLAYLISTS}/${query}${params ? `?${params}` : ""}`,
  );

  return data;
};

export const fetchPlaylist = async (playlistId: string) => {
  try {
    const { data } = await axiosInstance.get<Playlist[]>(
      `${ApiRoutes.PLAYLISTS}/${playlistId}`,
    );

    return data[0];
  } catch (e) {
    console.log("front fetchPlaylist error", e);
  }
};

export const fetchPlaylistTracks = async (playlistId: string) => {
  const { data } = await axios.get<Track[]>(
    `https://api.audius.co/v1/${ApiRoutes.PLAYLISTS}/${playlistId}/tracks`,
  );

  // @ts-expect-error nested data
  return data.data;
};
