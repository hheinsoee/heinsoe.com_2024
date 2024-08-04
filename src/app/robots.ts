import conf from "@config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/signin", "/junior"],
    },
    sitemap: `${conf.baseUrl}/sitemap.xml`,
  };
}
