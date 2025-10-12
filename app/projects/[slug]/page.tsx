import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Icons } from "@/components/ui/icons";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { siteConfig, generateMetaDescription } from "@/lib/seo";
import { formatDate } from "@/lib/blog-utils";
import { StructuredData } from "@/components/StructuredData";
import {
  generateVideoObjectSchema,
  parseCloudinaryVideoUrl,
  type VideoMetadata,
} from "@/lib/video-seo";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
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
    };
  }

  const description = generateMetaDescription(project.description, 160);

  return {
    title: `${project.title} - Projects | Ibrahim Shittu`,
    description: description,
    keywords: [
      ...project.technologies,
      project.title,
      "project",
      "portfolio",
      "software development",
      "Ibrahim Shittu",
    ],
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.author.name,
    openGraph: {
      title: project.title,
      description: description,
      type: "article",
      publishedTime: project.date,
      modifiedTime: project.date,
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
      description: description,
      images: project.image ? [project.image] : [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
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
    other: {
      "article:author": siteConfig.author.name,
      "article:published_time": project.date,
      "article:tag": project.technologies.join(", "),
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Generate structured data for the project
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
    dateCreated: project.date,
    datePublished: project.date,
    url: `${siteConfig.url}/projects/${project.slug}`,
    keywords: project.technologies,
    programmingLanguage: project.technologies.filter((tech) =>
      ["Python", "TypeScript", "JavaScript", "React", "NextJS", "C#"].includes(
        tech
      )
    ),
    ...(project.github && { codeRepository: project.github }),
    ...(project.link && { sameAs: project.link }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/projects/${project.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
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
        item: `${siteConfig.url}/projects/${project.slug}`,
      },
    ],
  };

  // Generate video schemas for project videos
  const pageUrl = `${siteConfig.url}/projects/${project.slug}`;
  const videoSchemas: any[] = [];

  // Check for main project video (image field that contains video)
  if (project.image && project.image.match(/\.(mp4|webm|ogg|mov)$/i)) {
    const { title: videoTitle } = parseCloudinaryVideoUrl(project.image);
    const videoMetadata: VideoMetadata = {
      title: videoTitle || `${project.title} - Demo Video`,
      description: `Demo video showcasing ${project.title}: ${project.excerpt}`,
      thumbnailUrl: project.image.replace(/\.(mp4|webm|ogg|mov)$/i, ".jpg"), // Cloudinary auto-generates thumbnails
      uploadDate: project.date,
      contentUrl: project.image,
    };
    videoSchemas.push(generateVideoObjectSchema(videoMetadata, pageUrl));
  }

  // Check for gallery videos
  if (project.gallery) {
    project.gallery.forEach((media, index) => {
      const isVideo = media.url.match(/\.(mp4|webm|ogg|mov)$/i);
      if (isVideo) {
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
    <>
      <StructuredData data={projectSchema} />
      <StructuredData data={breadcrumbSchema} />
      {videoSchemas.map((videoSchema, index) => (
        <StructuredData key={`video-${index}`} data={videoSchema} />
      ))}
      <main className="flex-1 flex flex-col">
        <article className="mx-auto w-full max-w-2xl px-4 pb-8">
          {/* Back to Projects */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            ← Back to projects
          </Link>

          {/* Project Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

            <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
              <time dateTime={project.date}>{formatDate(project.date)}</time>
            </div>

            <p className="text-lg text-muted-foreground font-mono leading-relaxed">
              {project.excerpt}
            </p>

            {/* Project Links */}
            {(project.github || project.link) && (
              <div className="flex gap-4 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-mono border rounded-md hover:bg-accent transition-colors"
                  >
                    <Icons.github className="size-4" />
                    View Code
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-mono border rounded-md hover:bg-accent transition-colors"
                  >
                    <Icons.externalLink className="size-4" />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </header>

          {/* Technologies */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Technologies Used</h2>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors text-nowrap border-muted bg-muted text-muted-foreground"
                >
                  {tech}
                </div>
              ))}
            </div>
          </section>

          {/* Project Description */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">About This Project</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {project.description.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground font-mono text-sm leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3">Gallery</h2>
              <div className="space-y-4">
                {project.gallery.map((media, index) => {
                  const isVideo = media.url.match(/\.(mp4|webm|ogg|mov)$/i);
                  const isCanva = media.url.includes("canva.com");

                  if (isCanva) {
                    return (
                      <div key={index} className="w-full">
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: 0,
                            paddingTop: "56.25%",
                            paddingBottom: 0,
                            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
                            marginTop: "1.6em",
                            marginBottom: "0.9em",
                            overflow: "hidden",
                            borderRadius: "8px",
                            willChange: "transform",
                          }}
                        >
                          <iframe
                            loading="lazy"
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              top: 0,
                              left: 0,
                              border: "none",
                              padding: 0,
                              margin: 0,
                            }}
                            src={media.url}
                            allowFullScreen
                            allow="fullscreen"
                          />
                        </div>
                        <p className="text-xs font-mono text-muted-foreground mt-2">
                          {media.caption}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={index}
                      className={`relative group overflow-hidden rounded-lg border ${
                        isVideo ? "" : "md:max-w-lg"
                      }`}
                    >
                      {isVideo ? (
                        <>
                          <video
                            src={media.url}
                            controls
                            className="w-full h-auto"
                            preload="metadata"
                          >
                            Your browser does not support the video tag.
                          </video>
                          <p className="text-xs font-mono text-muted-foreground mt-2">
                            {media.caption}
                          </p>
                        </>
                      ) : (
                        <>
                          <Image
                            src={media.url}
                            alt={media.caption}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-xs font-mono">
                              {media.caption}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Impact */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Impact & Results</h2>
            <div className="bg-muted/50 rounded-lg p-4 border">
              <p className="font-mono text-sm text-foreground leading-relaxed">
                {project.impact}
              </p>
            </div>
          </section>

          {/* Navigation to other projects */}
          <nav className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-bold mb-4">More Projects</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {getAllProjects()
                .filter((p) => p.slug !== project.slug)
                .slice(0, 2)
                .map((relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    href={`/projects/${relatedProject.slug}`}
                    className="block p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <h4 className="font-semibold text-sm mb-1">
                      {relatedProject.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-mono line-clamp-2">
                      {relatedProject.excerpt}
                    </p>
                  </Link>
                ))}
            </div>
          </nav>
        </article>
      </main>
    </>
  );
}
