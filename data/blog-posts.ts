export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Re-export functions from markdown utility
export { getAllBlogPosts, getBlogPost } from "../lib/markdown";
