"use client";

import { TrackList } from "@/shared/components/shared";
import { useRecentTracksStore } from "@/shared/store/recentTracks";
import Head from "next/head";
import { useShallow } from "zustand/shallow";

export const dynamic = "force-dynamic";

export default function RecentTracksPage() {
  const [isLoading, recentTracks] = useRecentTracksStore(
    useShallow((state) => [state.isLoading, state.recentTracks]),
  );

  return (
    <>
      <Head>
        <title>Recent Tracks</title>
      </Head>

      <div className="mt-10">
        <h1 className="text-5xl font-semibold text-neutral-600">
          Recent tracks
        </h1>

        <TrackList
          tracks={recentTracks}
          isLoading={isLoading}
          className="mt-5"
        />
      </div>
    </>
  );
}
