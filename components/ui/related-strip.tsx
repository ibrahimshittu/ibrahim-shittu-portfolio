import Link from "next/link";

export interface RelatedItem {
  href: string;
  tag: string;
  date: string;
  title: string;
  blurb: string;
}

interface Props {
  label: string;
  backHref: string;
  backLabel?: string;
  items: RelatedItem[];
}

export function RelatedStrip({
  label,
  backHref,
  backLabel = "back to index ↗",
  items,
}: Props) {
  if (items.length === 0) return null;

  return (
    <section className="border-y border-[#e7e5de] bg-white dark:border-[#26251f] dark:bg-[#1a1a17]/40">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
        <div className="mb-6 flex items-baseline justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
            {"// "}
            {label}
          </div>
          <Link
            href={backHref}
            className="font-mono text-[11px] text-[#0e0f11] underline-offset-4 hover:underline dark:text-[#f2efe7]"
          >
            {backLabel}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-px border border-[#e7e5de] bg-[#e7e5de] md:grid-cols-3 dark:border-[#26251f] dark:bg-[#26251f]">
          {items.slice(0, 3).map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="flex min-h-[160px] flex-col gap-2.5 bg-[#fafaf7] p-5 transition-colors hover:bg-white dark:bg-[#0f0f0d] dark:hover:bg-[#1a1a17]"
            >
              <div className="flex gap-3 font-mono text-[10px] uppercase tracking-[0.1em]">
                <span className="text-[#1f5d3b] dark:text-[#6fb292]">
                  {it.tag}
                </span>
                <span className="text-[#7a7f86] dark:text-[#74706a]">
                  {it.date}
                </span>
              </div>
              <div className="font-sans text-[17px] font-semibold leading-[1.3] tracking-[-0.015em] text-[#0e0f11] dark:text-[#f2efe7]">
                {it.title}
              </div>
              <div className="flex-1 font-sans text-[13px] leading-[1.5] text-[#3d4147] dark:text-[#b9b5aa]">
                {it.blurb}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
