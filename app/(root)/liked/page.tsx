"use client";

import { TrackList } from "@/shared/components/shared";
import { useLikedTracksStore } from "@/shared/store/likedTracks";
import Head from "next/head";
import { useShallow } from "zustand/shallow";

export const dynamic = "force-dynamic";

export default function LikedTracksPage() {
  const [isLoading, likedTracks] = useLikedTracksStore(
    useShallow((state) => [state.isLoading, state.likedTracks]),
  );

  return (
    <>
      <Head>
        <title>Liked Tracks</title>
      </Head>

      <div className="mt-10">
        <h1 className="text-5xl font-semibold text-neutral-600">
          My liked tracks
        </h1>

        <TrackList
          tracks={likedTracks}
          isLoading={isLoading}
          className="mt-5"
        />
      </div>
    </>
  );
}
