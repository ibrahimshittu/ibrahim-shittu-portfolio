"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname } from "next/navigation";

export function SiteNav() {
  const pathname = usePathname();

  const linkClass = (isActive: boolean) =>
    isActive
      ? "font-mono text-sm text-foreground transition-colors"
      : "font-mono text-sm text-muted-foreground hover:text-foreground transition-colors";

  return (
    <nav className="mx-auto w-full max-w-2xl px-4 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className={linkClass(pathname === "/")}>
          Resume
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className={linkClass(
              pathname === "/blog" || pathname.startsWith("/blog/")
            )}
          >
            Blog
          </Link>
          <Link
            href="/projects"
            className={linkClass(
              pathname === "/projects" || pathname.startsWith("/projects/")
            )}
          >
            Projects
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
