import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, generatePersonSchema } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/markdown";
import { ContactFooter } from "@/components/ui/contact-footer";
import { WorkSection, type WorkEntry } from "./_components/work-section";

export const metadata: Metadata = {
  title: "Ibrahim Shittu - Senior Software Engineer",
  description:
    "Senior software engineer with eight years shipping web, mobile, and AI agents. Three-time founding engineer, currently building Finiti — the AI compliance layer for capital markets.",
  openGraph: {
    title: "Ibrahim Shittu - Senior Software Engineer",
    description:
      "Senior software engineer with eight years shipping web, mobile, and AI agents. Three-time founding engineer, currently building Finiti — the AI compliance layer for capital markets.",
    url: siteConfig.url,
    type: "profile",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Ibrahim Shittu - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Shittu - Senior Software Engineer",
    description:
      "Senior software engineer with eight years shipping web, mobile, and AI agents. Three-time founding engineer, currently building Finiti — the AI compliance layer for capital markets.",
    images: [siteConfig.ogImage],
  },
  alternates: { canonical: siteConfig.url },
};

const experience: WorkEntry[] = [
  {
    title: "Founding Software Engineer",
    company: "Finiti",
    period: "2025 —",
    location: "San Francisco (remote)",
    summary:
      "AI compliance layer between regulated companies and their regulators. Multi-agent orchestration with LangGraph and Pydantic AI over millions of SEC filings — validating filings, benchmarking disclosures, and running end-to-end filing prep with humans in the loop.",
    stack: ["Python", "LangGraph", "Pydantic AI", "Azure"],
    impact: { head: "days → minutes", tail: "filing prep" },
  },
  {
    title: "Founder",
    company: "Fabrio",
    period: "2022 — 2025",
    location: "London, UK",
    summary:
      "Founded Fabrio to revolutionise grading for engineering CAD work — saving professors thousands of hours. Raised venture money, grew to 6-figure ARR, built a team of six, and secured customers like Imperial College London and UCL.",
    stack: ["TypeScript", "Next.js", "GraphQL", "AWS"],
    impact: { head: "40+", tail: "institutions" },
  },
  {
    title: "Lead Software Engineer",
    company: "Thrive Agric (YC W19)",
    period: "2022",
    location: "Abuja, Nigeria",
    summary:
      "Led frontend at Crust Microfinance Bank. Shipped the mobile apps and internal admin tools behind a financial product that reached 73,000 customers.",
    stack: ["React Native", "TypeScript", "Node"],
    impact: { head: "$1M+", tail: "transaction volume" },
  },
  {
    title: "Founding Engineer",
    company: "LiveClasses",
    period: "2020 — 2022",
    location: "Lagos, Nigeria",
    summary:
      "From zero to product. Accepted into top incubators, raised funding, built the team, and shipped the roadmap that grew active users by more than 300%.",
    stack: ["React", "Node", "Postgres"],
    impact: { head: "+300%", tail: "active users" },
  },
  {
    title: "Software Engineer",
    company: "Eco Energio",
    period: "2021",
    location: "Aberdeen, UK",
    summary:
      "Predictive models for carbon tracking and AI-driven analytics that cut building energy waste by 25% across deployed sites.",
    stack: ["Python", "ML"],
    impact: { head: "−25%", tail: "energy waste" },
  },
  {
    title: "Software Developer",
    company: "Various startups",
    period: "2018 — 2020",
    location: "Remote",
    summary:
      "Took several early-stage ideas from concept to launch. Full-stack across diverse stacks and industries, with six products shipped.",
    stack: ["JS", "Python", "Ruby"],
    impact: { head: "6", tail: "products shipped" },
  },
];

const projects = [
  {
    name: "Tunnel AI",
    year: "2025",
    tag: "Dev Tools",
    blurb:
      "Multi-agent system that turns plain-English instructions into self-healing Playwright tests, executed at scale on cloud browsers.",
    metric: "90%+ less authoring",
    href: "/projects/tunnel-ai",
  },
  {
    name: "Finiti AI",
    year: "2025",
    tag: "Capital Markets AI",
    blurb:
      "AI compliance layer between regulated companies and their regulators. Multi-agent orchestration with LangGraph and Pydantic AI over millions of SEC filings.",
    metric: "Days → minutes",
    href: "/projects/finiti",
  },
  {
    name: "Fabrio",
    year: "2024",
    tag: "EdTech",
    blurb:
      "Revolutionised grading for engineering CAD work — saving professors thousands of hours at Imperial College London, UCL, and 40+ institutions worldwide.",
    metric: "40+ institutions",
    href: "/projects/fabrio",
  },
  {
    name: "Unheard",
    year: "2023",
    tag: "HealthTech",
    blurb:
      "Mental-health platform pairing licensed therapists with anonymous audio rooms — confidential by default, personalised by design.",
    metric: "500+ beta users",
    href: "/projects/unheard-mental-health",
  },
  {
    name: "Crust Mobile Bank",
    year: "2022",
    tag: "Fintech",
    blurb:
      "Full-stack mobile bank for the underbanked. iOS, Android, and an admin console, shipped as a lean team of four.",
    metric: "$1M+ transactions",
    href: "/projects/crust-mobile-bank",
  },
  {
    name: "Revit Virtual Assistant",
    year: "2020",
    tag: "AEC",
    blurb:
      "Natural-language query layer over Revit BIM models, letting engineers pull structural and material data without touching the UI.",
    metric: "−70% analysis time",
    href: "/projects/revit-virtual-assistant",
  },
];

function formatWritingDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Home() {
  const writing = getAllBlogPosts().slice(0, 4);
  const personSchema = generatePersonSchema();

  return (
    <main className="relative bg-[#fafaf7] text-[#0e0f11] dark:bg-[#0f0f0d] dark:text-[#f2efe7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: siteConfig.author.name,
              jobTitle: "Senior Software Engineer",
              url: siteConfig.url,
              sameAs: [
                siteConfig.author.linkedin,
                siteConfig.author.github,
                siteConfig.author.twitter,
              ],
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative border-b border-[#d4d1c7] dark:border-[#35332c]">
        <div
          aria-hidden
          className="hero-right-bleed pointer-events-none absolute inset-y-0 hidden bg-white md:block dark:bg-[#1a1a17]"
        />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-[1.3fr_1fr]">
          <div className="border-b border-[#e7e5de] px-6 py-14 md:border-b-0 md:border-r md:px-12 md:py-[72px] dark:border-[#26251f]">
            <div className="mb-6 font-mono text-[11px] tracking-[0.08em] text-[#7a7f86] dark:text-[#74706a]">
              {"// senior software engineer · 8y shipping"}
            </div>
            <h1 className="m-0 font-sans text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0e0f11] sm:text-[54px] md:text-[64px] dark:text-[#f2efe7]">
              I build systems
              <br />
              that hold up under{" "}
              <span className="gold-marker">real traffic.</span>
            </h1>
            <p className="mt-7 max-w-[560px] font-sans text-[16px] leading-[1.6] text-[#3d4147] md:text-[17px] dark:text-[#b9b5aa]">
              Eight years shipping web, mobile, and AI agents — from zero-to-one
              prototypes to platforms adopted by universities, banks, and law
              firms.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="rounded-[4px] bg-[#0e0f11] px-4 py-2.5 font-mono text-[12px] tracking-wide text-[#fafaf7] transition-opacity hover:opacity-90 dark:bg-[#f2efe7] dark:text-[#0f0f0d]"
              >
                get in touch ↗
              </a>
              <a
                href="https://drive.google.com/file/d/1QHgz0bOiAq4x1XqztYN39f0WPQD00Kvx/view"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[4px] border border-[#e7e5de] bg-white px-4 py-2.5 font-mono text-[12px] tracking-wide text-[#0e0f11] transition-colors hover:border-[#7a7f86] dark:border-[#26251f] dark:bg-[#1a1a17] dark:text-[#f2efe7] dark:hover:border-[#74706a]"
              >
                resume.pdf
              </a>
              <div className="flex gap-4 px-2 font-mono text-[12px] tracking-wide text-[#3d4147] dark:text-[#b9b5aa]">
                <a
                  href={siteConfig.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
                >
                  github
                </a>
                <a
                  href={siteConfig.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
                >
                  linkedin
                </a>
                <a
                  href={siteConfig.author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
                >
                  x
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white px-6 py-14 md:px-12 md:py-[72px] dark:bg-[#1a1a17]">
            <div className="mb-6 font-mono text-[11px] tracking-[0.08em] text-[#7a7f86] dark:text-[#74706a]">
              {"// selected"}
            </div>
            <div className="border-t border-[#e7e5de] dark:border-[#26251f]">
              {[
                {
                  k: "NOW",
                  body: (
                    <>
                      Building{" "}
                      <strong className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
                        Finiti
                      </strong>{" "}
                      — the AI compliance layer for capital markets.
                    </>
                  ),
                },
                {
                  k: "PAST",
                  body: (
                    <>
                      Shipped{" "}
                      <strong className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
                        Crust
                      </strong>{" "}
                      — mobile bank that moved{" "}
                      <strong className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
                        $1M+
                      </strong>{" "}
                      with a team of four.
                    </>
                  ),
                },
                {
                  k: "SCALE",
                  body: (
                    <>
                      Founded{" "}
                      <strong className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
                        Fabrio
                      </strong>
                      . Saved professors thousands of hours at{" "}
                      <strong className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
                        Imperial
                      </strong>{" "}
                      and{" "}
                      <strong className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
                        UCL
                      </strong>
                      .
                    </>
                  ),
                },
                {
                  k: "BEFORE",
                  body: (
                    <>
                      Founding engineer{" "}
                      <strong className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
                        3×
                      </strong>
                      . Exited once. Learned something each time.
                    </>
                  ),
                },
              ].map((row) => (
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
        </div>
      </section>

      <WorkSection experience={experience} />

      {/* Projects */}
      <section
        id="projects"
        className="border-b border-[#d4d1c7] bg-white dark:border-[#35332c] dark:bg-[#1a1a17]/40"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
                02 ——
              </div>
              <h2 className="mt-1 font-sans text-3xl font-semibold tracking-[-0.02em] text-[#0e0f11] md:text-[32px] dark:text-[#f2efe7]">
                Selected projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-mono text-[12px] text-[#0e0f11] underline-offset-4 hover:underline dark:text-[#f2efe7]"
            >
              view all ↗
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px border border-[#e7e5de] bg-[#e7e5de] md:grid-cols-2 lg:grid-cols-3 dark:border-[#26251f] dark:bg-[#26251f]">
            {projects.map((p) => {
              const content = (
                <div className="flex min-h-[220px] flex-col gap-3 bg-[#fafaf7] p-6 transition-colors hover:bg-white dark:bg-[#0f0f0d] dark:hover:bg-[#1a1a17]">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.12em]">
                    <span className="text-[#1f5d3b] dark:text-[#6fb292]">
                      {p.tag}
                    </span>
                    <span className="text-[#7a7f86] dark:text-[#74706a]">
                      {p.year}
                    </span>
                  </div>
                  <div className="font-sans text-[22px] font-semibold tracking-[-0.025em] text-[#0e0f11] dark:text-[#f2efe7]">
                    {p.name}
                  </div>
                  <p className="m-0 flex-1 font-sans text-[13.5px] leading-[1.55] text-[#3d4147] dark:text-[#b9b5aa]">
                    {p.blurb}
                  </p>
                  <div className="mt-2 flex items-center justify-between border-t border-[#e7e5de] pt-3 font-mono text-[11px] dark:border-[#26251f]">
                    <span className="text-[#1f5d3b] dark:text-[#6fb292]">
                      → {p.metric}
                    </span>
                    {p.href && (
                      <span className="text-[#7a7f86] dark:text-[#74706a]">
                        read ↗
                      </span>
                    )}
                  </div>
                </div>
              );
              if (!p.href) {
                return (
                  <div key={p.name} className="block">
                    {content}
                  </div>
                );
              }
              const external = p.href.startsWith("http");
              return external ? (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <Link key={p.name} href={p.href} className="block">
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Writing */}
      <section
        id="writing"
        className="border-b border-[#d4d1c7] dark:border-[#35332c]"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
                03 ——
              </div>
              <h2 className="mt-1 font-sans text-3xl font-semibold tracking-[-0.02em] text-[#0e0f11] md:text-[32px] dark:text-[#f2efe7]">
                Writing
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-mono text-[12px] text-[#0e0f11] underline-offset-4 hover:underline dark:text-[#f2efe7]"
            >
              all writing ↗
            </Link>
          </div>

          <div className="border-t border-[#d4d1c7] dark:border-[#35332c]">
            {writing.map((w) => (
              <Link
                href={`/blog/${w.slug}`}
                key={w.slug}
                className="block border-b border-[#e7e5de] py-5 transition-colors hover:bg-white md:grid md:grid-cols-[120px_1fr_80px] md:items-baseline md:gap-6 dark:border-[#26251f] dark:hover:bg-[#1a1a17]/60"
              >
                <div className="mb-2 flex items-center justify-between md:mb-0 md:block">
                  <div className="font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
                    {formatWritingDate(w.date)}
                  </div>
                  <div className="font-mono text-[11px] text-[#7a7f86] md:hidden dark:text-[#74706a]">
                    {w.readTime}
                  </div>
                </div>
                <div>
                  <div className="mb-1 font-sans text-[16px] font-semibold tracking-[-0.01em] text-[#0e0f11] md:text-[17px] dark:text-[#f2efe7]">
                    {w.title}
                  </div>
                  <div className="max-w-[640px] font-sans text-[13px] leading-[1.55] text-[#3d4147] md:text-[13.5px] dark:text-[#b9b5aa]">
                    {w.excerpt}
                  </div>
                  {w.tags.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {w.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="inline-block rounded-[3px] border border-[#e7e5de] bg-[#fafaf7] px-2 py-[2px] font-mono text-[10px] uppercase tracking-[0.08em] text-[#3d4147] dark:border-[#26251f] dark:bg-[#0f0f0d] dark:text-[#b9b5aa]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="hidden text-right font-mono text-[11px] text-[#7a7f86] md:block dark:text-[#74706a]">
                  {w.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
