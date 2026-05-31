import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/private/",
          "/*.json$",
          "/*?ref=*", // Disallow URLs with ref parameters
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/*.json$", "/*?ref=*"],
      },
    ],
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/video-sitemap.xml`,
    ],
    host: siteConfig.url,
  };
}
