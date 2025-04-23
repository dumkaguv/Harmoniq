import { Track } from "@/types/audius";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const fetchTracks = async (
  query: string,
  params?: string,
) => {
  const { data } = await axiosInstance.get<Track[]>(
    `${ApiRoutes.TRACKS}/${query}${params ? `?/${params}` : ""}`,
  );

  return data;
};
