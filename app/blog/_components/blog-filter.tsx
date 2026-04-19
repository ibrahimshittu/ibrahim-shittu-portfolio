"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatMonthYear } from "@/lib/date";
import { FilterButton } from "@/components/ui/filter-button";

export interface BlogRow {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string;
  tag: string;
  tags: string[];
}

interface Props {
  posts: BlogRow[];
}

export function BlogFilter({ posts }: Props) {
  const [tag, setTag] = useState<string>("all");
  const [q, setQ] = useState<string>("");

  const tags = useMemo(
    () => ["all", ...Array.from(new Set(posts.map((p) => p.tag)))],
    [posts],
  );

  const filtered = useMemo(() => {
    let s = tag === "all" ? posts : posts.filter((p) => p.tag === tag);
    const needle = q.trim().toLowerCase();
    if (needle) {
      s = s.filter((p) =>
        (p.title + " " + p.excerpt + " " + p.body)
          .toLowerCase()
          .includes(needle),
      );
    }
    return s;
  }, [tag, q, posts]);

  const [featured, ...rest] = filtered;

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
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
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search posts…"
          aria-label="Search posts"
          className="w-full max-w-[220px] rounded-md border border-[#e7e5de] bg-white px-3 py-1.5 font-mono text-[12px] text-[#0e0f11] placeholder:text-[#7a7f86] focus:border-[#0e0f11] focus:outline-none dark:border-[#26251f] dark:bg-[#1a1a17] dark:text-[#f2efe7] dark:placeholder:text-[#74706a] dark:focus:border-[#f2efe7]"
        />
      </div>

      {filtered.length === 0 && (
        <div className="border-y border-[#e7e5de] py-16 text-center font-mono text-[13px] text-[#7a7f86] dark:border-[#26251f] dark:text-[#74706a]">
          nothing matches &ldquo;{q}&rdquo; in <b>{tag}</b>.
        </div>
      )}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="mb-8 grid grid-cols-1 overflow-hidden border border-[#d4d1c7] bg-white transition-colors hover:bg-[#fdfcfa] md:grid-cols-[1.4fr_1fr] dark:border-[#35332c] dark:bg-[#1a1a17] dark:hover:bg-[#1f1f1b]"
        >
          <div className="border-b border-[#e7e5de] p-8 md:border-b-0 md:border-r md:p-10 dark:border-[#26251f]">
            <div className="mb-4 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
              <span className="text-[#1f5d3b] dark:text-[#6fb292]">
                featured
              </span>
              <span className="text-[#7a7f86] dark:text-[#74706a]">
                {featured.tag}
              </span>
              <span className="text-[#7a7f86] dark:text-[#74706a]">
                {formatMonthYear(featured.date)}
              </span>
              <span className="text-[#7a7f86] dark:text-[#74706a]">
                {featured.readTime}
              </span>
            </div>
            <h3 className="m-0 mb-4 font-sans text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0e0f11] md:text-[34px] dark:text-[#f2efe7]">
              {featured.title}
            </h3>
            <p className="m-0 mb-3 font-sans text-[15px] leading-[1.6] text-[#3d4147] md:text-[16px] dark:text-[#b9b5aa]">
              {featured.excerpt}
            </p>
            {featured.body && featured.body !== featured.excerpt && (
              <p className="m-0 font-sans text-[14px] leading-[1.65] text-[#7a7f86] dark:text-[#74706a]">
                {featured.body}
              </p>
            )}
            <div className="mt-5 inline-block border-b border-[#0e0f11] pb-0.5 font-mono text-[12px] text-[#0e0f11] dark:border-[#f2efe7] dark:text-[#f2efe7]">
              read the essay →
            </div>
          </div>
          <div className="flex flex-col gap-3.5 bg-[#fafaf7] p-8 md:p-10 dark:bg-[#0f0f0d]">
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
              {"// from the piece"}
            </div>
            <blockquote className="m-0 border-l-2 border-[#1f5d3b] pl-4 font-sans text-[18px] italic leading-[1.45] tracking-[-0.015em] text-[#0e0f11] md:text-[20px] dark:border-[#6fb292] dark:text-[#f2efe7]">
              &ldquo;{(featured.body || featured.excerpt).split(".")[0]}.&rdquo;
            </blockquote>
            <div className="mt-auto font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
              ibrahim shittu · {formatMonthYear(featured.date)}
            </div>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <>
          <div className="hidden grid-cols-[120px_1fr_80px_40px] gap-4 border-t border-[#d4d1c7] border-b border-[#e7e5de] px-2 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] md:grid dark:border-t-[#35332c] dark:border-b-[#26251f] dark:text-[#74706a]">
            <span>Date</span>
            <span>Title</span>
            <span>Read</span>
            <span className="text-right">—</span>
          </div>
          <div className="md:hidden border-t border-[#d4d1c7] dark:border-t-[#35332c]" />
          {rest.map((w) => (
            <Link
              href={`/blog/${w.slug}`}
              key={w.slug}
              className="block border-b border-[#e7e5de] px-2 py-5 transition-colors hover:bg-white md:grid md:grid-cols-[120px_1fr_80px_40px] md:items-baseline md:gap-4 dark:border-[#26251f] dark:hover:bg-[#1a1a17]/60"
            >
              <div className="mb-2 flex items-center justify-between md:mb-0 md:block">
                <div className="font-mono text-[12px] text-[#7a7f86] dark:text-[#74706a]">
                  {formatMonthYear(w.date)}
                </div>
                <div className="flex items-center gap-3 md:hidden">
                  <span className="font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
                    {w.readTime}
                  </span>
                  <span className="font-mono text-[13px] text-[#0e0f11] dark:text-[#f2efe7]">
                    ↗
                  </span>
                </div>
              </div>
              <div>
                <div className="mb-1 font-sans text-[16px] font-semibold tracking-[-0.01em] text-[#0e0f11] md:text-[17px] dark:text-[#f2efe7]">
                  {w.title}
                </div>
                <div className="max-w-[640px] font-sans text-[13px] leading-[1.55] text-[#3d4147] md:text-[13.5px] dark:text-[#b9b5aa]">
                  {w.excerpt}
                </div>
                {w.tags.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {w.tags.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="inline-block rounded-[3px] border border-[#e7e5de] bg-[#fafaf7] px-2 py-[2px] font-mono text-[10px] uppercase tracking-[0.08em] text-[#3d4147] dark:border-[#26251f] dark:bg-[#0f0f0d] dark:text-[#b9b5aa]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden font-mono text-[11px] text-[#7a7f86] md:block dark:text-[#74706a]">
                {w.readTime}
              </div>
              <div className="hidden text-right font-mono text-[13px] text-[#0e0f11] md:block dark:text-[#f2efe7]">
                ↗
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
