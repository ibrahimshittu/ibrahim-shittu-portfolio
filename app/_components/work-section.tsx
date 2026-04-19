export interface WorkEntry {
  title: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
  impact: { head: string; tail: string };
}

interface Props {
  experience: WorkEntry[];
}

export function WorkSection({ experience }: Props) {
  return (
    <section
      id="work"
      className="border-b border-[#d4d1c7] dark:border-[#35332c]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
        <div className="mb-8">
          <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
            01 ——
          </div>
          <h2 className="mt-1 font-sans text-3xl font-semibold tracking-[-0.02em] text-[#0e0f11] md:text-[32px] dark:text-[#f2efe7]">
            Work experience
          </h2>
        </div>

        <div className="overflow-hidden rounded-md border border-[#e7e5de] bg-white dark:border-[#26251f] dark:bg-[#1a1a17]">
          <div className="hidden md:grid md:grid-cols-[140px_1fr_180px] md:gap-8 md:border-b md:border-[#e7e5de] md:bg-[#fafaf7] md:px-8 md:py-3 md:font-mono md:text-[10px] md:uppercase md:tracking-[0.12em] md:text-[#7a7f86] dark:md:border-[#26251f] dark:md:bg-[#0f0f0d] dark:md:text-[#74706a]">
            <span>Period</span>
            <span>Role · Company</span>
            <span className="text-right">Impact</span>
          </div>

          {experience.map((job, i) => (
            <article
              key={i}
              className={[
                "px-5 py-6 md:grid md:grid-cols-[140px_1fr_180px] md:items-start md:gap-8 md:px-8",
                i < experience.length - 1
                  ? "border-b border-[#e7e5de] dark:border-[#26251f]"
                  : "",
              ].join(" ")}
            >
              {/* Mobile: period + impact inline */}
              <div className="mb-3 flex items-start justify-between md:hidden">
                <div className="font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
                  {job.period}
                </div>
                <div className="text-right">
                  <div className="font-sans text-[16px] font-semibold leading-[1.1] tracking-[-0.015em] text-[#0e0f11] dark:text-[#f2efe7]">
                    {job.impact.head}
                  </div>
                  <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
                    {job.impact.tail}
                  </div>
                </div>
              </div>

              {/* Desktop period */}
              <div className="hidden pt-1 font-mono text-[12px] text-[#7a7f86] md:block dark:text-[#74706a]">
                {job.period}
              </div>

              <div>
                <div className="font-sans text-[16px] font-semibold tracking-[-0.01em] text-[#0e0f11] md:text-[17px] dark:text-[#f2efe7]">
                  {job.title}{" "}
                  <span className="font-normal text-[#7a7f86] dark:text-[#74706a]">
                    @ {job.company}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
                  {job.location}
                </div>
                <p className="mt-2.5 max-w-[640px] font-sans text-[13.5px] leading-[1.6] text-[#3d4147] md:text-[14px] dark:text-[#b9b5aa]">
                  {job.summary}
                </p>
              </div>

              {/* Desktop impact */}
              <div className="hidden pt-1 text-right md:block">
                <div className="font-sans text-[18px] font-semibold leading-[1.1] tracking-[-0.015em] text-[#0e0f11] md:text-[20px] dark:text-[#f2efe7]">
                  {job.impact.head}
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
                  {job.impact.tail}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
