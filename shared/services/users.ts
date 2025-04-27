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

export const fetchPlaylistTracks = async (userId: string) => {
  const { data } = await axios.get<Track[]>(
    `https://api.audius.co/v1/${ApiRoutes.USERS}/${userId}/tracks`,
  );

  return data;
};
