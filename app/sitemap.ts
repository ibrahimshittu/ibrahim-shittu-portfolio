import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/markdown";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();
  const projects = getAllProjects();

  const currentDate = new Date();
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
  );

  // Static pages with higher priorities and proper frequency
  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified:
        blogPosts.length > 0 ? new Date(blogPosts[0].date) : currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified:
        projects.length > 0 ? new Date(projects[0].date) : currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic blog post pages with better priorities for recent posts
  const blogPages = blogPosts.map((post, index) => {
    const postDate = new Date(post.date);
    const isRecent = postDate >= lastMonth;

    return {
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency: "monthly" as const,
      priority: isRecent ? 0.8 : Math.max(0.5, 0.7 - index * 0.05), // Recent posts get higher priority
    };
  });

  // Dynamic project pages with proper prioritization
  const projectPages = projects.map((project, index) => {
    const projectDate = new Date(project.date);
    const isRecent = projectDate >= lastMonth;

    return {
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: projectDate,
      changeFrequency: "monthly" as const,
      priority: isRecent ? 0.7 : Math.max(0.4, 0.6 - index * 0.05), // Recent projects get higher priority
    };
  });

  return [...staticPages, ...blogPages, ...projectPages];
}
