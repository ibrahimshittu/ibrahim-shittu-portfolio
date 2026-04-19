import Link from "next/link";

interface Item {
  href: string;
  title: string;
}

interface Props {
  prev: Item | null;
  next: Item | null;
  prevLabel?: string;
  nextLabel?: string;
}

export function PrevNext({
  prev,
  next,
  prevLabel = "← previous",
  nextLabel = "next →",
}: Props) {
  if (!prev && !next) return null;

  const Cell = ({
    item,
    align,
    label,
    borderRight,
  }: {
    item: Item | null;
    align: "left" | "right";
    label: string;
    borderRight: boolean;
  }) => {
    const classes = [
      "block p-8 md:p-10",
      borderRight
        ? "border-b md:border-b-0 md:border-r border-[#e7e5de] dark:border-[#26251f]"
        : "",
      align === "right" ? "text-right" : "text-left",
      item ? "" : "pointer-events-none opacity-40",
    ].join(" ");

    const content = (
      <>
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
          {label}
        </div>
        <div className="font-sans text-[18px] font-semibold leading-[1.3] tracking-[-0.015em] text-[#0e0f11] md:text-[20px] dark:text-[#f2efe7]">
          {item ? item.title : "—"}
        </div>
      </>
    );

    return item ? (
      <Link href={item.href} className={classes}>
        {content}
      </Link>
    ) : (
      <div className={classes}>{content}</div>
    );
  };

  return (
    <div className="grid grid-cols-1 border-y border-[#d4d1c7] md:grid-cols-2 dark:border-[#35332c]">
      <Cell item={prev} align="left" label={prevLabel} borderRight />
      <Cell item={next} align="right" label={nextLabel} borderRight={false} />
    </div>
  );
}
