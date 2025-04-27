"use client";

import { TrackList } from "@/shared/components/shared";
import { useLikedTracksStore } from "@/shared/store/likedTracks";

export default function LikedTracksPage() {
  const likedTracks = useLikedTracksStore((state) => state.likedTracks);

  return (
    <div className="mt-10">
      <h1 className="text-5xl font-semibold text-neutral-600">
        My liked tracks
      </h1>

      <TrackList tracks={likedTracks} className="mt-5" />
    </div>
  );
}
