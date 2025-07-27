import { Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const workExperience = [
    {
      title: "Software Engineer",
      location: "San Francisco, California, United States",
      period: "Apr 2025 - Present",
      company: "finiti legal",
      type: "Full-time",
      description:
        "Building AI Agents that make lawyers' lives easier by developing secure multi-tenant architecture with SOC 2 compliance. Working on a product that automates tedious parts of SEC filings, integrating directly into Microsoft Word and Outlook, and auto-generating regulatory content that would normally take days to draft manually. This product transforms workflows from manual drudgery into intelligent, streamlined processes, helping legal teams focus on strategy.",
    },
    {
      title: "Lead Software Engineer",
      location: "London Area, United Kingdom",
      period: "Jun 2022 - Mar 2025",
      company: "fabrio",
      type: "Full-time",
      description:
        "First hire at Fabrio, a VC-backed startup enhancing Computer-Aided Design (CAD) education and workflow efficiency. Spearheaded the ground-up rebuild of Fabrio using TypeScript, NextJS, Node/ExpressJS, GraphQL, and AWS services. Developed user-centric features, optimized customer support processes, and designed CI/CD pipelines. Contributed to the platform's growth and adoption by prestigious institutions.",
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
      company: "liveclasses institute",
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
      location: "Remote",
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
    "TypeScript",
    "NextJS/React",
    "Python",
    "Node/ExpressJS",
    "GraphQL",
    "AWS/Azure",
  ];

  return (
    <main className="flex-1 flex flex-col">
      {/* Navigation */}
      <nav className="mx-auto w-full max-w-2xl px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-sm text-[#050914] hover:underline"
          >
            Resume
          </Link>
          <Link
            href="/blog"
            className="font-mono text-sm text-[#9CA0A8] hover:text-[#050914] transition-colors"
          >
            Blog
          </Link>
        </div>
      </nav>

      <section
        className="mx-auto w-full max-w-2xl space-y-8 bg-white px-4 pb-8"
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
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline text-[#9CA0A8]"
                href="https://www.google.com/maps/search/Malta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Location: Malta"
              >
                Malta
              </a>
            </p>
            <div
              className="flex gap-x-1 pt-1 font-mono text-sm"
              aria-label="Contact links"
            >
              <a
                href="mailto:ibshittu01@gmail.com"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="https://github.com/ibrahimshittu"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8"
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://linkedin.com/in/ibrahimshittu"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>
          <span
            className="relative flex shrink-0 overflow-hidden rounded-full size-20 md:size-28"
            aria-hidden="true"
          >
            <img
              className="aspect-square h-full w-full"
              alt="Ibrahim Shittu's profile picture"
              src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMFNVYTB5U011aGdYTXBvRHhueFlIZ09qU1gifQ"
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
              className="text-pretty font-mono text-sm text-[#6c737f]"
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
                  <div className="flex flex-wrap justify-between items-start self-stretch gap-2">
                    <div className="flex flex-wrap justify-start items-center gap-2">
                      <p className="text-base font-semibold text-left text-[#050914]">
                        {job.title}
                      </p>
                      <div className="flex justify-center items-center relative overflow-hidden gap-2.5 px-[7px] py-0.5 rounded bg-[#eeeff0]">
                        <p className="text-[12px] font-semibold text-center text-[#54575e]">
                          {job.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-right text-[#54575e]">
                      {job.period}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start relative gap-1.5">
                    <p className="self-stretch text-sm font-medium text-left text-[#54575e] font-mono capitalize flex flex-wrap gap-1">
                      <span>{job.company}</span>
                      <span>·</span>
                      <span>{job.type}</span>
                    </p>
                    <p className="self-stretch text-sm font-medium text-left text-[#6c737f]">
                      {job.description}
                    </p>
                  </div>
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
                      <div
                        className="text-sm tabular-nums text-gray-500"
                        aria-label="Period: 2014 to 2018"
                      >
                        2014 - 2018
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-pretty font-mono text-sm mt-2 text-[#6c737f]"
                    aria-labelledby="education-university-of-ilorin"
                  >
                    Bachelor of Engineering - BE, Civil Engineering
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
            </ul>
          </section>
        </div>
      </section>

      <div className="text-center mt-8 mb-4">
        <a
          className="text-[#9CA0A8] font-mono text-sm"
          href="/?ref=ibrahim-shittu"
        >
          Made with ❤️ by{" "}
          <span className="text-[#050914] underline underline-offset-2">
            Ibrahim Shittu
          </span>
        </a>
      </div>
    </main>
  );
}
