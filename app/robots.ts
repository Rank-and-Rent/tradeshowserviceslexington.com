import type { MetadataRoute } from "next";

import { business } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `https://${business.domain}/sitemap.xml`
  };
}
