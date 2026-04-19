"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/lib/seo";

type NavKey = "work" | "projects" | "writing";

interface NavItem {
  key: NavKey;
  label: string;
  href: string;
}

function resolveCurrent(pathname: string): NavKey {
  if (pathname === "/projects" || pathname.startsWith("/projects/")) {
    return "projects";
  }
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return "writing";
  }
  return "work";
}

export function PortfolioNav() {
  const pathname = usePathname();
  const current = resolveCurrent(pathname);
  const onIndex = pathname === "/";

  const items: NavItem[] = [
    { key: "work", label: "01 work", href: onIndex ? "#work" : "/#work" },
    { key: "projects", label: "02 projects", href: "/projects" },
    { key: "writing", label: "03 writing", href: "/blog" },
  ];

  const meta: Array<[string, string]> = [
    ["NAME", "ibrahim shittu"],
    ["ROLE", "senior software engineer"],
    ["FOCUS", "ai agents · web · mobile"],
    ["BASED", "lagos · works globally"],
  ];

  return (
    <>
      <div className="border-b border-[#d4d1c7] bg-white dark:border-[#35332c] dark:bg-[#1a1a17]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
          {meta.map(([k, v], i) => {
            const isLastInRow = (i + 1) % 2 === 0;
            return (
              <div
                key={k}
                className={[
                  "flex min-w-0 gap-2.5 px-5 py-3.5 font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]",
                  !isLastInRow
                    ? "border-r border-[#e7e5de] dark:border-[#26251f]"
                    : "",
                  i < 2
                    ? "border-b border-[#e7e5de] md:border-b-0 dark:border-[#26251f]"
                    : "",
                  i < 3
                    ? "md:border-r md:border-[#e7e5de] md:dark:border-[#26251f]"
                    : "",
                ].join(" ")}
              >
                <span>{k}</span>
                <span className="truncate font-medium text-[#0e0f11] dark:text-[#f2efe7]">
                  {v}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <nav className="sticky top-0 z-20 border-b border-[#e7e5de] bg-[#fafaf7]/95 backdrop-blur-sm dark:border-[#26251f] dark:bg-[#0f0f0d]/95">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-4 md:px-12">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-mono text-[13px]"
          >
            <Image
              src={siteConfig.author.image}
              alt="Ibrahim Shittu"
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 rounded-full object-cover"
              priority
            />
            <span className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
              ibrahim.shittu
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden gap-[2px] rounded-md border border-[#e7e5de] bg-white p-[3px] font-mono text-[12px] md:flex dark:border-[#26251f] dark:bg-[#1a1a17]">
              {items.map((it) => {
                const active = it.key === current;
                const cls = active
                  ? "rounded-[4px] bg-[#0e0f11] px-3 py-1.5 text-[#fafaf7] dark:bg-[#f2efe7] dark:text-[#0f0f0d]"
                  : "rounded-[4px] px-3 py-1.5 text-[#3d4147] hover:text-[#0e0f11] dark:text-[#b9b5aa] dark:hover:text-[#f2efe7]";
                return it.href.startsWith("#") ? (
                  <a key={it.key} href={it.href} className={cls}>
                    {it.label}
                  </a>
                ) : (
                  <Link key={it.key} href={it.href} className={cls}>
                    {it.label}
                  </Link>
                );
              })}
            </div>
            {/* compact mobile — just a small active indicator, links are in meta bar on small screens */}
            <div className="md:hidden font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
              {items.find((it) => it.key === current)?.label}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
