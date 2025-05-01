import { Api } from "@/shared/services/api-client";
import { Track } from "@/types/audius";
import { useCallback, useEffect, useState } from "react";

export const useHeaderSearch = () => {
  const [foundTracks, setFoundTracks] = useState<Track[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchedTracks = useCallback(async () => {
    if (!searchValue) return;
    try {
      setIsLoading(true);
      const foundTracks = await Api.tracks.fetchSearchTracks(searchValue);
      setFoundTracks(foundTracks);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue) return;

    const handler = setTimeout(() => {
      fetchSearchedTracks();
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, fetchSearchedTracks]);

  return {
    foundTracks,
    searchValue,
    isFocused,
    isLoading,
    setSearchValue,
    setIsFocused,
  };
};
