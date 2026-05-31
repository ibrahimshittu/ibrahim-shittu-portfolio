"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const links = [
  { href: "/projects", label: "Products" },
  { href: "/blog", label: "Writing" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-reading items-center justify-between px-5 py-3.5 md:px-6">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[-0.01em] text-foreground transition-opacity hover:opacity-70"
        >
          Ibrahim Shittu
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "rounded-md px-2.5 py-1.5 text-[14px] transition-colors",
                  active
                    ? "text-foreground"
                    : "text-faint hover:text-foreground",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-1.5 pl-1.5">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
