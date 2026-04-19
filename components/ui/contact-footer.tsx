import { siteConfig } from "@/lib/seo";

export function ContactFooter() {
  return (
    <>
      <section
        id="contact"
        className="border-b border-[#e7e5de] dark:border-[#26251f]"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-24">
          <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
            {"// get in touch"}
          </div>
          <h2 className="m-0 mt-2 max-w-[720px] font-sans text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0e0f11] sm:text-[44px] md:text-[48px] dark:text-[#f2efe7]">
            Have a problem worth solving?{" "}
            <span className="text-[#7a7f86] dark:text-[#74706a]">
              I&apos;d like to hear about it.
            </span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-6 font-mono text-[13px] text-[#3d4147] dark:text-[#b9b5aa]">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="border-b border-[#0e0f11] pb-0.5 text-[#0e0f11] dark:border-[#f2efe7] dark:text-[#f2efe7]"
            >
              {siteConfig.author.email} ↗
            </a>
            <a
              href={siteConfig.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
            >
              github.com/ibrahimshittu
            </a>
            <a
              href={siteConfig.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
            >
              linkedin.com/in/ibrahimshittu
            </a>
            <a
              href={siteConfig.author.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
            >
              x.com/ibrahimshittu01
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 px-6 py-5 font-mono text-[11px] text-[#7a7f86] md:px-12 dark:text-[#74706a]">
        <span>© {new Date().getFullYear()} ibrahim shittu</span>
        <span>lagos · works globally</span>
        <span>
          last updated{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </>
  );
}
