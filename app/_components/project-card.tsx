import Link from "next/link";
import { projectHref, type Project } from "@/lib/projects";

interface Props {
  project: Project;
}

function CardBody({ project }: Props) {
  return (
    <div className="flex h-full min-h-[220px] flex-col gap-3 bg-[#fafaf7] p-6 transition-colors hover:bg-white dark:bg-[#0f0f0d] dark:hover:bg-[#1a1a17]">
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.12em]">
        <span className="text-[#1f5d3b] dark:text-[#6fb292]">{project.tag}</span>
        <span className="text-[#7a7f86] dark:text-[#74706a]">
          {new Date(project.date).getFullYear()}
        </span>
      </div>
      <div className="font-sans text-[22px] font-semibold tracking-[-0.025em] text-[#0e0f11] dark:text-[#f2efe7]">
        {project.name}
      </div>
      <p className="m-0 flex-1 font-sans text-[13.5px] leading-[1.55] text-[#3d4147] dark:text-[#b9b5aa]">
        {project.blurb}
      </p>
      <div className="mt-2 flex items-center justify-between border-t border-[#e7e5de] pt-3 font-mono text-[11px] dark:border-[#26251f]">
        <span className="text-[#1f5d3b] dark:text-[#6fb292]">
          → {project.metric}
        </span>
        <span className="text-[#7a7f86] dark:text-[#74706a]">read ↗</span>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: Props) {
  return (
    <Link href={projectHref(project)} className="block h-full">
      <CardBody project={project} />
    </Link>
  );
}
