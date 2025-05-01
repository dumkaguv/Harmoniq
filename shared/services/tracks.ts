import { Track } from "@/types/audius";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const fetchTracks = async (query: string, params?: string) => {
  const { data } = await axiosInstance.get<Track[]>(
    `${ApiRoutes.TRACKS}/${query}${params ? `?${params}` : ""}`,
  );

  return data;
};

export const getTrackAudioSrc = async (trackId: string) => {
  const { data } = await axiosInstance.get<{ src: string }>(
    `${ApiRoutes.TRACKS}/${trackId}/stream`,
  );

  return data.src;
};

export const fetchSearchTracks = async (
  query: string,
  limit: number = 20,
  offset: number = 0,
) => {
  const { data } = await axiosInstance.get<Track[]>(
    `${ApiRoutes.TRACKS}/search?query=${query}&limit=${limit}&offset=${offset}`,
  );

  return data;
};
