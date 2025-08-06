import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

  // Normalize markdown formatting - ensure asterisks are used for emphasis
  const normalizedContent = content.replace(/_([^_\n]+)_/g, "*$1*");

  return {
    slug,
    title: data.title,
    content: normalizedContent,
    excerpt: data.excerpt,
    date: data.date,
    readTime: data.readTime,
    tags: data.tags || [],
    image: data.image,
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
