import { Track, User } from "@/types/audius";
import { ApiRoutes } from "./constants";
import axios from "axios";

export const fetchUser = async (userId: string) => {
  const { data } = await axios.get<User>(
    `https://api.audius.co/v1/${ApiRoutes.USERS}/${userId}`,
  );

  // @ts-expect-error nested data
  return data.data;
};

export const fetchPlaylistTracks = async (
  userId: string,
  limit: number = 20,
  offset: number = 0,
) => {
  const { data } = await axios.get<Track[]>(
    `https://api.audius.co/v1/${ApiRoutes.USERS}/${userId}/tracks?limit=${limit}&offset=${offset}`,
  );

  // @ts-expect-error nested data
  return data.data;
};
