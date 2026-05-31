import { siteConfig } from "@/lib/seo";

const socials = [
  { href: siteConfig.author.github, label: "GitHub" },
  { href: siteConfig.author.linkedin, label: "LinkedIn" },
  { href: siteConfig.author.twitter, label: "X" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex w-full max-w-reading flex-col gap-4 px-5 py-8 md:px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint">
          &copy; {new Date().getFullYear()} Ibrahim Shittu
        </div>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-[14px] text-faint transition-colors hover:text-foreground"
          >
            Email
          </a>
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
    </footer>
  );
}
