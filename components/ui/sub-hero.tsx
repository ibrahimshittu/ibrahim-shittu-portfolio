import type { ReactNode } from "react";

interface Props {
  kicker: string;
  title: ReactNode;
  lede: string;
}

export function SubHero({ kicker, title, lede }: Props) {
  return (
    <section className="border-b border-[#d4d1c7] dark:border-[#35332c]">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-[72px]">
        <div className="mb-6 font-mono text-[11px] tracking-[0.08em] text-[#7a7f86] dark:text-[#74706a]">
          {kicker}
        </div>
        <h1 className="m-0 max-w-[920px] font-sans text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0e0f11] sm:text-[54px] md:text-[64px] dark:text-[#f2efe7]">
          {title}
        </h1>
        <p className="mt-7 max-w-[680px] font-sans text-[16px] leading-[1.6] text-[#3d4147] md:text-[18px] dark:text-[#b9b5aa]">
          {lede}
        </p>
      </div>
    </section>
  );
}

export function GoldMarker({ children }: { children: ReactNode }) {
  return <span className="gold-marker">{children}</span>;
}
