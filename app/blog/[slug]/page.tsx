import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPost, getAllBlogPosts } from "@/lib/markdown";
import {
  formatDate,
  formatContent,
  extractYouTubeVideos,
  generateBlogVideoMetadata,
} from "@/lib/blog-utils";
import {
  siteConfig,
  generateCanonicalUrl,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateMetaDescription,
  toISO,
} from "@/lib/seo";
import { generateVideoObjectSchema } from "@/lib/video-seo";
import { StructuredData } from "@/components/StructuredData";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const description = generateMetaDescription(post.excerpt);
  const canonicalUrl = generateCanonicalUrl(`/blog/${post.slug}`);
  const isoDate = toISO(post.date);
  const imageUrl = post.image || siteConfig.ogImage;

  return {
    title: post.title,
    description,
    keywords: [...siteConfig.keywords, ...post.tags],
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [siteConfig.author.name],
      tags: post.tags,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
    alternates: { canonical: canonicalUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
  };
}

export default function BlogPost({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const posts = getAllBlogPosts();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null;

  const youtubeVideoIds = extractYouTubeVideos(post.content);
  const pageUrl = generateCanonicalUrl(`/blog/${post.slug}`);

  const articleSchema = generateArticleSchema(
    post.title,
    post.excerpt,
    post.slug,
    post.date,
    post.date,
    post.tags,
    post.readTime,
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Writing", url: generateCanonicalUrl("/blog") },
    { name: post.title, url: pageUrl },
  ]);

  const videoSchemas = youtubeVideoIds.map((videoId) =>
    generateVideoObjectSchema(
      generateBlogVideoMetadata(videoId, post.title, post.excerpt, post.date),
      pageUrl,
    ),
  );

  return (
    <main className="mx-auto w-full max-w-reading px-5 md:px-6">
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      {videoSchemas.map((schema, i) => (
        <StructuredData key={`video-${i}`} data={schema} />
      ))}

      <article>
        <header className="pt-16 md:pt-24">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-faint transition-colors hover:text-foreground"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              &larr;
            </span>
            Writing
          </Link>
          <h1 className="mt-7 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-[1.15rem] leading-[1.55] text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-b border-border pb-7 font-mono text-[12px] text-faint">
            <span className="text-muted-foreground">Ibrahim Shittu</span>
            <span aria-hidden>&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="article pt-9">{formatContent(post.content)}</div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-6 font-mono text-[12px] text-faint">
          <span className="uppercase tracking-[0.14em]">
            {post.tags.slice(0, 3).join(" / ")}
          </span>
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Reply by email &rarr;
          </a>
        </div>
      </article>

      {(prev || next) && (
        <nav className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2">
          <div>
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="group block">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  Previous
                </div>
                <div className="mt-1.5 text-[1.0625rem] font-medium leading-snug text-muted-foreground transition-colors group-hover:text-foreground">
                  {prev.title}
                </div>
              </Link>
            )}
          </div>
          <div className="sm:text-right">
            {next && (
              <Link href={`/blog/${next.slug}`} className="group block">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  Next
                </div>
                <div className="mt-1.5 text-[1.0625rem] font-medium leading-snug text-muted-foreground transition-colors group-hover:text-foreground">
                  {next.title}
                </div>
              </Link>
            )}
          </div>
        </nav>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
