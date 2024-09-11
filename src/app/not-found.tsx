import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="text-4xl font-semibold">Not Found</h1>
				<p className="mt-1 text-muted-foreground">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<Button asChild className="mt-4">
					<Link href="/">Return Home</Link>
				</Button>
			</div>
		</main>
	);
}
