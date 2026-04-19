import { Metadata } from "next";
import { siteConfig, generatePersonSchema } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/markdown";
import { ContactFooter } from "@/components/ui/contact-footer";
import { Hero } from "./_components/hero";
import { ProjectsSection } from "./_components/projects-section";
import { WorkSection } from "./_components/work-section";
import { WritingList } from "./_components/writing-list";
import { experience } from "./_data/experience";
import { projects } from "./_data/projects";

const heroDescription =
  "Senior software engineer with eight years shipping web, mobile, and AI agents. Three-time founding engineer, currently building Finiti Legal — the AI compliance layer for capital markets.";

const heroTitle = "Ibrahim Shittu - Senior Software Engineer";

export const metadata: Metadata = {
  title: heroTitle,
  description: heroDescription,
  openGraph: {
    title: heroTitle,
    description: heroDescription,
    url: siteConfig.url,
    type: "profile",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: heroTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: heroTitle,
    description: heroDescription,
    images: [siteConfig.ogImage],
  },
  alternates: { canonical: siteConfig.url },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: "Senior Software Engineer",
    url: siteConfig.url,
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.github,
      siteConfig.author.twitter,
    ],
  },
};

export default function Home() {
  const writing = getAllBlogPosts().slice(0, 4);
  const personSchema = generatePersonSchema();

  return (
    <main className="relative bg-[#fafaf7] text-[#0e0f11] dark:bg-[#0f0f0d] dark:text-[#f2efe7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema),
        }}
      />

      <Hero />
      <WorkSection experience={experience} />
      <ProjectsSection projects={projects} />
      <WritingList posts={writing} />
      <ContactFooter />
    </main>
  );
}
