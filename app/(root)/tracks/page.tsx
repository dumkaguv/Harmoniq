import { TrackList } from "@/shared/components/shared";
import { Api } from "@/shared/services/api-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harmoniq | Tracks",
};

export const dynamic = "force-dynamic";

export default async function TracksPage() {
  const tracks = await Api.tracks.fetchTracks("trending", "time=year");

  return (
    <div className="mt-10">
      <h1 className="text-5xl font-semibold text-neutral-600">
        Top 100 tracks
      </h1>

      <TrackList tracks={tracks} className="mt-5" />
    </div>
  );
}
