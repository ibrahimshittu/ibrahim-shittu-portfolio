import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getAllProjects,
  projectYear,
  splitMetric,
} from "@/lib/projects";
import { siteConfig, generateMetaDescription, toISO } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import {
  generateVideoObjectSchema,
  parseCloudinaryVideoUrl,
  type VideoMetadata,
} from "@/lib/video-seo";
import { ContactFooter } from "@/components/ui/contact-footer";
import { PrevNext } from "@/components/ui/prev-next";
import { RelatedStrip, type RelatedItem } from "@/components/ui/related-strip";

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description = generateMetaDescription(project.description, 160);
  const isoDate = toISO(project.date);

  return {
    title: `${project.title} — Projects | Ibrahim Shittu`,
    description,
    keywords: [
      ...project.technologies,
      project.title,
      "project",
      "portfolio",
      "Ibrahim Shittu",
    ],
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      publishedTime: isoDate,
      modifiedTime: isoDate,
      url: `${siteConfig.url}/projects/${project.slug}`,
      siteName: siteConfig.name,
      locale: "en_US",
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [
            {
              url: siteConfig.ogImage,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: project.image ? [project.image] : [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    alternates: { canonical: `${siteConfig.url}/projects/${project.slug}` },
    robots: { index: true, follow: true },
    category: "technology",
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  const { tag, role } = project;
  const year = projectYear(project);

  const related: RelatedItem[] = all
    .filter((p) => p.slug !== project.slug && p.tag === tag)
    .slice(0, 3)
    .map((p) => ({
      href: `/projects/${p.slug}`,
      tag: p.tag,
      date: projectYear(p),
      title: p.name,
      blurb: p.excerpt,
    }));

  const paragraphs = project.description
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const problem = paragraphs[0] ?? project.excerpt;
  const approach = paragraphs.slice(1);

  const { head: metricHead, tail: metricTail } = splitMetric(project.impact);

  const isoDate = toISO(project.date);
  const pageUrl = `${siteConfig.url}/projects/${project.slug}`;

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
      sameAs: [
        siteConfig.author.linkedin,
        siteConfig.author.github,
        siteConfig.author.twitter,
      ],
    },
    dateCreated: isoDate,
    datePublished: isoDate,
    url: pageUrl,
    keywords: project.technologies,
    ...(project.github && { codeRepository: project.github }),
    ...(project.link && { sameAs: project.link }),
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteConfig.url}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: pageUrl,
      },
    ],
  };

  const videoSchemas: Record<string, unknown>[] = [];
  if (project.image && project.image.match(/\.(mp4|webm|ogg|mov)$/i)) {
    const { title: videoTitle } = parseCloudinaryVideoUrl(project.image);
    const videoMetadata: VideoMetadata = {
      title: videoTitle || `${project.title} - Demo Video`,
      description: `Demo video showcasing ${project.title}: ${project.excerpt}`,
      thumbnailUrl: project.image.replace(/\.(mp4|webm|ogg|mov)$/i, ".jpg"),
      uploadDate: project.date,
      contentUrl: project.image,
    };
    videoSchemas.push(generateVideoObjectSchema(videoMetadata, pageUrl));
  }

  return (
    <main className="bg-[#fafaf7] text-[#0e0f11] dark:bg-[#0f0f0d] dark:text-[#f2efe7]">
      <StructuredData data={projectSchema} />
      <StructuredData data={breadcrumbSchema} />
      {videoSchemas.map((schema, i) => (
        <StructuredData key={`video-${i}`} data={schema} />
      ))}

      <section className="border-b border-[#d4d1c7] dark:border-[#35332c]">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-[72px]">
          <div className="mb-6 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
            <Link
              href="/projects"
              className="text-[#7a7f86] hover:text-[#0e0f11] dark:text-[#74706a] dark:hover:text-[#f2efe7]"
            >
              ← projects
            </Link>
            <span className="text-[#1f5d3b] dark:text-[#6fb292]">{tag}</span>
            <span className="text-[#7a7f86] dark:text-[#74706a]">{year}</span>
            <span className="text-[#7a7f86] dark:text-[#74706a]">
              {project.status}
            </span>
          </div>
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h1 className="m-0 font-sans text-[44px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#0e0f11] sm:text-[60px] md:text-[72px] dark:text-[#f2efe7]">
                {project.name}
              </h1>
              <p className="mt-5 max-w-[640px] font-sans text-[17px] leading-[1.55] text-[#3d4147] md:text-[20px] dark:text-[#b9b5aa]">
                {project.excerpt}
              </p>
              <div className="mt-6 font-mono text-[12px] text-[#7a7f86] dark:text-[#74706a]">
                role ·{" "}
                <span className="text-[#0e0f11] dark:text-[#f2efe7]">
                  {role}
                </span>
              </div>
              {(project.github || project.link) && (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[4px] bg-[#0e0f11] px-4 py-2.5 font-mono text-[12px] tracking-wide text-[#fafaf7] transition-opacity hover:opacity-90 dark:bg-[#f2efe7] dark:text-[#0f0f0d]"
                    >
                      live demo ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[4px] border border-[#e7e5de] bg-white px-4 py-2.5 font-mono text-[12px] tracking-wide text-[#0e0f11] transition-colors hover:border-[#7a7f86] dark:border-[#26251f] dark:bg-[#1a1a17] dark:text-[#f2efe7] dark:hover:border-[#74706a]"
                    >
                      view code ↗
                    </a>
                  )}
                </div>
              )}
            </div>

            <aside className="rounded-md border border-[#e7e5de] bg-white p-6 dark:border-[#26251f] dark:bg-[#1a1a17]">
              <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
                {"// outcome"}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="font-sans text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0e0f11] dark:text-[#f2efe7]">
                    {metricHead}
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
                    {metricTail}
                  </div>
                </div>
              </div>
              <div className="mt-6 mb-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
                {"// stack"}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((s) => (
                  <span
                    key={s}
                    className="inline-block rounded-[3px] border border-[#e7e5de] bg-[#fafaf7] px-2 py-[3px] font-mono text-[10.5px] text-[#3d4147] dark:border-[#26251f] dark:bg-[#0f0f0d] dark:text-[#b9b5aa]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e7e5de] dark:border-[#26251f]">
        <div className="mx-auto max-w-[1200px] px-6 py-14 md:px-12 md:py-[72px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] md:gap-10">
            <div className="pt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
              01 · problem
            </div>
            <p className="m-0 font-sans text-[17px] leading-[1.6] tracking-[-0.005em] text-[#0e0f11] md:text-[19px] dark:text-[#f2efe7]">
              {problem}
            </p>
          </div>

          {approach.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] md:gap-10">
              <div className="pt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
                02 · approach
              </div>
              <div>
                {approach.map((a, i) => (
                  <div
                    key={i}
                    className={[
                      "grid grid-cols-[40px_1fr] items-start gap-4 py-4 border-b border-[#e7e5de] dark:border-[#26251f]",
                      i === 0 ? "border-t" : "",
                    ].join(" ")}
                  >
                    <div className="font-mono text-[12px] font-semibold text-[#1f5d3b] dark:text-[#6fb292]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="m-0 font-sans text-[15px] leading-[1.6] text-[#3d4147] md:text-[16px] dark:text-[#b9b5aa]">
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] md:gap-10">
              <div className="pt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
                03 · visuals
              </div>
              <div className="flex flex-col gap-7">
                {project.gallery.map((media, i) => {
                  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media.url);
                  const isCanva = media.url.includes("canva.com");
                  return (
                    <figure
                      key={i}
                      className="overflow-hidden border border-[#e7e5de] bg-white dark:border-[#26251f] dark:bg-[#1a1a17]"
                    >
                      {isCanva ? (
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "56.25%",
                          }}
                        >
                          <iframe
                            loading="lazy"
                            src={media.url}
                            allowFullScreen
                            allow="fullscreen"
                            className="absolute left-0 top-0 h-full w-full border-0"
                          />
                        </div>
                      ) : isVideo ? (
                        <video
                          src={media.url}
                          controls
                          preload="metadata"
                          className="h-auto w-full"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Image
                          src={media.url}
                          alt={media.caption}
                          width={1200}
                          height={800}
                          className="h-auto w-full"
                        />
                      )}
                      <figcaption className="border-t border-[#e7e5de] bg-[#fafaf7] px-4 py-2.5 font-mono text-[11px] text-[#7a7f86] dark:border-[#26251f] dark:bg-[#0f0f0d] dark:text-[#74706a]">
                        {media.caption}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] md:gap-10">
            <div className="pt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
              {project.gallery && project.gallery.length > 0
                ? "04 · impact"
                : "03 · impact"}
            </div>
            <p className="m-0 font-sans text-[16px] leading-[1.65] text-[#3d4147] md:text-[17px] dark:text-[#b9b5aa]">
              {project.impact}
            </p>
          </div>
        </div>
      </section>

      <PrevNext
        prev={
          prev ? { href: `/projects/${prev.slug}`, title: prev.name } : null
        }
        next={
          next ? { href: `/projects/${next.slug}`, title: next.name } : null
        }
      />

      <RelatedStrip
        label={`more ${tag.toLowerCase()} projects`}
        backHref="/projects"
        items={related}
      />

      <ContactFooter />
    </main>
  );
}
