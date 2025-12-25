import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/markdown";
import { getAllProjects } from "@/lib/projects";
import { siteConfig, toDate } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();
  const projects = getAllProjects();
  const now = new Date();
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: blogPosts.length > 0 ? toDate(blogPosts[0].date) : now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: projects.length > 0 ? toDate(projects[0].date) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  const blogPages = blogPosts.map((post, index) => {
    const postDate = toDate(post.date);
    const isRecent = postDate >= lastMonth;
    return {
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency: "monthly" as const,
      priority: isRecent ? 0.8 : Math.max(0.5, 0.7 - index * 0.05),
    };
  });

  const projectPages = projects.map((project, index) => {
    const projectDate = toDate(project.date);
    const isRecent = projectDate >= lastMonth;
    return {
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: projectDate,
      changeFrequency: "monthly" as const,
      priority: isRecent ? 0.7 : Math.max(0.4, 0.6 - index * 0.05),
    };
  });

  return [...staticPages, ...blogPages, ...projectPages];
}
