import { PlaylistPageCard } from "@/shared/components/shared";
import { Api } from "@/shared/services/api-client";

export default async function TracksPage() {
  const playlists = await Api.playlists.fetchPlaylists(
    "trending",
    "time=allTime",
  );

  return (
    <div className="mt-10">
      <h1 className="text-5xl font-semibold text-neutral-600">Top playlists</h1>

      <ul className="mt-10 grid gap-5">
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <PlaylistPageCard
              className="pl-1.5 transition-transform duration-200 hover:scale-[1.01]"
              playlist={playlist}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
