import { InstructionsCard } from "@/components/instructions-card";

export default function DownloaderLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-12">
			<section className="flex flex-col items-center justify-center space-y-4 text-center">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
						Download YouTube Videos
					</h1>
					<p className="max-w-[700px] text-muted-foreground md:text-xl">
						Easily download your favorite YouTube videos in high quality.
					</p>
				</div>
				{children}
			</section>
			<InstructionsCard />
		</main>
	);
}
