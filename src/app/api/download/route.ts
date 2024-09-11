import { NextRequest, NextResponse } from "next/server";

import { validateID, getInfo, downloadFromInfo } from "@distube/ytdl-core";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const videoID = searchParams.get("id");
	const format = searchParams.get("format");

	if (!videoID || !validateID(videoID)) {
		return NextResponse.json(
			{ error: "Invalid video ID provided" },
			{ status: 400 },
		);
	}

	if (!format || (format !== "mp4" && format !== "mp3")) {
		return NextResponse.json(
			{ error: 'Invalid format, must be either "mp4" or "mp3"' },
			{ status: 400 },
		);
	}

	try {
		const info = await getInfo(videoID);

		let mimeType: string;

		if (format === "mp4") {
			mimeType = "video/mp4";
		} else {
			mimeType = "audio/mpeg";
		}

		const headers = new Headers({
			"Content-Disposition": `attachment; filename="${info.videoDetails.title}.${format}"`,
			"Content-Type": mimeType,
		});

		const videoStream = downloadFromInfo(info, {
			filter: format === "mp4" ? "videoandaudio" : "audioonly",
		});

		const readableStream = new ReadableStream({
			async start(controller) {
				for await (const chunk of videoStream) {
					controller.enqueue(chunk);
				}
				controller.close();
			},
		});

		return new NextResponse(readableStream, {
			headers,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to download video" },
			{ status: 500 },
		);
	}
}
