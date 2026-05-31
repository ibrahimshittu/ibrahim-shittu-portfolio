import { siteConfig } from "@/lib/seo";

const socials = [
  { href: siteConfig.author.github, label: "GitHub" },
  { href: siteConfig.author.linkedin, label: "LinkedIn" },
  { href: siteConfig.author.twitter, label: "X" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto w-full max-w-reading px-5 py-10 md:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-[14px] text-foreground transition-opacity hover:opacity-70"
          >
            {siteConfig.author.email}
          </a>
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-faint transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-faint">
          &copy; {new Date().getFullYear()} Ibrahim Shittu — Shipping since 2018
        </div>
      </div>
    </footer>
  );
}
