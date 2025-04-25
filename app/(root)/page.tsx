import {
  Container,
  Header,
  Sidebar,
  PlaylistsSlider,
  TopPlaylists,
  TopTracks,
  Playbar,
} from "@/shared/components/shared";

export default function Home() {
  return (
    <Container>
      <Playbar />

      <div className="flex">
        <Sidebar className="min-w-1/6" />

        <div className="ml-15 w-[80%] overflow-x-hidden pt-6 pb-8">
          <Header />

          <PlaylistsSlider />

          <div className="mt-8 flex gap-10">
            <TopPlaylists />
            <TopTracks />
          </div>
        </div>
      </div>
    </Container>
  );
}
