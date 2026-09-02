import type { MetadataRoute } from "next";

import { CATEGORY_SLUGS } from "../lib/categories";

const SITE = "https://inspiremedia.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...CATEGORY_SLUGS.map((slug) => ({
      url: `${SITE}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
