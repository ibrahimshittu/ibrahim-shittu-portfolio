import Link from "next/link";
import { Metadata } from "next";
import { getAllProjects, projectHref } from "@/lib/projects";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Products - Ibrahim Shittu",
  description:
    "Products I've built and shipped — used by real people, at real scale, across legal tech, education, fintech, and AI.",
  keywords: [
    "Ibrahim Shittu products",
    "software engineer portfolio",
    "AI products",
    "agent systems",
    "legal tech",
    "edtech",
    "mobile banking",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  openGraph: {
    title: "Products - Ibrahim Shittu",
    description:
      "Products I've built and shipped — used by real people, at real scale.",
    url: `${siteConfig.url}/projects`,
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Products - Ibrahim Shittu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products - Ibrahim Shittu",
    description:
      "Products I've built and shipped — used by real people, at real scale.",
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  alternates: { canonical: `${siteConfig.url}/projects` },
  robots: { index: true, follow: true },
  category: "technology",
};

const year = (date: string) => new Date(date).getFullYear();

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto w-full max-w-reading px-5 md:px-6">
      <header className="pt-16 md:pt-24">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          Products
        </div>
        <h1 className="mt-4 text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
          Products I&rsquo;ve built.
        </h1>
        <p className="mt-5 max-w-[40rem] text-[1.0625rem] leading-[1.65] text-muted-foreground sm:text-[1.125rem]">
          Some of the products I&rsquo;ve built and shipped. Not demos. Each one
          went to real people, ran at real scale, and taught me something I
          still use.
        </p>
      </header>

      <div className="mt-12">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={projectHref(project)}
            className="group block border-t border-border py-6 first:border-t-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="flex items-center gap-1.5 text-[1.15rem] font-medium tracking-[-0.01em] text-foreground">
                {project.name}
                <span className="text-faint opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                  &rarr;
                </span>
              </h2>
              <span className="shrink-0 font-mono text-[13px] tabular-nums text-faint">
                {year(project.date)}
              </span>
            </div>
            <div className="mt-1 font-mono text-[12px] text-faint">
              {project.tag} &middot; {project.role}
            </div>
            <p className="mt-2.5 text-[15px] leading-[1.6] text-muted-foreground">
              {project.blurb}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
