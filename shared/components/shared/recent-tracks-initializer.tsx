"use client";

import { useEffect } from "react";
import { useRecentTracksStore } from "@/shared/store/recentTracks";

export const RecentTracksInitializer = () => {
  const initializeRecentTracks = useRecentTracksStore(
    (state) => state.initializeRecentTracks,
  );

  useEffect(() => {
    initializeRecentTracks();
  }, [initializeRecentTracks]);

  return null;
};
