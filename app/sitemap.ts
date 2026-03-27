import type { MetadataRoute } from "next";

import { business, getAllSiteRoutes } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSiteRoutes().map((route) => ({
    url: `https://${business.domain}${route}`,
    lastModified: new Date()
  }));
}
