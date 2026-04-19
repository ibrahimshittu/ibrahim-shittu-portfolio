import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getBlogPost, getAllBlogPosts } from "@/lib/markdown";
import { formatDate } from "@/lib/date";
import {
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
import { ContactFooter } from "@/components/ui/contact-footer";
import { PrevNext } from "@/components/ui/prev-next";
import { RelatedStrip, type RelatedItem } from "@/components/ui/related-strip";

interface PageProps {
  params: {
    slug: string;
  };
}

function primaryTag(tags: string[]): string {
  const lower = tags.map((t) => t.toLowerCase());
  if (
    lower.some(
      (t) =>
        t.includes("ai") ||
        t.includes("ml") ||
        t.includes("llm") ||
        t.includes("agent"),
    )
  )
    return "AI";
  if (lower.some((t) => t.includes("career") || t.includes("journey")))
    return "Career";
  return tags[0] ?? "Essay";
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
  const tag = primaryTag(post.tags);

  const related: RelatedItem[] = posts
    .filter((p) => p.slug !== post.slug && primaryTag(p.tags) === tag)
    .slice(0, 3)
    .map((p) => ({
      href: `/blog/${p.slug}`,
      tag: primaryTag(p.tags),
      date: formatDate(p.date),
      title: p.title,
      blurb: p.excerpt,
    }));

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
    <main className="bg-[#fafaf7] text-[#0e0f11] dark:bg-[#0f0f0d] dark:text-[#f2efe7]">
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      {videoSchemas.map((schema, i) => (
        <StructuredData key={`video-${i}`} data={schema} />
      ))}

      <section className="border-b border-[#d4d1c7] dark:border-[#35332c]">
        <div className="mx-auto max-w-[1040px] px-6 py-16 md:px-12 md:py-[72px]">
          <div className="mb-6 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
            <Link
              href="/blog"
              className="text-[#7a7f86] hover:text-[#0e0f11] dark:text-[#74706a] dark:hover:text-[#f2efe7]"
            >
              ← writing
            </Link>
            <span className="text-[#1f5d3b] dark:text-[#6fb292]">{tag}</span>
            <span className="text-[#7a7f86] dark:text-[#74706a]">
              {formatDate(post.date)}
            </span>
            <span className="text-[#7a7f86] dark:text-[#74706a]">
              {post.readTime}
            </span>
          </div>
          <h1 className="m-0 font-sans text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#0e0f11] sm:text-[44px] md:text-[52px] dark:text-[#f2efe7]">
            {post.title}
          </h1>
          <p className="mt-5 font-sans text-[17px] leading-[1.55] text-[#3d4147] md:text-[20px] dark:text-[#b9b5aa]">
            {post.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 font-mono text-[12px] text-[#7a7f86] dark:text-[#74706a]">
            <Image
              src={siteConfig.author.image}
              alt="Ibrahim Shittu"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
            <span className="font-medium text-[#0e0f11] dark:text-[#f2efe7]">
              Ibrahim Shittu
            </span>
            <span>·</span>
            <span>Senior Software Engineer</span>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[960px] px-6 py-14 md:px-12 md:py-[72px]">
          <article className="prose-article prose prose-neutral max-w-none dark:prose-invert prose-headings:font-sans prose-headings:font-semibold prose-headings:tracking-[-0.02em] prose-h2:mt-11 prose-h2:mb-3.5 prose-h2:text-[26px] prose-h3:mt-7 prose-h3:mb-2.5 prose-h3:text-[20px] prose-p:font-sans prose-p:text-[17px] prose-p:leading-[1.7] prose-p:text-[#3d4147] prose-p:my-[18px] prose-li:text-[#3d4147] prose-li:font-sans prose-li:text-[16px] prose-li:leading-[1.7] prose-blockquote:border-l-[3px] prose-blockquote:border-[#1f5d3b] prose-blockquote:not-italic prose-blockquote:bg-white prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:text-[20px] prose-blockquote:font-sans prose-blockquote:tracking-[-0.015em] prose-blockquote:leading-[1.45] prose-a:text-[#0e0f11] prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-[13.5px] prose-code:bg-white prose-code:border prose-code:border-[#e7e5de] prose-code:px-1.5 prose-code:py-[2px] prose-code:rounded-sm prose-pre:bg-white prose-pre:border prose-pre:border-[#e7e5de] prose-pre:text-[#0e0f11] dark:prose-p:text-[#b9b5aa] dark:prose-li:text-[#b9b5aa] dark:prose-blockquote:border-[#6fb292] dark:prose-blockquote:bg-[#1a1a17] dark:prose-a:text-[#f2efe7] dark:prose-code:bg-[#1a1a17] dark:prose-code:border-[#26251f] dark:prose-pre:bg-[#1a1a17] dark:prose-pre:border-[#26251f] dark:prose-pre:text-[#f2efe7]">
            {formatContent(post.content)}
          </article>

          <div className="mt-11 flex flex-wrap justify-between gap-3 border-t border-[#e7e5de] pt-6 font-mono text-[12px] text-[#7a7f86] dark:border-[#26251f] dark:text-[#74706a]">
            <span>
              filed under{" "}
              <span className="text-[#1f5d3b] dark:text-[#6fb292]">{tag}</span>{" "}
              · {formatDate(post.date)}
            </span>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="border-b border-[#0e0f11] pb-0.5 text-[#0e0f11] dark:border-[#f2efe7] dark:text-[#f2efe7]"
            >
              reply by email ↗
            </a>
          </div>
        </div>
      </section>

      <PrevNext
        prev={prev ? { href: `/blog/${prev.slug}`, title: prev.title } : null}
        next={next ? { href: `/blog/${next.slug}`, title: next.title } : null}
      />

      <RelatedStrip
        label={`more on ${tag.toLowerCase()}`}
        backHref="/blog"
        items={related}
      />

      <ContactFooter />
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
