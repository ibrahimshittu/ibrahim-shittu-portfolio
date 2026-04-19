"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  projectHref,
  projectYear,
  splitMetric,
  type Project,
} from "@/lib/projects";
import { FilterButton } from "@/components/ui/filter-button";

interface Props {
  projects: Project[];
}

export function ProjectsFilter({ projects }: Props) {
  const [tag, setTag] = useState<string>("all");

  const tags = useMemo(
    () => ["all", ...Array.from(new Set(projects.map((p) => p.tag)))],
    [projects],
  );

  const shown = useMemo(
    () => (tag === "all" ? projects : projects.filter((p) => p.tag === tag)),
    [tag, projects],
  );

  const groups = useMemo(() => {
    const g: Record<string, Project[]> = {};
    for (const p of shown) {
      const year = projectYear(p);
      (g[year] = g[year] || []).push(p);
    }
    return g;
  }, [shown]);

  const years = useMemo(
    () => Object.keys(groups).sort((a, b) => Number(b) - Number(a)),
    [groups],
  );

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
          filter:
        </span>
        {tags.map((t) => (
          <FilterButton
            key={t}
            label={t}
            active={tag === t}
            onClick={() => setTag(t)}
          />
        ))}
      </div>

      {shown.length === 0 && (
        <div className="border-y border-[#e7e5de] py-16 text-center font-mono text-[13px] text-[#7a7f86] dark:border-[#26251f] dark:text-[#74706a]">
          no projects in <b>{tag}</b>.
        </div>
      )}

      {years.map((yr) => (
        <div key={yr} className="mb-10">
          <div className="grid grid-cols-[100px_1fr] items-baseline border-t border-[#d4d1c7] border-b border-[#e7e5de] py-3 dark:border-t-[#35332c] dark:border-b-[#26251f]">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
              {yr}
            </div>
            <div className="font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
              {groups[yr].length}{" "}
              {groups[yr].length === 1 ? "project" : "projects"}
            </div>
          </div>
          {groups[yr].map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </div>
      ))}
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const { head, tail } = splitMetric(project.metric);

  return (
    <Link
      href={projectHref(project)}
      className="block transition-colors hover:bg-white dark:hover:bg-[#1a1a17]/60"
    >
      <div className="grid grid-cols-1 items-start gap-6 border-b border-[#e7e5de] py-7 md:grid-cols-[120px_1.25fr_1fr_140px] md:gap-6 dark:border-[#26251f]">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#1f5d3b] dark:text-[#6fb292]">
            {project.tag}
          </div>
          <div className="mt-1 font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
            {project.status}
          </div>
        </div>
        <div>
          <div className="font-sans text-[22px] font-semibold tracking-[-0.025em] text-[#0e0f11] dark:text-[#f2efe7]">
            {project.name}
          </div>
          <div className="mt-1 font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
            {project.role}
          </div>
          <p className="mt-2.5 font-sans text-[14.5px] leading-[1.6] text-[#3d4147] dark:text-[#b9b5aa]">
            {project.blurb}
          </p>
        </div>
        <div>
          <p className="m-0 mb-3 font-sans text-[13.5px] leading-[1.6] text-[#3d4147] dark:text-[#b9b5aa]">
            {project.detail}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((s) => (
              <span
                key={s}
                className="inline-block rounded-[3px] border border-[#e7e5de] bg-white px-2 py-[3px] font-mono text-[10.5px] text-[#3d4147] dark:border-[#26251f] dark:bg-[#1a1a17] dark:text-[#b9b5aa]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="md:text-right">
          <div className="font-sans text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0e0f11] dark:text-[#f2efe7]">
            {head}
          </div>
          <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
            {tail}
          </div>
        </div>
      </div>
    </Link>
  );
}
