import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "YouTube Downloader",
	description: "Download any YouTube video to your computer!",
};

import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<section className="fixed bottom-4 right-4">
						<ThemeToggle />
					</section>
				</ThemeProvider>
			</body>
		</html>
	);
}
