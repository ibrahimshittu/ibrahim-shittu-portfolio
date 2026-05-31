import Link from "next/link";
import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/markdown";
import {
  siteConfig,
  generateCanonicalUrl,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Writing - Ibrahim Shittu",
  description:
    "Notes on agent architecture, founding-engineer tradeoffs, and the infrastructure decisions that quietly decide whether a product survives contact with real users.",
  keywords: [
    "software engineering blog",
    "AI insights",
    "agent architecture",
    "startup development",
    "legal tech",
    "Ibrahim Shittu blog",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    title: "Writing - Ibrahim Shittu",
    description:
      "Notes on agent architecture, founding-engineer tradeoffs, and the infrastructure decisions that matter.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Writing - Ibrahim Shittu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing - Ibrahim Shittu",
    description:
      "Notes on agent architecture, founding-engineer tradeoffs, and the infrastructure decisions that matter.",
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: generateCanonicalUrl("/blog"),
    types: { "application/rss+xml": `${siteConfig.url}/rss.xml` },
  },
  robots: { index: true, follow: true },
  category: "technology",
};

const year = (date: string) => new Date(date).getFullYear();

export default function Blog() {
  const blogPosts = getAllBlogPosts();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Writing", url: generateCanonicalUrl("/blog") },
  ]);

  return (
    <main className="mx-auto w-full max-w-reading px-5 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Ibrahim Shittu — Writing",
            description:
              "Notes on agent architecture, founding-engineer tradeoffs, and infrastructure decisions.",
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
              author: { "@type": "Person", name: siteConfig.author.name },
            })),
          }),
        }}
      />

      <header className="pt-16 md:pt-24">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          Writing
        </div>
        <h1 className="mt-4 text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
          Thinking out loud.
        </h1>
        <p className="mt-5 max-w-[40rem] text-[1.0625rem] leading-[1.65] text-muted-foreground sm:text-[1.125rem]">
          Notes on agent architecture, founding-engineer tradeoffs, and the
          boring infrastructure decisions that quietly decide whether a product
          survives contact with real users.
        </p>
      </header>

      <div className="mt-12">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border-t border-border py-6 first:border-t-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="flex items-center gap-1.5 text-[1.15rem] font-medium tracking-[-0.01em] text-foreground">
                {post.title}
                <span className="text-faint opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                  &rarr;
                </span>
              </h2>
              <span className="shrink-0 font-mono text-[13px] tabular-nums text-faint">
                {year(post.date)}
              </span>
            </div>
            <p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-2.5 font-mono text-[12px] text-faint">
              {post.readTime}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
