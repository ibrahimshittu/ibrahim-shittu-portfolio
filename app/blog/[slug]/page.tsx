import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { getBlogPost, getAllBlogPosts } from "@/data/blog-posts";
import React from "react";
import { formatDate, formatContent } from "@/lib/blog-utils";
import {
  siteConfig,
  generateCanonicalUrl,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateMetaDescription,
  generateOgImageUrl,
} from "@/lib/seo";

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
    };
  }

  const description = generateMetaDescription(post.excerpt);
  const canonicalUrl = generateCanonicalUrl(`/blog/${post.slug}`);
  const ogImage = generateOgImageUrl(post.title);

  return {
    title: post.title,
    description: description,
    keywords: [...siteConfig.keywords, ...post.tags],
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.url,
      },
    ],
    openGraph: {
      type: "article",
      title: post.title,
      description: description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    category: "technology",
  };
}

export default function BlogPost({ params }: PageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(
    post.title,
    post.excerpt,
    post.slug,
    post.date,
    post.date, // using same date for modified since we don't track modifications
    post.tags,
    post.readTime
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: generateCanonicalUrl("/blog") },
    { name: post.title, url: generateCanonicalUrl(`/blog/${post.slug}`) },
  ]);

  return (
    <main className="flex-1 flex flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Navigation */}
      <nav className="mx-auto w-full max-w-2xl px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-sm text-[#9CA0A8] hover:text-[#050914] transition-colors"
          >
            Resume
          </Link>
          <Link
            href="/blog"
            className="font-mono text-sm text-[#050914] hover:underline"
          >
            Blog
          </Link>
        </div>
      </nav>

      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white px-4 pb-8">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#9CA0A8] hover:text-[#050914] transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="space-y-4">
          <h1 className="text-2xl font-bold text-[#050914] leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#54575e]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>By {siteConfig.author.name}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors text-nowrap border-[#eeeff0] bg-[#eeeff0] text-[#54575e] pointer-events-none"
              >
                {tag}
              </div>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article className="font-mono">
          <div className="prose max-w-none">{formatContent(post.content)}</div>
        </article>

        {/* Author Bio */}
        <div className="border-t border-[#eeeff0] pt-8 mt-12">
          <div className="flex items-start gap-4">
            <span className="relative flex shrink-0 overflow-hidden rounded-full size-12">
              <img
                className="aspect-square h-full w-full"
                alt="Ibrahim Shittu's profile picture"
                src={siteConfig.author.image}
                width={48}
                height={48}
              />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-[#050914] mb-2">
                {siteConfig.author.name}
              </h3>
              <p className="text-sm font-mono text-[#6c737f] mb-4">
                Senior Software Engineer passionate about AI, web/mobile
                development, and building products that make a difference.
                Currently working at Finiti Legal, building AI agents for the
                legal industry.
              </p>
              <div className="flex gap-3">
                <a
                  href={siteConfig.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#9CA0A8] hover:text-[#050914] transition-colors"
                >
                  Follow on GitHub
                </a>
                <a
                  href={siteConfig.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#9CA0A8] hover:text-[#050914] transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center pt-8">
          <Link href="/blog">
            <button className="px-4 py-2 text-sm font-mono bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              View All Posts
            </button>
          </Link>
        </div>
      </section>

      <div className="text-center mt-8 mb-4">
        <a
          className="text-[#9CA0A8] font-mono text-sm"
          href="/?ref=ibrahim-shittu"
        >
          Made with ❤️ by{" "}
          <span className="text-[#050914] underline underline-offset-2">
            Ibrahim Shittu
          </span>
        </a>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
