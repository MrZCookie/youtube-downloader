"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function VideoCard(props: { videoID: string }) {
	const [videoData, setVideoData] = useState<any>(null);
	const [selectedFormat, setSelectedFormat] = useState("mp4");

	useEffect(() => {
		async function fetchVideoData() {
			try {
				const response = await fetch(`/api/get-info?id=${props.videoID}`);
				const data = await response.json();
				setVideoData(data);
			} catch (error) {
				console.error("Failed to fetch video data:", error);
			}
		}
		fetchVideoData();
	}, [props.videoID]);

	const handleDownload = async () => {
		try {
			const response = await fetch(
				`/api/download?id=${props.videoID}&format=${selectedFormat}`,
			);

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${videoData.title}.${selectedFormat}`;
			a.click();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Failed to download video:", error);
		}
	};

	if (!videoData) {
		return (
			<div className="size-12 animate-spin rounded-full border-8 border-t-primary" />
		);
	}

	return (
		<div className="flex max-w-2xl items-center rounded-lg border bg-background">
			<Image
				src={videoData.thumbnail}
				alt={videoData.title}
				width={200}
				height={112}
				className="rounded-l-lg"
				style={{ aspectRatio: "200/112", objectFit: "cover" }}
			/>
			<p className="p-3 font-medium">{videoData.title}</p>
			<div className="flex gap-2 p-3">
				<Select value={selectedFormat} onValueChange={setSelectedFormat}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="mp4">MP4</SelectItem>
						<SelectItem value="mp3">MP3</SelectItem>
					</SelectContent>
				</Select>
				<Button onClick={handleDownload}>Download</Button>
			</div>
		</div>
	);
}
