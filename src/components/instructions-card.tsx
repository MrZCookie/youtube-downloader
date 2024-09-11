export function InstructionsCard() {
	return (
		<section className="grid max-w-5xl divide-y divide-border rounded-lg border md:grid-cols-3 md:divide-x md:divide-y-0">
			<div className="grid gap-1 p-8 md:p-10">
				<h3 className="text-xl font-bold">Step 1</h3>
				<p className="text-muted-foreground">
					Copy the URL of the YouTube video you want to download.
				</p>
			</div>
			<div className="grid gap-1 p-8 md:p-10">
				<h3 className="text-xl font-bold">Step 2</h3>
				<p className="text-muted-foreground">
					Paste the URL into the input field and click the Download button.
				</p>
			</div>
			<div className="grid gap-1 p-8 md:p-10">
				<h3 className="text-xl font-bold">Step 3</h3>
				<p className="text-muted-foreground">
					Your video will be downloaded in high quality. Enjoy!
				</p>
			</div>
		</section>
	);
}
