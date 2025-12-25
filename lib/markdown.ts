import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "./seo";

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function normalizeDate(dateInput: unknown, filename: string): string {
  if (!dateInput) {
    throw new Error(`Missing date in frontmatter for ${filename}`);
  }

  const parsed = new Date(String(dateInput));
  if (isNaN(parsed.getTime())) {
    throw new Error(
      `Invalid date in frontmatter for ${filename}. Use YYYY-MM-DD`
    );
  }

  return parsed.toISOString().split("T")[0];
}

function validateFrontmatter(
  data: Record<string, unknown>,
  filename: string
): {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
} {
  if (!data.title || typeof data.title !== "string") {
    throw new Error(`Missing or invalid title in frontmatter for ${filename}`);
  }

  return {
    title: data.title,
    excerpt:
      typeof data.excerpt === "string" && data.excerpt.trim()
        ? data.excerpt
        : data.title,
    date: normalizeDate(data.date, filename),
    readTime:
      typeof data.readTime === "string" && data.readTime.trim()
        ? data.readTime
        : "5 min read",
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : [],
    image:
      typeof data.image === "string" && data.image.trim()
        ? data.image
        : siteConfig.ogImage,
  };
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".md"));
}

function parseMarkdownFile(filename: string): BlogPost {
  const filePath = path.join(CONTENT_DIR, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const slug = filename.replace(/\.md$/, "");
  const validated = validateFrontmatter(data, filename);

  return {
    slug,
    title: validated.title,
    content: content,
    excerpt: validated.excerpt,
    date: validated.date,
    readTime: validated.readTime,
    tags: validated.tags,
    image: validated.image,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  const markdownFiles = getMarkdownFiles();
  const posts = markdownFiles.map(parseMarkdownFile);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | null {
  const filename = `${slug}.md`;
  const filePath = path.join(CONTENT_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseMarkdownFile(filename);
}
