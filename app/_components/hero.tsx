import { siteConfig } from "@/lib/seo";
import { SelectedList } from "./selected-list";

export function Hero() {
  return (
    <section className="relative border-b border-[#d4d1c7] dark:border-[#35332c]">
      <div
        aria-hidden
        className="hero-right-bleed pointer-events-none absolute inset-y-0 hidden bg-white md:block dark:bg-[#1a1a17]"
      />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-[1.3fr_1fr]">
        <div className="border-b border-[#e7e5de] px-6 py-14 md:border-b-0 md:border-r md:px-12 md:py-[72px] dark:border-[#26251f]">
          <div className="mb-6 font-mono text-[11px] tracking-[0.08em] text-[#7a7f86] dark:text-[#74706a]">
            {"// senior software engineer · 8y shipping"}
          </div>
          <h1 className="m-0 font-sans text-[48px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0e0f11] sm:text-[60px] md:text-[72px] dark:text-[#f2efe7]">
            I build systems
            <br />
            that hold up under
            <br />
            <span className="gold-marker">real traffic.</span>
          </h1>
          <p className="mt-7 max-w-[560px] font-sans text-[16px] leading-[1.6] text-[#3d4147] md:text-[17px] dark:text-[#b9b5aa]">
            Eight years shipping web, mobile, infrastructure, and AI agents —
            from zero-to-one prototypes to platforms adopted by universities,
            banks, and law firms.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="rounded-[4px] bg-[#0e0f11] px-4 py-2.5 font-mono text-[12px] tracking-wide text-[#fafaf7] transition-opacity hover:opacity-90 dark:bg-[#f2efe7] dark:text-[#0f0f0d]"
            >
              get in touch ↗
            </a>
            <div className="flex gap-4 px-2 font-mono text-[12px] tracking-wide text-[#3d4147] dark:text-[#b9b5aa]">
              <a
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
              >
                github
              </a>
              <a
                href={siteConfig.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
              >
                linkedin
              </a>
              <a
                href={siteConfig.author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
              >
                x
              </a>
            </div>
          </div>
        </div>

        <SelectedList />
      </div>
    </section>
  );
}
