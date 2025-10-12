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
      "Playwright",
      "LangChain",
      "OpenAI",
      "Anthropic",
      "Browserbase",
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
        caption: "Real-time face mask detection demo",
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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
