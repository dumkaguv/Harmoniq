import { NextRequest, NextResponse } from "next/server";
import { Track } from "@/types/audius";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams.toString();
    const { pathname } = req.nextUrl;

    const res = await fetch(
      `${process.env.AUDIUS_API}${pathname.toString().replace("/api", "")}${searchParams.length > 0 ? "?/" + searchParams : ""}`,
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch tracks" },
        { status: res.status },
      );
    }

    const tracks = await res.json();

    return NextResponse.json(tracks.data as Track[]);
  } catch (e) {
    console.log("Failed to fetch tracks", e);
  }
}
