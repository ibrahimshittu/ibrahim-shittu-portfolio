"use client";

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const baseClass =
  "rounded-full px-2.5 py-1 font-mono text-[11px] border transition-colors";
const activeClass =
  "border-[#0e0f11] bg-[#0e0f11] text-[#fafaf7] dark:border-[#f2efe7] dark:bg-[#f2efe7] dark:text-[#0f0f0d]";
const inactiveClass =
  "border-[#e7e5de] bg-transparent text-[#3d4147] hover:border-[#7a7f86] dark:border-[#26251f] dark:text-[#b9b5aa] dark:hover:border-[#74706a]";

export function FilterButton({ active, onClick, label }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClass} ${active ? activeClass : inactiveClass}`}
    >
      {label}
    </button>
  );
}
