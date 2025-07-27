import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Icons } from "@/components/ui/icons";
import { siteConfig, generatePersonSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ibrahim Shittu - Senior Software Engineer",
  description:
    "Senior Software Engineer with expertise in building scalable web, mobile, and AI-driven solutions for startups and global enterprises across diverse industries.",
  openGraph: {
    title: "Ibrahim Shittu - Senior Software Engineer",
    description:
      "Senior Software Engineer with expertise in building scalable web, mobile, and AI-driven solutions for startups and global enterprises across diverse industries.",
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
      "Senior Software Engineer with expertise in building scalable web, mobile, and AI-driven solutions for startups and global enterprises across diverse industries.",
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  const workExperience = [
    {
      title: "Software Engineer",
      location: "San Francisco, California, United States",
      period: "Apr 2025 - Present",
      company: "finiti legal",
      type: "Full-time",
      description:
        "Building AI Agents that make lawyers' lives easier by developing secure multi-tenant architecture with SOC 2 compliance. Working on a product that automates tedious parts of corporate law, integrating directly into Microsoft Word and Outlook, and auto-generating regulatory content that would normally take days to draft manually. This product transforms workflows from manual drudgery into intelligent, streamlined processes, helping legal teams focus on strategy.",
    },
    {
      title: "Lead Software Engineer",
      location: "London Area, United Kingdom",
      period: "Dec 2024 - Mar 2025",
      company: "fabrio",
      type: "Full-time",
      description:
        "Promoted to Lead Software Engineer after demonstrating technical leadership and exceptional performance. Led a team of developers while continuing to drive platform innovation and institutional adoption. Oversaw technical strategy in building scalable CAD education solutions.",
      previousRole: {
        title: "Software Engineer",
        period: "Jun 2022 - Dec 2024",
        description:
          "First hire at Fabrio, a VC-backed startup enhancing Computer-Aided Design (CAD) education and workflow efficiency. Spearheaded the ground-up rebuild of Fabrio using TypeScript, NextJS, Node/ExpressJS, GraphQL, and AWS services. Developed user-centric features, optimized customer support processes, and designed CI/CD pipelines. Contributed to the platform's growth and adoption by prestigious institutions.",
      },
    },
    {
      title: "Software Engineer",
      location: "Federal Capital Territory, Nigeria",
      period: "Mar 2022 - Dec 2022",
      company: "thrive agric",
      type: "Full-time",
      description:
        "Led the front-end engineering team at Crust Microfinance Bank, developing a financial technology platform that grew to over 73,000 customers and generated significant revenue. Developed mobile applications and an internal admin tool, streamlining customer onboarding processes and enhancing operational efficiency.",
    },
    {
      title: "Founding Software Engineer",
      location: "Lagos State, Nigeria",
      period: "Oct 2020 - Apr 2022",
      company: "liveclasses",
      type: "Full-time",
      description:
        "Developed LiveClasses from ideation to a commercially viable product, scaling to thousands of users. Led the platform through acceptance into top startup incubators and secured funding. Developed a dynamic scheduling system and integrated multiple third-party systems, creating a strategic technical roadmap for sustainable growth.",
    },
    {
      title: "Software Engineer",
      location: "Aberdeen, Scotland, United Kingdom",
      period: "May 2021 - Sep 2021",
      company: "eco energio",
      type: "Full-time",
      description:
        "Designed predictive models for carbon emission tracking and developed AI-driven analytics to monitor and optimize energy consumption in buildings, leading to a 25% reduction in energy waste.",
    },
    {
      title: "Software Developer",
      location: "Remote (Worldwide)",
      period: "Aug 2018 - Sep 2020",
      company: "various startups",
      type: "Full-time",
      description:
        "Built and scaled core products for multiple early-stage startups, taking ideas from concept to launch. Developed full-stack applications across diverse industries and tech stacks, implementing scalable architectures and establishing development workflows. Contributed to MVP development and prepared products for Series A funding rounds.",
    },
  ];

  const skills = [
    "AI Agents",
    "LangGraph/LangChain",
    "Python",
    "FastAPI",
    "TypeScript",
    "NextJS/React",
    "React Native",
    "Node/ExpressJS",
    "GraphQL",
    "Docker",
    "AWS/Azure",
  ];

  const personSchema = generatePersonSchema();

  return (
    <main className="flex-1 flex flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
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
              sameAs: [siteConfig.author.linkedin, siteConfig.author.github],
            },
          }),
        }}
      />

      {/* Navigation */}
      <nav className="mx-auto w-full max-w-2xl px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-sm text-foreground hover:underline"
          >
            Resume
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <section
        className="mx-auto w-full max-w-2xl space-y-8 bg-card px-4 pb-8"
        aria-label="Resume Content"
      >
        {/* Header */}
        <header className="flex items-start md:items-center justify-between gap-4">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold" id="resume-name">
              Ibrahim Shittu
            </h1>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline text-muted-foreground"
                href="https://www.google.com/maps/search/Malta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Location: Malta"
              >
                127.0.0.1:3000
              </a>
            </p>
            <div
              className="flex gap-x-1 pt-1 font-mono text-sm"
              aria-label="Contact links"
            >
              <a
                href={`mailto:${siteConfig.author.email}`}
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8"
              >
                <Icons.mail className="size-4" />
              </a>
              <a
                href={siteConfig.author.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8"
              >
                <Icons.linkedin className="size-4" />
              </a>
              <a
                href={siteConfig.author.github}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8"
              >
                <Icons.github className="size-4" />
              </a>
              <a
                href={siteConfig.author.twitter}
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8"
              >
                <Icons.x className="size-4" />
              </a>
            </div>
          </div>
          <span
            className="relative flex shrink-0 overflow-hidden rounded-full size-20 md:size-28"
            aria-hidden="true"
          >
            <Image
              className="aspect-square h-full w-full"
              alt="Ibrahim Shittu's profile picture"
              src={siteConfig.author.image}
              width={112}
              height={112}
              priority
            />
          </span>
        </header>

        <div className="flex flex-col gap-6">
          {/* About */}
          <section className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-xl font-bold" id="about-section">
              About
            </h2>
            <div
              className="text-pretty font-mono text-sm text-muted-foreground"
              aria-labelledby="about-section"
            >
              Senior Software Engineer with expertise in web and mobile
              development, AI, and Machine Learning. Passionate about leveraging
              technology to create scalable, high-quality solutions and drive
              innovation in startups and larger teams.
            </div>
          </section>

          {/* Work Experience */}
          <section className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-lg font-bold" id="work-experience">
              Work Experience
            </h2>
            <div
              className="flex flex-col gap-4"
              aria-labelledby="work-experience"
            >
              {workExperience.map((job, index) => (
                <div
                  key={index}
                  className="font-mono flex flex-col justify-start items-start gap-1"
                >
                  {/* Current Role */}
                  <div className="flex flex-wrap justify-between items-start self-stretch gap-2">
                    <div className="flex flex-wrap justify-start items-center gap-2">
                      <p className="text-base font-semibold text-left text-foreground">
                        {job.title}
                      </p>
                      <div className="flex justify-center items-center relative overflow-hidden gap-2.5 px-[7px] py-0.5 rounded bg-muted">
                        <p className="text-xs font-semibold text-center text-muted-foreground">
                          {job.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-right text-muted-foreground">
                      {job.period}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start relative gap-1.5">
                    <p className="self-stretch text-sm font-medium text-left text-muted-foreground font-mono capitalize flex flex-wrap gap-1">
                      <span>{job.company}</span>
                      <span>·</span>
                      <span>{job.type}</span>
                    </p>
                    <p className="self-stretch text-sm font-medium text-left text-muted-foreground">
                      {job.description}
                    </p>
                  </div>

                  {/* Previous Role at Same Company (if exists) */}
                  {job.previousRole && (
                    <div className="mt-4 pl-4 border-l-2 border-muted space-y-2">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div className="flex flex-wrap justify-start items-center gap-2">
                          <p className="text-base font-semibold text-left text-foreground">
                            {job.previousRole.title}
                          </p>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                            <span className="text-[10px] font-semibold text-green-700">
                              GROWTH
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-right text-muted-foreground">
                          {job.previousRole.period}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-left text-[#6c737f]">
                        {job.previousRole.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-xl font-bold" id="education-section">
              Education
            </h2>
            <div className="space-y-4" aria-labelledby="education-section">
              <article>
                <div className="rounded-lg bg-card text-card-foreground">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base">
                      <h3
                        className="font-semibold leading-none"
                        id="education-university-of-ilorin"
                      >
                        University of Ilorin
                      </h3>
                      {/* <div
                        className="text-sm tabular-nums text-gray-500"
                        aria-label="Period: 2014 to 2018"
                      >
                        2014 - 2018
                      </div> */}
                    </div>
                  </div>
                  <div
                    className="text-pretty font-mono text-sm mt-2 text-muted-foreground"
                    aria-labelledby="education-university-of-ilorin"
                  >
                    Bachelor of Engineering, Civil Engineering
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Skills */}
          <section className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-xl font-bold" id="skills-section">
              Skills
            </h2>
            <ul
              className="flex list-none flex-wrap gap-1 p-0"
              aria-label="List of skills"
              aria-labelledby="skills-section"
            >
              {skills.map((skill) => (
                <li key={skill}>
                  <div
                    className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-primary/80 text-primary-foreground hover:bg-primary/60 pointer-events-none"
                    aria-label={`Skill: ${skill}`}
                  >
                    {skill}
                  </div>
                </li>
              ))}
              <li>
                <div className="inline-flex items-center px-2 py-0.5 text-xs text-muted-foreground font-mono">
                  + 99 more
                </div>
              </li>
            </ul>
          </section>
        </div>
      </section>

      <div className="text-center mt-8 mb-4">
        <a
          className="text-muted-foreground font-mono text-sm"
          href="/?ref=ibrahim-shittu"
        >
          Made with ❤️ by{" "}
          <span className="text-foreground underline underline-offset-2">
            Ibrahim Shittu
          </span>
        </a>
      </div>
    </main>
  );
}
