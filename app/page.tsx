import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, generatePersonSchema } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/markdown";
import { getFeaturedProjects, projectHref } from "@/lib/projects";
import { experience, education, skills } from "@/app/_data/experience";

export const metadata: Metadata = {
  title: "Ibrahim Shittu - Software Engineer",
  description:
    "Software engineer in Lagos building web, mobile, and AI systems. Founding engineer at Finiti Legal, previously first engineer at Fabrio.",
  openGraph: {
    title: "Ibrahim Shittu - Software Engineer",
    description:
      "Software engineer in Lagos building web, mobile, and AI systems. Founding engineer at Finiti Legal, previously first engineer at Fabrio.",
    url: siteConfig.url,
    type: "profile",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Ibrahim Shittu - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Shittu - Software Engineer",
    description:
      "Software engineer in Lagos building web, mobile, and AI systems.",
    images: [siteConfig.ogImage],
  },
  alternates: { canonical: siteConfig.url },
};

const year = (date: string) => new Date(date).getFullYear();

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
      {children}
    </div>
  );
}

function SectionHead({
  label,
  href,
  cta,
}: {
  label: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <Label>{label}</Label>
      {href && cta && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-[13px] text-faint transition-colors hover:text-foreground"
        >
          {cta}
          <span className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      )}
    </div>
  );
}

function RowLink({
  href,
  title,
  meta,
  blurb,
}: {
  href: string;
  title: string;
  meta: string;
  blurb: string;
}) {
  return (
    <Link
      href={href}
      className="group block border-t border-border py-5 first:border-t-0"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="flex items-center gap-1.5 text-[1.0625rem] font-medium tracking-[-0.01em] text-foreground">
          {title}
          <span className="text-faint opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            &rarr;
          </span>
        </h3>
        <span className="shrink-0 font-mono text-[13px] tabular-nums text-faint">
          {meta}
        </span>
      </div>
      <p className="mt-1.5 text-[15px] leading-[1.6] text-muted-foreground">
        {blurb}
      </p>
    </Link>
  );
}

export default function Home() {
  const personSchema = generatePersonSchema();
  const projects = getFeaturedProjects().slice(0, 4);
  const posts = getAllBlogPosts().slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-reading px-5 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: siteConfig.author.name,
              jobTitle: "Software Engineer",
              url: siteConfig.url,
              sameAs: [
                siteConfig.author.linkedin,
                siteConfig.author.github,
                siteConfig.author.twitter,
              ],
            },
          }),
        }}
      />

      {/* Hero */}
      <header className="pt-20 md:pt-28">
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-[34rem]">
            <h1 className="text-[2.75rem] font-semibold leading-[1.0] tracking-[-0.045em] text-foreground sm:text-[3.5rem]">
              Engineer, builder, occasional writer.
            </h1>
            <p className="mt-5 text-[15px] text-faint">
              Senior Software Engineer &middot; Lagos, Nigeria
            </p>
          </div>
          <Image
            src={siteConfig.author.image}
            alt="Ibrahim Shittu"
            width={64}
            height={64}
            priority
            className="mt-2 hidden shrink-0 rounded-full object-cover ring-1 ring-line2 sm:block"
            style={{ height: 64, width: 64 }}
          />
        </div>

        <div className="mt-8 max-w-[40rem] space-y-4 text-[1.0625rem] leading-[1.65] text-muted-foreground sm:text-[1.125rem]">
          <p>
            For eight years I&rsquo;ve built web, mobile, and AI systems. They
            started as zero-to-one prototypes and grew into platforms now used by
            universities, banks, and law firms.
          </p>
          <p>
            Today I&rsquo;m a founding engineer at{" "}
            <span className="font-medium text-foreground">Finiti Legal</span>,
            building the AI compliance layer for capital markets. I care about
            work that survives real users, and I write, now and then, about what
            that takes.
          </p>
        </div>

        <nav
          aria-label="Contact and social links"
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px]"
        >
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-foreground transition-opacity hover:opacity-70"
          >
            Email
          </a>
          <a
            href={siteConfig.author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-faint transition-colors hover:text-foreground"
          >
            GitHub&nbsp;&#8599;
          </a>
          <a
            href={siteConfig.author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-faint transition-colors hover:text-foreground"
          >
            LinkedIn&nbsp;&#8599;
          </a>
          <a
            href={siteConfig.author.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-faint transition-colors hover:text-foreground"
          >
            X&nbsp;&#8599;
          </a>
        </nav>
      </header>

      {/* Work */}
      <section className="mt-20 border-t border-border pt-12 md:mt-28">
        <SectionHead label="Work" />
        <div>
          {experience.map((job, i) => (
            <article
              key={i}
              className="border-t border-border py-5 first:border-t-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em] text-foreground">
                  {job.company}
                </h3>
                <span className="shrink-0 font-mono text-[13px] tabular-nums text-faint">
                  {job.period}
                </span>
              </div>
              <div className="mt-1 font-mono text-[12px] text-faint">
                {job.title} &middot; {job.location}
              </div>
              <p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">
                {job.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="mt-20 border-t border-border pt-12 md:mt-28">
        <SectionHead label="Selected work" href="/projects" cta="All projects" />
        <div>
          {projects.map((project) => (
            <RowLink
              key={project.slug}
              href={projectHref(project)}
              title={project.name}
              meta={String(year(project.date))}
              blurb={project.blurb}
            />
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="mt-20 border-t border-border pt-12 md:mt-28">
        <SectionHead label="Writing" href="/blog" cta="All writing" />
        <div>
          {posts.map((post) => (
            <RowLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              meta={String(year(post.date))}
              blurb={post.excerpt}
            />
          ))}
        </div>
      </section>

      {/* Education + Skills */}
      <section className="mt-20 border-t border-border pt-12 md:mt-28">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <Label>Education</Label>
            <div className="mt-5 text-[15px] font-medium text-foreground">
              {education.school}
            </div>
            <div className="mt-0.5 text-[14px] text-muted-foreground">
              {education.degree}
            </div>
          </div>
          <div>
            <Label>Skills</Label>
            <div className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border bg-raised px-2.5 py-1 font-mono text-[12px] text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
