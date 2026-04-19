import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";

interface Props {
  projects: Project[];
}

export function ProjectsSection({ projects }: Props) {
  return (
    <section
      id="projects"
      className="border-b border-[#d4d1c7] bg-white dark:border-[#35332c] dark:bg-[#1a1a17]/40"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
              02 ——
            </div>
            <h2 className="mt-1 font-sans text-3xl font-semibold tracking-[-0.02em] text-[#0e0f11] md:text-[32px] dark:text-[#f2efe7]">
              Selected projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="font-mono text-[12px] text-[#0e0f11] underline-offset-4 hover:underline dark:text-[#f2efe7]"
          >
            view all ↗
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px border border-[#e7e5de] bg-[#e7e5de] sm:grid-cols-2 md:grid-cols-3 dark:border-[#26251f] dark:bg-[#26251f]">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
