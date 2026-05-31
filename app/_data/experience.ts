export interface WorkEntry {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
}

export const experience: WorkEntry[] = [
  {
    company: "Finiti Legal",
    title: "Founding Software Engineer",
    period: "2025 — Now",
    location: "San Francisco (remote)",
    summary:
      "Building the AI compliance layer for capital markets — multi-agent systems over millions of SEC filings that validate filings, benchmark disclosures, and run filing prep with humans in the loop.",
  },
  {
    company: "Fabrio",
    title: "Lead Software Engineer",
    period: "2022 — 2025",
    location: "London, UK",
    summary:
      "First engineering hire at a VC-backed startup. Led the ground-up rebuild that transformed grading for engineering CAD work, reaching Imperial College London, UCL, and 40+ institutions worldwide.",
  },
  {
    company: "Thrive Agric (YC W19)",
    title: "Lead Software Engineer",
    period: "2022",
    location: "Abuja, Nigeria",
    summary:
      "Led frontend for Crust Microfinance Bank. Shipped the mobile apps and admin tools behind a financial product that reached 73,000 customers and moved over $1M in its first year.",
  },
  {
    company: "LiveClasses",
    title: "Founding Engineer",
    period: "2020 — 2022",
    location: "Lagos, Nigeria",
    summary:
      "Built an online learning platform from zero. Accepted into top incubators, raised funding, built the team, and grew active users by more than 300%.",
  },
  {
    company: "Eco Energio",
    title: "Software Engineer",
    period: "2021",
    location: "Aberdeen, UK",
    summary:
      "Built predictive models for carbon tracking and AI-driven analytics, projecting a 25% reduction in building energy waste.",
  },
  {
    company: "Various startups",
    title: "Software Developer",
    period: "2018 — 2020",
    location: "Remote",
    summary:
      "Took several early-stage ideas from concept to launch across diverse stacks and industries, with four products shipped.",
  },
];

export const education = {
  school: "University of Ilorin",
  degree: "B.Eng, Civil Engineering",
};

export const skills = [
  "AI Agents",
  "LangGraph / LangChain",
  "Python",
  "FastAPI",
  "TypeScript",
  "Next.js / React",
  "React Native",
  "Node.js",
  "GraphQL",
  "AWS / Azure",
];
