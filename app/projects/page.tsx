import Link from "next/link";
import { Metadata } from "next";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/seo";
import { formatDate } from "@/lib/blog-utils";

export const metadata: Metadata = {
  title: "Projects - Ibrahim Shittu",
  description:
    "Explore my portfolio of projects showcasing expertise in web development, mobile applications, AI/ML solutions, and open-source contributions.",
  openGraph: {
    title: "Projects - Ibrahim Shittu",
    description:
      "Explore my portfolio of projects showcasing expertise in web development, mobile applications, AI/ML solutions, and open-source contributions.",
    url: `${siteConfig.url}/projects`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Ibrahim Shittu - Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Ibrahim Shittu",
    description:
      "Explore my portfolio of projects showcasing expertise in web development, mobile applications, AI/ML solutions, and open-source contributions.",
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="flex-1 flex flex-col">
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
              href="/projects"
              className="font-mono text-sm text-foreground hover:underline"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <section
        className="mx-auto w-full max-w-2xl space-y-8 bg-card px-4 pb-8"
        aria-label="Projects Content"
      >
        {/* Header */}
        <header className="space-y-1.5">
          <h1 className="text-2xl font-bold" id="projects-title">
            Projects
          </h1>
          <p className="text-pretty font-mono text-sm text-muted-foreground">
            A collection of projects showcasing my expertise in web development,
            mobile applications, AI/ML solutions, and open-source contributions.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {/* Projects List */}
          <section className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-lg font-bold" id="all-projects">
              All Projects
            </h2>
            <div className="flex flex-col gap-6" aria-labelledby="all-projects">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="font-mono flex flex-col justify-start items-start gap-3 pb-6 border-b border-muted last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 w-full">
                    <div className="flex-1">
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-base font-semibold text-left text-foreground hover:underline transition-all cursor-pointer">
                          {project.title}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatDate(project.date)}</span>
                    </div>
                  </div>

                  <p className="self-stretch text-sm font-medium text-left text-muted-foreground leading-relaxed">
                    {project.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <div
                        key={tech}
                        className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors text-nowrap border-muted bg-muted text-muted-foreground pointer-events-none"
                      >
                        {tech}
                      </div>
                    ))}
                    {project.technologies.length > 4 && (
                      <div className="inline-flex items-center px-2 py-0.5 text-xs text-muted-foreground font-mono">
                        +{project.technologies.length - 4} more
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* About Projects */}
          <section className="flex min-h-0 flex-col gap-y-3 pt-4">
            <h2 className="text-xl font-bold" id="about-projects">
              About These Projects
            </h2>
            <div
              className="text-pretty font-mono text-sm text-muted-foreground"
              aria-labelledby="about-projects"
            >
              These projects showcase my diverse experience across AI/ML, Web3,
              computer vision, and enterprise solutions. Each project reflects
              my passion for leveraging cutting-edge technology to solve complex
              real-world challenges. I focus on creating scalable, user-centric
              solutions that drive meaningful impact.
            </div>
          </section>

          {/* Contact for Collaboration */}
          <section className="flex min-h-0 flex-col gap-y-3 pt-4">
            <h2 className="text-xl font-bold" id="collaborate">
              Let&apos;s Build Something Together
            </h2>
            <div
              className="text-pretty font-mono text-sm text-muted-foreground mb-4"
              aria-labelledby="collaborate"
            >
              Interested in collaborating on a project or have an idea
              you&apos;d like to discuss? I&apos;m always open to new
              opportunities and challenges.
            </div>
            <div className="flex gap-3">
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Get in Touch
              </a>
              <a
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono border rounded-md hover:bg-accent transition-colors"
              >
                View GitHub
              </a>
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
