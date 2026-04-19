"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Icons } from "@/components/ui/icons";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="relative inline-flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#e7e5de] bg-white text-[#0e0f11] transition-colors hover:border-[#7a7f86] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0e0f11] focus-visible:ring-offset-1 focus-visible:ring-offset-[#fafaf7] dark:border-[#26251f] dark:bg-[#1a1a17] dark:text-[#f2efe7] dark:hover:border-[#74706a] dark:focus-visible:ring-[#f2efe7] dark:focus-visible:ring-offset-[#0f0f0d]"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <Icons.sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
