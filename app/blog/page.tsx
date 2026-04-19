import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/markdown";
import {
  siteConfig,
  generateCanonicalUrl,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { SubHero, GoldMarker } from "@/components/ui/sub-hero";
import { ContactFooter } from "@/components/ui/contact-footer";
import { BlogFilter, type BlogRow } from "./_components/blog-filter";

export const metadata: Metadata = {
  title: "Writing — Ibrahim Shittu",
  description:
    "Notes on agent architecture, founding-engineer tradeoffs, and the boring infrastructure decisions that quietly decide whether a product survives contact with real users.",
  keywords: [
    "software engineering blog",
    "AI insights",
    "agent architecture",
    "startup development",
    "legal tech",
    "education technology",
    "Ibrahim Shittu blog",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    title: "Writing — Ibrahim Shittu",
    description:
      "Notes on agent architecture, founding-engineer tradeoffs, and infrastructure decisions that decide whether a product survives contact with real users.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Writing — Ibrahim Shittu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Ibrahim Shittu",
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

function classifyTag(tags: string[]): string {
  const lower = tags.map((t) => t.toLowerCase());
  if (
    lower.some(
      (t) =>
        t.includes("ai") ||
        t.includes("ml") ||
        t.includes("llm") ||
        t.includes("agent"),
    )
  ) {
    return "AI";
  }
  if (lower.some((t) => t.includes("career") || t.includes("journey"))) {
    return "Career";
  }
  return "Eng";
}

export default function Blog() {
  const blogPosts = getAllBlogPosts();
  const rows: BlogRow[] = blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    readTime: p.readTime,
    excerpt: p.excerpt,
    body: p.excerpt,
    tag: classifyTag(p.tags),
  }));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Writing", url: generateCanonicalUrl("/blog") },
  ]);

  return (
    <main className="bg-[#fafaf7] text-[#0e0f11] dark:bg-[#0f0f0d] dark:text-[#f2efe7]">
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
              author: {
                "@type": "Person",
                name: siteConfig.author.name,
              },
            })),
          }),
        }}
      />

      <SubHero
        kicker="// 02 — writing · notes from the field"
        title={
          <>
            Thinking out loud,
            <br />
            in <GoldMarker>public.</GoldMarker>
          </>
        }
        lede="Notes on agent architecture, founding-engineer tradeoffs, and the boring infrastructure decisions that quietly decide whether a product survives contact with real users."
      />

      <BlogFilter posts={rows} />

      <ContactFooter />
    </main>
  );
}
