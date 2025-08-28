import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/markdown";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();
  const projects = getAllProjects();

  // Static pages
  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic blog post pages
  const blogPages = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projectPages = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [...staticPages, ...blogPages, ...projectPages];
}
