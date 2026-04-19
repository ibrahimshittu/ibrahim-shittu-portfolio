import Link from "next/link";

function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
      {children}
    </strong>
  );
}

interface Row {
  k: string;
  body: React.ReactNode;
}

const rows: Row[] = [
  {
    k: "NOW",
    body: (
      <>
        Building <Strong>Finiti Legal</Strong> — the AI compliance layer for
        capital markets.
      </>
    ),
  },
  {
    k: "SCALE",
    body: (
      <>
        Built <Strong>Fabrio</Strong>. Saved professors thousands of hours at{" "}
        <Strong>Imperial</Strong> and <Strong>UCL</Strong>.
      </>
    ),
  },
  {
    k: "PAST",
    body: (
      <>
        Shipped <Strong>Crust</Strong> — mobile bank that moved{" "}
        <Strong>$1M+</Strong> with a team of four.
      </>
    ),
  },
  {
    k: "BEFORE",
    body: (
      <>
        Founding engineer <Strong>3×</Strong>. Exited once. Learned something
        each time.
      </>
    ),
  },
];

export function SelectedList() {
  return (
    <div className="flex flex-col bg-white px-6 py-14 md:px-12 md:py-[72px] dark:bg-[#1a1a17]">
      <div className="mb-6 font-mono text-[11px] tracking-[0.08em] text-[#7a7f86] dark:text-[#74706a]">
        {"// selected"}
      </div>
      <div className="border-t border-[#e7e5de] dark:border-[#26251f]">
        {rows.map((row) => (
          <div
            key={row.k}
            className="grid grid-cols-[72px_1fr] items-baseline gap-4 border-b border-[#e7e5de] py-3.5 md:grid-cols-[80px_1fr] dark:border-[#26251f]"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7a7f86] dark:text-[#74706a]">
              {row.k}
            </span>
            <span className="font-sans text-[14px] leading-[1.55] text-[#3d4147] md:text-[14.5px] dark:text-[#b9b5aa]">
              {row.body}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/projects"
        className="mt-5 self-start border-b border-[#0e0f11] pb-0.5 font-mono text-[12px] text-[#0e0f11] dark:border-[#f2efe7] dark:text-[#f2efe7]"
      >
        case studies →
      </Link>
    </div>
  );
}
