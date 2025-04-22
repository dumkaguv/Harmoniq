import { Playlist } from "@/types/audius";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const fetchPlaylists = async (query: string) => {
  const { data } = await axiosInstance.get<Playlist[]>(
    `${ApiRoutes.PLAYLISTS}/${query}`,
  );

  return data;
};
