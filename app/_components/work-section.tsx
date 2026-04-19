"use client";

import { useMemo, useState } from "react";

export interface WorkEntry {
  title: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
}

interface Props {
  experience: WorkEntry[];
}

export function WorkSection({ experience }: Props) {
  const [filter, setFilter] = useState<string>("all");

  const allStacks = useMemo(
    () => Array.from(new Set(experience.flatMap((job) => job.stack))),
    [experience],
  );

  const shown =
    filter === "all"
      ? experience
      : experience.filter((job) => job.stack.includes(filter));

  const filters = ["all", ...allStacks.slice(0, 6)];

  return (
    <section
      id="work"
      className="border-b border-[#d4d1c7] dark:border-[#35332c]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
              01 ——
            </div>
            <h2 className="mt-1 font-sans text-3xl font-semibold tracking-[-0.02em] text-[#0e0f11] dark:text-[#f2efe7] md:text-[32px]">
              Work experience
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
              filter:
            </span>
            {filters.map((s) => {
              const active = filter === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilter(s)}
                  className={
                    active
                      ? "rounded-full border border-[#0e0f11] bg-[#0e0f11] px-2.5 py-1 font-mono text-[11px] text-[#fafaf7] dark:border-[#f2efe7] dark:bg-[#f2efe7] dark:text-[#0f0f0d]"
                      : "rounded-full border border-[#e7e5de] bg-transparent px-2.5 py-1 font-mono text-[11px] text-[#3d4147] transition-colors hover:border-[#7a7f86] dark:border-[#26251f] dark:text-[#b9b5aa] dark:hover:border-[#74706a]"
                  }
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[#d4d1c7] dark:border-[#35332c]">
          {shown.map((job, i) => (
            <article
              key={i}
              className="grid gap-6 border-b border-[#e7e5de] py-7 dark:border-[#26251f] md:grid-cols-[140px_1fr] md:gap-10"
            >
              <div className="pt-1">
                <div className="font-mono text-[12px] font-medium text-[#0e0f11] dark:text-[#f2efe7]">
                  {job.period}
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
                  {job.location}
                </div>
              </div>
              <div>
                <div className="font-sans text-[20px] font-semibold tracking-[-0.015em] text-[#0e0f11] dark:text-[#f2efe7]">
                  {job.title}{" "}
                  <span className="font-normal text-[#7a7f86] dark:text-[#74706a]">
                    at {job.company}
                  </span>
                </div>
                <p className="mt-2.5 max-w-[680px] font-sans text-[15px] leading-[1.65] text-[#3d4147] dark:text-[#b9b5aa]">
                  {job.summary}
                </p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <span
                      key={s}
                      className="inline-block rounded-[3px] border border-[#e7e5de] bg-white px-2 py-[3px] font-mono text-[10.5px] text-[#3d4147] dark:border-[#26251f] dark:bg-[#1a1a17] dark:text-[#b9b5aa]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
