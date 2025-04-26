import {
  PlaylistsSlider,
  TopPlaylists,
  TopTracks,
} from "@/shared/components/shared";

export default function Home() {
  return (
    <>
      <PlaylistsSlider />

      <div className="mt-8 flex gap-10">
        <TopPlaylists />
        <TopTracks />
      </div>
    </>
  );
}
