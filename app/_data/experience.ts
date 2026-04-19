import type { WorkEntry } from "../_components/work-section";

export const experience: WorkEntry[] = [
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
    title: "Lead Software Engineer",
    company: "Fabrio",
    period: "2022 — 2025",
    location: "London, UK",
    summary:
      "First engineering hire at a VC-backed CAD-education startup. Led the ground-up rebuild that revolutionised grading for engineering CAD work — saving professors thousands of hours at Imperial College London, UCL, and 40+ institutions worldwide.",
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
      "Proposed predictive models for carbon tracking and AI-driven analytics, with projected 25% reductions in building energy waste across target sites.",
    stack: ["Python", "ML"],
    impact: { head: "−25%", tail: "projected waste" },
  },
  {
    title: "Software Developer",
    company: "Various startups",
    period: "2018 — 2020",
    location: "Remote",
    summary:
      "Took several early-stage ideas from concept to launch. Full-stack across diverse stacks and industries, with four products shipped.",
    stack: ["JS", "Python", "Ruby"],
    impact: { head: "4", tail: "products shipped" },
  },
];
