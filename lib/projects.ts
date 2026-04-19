export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  date: string;
  image?: string;
  gallery?: {
    url: string;
    caption: string;
  }[];
  impact: string;
}

export const projects: Project[] = [
  {
    slug: "finiti",
    title: "Finiti — The AI Compliance Layer for Capital Markets",
    excerpt:
      "Gusto-for-compliance: an AI compliance layer that sits between regulated companies and their regulators — validating filings, benchmarking disclosures against peers, and running end-to-end filing prep with humans in the loop.",
    description: `Finiti is the AI compliance layer between regulated companies and their regulators. Gusto gave small companies the payroll infrastructure only enterprises could afford — Finiti is doing the same for compliance. Lean teams get Fortune-500 compliance infrastructure at a fraction of the cost: we validate filings, benchmark disclosures against peer practice, and handle end-to-end filing prep with humans in the loop.

We start with micro-to-mid-cap public companies, dual-listed companies, and the capital-markets law firms that advise them — filers across Nasdaq, HKEX, ASX, and LSE. The product drafts and reviews 10-K, 10-Q, 8-K, 20-F, and DEF 14A filings (plus international equivalents), checks them against Reg S-K and recurring SEC staff comment themes, and surfaces gaps against peer disclosures as actionable edits rather than generic advice.

Under the hood, Finiti is a multi-agent orchestration — LangGraph coordinating specialised agents (planning, retrieval, drafting, benchmarking, review, self-healing), with Pydantic AI enforcing typed tool contracts so every step is structured, auditable, and evaluable. Retrieval is grounded in millions of SEC filings plus the company's own history and peer set, so every claim is traceable to a specific paragraph of a specific document — surfaced as inline citations the reviewer can verify in one click.

The system ships where the work already happens: a Word add-in and Outlook plugin let attorneys accept, reject, or modify proposed edits as tracked changes. SOC 2 Type II, full audit logging, per-tenant isolation, and eval suites driven by real redacted matters gate every prompt and retrieval change before release.`,
    technologies: [
      "Python",
      "LangGraph",
      "Pydantic AI",
      "TypeScript",
      "Azure",
      "SEC Corpus",
      "Microsoft Graph",
      "SOC 2",
    ],
    link: "https://finiti.legal",
    date: "2025-04-01",
    impact:
      "Live with paying customers across Nasdaq, HKEX, ASX, and LSE filers; lean teams file with Fortune-500-grade rigor in a fraction of the time.",
  },
  {
    slug: "fabrio",
    title: "Fabrio — AI Grading for Engineering CAD at Scale",
    excerpt:
      "Rebuilt the Fabrio platform from the ground up to revolutionise grading for engineering CAD work — saving professors thousands of hours at universities like Imperial College London and UCL.",
    description: `Fabrio is a platform that revolutionised grading for engineering CAD work. Professors at engineering schools were marking thousands of individual Fusion files by hand every term; Fabrio turned that into instant, automated assessment with live progress dashboards, saving them thousands of hours a year.

I joined as the first engineering hire. The company raised venture money, grew to a 6-figure ARR, built a team of six, and secured customers like Imperial College London and University College London — with the platform ultimately reaching 40+ institutions worldwide, from Surrey and Birmingham in the UK to universities across the US, Italy, and Hong Kong, plus programmes like F1 in Schools and Co-op Academies Trust.

I led the ground-up rebuild of the platform on AWS serverless (Cognito, AppSync, Lambda, DynamoDB, S3) with a TypeScript and Next.js frontend over GraphQL. SSR caching took p95 page load from 3.1s to 680ms; the grading engine was rebuilt as a queue-backed worker pool that processed thousands of submissions during deadline peaks without the instructor dashboard ever stalling.

Beyond performance, we made the platform collaborative — live CAD sessions, shared assignments, tight feedback loops — and trustworthy to institutional buyers, with auth, logging, and access controls that held up under university IT review. We also established a pioneering partnership with Autodesk, validating the approach to transforming CAD education.`,
    technologies: [
      "TypeScript",
      "Next.js",
      "GraphQL",
      "AWS",
      "DynamoDB",
      "AppSync",
    ],
    link: "https://fabrio.com",
    date: "2024-06-01",
    impact:
      "Saved professors thousands of hours across Imperial College London, UCL, and 40+ institutions; 6-figure ARR with a team of six.",
  },
  {
    slug: "crust-mobile-bank",
    title: "Crust Mobile Bank",
    excerpt:
      "Bank for the underbanked. iOS, Android, and an admin console, shipped as a lean team of four.",
    description: `Crust Microfinance Bank is the consumer-facing product I led frontend for at Thrive Agric (YC W19). It's a full-stack mobile bank aimed at the underbanked in Nigeria, with iOS and Android apps plus an internal admin console used by the bank's operations team.

One React Native codebase powered both mobile apps; the admin tool ran the same design system and primitives on web. That shared foundation meant a four-person team could ship and maintain three surfaces — iOS, Android, and admin — without constant duplication.

On the product side, the work spanned onboarding flows, KYC, payments, card issuance, and transaction reconciliation. On the engineering side, it was about keeping the mobile apps responsive on the low-end Android devices most customers used, handling spotty connectivity gracefully, and making the admin tool genuinely usable for non-technical bank operators.

Inside a year, the platform reached 73,000+ customers and moved over $1M in transaction volume, while staying within the ops capacity of a small team.`,
    technologies: ["React Native", "TypeScript", "Node", "Postgres", "AWS"],
    date: "2022-06-01",
    impact:
      "73,000+ customers and $1M+ in transaction volume in the first year, on a four-person engineering team.",
  },
  {
    slug: "liveclasses",
    title: "LiveClasses",
    excerpt:
      "Online learning for Nigerian universities. Grew from MVP to funded startup with an active user base.",
    description: `LiveClasses was my first founding-engineer run. We built an online learning platform for Nigerian universities from scratch — live sessions, assignments, payments, and admin — and grew it from an MVP into a funded startup.

The product started as a pandemic-era response to universities going remote with no real infrastructure. We shipped the first usable version in weeks, then spent the following months turning it into something a university could actually run a semester on: real attendance tracking, graded assignments, instructor tools, and payment flows that handled the reality of student billing in Nigeria.

As the founding engineer, my role covered the whole stack — frontend, backend, infra, and a lot of the product decisions. We were accepted into top incubators, raised a round, and grew monthly active users by more than 300% in a six-month stretch. Most of what I know about founding-engineer tradeoffs — which ones compound, which ones don't — came out of this project.`,
    technologies: ["React", "Node", "Postgres", "AWS"],
    date: "2021-03-01",
    impact:
      "Grew MAU 3× in six months; accepted into top incubators and funded; platform ran live semesters at multiple Nigerian universities.",
  },
  {
    slug: "tunnel-ai",
    title: "Tunnel AI - Natural Language to Frontend Tests",
    excerpt:
      "AI agent that turns plain-English instructions into automated Playwright tests using LangGraph, Browserbase, and Stagehand.",
    description: `Tunnel AI transforms natural language into executable frontend tests. It generates, executes, and maintains tests end‑to‑end, eliminating the bottleneck of manual test creation while improving reliability for modern web apps.

The workflow is orchestrated with LangGraph as a multi‑agent system: a Planning agent structures requirements, a Generator produces Playwright code, an Executor runs tests at scale on Browserbase's cloud browsers, a Validator analyzes results, and a Self‑Healing agent fixes brittle selectors and timing issues.

Key features include self‑healing selectors, comprehensive test planning with edge cases, React‑aware strategies, parallel execution, and detailed reporting with screenshots and recordings. Tests can be run synchronously for fast feedback or enqueued for large suites.

Built with Python, LangGraph, Playwright, Browserbase, and Stagehand (browser automation SDK), Tunnel AI supports multiple LLM providers (OpenAI and Anthropic) and provides a simple CLI for developers.`,
    technologies: [
      "Python",
      "LangGraph",
      "Browserbase",
      "Playwright",
      "LangChain",
      "OpenAI",
      "Anthropic",
      "Stagehand",
      "Docker",
    ],
    github: "https://github.com/ibrahimshittu/tunnel-ai",
    date: "2025-06-20",
    impact:
      "Currently in active development. Achieves 90%+ reduction in authoring time, executes 100+ tests in parallel on Browserbase, and auto-recovers broken selectors without manual edits.",
  },
  {
    slug: "revit-virtual-assistant",
    title: "Revit Virtual Assistant - BIM Data Query System",
    excerpt:
      "AI-powered assistant for querying and analyzing structural data from Revit models using Python and ODBC integration.",
    description: `Developed an innovative virtual assistant that bridges the gap between Building Information Modeling (BIM) software and data analysis. The system enables structural engineers and architects to query complex Revit model data using natural language, significantly improving workflow efficiency in the AEC industry.

The assistant extracts structural data from Revit 2020 models and exports it to an ODBC database, making it accessible for advanced querying and analysis. Using Python programming, the system processes structural column data, material properties, dimensions, and relationships between building elements. Engineers can ask questions about load calculations, material quantities, structural integrity checks, and generate reports without manually navigating through the complex Revit interface.

The solution addresses a critical challenge in the construction industry where valuable BIM data is often underutilized due to the complexity of accessing and analyzing it. By providing an intuitive interface for data extraction and query, the assistant helps teams make data-driven decisions faster, identify potential structural issues early, and optimize material usage.

Built with Python for backend processing, the system integrates with Revit API for model data extraction, uses ODBC for database connectivity, and implements natural language processing for query interpretation. The assistant features real-time data synchronization with Revit models, automated report generation, structural analysis capabilities, and visualization of query results.`,
    technologies: [
      "Python",
      "Revit API",
      "ODBC",
      "SQL",
      "Pandas",
      "NumPy",
      "NLP",
      "C#",
    ],
    date: "2020-02-15",
    image:
      "https://res.cloudinary.com/ibrahimshittu/video/upload/v1756033918/revit-assistant-demo_pm02e0.mp4",
    gallery: [
      {
        url: "https://res.cloudinary.com/ibrahimshittu/video/upload/v1756033918/revit-assistant-demo_pm02e0.mp4",
        caption:
          "Revit Virtual Assistant demo showing structural column data query",
      },
    ],
    impact:
      "Reduced model analysis time by 70%, processed 50+ complex structural models, saved 15+ hours per week for engineering teams, and improved data accuracy by eliminating manual extraction errors.",
  },
  {
    slug: "unheard-mental-health",
    title: "Unheard - Mental Health Support Platform",
    excerpt:
      "Fostering mental well-being through personalized support and a secure, confidential space to share and be heard.",
    description: `Unheard is an innovative mental health platform that addresses critical gaps in mental healthcare accessibility and personalization. The platform creates a safe, anonymous environment where individuals can express themselves freely while receiving professional guidance from licensed therapists.

The platform tackles four major challenges in mental health support: lack of confidential spaces leading to suppressed emotions and delayed help-seeking, limited access to professional support due to wait times and financial barriers, one-size-fits-all solutions that fail to recognize diverse needs and cultural contexts, and the growing demand for immediate, real-time mental health support.

Unheard's solution centers on creating confidential audio rooms where individuals can connect with licensed therapists for one-on-one sessions or join anonymous peer support spaces. The platform offers personalized experiences tailored to individual preferences, challenges, and cultural contexts, moving beyond generic approaches. It provides accessible, timely support without wait times or financial barriers through affordable subscription plans.

Built with cutting-edge technology including TypeScript, React/React Native for cross-platform development, Supabase for authentication and database management, OpenAI for intelligent conversational support, and Stream for seamless audio conferencing via WebRTC. The platform features mood tracking, personalized content recommendations, anonymous peer support groups, and professional therapist matching.`,
    technologies: [
      "TypeScript",
      "React Native",
      "React",
      "Supabase",
      "OpenAI",
      "Stream",
      "WebRTC",
      "Node.js",
    ],
    date: "2023-09-15",
    gallery: [
      {
        url: "https://www.canva.com/design/DAF6Z7i3t1c/57o1EQWMSPhQMu0kOXWUZQ/view?embed",
        caption: "Unheard platform presentation",
      },
    ],
    impact:
      "Launched with 500+ beta users, 85% user satisfaction rate, average session duration of 45 minutes, and successfully connected users with 50+ licensed therapists across multiple time zones.",
  },
  {
    slug: "rio-metaverse-marketplace",
    title: "RIO - Metaverse All Inclusive NFT Marketplace",
    excerpt:
      "Web3 marketplace for creators to buy and sell NFTs, built with React and thirdweb integration.",
    description: `RIO is a comprehensive NFT marketplace designed for the metaverse era, where creators can mint, buy, and sell digital collectibles. The platform provides an inclusive environment for artists, collectors, and enthusiasts to engage with rare NFT collections.

Built using ReactJS for a responsive user interface, the marketplace integrates thirdweb SDK for seamless Web3 functionality including wallet connections, smart contract interactions, and NFT transactions. Sanity CMS serves as the database backend, providing flexible content management for NFT metadata, collections, and user profiles.

The platform features a modern, vibrant UI/UX design with purple and neon accents that reflect the metaverse aesthetic. Key functionalities include NFT browsing with advanced filtering, creator profiles, collection management, and a streamlined minting process. The marketplace supports multiple wallet providers and ensures secure, transparent transactions on the blockchain.

The project originated from a community-driven initiative and has evolved into a full-featured marketplace. It showcases the potential of decentralized commerce and digital ownership in the Web3 ecosystem, providing creators with new monetization opportunities while giving collectors access to unique digital assets.`,
    technologies: [
      "React",
      "thirdweb",
      "Web3",
      "Sanity",
      "TypeScript",
      "Ethereum",
      "IPFS",
      "TailwindCSS",
    ],
    date: "2023-03-20",
    image:
      "https://res.cloudinary.com/ibrahimshittu/video/upload/v1756030620/rio-marketplace-demo_eh8t1c.mp4",
    gallery: [
      {
        url: "https://res.cloudinary.com/ibrahimshittu/video/upload/v1756030620/rio-marketplace-demo_eh8t1c.mp4",
        caption:
          "RIO marketplace demo showcasing NFT collections and user interface",
      },
    ],
    impact:
      "Facilitated 500+ NFT transactions, onboarded 200+ creators, built a thriving community of 1,000+ users, and generated $50K+ in trading volume within the first quarter.",
  },
  {
    slug: "face-mask-detector",
    title: "Real-time Face Mask Detection System",
    excerpt:
      "Computer vision application that detects face masks in real-time using deep learning and OpenCV.",
    description: `Developed a real-time face mask detection system using computer vision and deep learning techniques to help enforce safety protocols during the COVID-19 pandemic. The system accurately detects whether individuals are wearing face masks or not.

The application uses a custom-trained convolutional neural network (CNN) based on MobileNetV2 architecture for efficient real-time inference. The model was trained on a diverse dataset of faces with and without masks, achieving over 95% accuracy in various lighting conditions and angles.

The system processes video streams in real-time, drawing bounding boxes around detected faces and classifying them into two categories: mask worn (green) and no mask (red). It includes features like multi-face detection, confidence scoring, and alert generation for non-compliance.

Technical implementation includes optimization for edge devices using TensorFlow Lite, allowing deployment on resource-constrained hardware like Raspberry Pi. The system can process 30+ FPS on standard hardware while maintaining high accuracy, making it suitable for deployment in entry points, offices, and public spaces.`,
    technologies: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "MobileNetV2",
      "NumPy",
      "Keras",
      "Flask",
    ],
    date: "2021-05-15",
    image:
      "https://res.cloudinary.com/ibrahimshittu/video/upload/v1756029390/face-mask-detector-demo_emvpyg.mp4",
    gallery: [
      {
        url: "https://res.cloudinary.com/ibrahimshittu/video/upload/v1756029390/face-mask-detector-demo_emvpyg.mp4",
        caption: "Real-time face mask detection",
      },
    ],
    impact:
      "Deployed in 10+ locations, processed 100,000+ detections daily, achieved 95%+ accuracy, and helped maintain safety compliance in public spaces.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
