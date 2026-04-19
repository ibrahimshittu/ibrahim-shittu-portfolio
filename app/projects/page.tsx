import { Metadata } from "next";
import { siteConfig } from "@/lib/seo";
import { SubHero, GoldMarker } from "@/components/ui/sub-hero";
import { ContactFooter } from "@/components/ui/contact-footer";
import { ProjectsFilter, type ProjectRow } from "./_components/projects-filter";

export const metadata: Metadata = {
  title: "Projects — Ibrahim Shittu",
  description:
    "Selected work — not demos. Each project went to real users, held up under real traffic, and taught me something I still use.",
  keywords: [
    "Ibrahim Shittu projects",
    "software engineer portfolio",
    "AI projects",
    "agent systems",
    "legal tech",
    "edtech",
    "mobile banking",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    title: "Projects — Ibrahim Shittu",
    description:
      "Selected work — not demos. Real users, real traffic, real lessons.",
    url: `${siteConfig.url}/projects`,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Projects — Ibrahim Shittu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Ibrahim Shittu",
    description:
      "Selected work — not demos. Real users, real traffic, real lessons.",
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  alternates: { canonical: `${siteConfig.url}/projects` },
  robots: { index: true, follow: true },
  category: "technology",
};

const projects: ProjectRow[] = [
  {
    slug: "tunnel-ai",
    name: "Tunnel AI",
    year: "2025",
    tag: "Dev Tools",
    status: "Active",
    role: "Author · Side project",
    blurb:
      "Multi-agent system that turns plain-English instructions into self-healing Playwright tests, executed at scale on cloud browsers.",
    detail:
      "Planning, generation, execution, validation, and self-healing run as a LangGraph multi-agent loop over Browserbase and Stagehand. Tests survive selector drift without manual edits.",
    stack: ["Python", "LangGraph", "Playwright", "Browserbase", "Stagehand"],
    metric: "90%+ less authoring",
    href: "/projects/tunnel-ai",
  },
  {
    slug: "agent-runway",
    name: "Agent Runway",
    year: "2025",
    tag: "Legal AI",
    status: "Live",
    role: "Software Engineer · Finiti Legal",
    blurb:
      "Multi-agent system that drafts, reviews, and files corporate-law documents directly inside Word and Outlook.",
    detail:
      "Graph-based agents coordinate through a typed tool layer, grounded in the firm's own precedent library. Ships as a Word add-in and Outlook plugin, SOC 2 Type II.",
    stack: ["Python", "LangGraph", "TypeScript", "Azure"],
    metric: "Days → minutes",
    href: "/projects/agent-runway",
  },
  {
    slug: "fabrio-v2",
    name: "Fabrio Platform v2",
    year: "2024",
    tag: "EdTech",
    status: "Live",
    role: "Lead Software Engineer · Fabrio",
    blurb:
      "Ground-up rebuild of a CAD-education platform used by universities worldwide. Real-time, collaborative, and four times faster.",
    detail:
      "Rebuilt auth, content pipelines, and the grading engine for scale. Introduced SSR caching that took p95 from 3.1s to 680ms.",
    stack: ["TypeScript", "Next.js", "GraphQL", "AWS"],
    metric: "40+ institutions",
    href: "/projects/fabrio-v2",
  },
  {
    slug: "unheard-mental-health",
    name: "Unheard",
    year: "2023",
    tag: "HealthTech",
    status: "Beta",
    role: "Engineer · Co-builder",
    blurb:
      "Mental-health platform pairing licensed therapists with anonymous audio rooms — confidential by default, personalised by design.",
    detail:
      "Audio rooms via Stream/WebRTC, session matching, and mood tracking on a Supabase + OpenAI stack. Launched with licensed therapists across multiple time zones.",
    stack: ["TypeScript", "React Native", "Supabase", "OpenAI", "Stream"],
    metric: "500+ beta users",
    href: "/projects/unheard-mental-health",
  },
  {
    slug: "rio-metaverse-marketplace",
    name: "RIO Marketplace",
    year: "2023",
    tag: "Web3",
    status: "Shipped",
    role: "Engineer",
    blurb:
      "NFT marketplace for creators to mint, buy, and sell digital collectibles, with wallet auth and on-chain transactions.",
    detail:
      "React + thirdweb SDK on the frontend, Sanity CMS for metadata and collections. Supported multiple wallets and on-chain minting flows.",
    stack: ["React", "thirdweb", "Sanity", "TypeScript", "Ethereum"],
    metric: "500+ transactions",
    href: "/projects/rio-metaverse-marketplace",
  },
  {
    slug: "crust-mobile-bank",
    name: "Crust Mobile Bank",
    year: "2022",
    tag: "Fintech",
    status: "Shipped",
    role: "Lead Software Engineer · Thrive Agric",
    blurb:
      "Full-stack mobile bank for the underbanked. iOS, Android, and an admin console, shipped as a lean team of four.",
    detail:
      "One React Native codebase served iOS and Android; the admin tool ran the same design system on web. Reached 73k customers inside a year.",
    stack: ["React Native", "TypeScript", "Node"],
    metric: "$1M+ volume",
    href: "/projects/crust-mobile-bank",
  },
  {
    slug: "liveclasses",
    name: "LiveClasses",
    year: "2021",
    tag: "EdTech",
    status: "Exited",
    role: "Founding Engineer",
    blurb:
      "Online learning for Nigerian universities. Grew from MVP to funded startup with an active user base.",
    detail:
      "Built the full product from scratch — live sessions, assignments, payments, admin. Accepted into top incubators; grew MAU 3× in six months.",
    stack: ["React", "Node", "Postgres"],
    metric: "+300% MAU",
    href: "/projects/liveclasses",
  },
  {
    slug: "face-mask-detector",
    name: "Face Mask Detection",
    year: "2021",
    tag: "Computer Vision",
    status: "Shipped",
    role: "Engineer",
    blurb:
      "Real-time face mask detection for safety compliance, tuned for low-power edge deployment.",
    detail:
      "Custom CNN on MobileNetV2, optimised with TensorFlow Lite for Raspberry Pi. 30+ FPS on modest hardware with 95%+ accuracy.",
    stack: ["Python", "TensorFlow", "OpenCV", "MobileNetV2"],
    metric: "95%+ accuracy",
    href: "/projects/face-mask-detector",
  },
  {
    slug: "revit-virtual-assistant",
    name: "Revit Virtual Assistant",
    year: "2020",
    tag: "AEC",
    status: "Shipped",
    role: "Engineer · Final-year project",
    blurb:
      "Natural-language query layer over Revit BIM models, letting engineers pull structural and material data without touching the UI.",
    detail:
      "Python + Revit API + ODBC, with an NLP front door so engineers could ask questions and get reports without navigating complex Revit screens.",
    stack: ["Python", "Revit API", "ODBC", "C#"],
    metric: "−70% analysis time",
    href: "/projects/revit-virtual-assistant",
  },
];

export default function Projects() {
  return (
    <main className="bg-[#fafaf7] text-[#0e0f11] dark:bg-[#0f0f0d] dark:text-[#f2efe7]">
      <SubHero
        kicker="// 02 — projects · selected work"
        title={
          <>
            Projects I&apos;ve <GoldMarker>actually</GoldMarker>
            <br className="hidden md:block" />
            <GoldMarker>shipped.</GoldMarker>
          </>
        }
        lede="Not demos. Each of these went to real users, held up under real traffic, and taught me something I still use. Filter by kind or scan the full set below."
      />

      <ProjectsFilter projects={projects} />

      <ContactFooter />
    </main>
  );
}
