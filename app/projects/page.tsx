import { Metadata } from "next";
import { siteConfig } from "@/lib/seo";
import { getAllProjects } from "@/lib/projects";
import { SubHero, GoldMarker } from "@/components/ui/sub-hero";
import { ContactFooter } from "@/components/ui/contact-footer";
import { ProjectsFilter } from "./_components/projects-filter";

export const metadata: Metadata = {
  title: "Projects — Ibrahim Shittu",
  description:
    "Selected work — not demos. Each project went to real users, held up under real traffic, and taught me something I still use.",
  keywords: [
    "Ibrahim Shittu projects",
    "software engineer portfolio",
    "AI projects",
    "agent systems",
    "legal tech",
    "edtech",
    "mobile banking",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    title: "Projects — Ibrahim Shittu",
    description:
      "Selected work — not demos. Real users, real traffic, real lessons.",
    url: `${siteConfig.url}/projects`,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Projects — Ibrahim Shittu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Ibrahim Shittu",
    description:
      "Selected work — not demos. Real users, real traffic, real lessons.",
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  alternates: { canonical: `${siteConfig.url}/projects` },
  robots: { index: true, follow: true },
  category: "technology",
};

export default function Projects() {
  return (
    <main className="bg-[#fafaf7] text-[#0e0f11] dark:bg-[#0f0f0d] dark:text-[#f2efe7]">
      <SubHero
        kicker="// 02 — projects · selected work"
        title={
          <>
            Projects I&apos;ve <GoldMarker>actually</GoldMarker>
            <br className="hidden md:block" />
            <GoldMarker>shipped.</GoldMarker>
          </>
        }
        lede="Not demos. Each of these went to real users, held up under real traffic, and taught me something I still use. Filter by kind or scan the full set below."
      />

      <ProjectsFilter projects={getAllProjects()} />

      <ContactFooter />
    </main>
  );
}
