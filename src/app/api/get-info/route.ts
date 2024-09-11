import { NextRequest, NextResponse } from "next/server";

import { getInfo } from "@distube/ytdl-core";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const videoId = searchParams.get("id");

	if (!videoId) {
		return NextResponse.json(
			{ error: "No video ID provided" },
			{ status: 400 },
		);
	}

	try {
		const info = await getInfo(videoId);

		const title = info.videoDetails.title;
		const thumbnail = info.videoDetails.thumbnails?.[0]?.url;

		return NextResponse.json({ title, thumbnail });
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		);
	}
}
