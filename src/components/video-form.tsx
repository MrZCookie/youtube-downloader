"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	videoURL: z.string().refine(
		(url) => {
			const regex =
				/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)[\w-]+(&\S*)?$/;
			return regex.test(url);
		},
		{
			message: "Please submit a valid YouTube URL.",
		},
	),
});

export function VideoForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			videoURL: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const url = new URL(values.videoURL);
		const videoId = url.searchParams.get("v");

		if (videoId) {
			window.location.href = `/watch?v=${videoId}`;
		} else {
			console.error("Video ID not found");
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-md space-y-4"
			>
				<FormField
					control={form.control}
					name="videoURL"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="text"
									placeholder="Enter YouTube video URL"
									className="w-full"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Download
				</Button>
			</form>
		</Form>
	);
}
