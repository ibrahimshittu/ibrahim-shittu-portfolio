import Link from "next/link";
import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/markdown";
import { formatDate } from "@/lib/blog-utils";
import {
  siteConfig,
  generateCanonicalUrl,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog - Software Engineering, AI, and Tech Insights | Ibrahim Shittu",
  description:
    "Thoughts on Technology, Software Engineering, AI, and building great products. Learn from real-world experiences in legal tech, education platforms, and startup development.",
  keywords: [
    "software engineering blog",
    "AI insights",
    "technology blog",
    "startup development",
    "legal tech",
    "education technology",
    "web development",
    "machine learning",
    "Ibrahim Shittu blog",
  ],
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    title:
      "Blog - Software Engineering, AI, and Tech Insights | Ibrahim Shittu",
    description:
      "Thoughts on Technology, Software Engineering, AI, and building great products. Learn from real-world experiences in legal tech, education platforms, and startup development.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Blog - Ibrahim Shittu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Blog - Software Engineering, AI, and Tech Insights | Ibrahim Shittu",
    description:
      "Thoughts on Technology, Software Engineering, AI, and building great products.",
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: generateCanonicalUrl("/blog"),
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
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

export default function Blog() {
  const blogPosts = getAllBlogPosts();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: generateCanonicalUrl("/blog") },
  ]);

  // Build timeline items with year and month separators
  const timelineItems = (() => {
    const items: React.ReactNode[] = [];
    let lastYear = "";
    let lastMonth = "";

    for (const post of blogPosts) {
      const date = new Date(post.date);
      const year = String(date.getFullYear());
      const month = date.toLocaleString("en-US", { month: "long" });

      if (year !== lastYear) {
        lastYear = year;
        lastMonth = ""; // reset when year changes
        items.push(
          <li key={`year-${year}`} className="ml-0 mb-2">
            <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border bg-background"></span>
            <span className="ml-4 text-xs font-mono tracking-wider text-muted-foreground">
              {year}
            </span>
          </li>
        );
      }

      if (month !== lastMonth) {
        lastMonth = month;
        items.push(
          <li key={`month-${year}-${month}`} className="ml-0 mb-2">
            <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border bg-background"></span>
            <span className="ml-4 text-[11px] font-mono uppercase text-muted-foreground">
              {month}
            </span>
          </li>
        );
      }

      items.push(
        <li key={post.slug} className="mb-8 ml-4">
          {/* <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border bg-background"></span> */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <Link href={`/blog/${post.slug}`} className="flex-1">
                <h3 className="text-base font-semibold leading-tight hover:underline">
                  {post.title}
                </h3>
              </Link>
              <span className="text-[11px] font-mono text-muted-foreground whitespace-nowrap">
                {post.readTime}
              </span>
            </div>
            <p className="text-sm font-mono text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold font-mono bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 5 && (
                <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                  +{post.tags.length - 5} more
                </span>
              )}
            </div>
          </div>
        </li>
      );
    }

    return items;
  })();

  return (
    <main className="flex-1 flex flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Ibrahim Shittu's Blog",
            description:
              "Thoughts on Technology, Software Engineering, AI, and building great products.",
            url: generateCanonicalUrl("/blog"),
            author: {
              "@type": "Person",
              name: siteConfig.author.name,
              url: siteConfig.url,
            },
            blogPost: blogPosts.slice(0, 5).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: generateCanonicalUrl(`/blog/${post.slug}`),
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: siteConfig.author.name,
              },
            })),
          }),
        }}
      />

      {/* Global nav is rendered by RootLayout */}

      <section
        className="mx-auto w-full max-w-2xl space-y-8 bg-card px-4 pb-8"
        aria-label="Blog Content"
      >
        {/* Header */}
        <header className="space-y-1.5">
          <h1 className="text-2xl font-bold" id="blog-title">
            Blog
          </h1>
          <p className="text-pretty font-mono text-sm text-muted-foreground">
            Thoughts on startups, product engineering, AI/ML, and the evolving
            relationship between technology, innovation, and human creativity.
          </p>
        </header>

        <div className="flex flex-col gap-10">
          {/* Blog Posts as vertical timeline with year/month separators */}
          <section className="flex min-h-0 flex-col gap-y-5">
            <h2 className="text-lg font-bold" id="recent-posts">
              Recent Posts
            </h2>
            <ol
              className="relative ml-2 border-l border-muted"
              aria-labelledby="recent-posts"
            >
              {timelineItems}
            </ol>
          </section>

          {/* About Blog */}
          <section className="flex min-h-0 flex-col gap-y-3 pt-4">
            <h2 className="text-xl font-bold" id="about-blog">
              About This Blog
            </h2>
            <div
              className="text-pretty font-mono text-sm text-muted-foreground"
              aria-labelledby="about-blog"
            >
              I write about technology, software engineering, AI/ML, and
              building great products. My posts cover everything from technical
              deep-dives to career insights and lessons learned from working at
              startups and larger companies.
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="flex min-h-0 flex-col gap-y-3 pt-4">
            <h2 className="text-xl font-bold" id="stay-updated">
              Stay Updated
            </h2>
            <div
              className="text-pretty font-mono text-sm text-muted-foreground mb-4"
              aria-labelledby="stay-updated"
            >
              Get notified when I publish new posts. No spam, unsubscribe at any
              time.
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm font-mono border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <button className="px-4 py-2 text-sm font-mono bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
