import { VideoCard } from "@/components/video-card";

export default function WatchPage({
	searchParams,
}: {
	searchParams: { [v: string]: string };
}) {
	return <VideoCard videoID={searchParams.v} />;
}
