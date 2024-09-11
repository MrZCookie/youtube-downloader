import type { MetadataRoute } from "next";

import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
	const domain = headers().get("host");

	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `https://${domain}/sitemap.xml`,
	};
}
