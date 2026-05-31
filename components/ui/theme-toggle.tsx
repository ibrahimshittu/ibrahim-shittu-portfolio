"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Icons } from "@/components/ui/icons";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-faint transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Icons.sun className="h-[17px] w-[17px]" />
      ) : (
        <Icons.moon className="h-[17px] w-[17px]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
