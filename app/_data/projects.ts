export interface Project {
  name: string;
  year: string;
  tag: string;
  blurb: string;
  metric: string;
  href?: string;
}

export const projects: Project[] = [
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
      "Bank for the underbanked. iOS, Android, and an admin console, shipped as a lean team of four.",
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
