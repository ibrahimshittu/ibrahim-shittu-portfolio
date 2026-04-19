import Link from "next/link";
import type { ReactNode } from "react";

interface Count {
  k: string;
  v: string;
}

interface Props {
  kicker: string;
  title: ReactNode;
  lede: string;
  counts: Count[];
}

export function SubHero({ kicker, title, lede, counts }: Props) {
  return (
    <section className="border-b border-[#d4d1c7] dark:border-[#35332c]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-[1.3fr_1fr]">
        <div className="border-b border-[#e7e5de] px-6 py-14 md:border-b-0 md:border-r md:px-12 md:py-[72px] dark:border-[#26251f]">
          <div className="mb-6 font-mono text-[11px] tracking-[0.08em] text-[#7a7f86] dark:text-[#74706a]">
            {kicker}
          </div>
          <h1 className="m-0 font-sans text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0e0f11] sm:text-[54px] md:text-[64px] dark:text-[#f2efe7]">
            {title}
          </h1>
          <p className="mt-7 max-w-[560px] font-sans text-[16px] leading-[1.6] text-[#3d4147] md:text-[17px] dark:text-[#b9b5aa]">
            {lede}
          </p>
        </div>

        <div className="flex flex-col justify-between bg-white px-6 py-14 md:px-12 md:py-[72px] dark:bg-[#1a1a17]/40">
          <div>
            <div className="mb-6 font-mono text-[11px] tracking-[0.08em] text-[#7a7f86] dark:text-[#74706a]">
              {"// index"}
            </div>
            <div className="grid grid-cols-2 gap-px border border-[#e7e5de] bg-[#e7e5de] dark:border-[#26251f] dark:bg-[#26251f]">
              {counts.map((c) => (
                <div key={c.k} className="bg-white p-5 dark:bg-[#1a1a17]">
                  <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
                    {c.k}
                  </div>
                  <div className="font-sans text-[26px] font-semibold tracking-[-0.02em] text-[#0e0f11] dark:text-[#f2efe7]">
                    {c.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 font-mono text-[12px] text-[#7a7f86] dark:text-[#74706a]">
            <Link
              href="/"
              className="border-b border-[#0e0f11] pb-0.5 text-[#0e0f11] dark:border-[#f2efe7] dark:text-[#f2efe7]"
            >
              ← back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GoldMarker({ children }: { children: ReactNode }) {
  return (
    <span
      className="px-[2px]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, transparent 60%, rgba(201,162,39,0.33) 60%)",
      }}
    >
      {children}
    </span>
  );
}
