"use client";

import { useEffect } from "react";
import { useLikedTracksStore } from "@/shared/store/likedTracks";

export const LikedTracksInitializer = () => {
  const initializeLikedTracks = useLikedTracksStore(
    (state) => state.initializeLikedTracks,
  );

  useEffect(() => {
    initializeLikedTracks();
  }, [initializeLikedTracks]);

  return null;
};
