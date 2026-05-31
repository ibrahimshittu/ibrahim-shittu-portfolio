import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { siteConfig, generateMetaDescription, toISO } from "@/lib/seo";
import { formatDate } from "@/lib/blog-utils";
import { StructuredData } from "@/components/StructuredData";
import {
  generateVideoObjectSchema,
  parseCloudinaryVideoUrl,
  extractYouTubeVideoId,
  getYouTubeThumbnail,
  getYouTubeEmbedUrl,
  type VideoMetadata,
} from "@/lib/video-seo";

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
    title: `${project.title} - Projects | Ibrahim Shittu`,
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
      images: [
        {
          url: project.image || siteConfig.ogImage,
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
      images: [project.image || siteConfig.ogImage],
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

  const isoDate = toISO(project.date);
  const pageUrl = `${siteConfig.url}/projects/${project.slug}`;
  const paragraphs = project.description
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

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
      { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
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
  if (project.gallery) {
    project.gallery.forEach((media, index) => {
      const youTubeId = extractYouTubeVideoId(media.url);
      if (youTubeId) {
        const videoMetadata: VideoMetadata = {
          title: media.caption || `${project.title} - Video ${index + 1}`,
          description: media.caption || `Video for ${project.title}`,
          thumbnailUrl: getYouTubeThumbnail(youTubeId),
          uploadDate: project.date,
          embedUrl: getYouTubeEmbedUrl(youTubeId),
          videoId: youTubeId,
        };
        videoSchemas.push(generateVideoObjectSchema(videoMetadata, pageUrl));
      } else if (media.url.match(/\.(mp4|webm|ogg|mov)$/i)) {
        const { title: videoTitle } = parseCloudinaryVideoUrl(media.url);
        const videoMetadata: VideoMetadata = {
          title: videoTitle || `${project.title} - Gallery Video ${index + 1}`,
          description: media.caption || `Gallery video for ${project.title}`,
          thumbnailUrl: media.url.replace(/\.(mp4|webm|ogg|mov)$/i, ".jpg"),
          uploadDate: project.date,
          contentUrl: media.url,
        };
        videoSchemas.push(generateVideoObjectSchema(videoMetadata, pageUrl));
      }
    });
  }

  return (
    <main className="mx-auto w-full max-w-reading px-5 md:px-6">
      <StructuredData data={projectSchema} />
      <StructuredData data={breadcrumbSchema} />
      {videoSchemas.map((schema, i) => (
        <StructuredData key={`video-${i}`} data={schema} />
      ))}

      <article>
        <header className="pt-16 md:pt-24">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-faint transition-colors hover:text-foreground"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              &larr;
            </span>
            Projects
          </Link>
          <h1 className="mt-7 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            {project.name}
          </h1>
          <p className="mt-5 text-[1.15rem] leading-[1.55] text-muted-foreground">
            {project.blurb}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-b border-border pb-7 font-mono text-[12px] text-faint">
            <span className="text-muted-foreground">{project.tag}</span>
            <span aria-hidden>&middot;</span>
            <span>{project.role}</span>
            <span aria-hidden>&middot;</span>
            <span>{project.status}</span>
            <span aria-hidden>&middot;</span>
            <time dateTime={project.date}>{formatDate(project.date)}</time>
          </div>
        </header>

        <div className="article pt-9">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                Stack
              </dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-raised px-2.5 py-1 font-mono text-[12px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                Impact
              </dt>
              <dd className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                {project.impact}
              </dd>
            </div>
          </dl>

          {(project.link || project.github) && (
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px]">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-opacity hover:opacity-70"
                >
                  Visit site&nbsp;&#8599;
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-faint transition-colors hover:text-foreground"
                >
                  Source&nbsp;&#8599;
                </a>
              )}
            </div>
          )}
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              Gallery
            </div>
            <div className="mt-6 space-y-8">
              {project.gallery.map((media, i) => {
                const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media.url);
                const isCanva = media.url.includes("canva.com");
                const youTubeId = extractYouTubeVideoId(media.url);
                return (
                  <figure key={i}>
                    {youTubeId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${youTubeId}`}
                        title={media.caption}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="aspect-video w-full rounded-lg border border-border"
                      />
                    ) : isCanva ? (
                      <iframe
                        src={media.url}
                        title={media.caption}
                        loading="lazy"
                        allowFullScreen
                        className="aspect-video w-full rounded-lg border border-border"
                      />
                    ) : isVideo ? (
                      <video
                        src={media.url}
                        controls
                        preload="metadata"
                        className="w-full rounded-lg border border-border"
                      />
                    ) : (
                      <Image
                        src={media.url}
                        alt={media.caption}
                        width={768}
                        height={432}
                        className="w-full rounded-lg border border-border object-cover"
                      />
                    )}
                    <figcaption className="mt-2.5 font-mono text-[12px] text-faint">
                      {media.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        )}
      </article>

      {(prev || next) && (
        <nav className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2">
          <div>
            {prev && (
              <Link href={`/projects/${prev.slug}`} className="group block">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  Previous
                </div>
                <div className="mt-1.5 text-[1.0625rem] font-medium leading-snug text-muted-foreground transition-colors group-hover:text-foreground">
                  {prev.name}
                </div>
              </Link>
            )}
          </div>
          <div className="sm:text-right">
            {next && (
              <Link href={`/projects/${next.slug}`} className="group block">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  Next
                </div>
                <div className="mt-1.5 text-[1.0625rem] font-medium leading-snug text-muted-foreground transition-colors group-hover:text-foreground">
                  {next.name}
                </div>
              </Link>
            )}
          </div>
        </nav>
      )}
    </main>
  );
}
