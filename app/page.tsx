import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, generatePersonSchema } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/markdown";
import { WorkSection, type WorkEntry } from "./_components/work-section";

export const metadata: Metadata = {
  title: "Ibrahim Shittu - Senior Software Engineer",
  description:
    "Senior software engineer with eight years shipping web, mobile, and AI agents. Three-time founding engineer, currently building agentic systems for corporate law.",
  openGraph: {
    title: "Ibrahim Shittu - Senior Software Engineer",
    description:
      "Senior software engineer with eight years shipping web, mobile, and AI agents. Three-time founding engineer, currently building agentic systems for corporate law.",
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
      "Senior software engineer with eight years shipping web, mobile, and AI agents. Three-time founding engineer, currently building agentic systems for corporate law.",
    images: [siteConfig.ogImage],
  },
  alternates: { canonical: siteConfig.url },
};

const experience: WorkEntry[] = [
  {
    title: "Software Engineer",
    company: "Finiti Legal",
    period: "2025 —",
    location: "San Francisco (remote)",
    summary:
      "AI agents that automate corporate-law drudgery — multi-tenant, SOC 2, deep Word & Outlook integrations. Turning days of manual drafting into minutes.",
    stack: ["Python", "LangGraph", "TypeScript", "Azure"],
  },
  {
    title: "Lead Software Engineer",
    company: "Fabrio",
    period: "2022 — 2025",
    location: "London, UK",
    summary:
      "First hire at a VC-backed CAD-education startup. Led the ground-up rebuild with TypeScript, Next.js, GraphQL, and AWS. Drove adoption by 40+ institutions worldwide.",
    stack: ["TypeScript", "Next.js", "GraphQL", "AWS"],
  },
  {
    title: "Lead Software Engineer",
    company: "Thrive Agric (YC W19)",
    period: "2022",
    location: "Abuja, Nigeria",
    summary:
      "Led frontend at Crust Microfinance Bank. Shipped the mobile apps and internal admin tools behind a financial product that reached 73,000 customers.",
    stack: ["React Native", "TypeScript", "Node"],
  },
  {
    title: "Founding Engineer",
    company: "LiveClasses",
    period: "2020 — 2022",
    location: "Lagos, Nigeria",
    summary:
      "From zero to product. Accepted into top incubators, raised funding, built the team, and shipped the roadmap that grew active users by more than 300%.",
    stack: ["React", "Node", "Postgres"],
  },
  {
    title: "Software Engineer",
    company: "Eco Energio",
    period: "2021",
    location: "Aberdeen, UK",
    summary:
      "Predictive models for carbon tracking and AI-driven analytics that cut building energy waste by 25% across deployed sites.",
    stack: ["Python", "ML"],
  },
  {
    title: "Software Developer",
    company: "Various startups",
    period: "2018 — 2020",
    location: "Remote",
    summary:
      "Took several early-stage ideas from concept to launch. Full-stack across diverse stacks and industries, with six products shipped.",
    stack: ["JS", "Python", "Ruby"],
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
    name: "Agent Runway",
    year: "2025",
    tag: "Legal AI",
    blurb:
      "Multi-agent system that drafts, reviews, and files corporate-law documents directly inside Word and Outlook.",
    metric: "Days → minutes",
    href: "https://finiti.legal",
  },
  {
    name: "Fabrio Platform v2",
    year: "2024",
    tag: "EdTech",
    blurb:
      "Ground-up rebuild of a CAD-education platform used by universities worldwide. Real-time, collaborative, and four times faster.",
    metric: "40+ institutions",
    href: "https://fabrio.com",
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
    metric: "73k customers",
    href: undefined,
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

const currently = [
  { label: "Building", value: "AI agents for corporate-law workflows" },
  { label: "Based in", value: "Lagos, Nigeria" },
  { label: "Writing", value: "Notes on agent architecture" },
  { label: "Reading", value: "Eval design, distributed systems" },
];

const skills: Record<string, string[]> = {
  "AI & ML": ["AI Agents", "LangGraph", "LangChain", "RAG", "Evals"],
  Languages: ["TypeScript", "Python", "Go"],
  Frameworks: ["Next.js", "React", "React Native", "FastAPI", "Node"],
  Platform: ["AWS", "Azure", "Docker", "GraphQL", "Postgres"],
};

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

      {/* Meta bar — NAME / ROLE / FOCUS / BASED */}
      <div className="border-y border-[#d4d1c7] bg-white dark:border-[#35332c] dark:bg-[#1a1a17]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
          {[
            ["NAME", "ibrahim shittu"],
            ["ROLE", "senior software engineer"],
            ["FOCUS", "ai agents · web · mobile"],
            ["BASED", "lagos · works globally"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`flex min-w-0 gap-2.5 px-5 py-3.5 font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a] ${
                i < 3
                  ? "border-b border-[#e7e5de] md:border-b-0 md:border-r dark:border-[#26251f]"
                  : ""
              } ${i === 0 ? "border-r border-[#e7e5de] dark:border-[#26251f]" : ""}`}
            >
              <span>{k}</span>
              <span className="truncate font-medium text-[#0e0f11] dark:text-[#f2efe7]">
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-[#d4d1c7] dark:border-[#35332c]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-[1.3fr_1fr]">
          <div className="border-b border-[#e7e5de] px-6 py-14 md:border-b-0 md:border-r md:px-12 md:py-[72px] dark:border-[#26251f]">
            <div className="mb-6 font-mono text-[11px] tracking-[0.08em] text-[#7a7f86] dark:text-[#74706a]">
              {"// senior software engineer · 8y shipping"}
            </div>
            <h1 className="m-0 font-sans text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0e0f11] sm:text-[54px] md:text-[64px] dark:text-[#f2efe7]">
              I build systems
              <br />
              that hold up under{" "}
              <span
                className="px-[2px]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, transparent 60%, rgba(201,162,39,0.33) 60%)",
                }}
              >
                real traffic.
              </span>
            </h1>
            <p className="mt-7 max-w-[560px] font-sans text-[16px] leading-[1.6] text-[#3d4147] md:text-[17px] dark:text-[#b9b5aa]">
              Eight years shipping web, mobile, and AI agents — from
              zero-to-one prototypes to platforms adopted by universities,
              banks, and law firms. Three-time founding engineer; currently
              building agentic systems for corporate law.
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

          <div className="bg-white px-6 py-14 md:px-12 md:py-[72px] dark:bg-[#1a1a17]/40">
            <div className="mb-6 font-mono text-[11px] tracking-[0.08em] text-[#7a7f86] dark:text-[#74706a]">
              {"// snapshot"}
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-7 rounded-md border border-[#e7e5de] bg-white p-6 dark:border-[#26251f] dark:bg-[#1a1a17]">
              <Stat k="Years shipping" v="8" />
              <Stat k="Founding-eng stints" v="3" />
              <Stat k="Products shipped" v="12+" />
              <Stat k="Largest user base" v="73k" />
              <Stat k="Current focus" v="AI agents" />
              <Stat k="Works across" v="Global TZs" />
            </div>
            <p className="mt-5 font-mono text-[12px] leading-[1.65] text-[#7a7f86] dark:text-[#74706a]">
              Currently at{" "}
              <span className="font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
                Finiti Legal
              </span>
              , shipping AI agents for corporate law. Selective about new
              conversations.
            </p>
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

      {/* Writing + Now */}
      <section className="border-b border-[#d4d1c7] dark:border-[#35332c]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-[1.2fr_1fr]">
          <div
            id="writing"
            className="border-b border-[#e7e5de] px-6 py-14 md:border-b-0 md:border-r md:px-12 md:py-20 dark:border-[#26251f]"
          >
            <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
              03 ——
            </div>
            <h2 className="mb-5 mt-1 font-sans text-[28px] font-semibold tracking-[-0.015em] text-[#0e0f11] dark:text-[#f2efe7]">
              Writing
            </h2>
            {writing.map((w) => (
              <Link
                href={`/blog/${w.slug}`}
                key={w.slug}
                className="grid grid-cols-[80px_1fr_60px] items-baseline gap-3 border-t border-[#e7e5de] py-4 transition-colors hover:bg-white md:grid-cols-[96px_1fr_64px] md:gap-4 dark:border-[#26251f] dark:hover:bg-[#1a1a17]/60"
              >
                <div className="font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
                  {formatWritingDate(w.date)}
                </div>
                <div>
                  <div className="mb-1 font-sans text-[15px] font-semibold text-[#0e0f11] dark:text-[#f2efe7]">
                    {w.title}
                  </div>
                  <div className="font-sans text-[13px] leading-[1.5] text-[#3d4147] dark:text-[#b9b5aa]">
                    {w.excerpt}
                  </div>
                </div>
                <div className="text-right font-mono text-[10px] text-[#7a7f86] dark:text-[#74706a]">
                  {w.readTime}
                </div>
              </Link>
            ))}
            <div className="mt-5 border-t border-[#e7e5de] pt-5 dark:border-[#26251f]">
              <Link
                href="/blog"
                className="font-mono text-[12px] text-[#0e0f11] underline-offset-4 hover:underline dark:text-[#f2efe7]"
              >
                all writing ↗
              </Link>
            </div>
          </div>

          <div
            id="now"
            className="bg-white px-6 py-14 md:px-12 md:py-20 dark:bg-[#1a1a17]/40"
          >
            <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
              04 ——
            </div>
            <h2 className="mb-5 mt-1 font-sans text-[28px] font-semibold tracking-[-0.015em] text-[#0e0f11] dark:text-[#f2efe7]">
              Now
            </h2>
            <div className="mb-8 grid grid-cols-2 gap-px border border-[#e7e5de] bg-[#e7e5de] dark:border-[#26251f] dark:bg-[#26251f]">
              {currently.map((c) => (
                <div
                  key={c.label}
                  className="bg-white p-4 dark:bg-[#1a1a17]"
                >
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
                    {c.label}
                  </div>
                  <div className="font-sans text-[14px] font-medium text-[#0e0f11] dark:text-[#f2efe7]">
                    {c.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-2.5 font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
              {"// skills"}
            </div>
            {Object.entries(skills).map(([k, arr]) => (
              <div
                key={k}
                className="grid grid-cols-[96px_1fr] items-baseline gap-2 border-t border-[#e7e5de] py-2.5 dark:border-[#26251f]"
              >
                <span className="font-mono text-[11px] text-[#7a7f86] dark:text-[#74706a]">
                  {k}
                </span>
                <div className="flex flex-wrap gap-1">
                  {arr.map((s) => (
                    <span
                      key={s}
                      className="inline-block rounded-[3px] border border-[#e7e5de] bg-[#fafaf7] px-2 py-[3px] font-mono text-[10.5px] text-[#3d4147] dark:border-[#26251f] dark:bg-[#0f0f0d] dark:text-[#b9b5aa]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-b border-[#e7e5de] dark:border-[#26251f]"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-24">
          <div className="font-mono text-[11px] tracking-[0.1em] text-[#7a7f86] dark:text-[#74706a]">
            05 ——
          </div>
          <h2 className="m-0 mt-2 max-w-[720px] font-sans text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0e0f11] sm:text-[44px] md:text-[48px] dark:text-[#f2efe7]">
            Have a problem worth solving?{" "}
            <span className="text-[#7a7f86] dark:text-[#74706a]">
              I&apos;d like to hear about it.
            </span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-6 font-mono text-[13px] text-[#3d4147] dark:text-[#b9b5aa]">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="border-b border-[#0e0f11] pb-0.5 text-[#0e0f11] dark:border-[#f2efe7] dark:text-[#f2efe7]"
            >
              {siteConfig.author.email} ↗
            </a>
            <a
              href={siteConfig.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
            >
              github.com/ibrahimshittu
            </a>
            <a
              href={siteConfig.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
            >
              linkedin.com/in/ibrahimshittu
            </a>
            <a
              href={siteConfig.author.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e0f11] dark:hover:text-[#f2efe7]"
            >
              x.com/ibrahimshittu01
            </a>
          </div>
        </div>
      </section>

      {/* Inner footer */}
      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 px-6 py-5 font-mono text-[11px] text-[#7a7f86] md:px-12 dark:text-[#74706a]">
        <span>© {new Date().getFullYear()} ibrahim shittu</span>
        <span>lagos · works globally</span>
        <span>
          last updated{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </main>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7f86] dark:text-[#74706a]">
        {k}
      </div>
      <div className="font-sans text-[22px] font-semibold tracking-[-0.02em] text-[#0e0f11] dark:text-[#f2efe7]">
        {v}
      </div>
    </div>
  );
}
