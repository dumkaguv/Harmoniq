import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    const res = await fetch(
      `${process.env.AUDIUS_API}${pathname.toString().replace("/api", "")}`,
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch stream" },
        { status: res.status },
      );
    }

    const streamUrl = res.url;

    return NextResponse.json({ src: streamUrl });
  } catch (e) {
    console.log("Failed to fetch stream", e);
  }
}
