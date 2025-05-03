import {
  PlaylistsSlider,
  TopPlaylists,
  TopTracks,
} from "@/shared/components/shared";

export default function Home() {
  return (
    <>
      <PlaylistsSlider />

      <div className="mt-8 flex gap-10 max-2xl:gap-6 max-xl:flex-col-reverse">
        <TopPlaylists />
        <TopTracks />
      </div>
    </>
  );
}
