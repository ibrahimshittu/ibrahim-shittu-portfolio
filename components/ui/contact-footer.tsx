import { siteConfig } from "@/lib/seo";

const socialLinkLabel = (url: string): string =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const socials: { url: string; label: string }[] = [
  { url: siteConfig.author.github, label: socialLinkLabel(siteConfig.author.github) },
  { url: siteConfig.author.linkedin, label: socialLinkLabel(siteConfig.author.linkedin) },
  { url: siteConfig.author.twitter, label: socialLinkLabel(siteConfig.author.twitter) },
];

const SHIPPING_SINCE = 2018;

const lastUpdated = new Date().toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
});

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
            {socials.map(({ url, label }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 px-6 py-5 font-mono text-[11px] text-[#7a7f86] md:px-12 dark:text-[#74706a]">
        <span>© {new Date().getFullYear()} ibrahim shittu</span>
        <span>shipping since {SHIPPING_SINCE}</span>
        <span>last updated {lastUpdated}</span>
      </div>
    </>
  );
}
