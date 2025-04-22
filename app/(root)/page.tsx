import {
  Container,
  Header,
  Sidebar,
  PlaylistsSlider,
  TopPlaylists,
} from "@/shared/components/shared";

export default function Home() {
  return (
    <Container>
      <div className="flex">
        <Sidebar className="min-w-1/6" />

        <div className="ml-15 pt-6 pb-8 w-[79%] overflow-x-hidden">
          <Header />

          <PlaylistsSlider />

          <TopPlaylists className="mt-8" />
        </div>
      </div>
    </Container>
  );
}
