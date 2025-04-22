import { NextRequest, NextResponse } from "next/server";
import { Playlist } from "@/types/audius";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams.toString();
    const { pathname } = req.nextUrl;

    const res = await fetch(
      `${process.env.AUDIUS_API}${pathname.toString().replace("/api", "")}${searchParams.length > 0 ? "?/" + searchParams : ""}`,
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch playlists" },
        { status: res.status },
      );
    }

    const playlists = await res.json();

    return NextResponse.json(playlists.data as Playlist[]);
  } catch (e) {
    console.log("Failed to fetch playlists", e);
  }
}
