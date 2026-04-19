import Link from "next/link";
import { formatMonthYear } from "@/lib/date";
import type { BlogPost } from "@/lib/markdown";

interface Props {
  posts: BlogPost[];
}

export function WritingList({ posts }: Props) {
  return (
    <section
      id="writing"
      className="border-b border-[#d4d1c7] dark:border-[#35332c]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
              03 ——
            </div>
            <h2 className="mt-1 font-sans text-3xl font-semibold tracking-[-0.02em] text-[#0e0f11] md:text-[32px] dark:text-[#f2efe7]">
              Writing
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-mono text-[12px] text-[#0e0f11] underline-offset-4 hover:underline dark:text-[#f2efe7]"
          >
            all writing ↗
          </Link>
        </div>

        <div className="hidden grid-cols-[120px_1fr_80px] gap-6 border-t border-b border-t-[#d4d1c7] border-b-[#e7e5de] px-0 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] md:grid dark:border-t-[#35332c] dark:border-b-[#26251f] dark:text-[#74706a]">
          <span>Date</span>
          <span>Title</span>
          <span className="text-right">Read</span>
        </div>
        <div className="md:hidden border-t border-[#d4d1c7] dark:border-t-[#35332c]" />
        <div>
          {posts.map((w) => (
            <Link
              href={`/blog/${w.slug}`}
              key={w.slug}
              className="block border-b border-[#e7e5de] py-5 transition-colors hover:bg-white md:grid md:grid-cols-[120px_1fr_80px] md:items-baseline md:gap-6 dark:border-[#26251f] dark:hover:bg-[#1a1a17]/60"
            >
              <div className="mb-2 flex items-center justify-between md:mb-0 md:block">
                <div className="font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
                  {formatMonthYear(w.date)}
                </div>
                <div className="font-mono text-[11px] text-[#7a7f86] md:hidden dark:text-[#74706a]">
                  {w.readTime}
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
                    {w.tags.slice(0, 4).map((t) => (
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
              <div className="hidden text-right font-mono text-[11px] text-[#7a7f86] md:block dark:text-[#74706a]">
                {w.readTime}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
