import Link from "next/link";
import { Metadata } from "next";
import { getAllBlogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/blog-utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  siteConfig,
  generateCanonicalUrl,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog - Software Engineering, AI, and Tech Insights",
  description:
    "Thoughts on Technology, Software Engineering, AI, and building great products. Learn from real-world experiences in legal tech, education platforms, and startup development.",
  openGraph: {
    type: "website",
    title: "Blog - Ibrahim Shittu",
    description:
      "Thoughts on software engineering, AI, and building products that matter.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
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
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: generateCanonicalUrl("/blog"),
  },
};

export default function Blog() {
  const blogPosts = getAllBlogPosts();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: generateCanonicalUrl("/blog") },
  ]);

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

      {/* Navigation */}
      <nav className="mx-auto w-full max-w-2xl px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Resume
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="font-mono text-sm text-foreground hover:underline"
            >
              Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

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
            Thoughts on Technology, Software Engineering, AI, and building great
            products.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {/* Blog Posts */}
          <section className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-lg font-bold" id="recent-posts">
              Recent Posts
            </h2>
            <div className="flex flex-col gap-6" aria-labelledby="recent-posts">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="font-mono flex flex-col justify-start items-start gap-3 pb-6 border-b border-muted last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                    <div className="flex-1">
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-base font-semibold text-left text-foreground hover:underline transition-all cursor-pointer">
                          {post.title}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <p className="self-stretch text-sm font-medium text-left text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <div
                        key={tag}
                        className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors text-nowrap border-muted bg-muted text-muted-foreground pointer-events-none"
                      >
                        {tag}
                      </div>
                    ))}
                    {post.tags.length > 3 && (
                      <div className="inline-flex items-center px-2 py-0.5 text-xs text-muted-foreground font-mono">
                        +{post.tags.length - 3} more
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
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
              I write about technology, software engineering, AI, and building
              great products. My posts cover everything from technical
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

      <div className="text-center mt-8 mb-4">
        <a
          className="text-muted-foreground font-mono text-sm"
          href="/?ref=ibrahim-shittu"
        >
          Made with ❤️ by{" "}
          <span className="text-foreground underline underline-offset-2">
            Ibrahim Shittu
          </span>
        </a>
      </div>
    </main>
  );
}
