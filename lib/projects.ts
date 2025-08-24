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
  challenges: string[];
  solutions: string[];
  impact: string;
}

export const projects: Project[] = [
  {
    slug: "ai-legal-document-automation",
    title: "AI-Powered Legal Document Automation",
    excerpt: "Intelligent system that automates legal document generation and review using advanced NLP and machine learning.",
    description: `Built an enterprise-grade AI system that revolutionizes legal document workflows for law firms and corporate legal departments. The platform leverages advanced natural language processing and machine learning to automate document generation, review, and compliance checking.

The system integrates seamlessly with Microsoft Office suite, allowing lawyers to work within their familiar environment while benefiting from AI-powered assistance. It includes features like intelligent clause suggestions, regulatory compliance checking, and automated document assembly based on templates and precedents.

Key technical achievements include implementing a secure multi-tenant architecture with SOC 2 compliance, developing custom NLP models for legal text understanding, and creating a real-time collaboration system that allows multiple lawyers to work on documents simultaneously with AI assistance.`,
    technologies: ["Python", "LangChain", "FastAPI", "React", "Azure AI", "PostgreSQL", "Docker", "Kubernetes"],
    date: "2024-12-01",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
        caption: "Dashboard showing document automation workflow"
      },
      {
        url: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800",
        caption: "AI-powered contract analysis interface"
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        caption: "Real-time collaboration features"
      }
    ],
    challenges: [
      "Processing complex legal language with high accuracy",
      "Ensuring data security and compliance with legal regulations",
      "Integrating with legacy systems in law firms",
      "Handling large document volumes efficiently"
    ],
    solutions: [
      "Developed custom NLP models trained on legal corpora",
      "Implemented end-to-end encryption and audit logging",
      "Created flexible API adapters for various systems",
      "Built distributed processing pipeline with caching"
    ],
    impact: "Reduced document preparation time by 80%, processed over 100,000 documents monthly, and saved law firms an average of 20 hours per week per lawyer."
  },
  {
    slug: "real-time-collaboration-platform",
    title: "Real-time Collaboration Platform",
    excerpt: "Comprehensive web application enabling real-time collaboration for remote teams with video, whiteboards, and project management.",
    description: `Developed a cutting-edge collaboration platform designed to meet the needs of distributed teams in the post-pandemic world. The platform combines video conferencing, shared whiteboards, real-time document editing, and project management tools in a single, cohesive interface.

The architecture handles 10,000+ concurrent users with sub-100ms latency for real-time features. Implemented WebRTC for peer-to-peer video calls with fallback to media servers for larger meetings. The shared whiteboard feature uses operational transformation algorithms to ensure consistency across all clients.

Built with scalability in mind, the platform uses microservices architecture with event-driven communication, allowing independent scaling of different features based on demand. The system includes advanced features like AI-powered meeting transcription, automatic task extraction from conversations, and smart scheduling based on team availability.`,
    technologies: ["Next.js", "WebRTC", "Socket.io", "Redis", "MongoDB", "Docker", "AWS", "Node.js"],
    github: "https://github.com",
    date: "2024-08-15",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
        caption: "Video conferencing with screen sharing"
      },
      {
        url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800",
        caption: "Real-time collaborative whiteboard"
      },
      {
        url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
        caption: "Team workspace dashboard"
      }
    ],
    challenges: [
      "Achieving low-latency real-time synchronization",
      "Scaling WebRTC for large meetings",
      "Ensuring consistent state across distributed clients",
      "Managing bandwidth efficiently for video streams"
    ],
    solutions: [
      "Implemented operational transformation for conflict resolution",
      "Built hybrid peer-to-peer and server-based architecture",
      "Used event sourcing for state management",
      "Developed adaptive bitrate streaming algorithm"
    ],
    impact: "Successfully deployed to 50+ organizations, supporting over 10,000 daily active users with 99.9% uptime and average user session of 2+ hours."
  },
  {
    slug: "ecommerce-mobile-app",
    title: "E-commerce Mobile App",
    excerpt: "Cross-platform mobile application for retail marketplace with AR try-on, recommendations, and real-time inventory.",
    description: `Created a feature-rich mobile commerce application that transforms the online shopping experience. The app includes augmented reality (AR) try-on features for fashion and accessories, AI-powered product recommendations, and real-time inventory tracking across multiple warehouses.

The AR implementation uses device cameras and machine learning models to accurately overlay products on users, providing a virtual try-before-you-buy experience. The recommendation engine analyzes user behavior, purchase history, and trending items to provide personalized product suggestions that increase conversion rates.

Built with React Native for cross-platform compatibility, the app maintains native performance while sharing 90% of the codebase between iOS and Android. Implemented advanced features like offline mode with data synchronization, push notifications for price drops and restocks, and one-click checkout with multiple payment options.`,
    technologies: ["React Native", "TypeScript", "GraphQL", "Stripe", "AWS", "TensorFlow Lite", "Redis"],
    date: "2024-06-20",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
        caption: "Mobile app home screen with product recommendations"
      },
      {
        url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800",
        caption: "AR try-on feature for accessories"
      },
      {
        url: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800",
        caption: "Seamless checkout experience"
      }
    ],
    challenges: [
      "Implementing AR features across different devices",
      "Optimizing app performance for older devices",
      "Handling offline functionality and data sync",
      "Ensuring secure payment processing"
    ],
    solutions: [
      "Created device-specific AR calibration system",
      "Implemented lazy loading and code splitting",
      "Built robust offline-first architecture with conflict resolution",
      "Integrated PCI-compliant payment gateway with tokenization"
    ],
    impact: "Achieved 4.8 star rating on app stores, 2 million+ downloads, 35% increase in mobile conversion rate, and $10M+ in monthly transactions."
  },
  {
    slug: "carbon-footprint-analytics",
    title: "Carbon Footprint Analytics Dashboard",
    excerpt: "Environmental monitoring platform tracking and visualizing carbon emissions with predictive analytics.",
    description: `Developed a comprehensive environmental monitoring solution that helps organizations track, analyze, and reduce their carbon footprint. The platform integrates with IoT sensors, building management systems, and corporate data sources to provide real-time emissions tracking and actionable insights.

The system uses machine learning models to predict future emissions based on historical patterns, weather data, and business operations. It provides detailed breakdowns of emissions by source, department, and time period, enabling organizations to identify reduction opportunities and track progress toward sustainability goals.

The dashboard features interactive visualizations built with D3.js, allowing users to explore data at different granularities. Implemented automated reporting for regulatory compliance and ESG reporting, with customizable alerts for emissions thresholds and anomaly detection.`,
    technologies: ["Python", "TensorFlow", "React", "D3.js", "PostgreSQL", "AWS IoT", "TimescaleDB"],
    link: "https://example.com",
    github: "https://github.com",
    date: "2024-03-10",
    challenges: [
      "Integrating diverse data sources and formats",
      "Processing high-volume sensor data in real-time",
      "Creating accurate predictive models",
      "Visualizing complex multidimensional data"
    ],
    solutions: [
      "Built flexible ETL pipeline with schema validation",
      "Implemented stream processing with Apache Kafka",
      "Developed ensemble models for improved accuracy",
      "Created interactive drill-down visualizations"
    ],
    impact: "Deployed to 25+ organizations, tracking 1M+ data points daily, achieving 25% average reduction in energy waste and saving $2M+ annually in energy costs."
  },
  {
    slug: "microservices-architecture-template",
    title: "Microservices Architecture Template",
    excerpt: "Open-source boilerplate for building scalable microservices with authentication, monitoring, and CI/CD.",
    description: `Created a production-ready microservices template that serves as a foundation for building scalable distributed systems. The template includes pre-configured services for authentication, authorization, API gateway, service discovery, and monitoring.

The architecture implements best practices including circuit breakers for fault tolerance, distributed tracing for debugging, and centralized logging for observability. Each service is containerized with Docker and orchestrated using Kubernetes, with Helm charts for easy deployment configuration.

Includes a complete CI/CD pipeline setup with GitLab CI, automated testing at multiple levels (unit, integration, contract, and end-to-end), and progressive deployment strategies including blue-green and canary releases. The monitoring stack uses Prometheus for metrics, Grafana for visualization, and ELK stack for log aggregation.`,
    technologies: ["Node.js", "Docker", "Kubernetes", "RabbitMQ", "Prometheus", "GitLab CI", "Helm"],
    github: "https://github.com",
    date: "2024-01-15",
    challenges: [
      "Managing service dependencies and versioning",
      "Implementing robust inter-service communication",
      "Ensuring observability across services",
      "Simplifying deployment and configuration"
    ],
    solutions: [
      "Created service mesh with Istio for traffic management",
      "Implemented event-driven architecture with saga pattern",
      "Built comprehensive distributed tracing system",
      "Developed Helm charts with environment-specific values"
    ],
    impact: "Adopted by 500+ developers worldwide, 2,000+ GitHub stars, reduced microservices setup time from weeks to hours, and used in 20+ production deployments."
  },
  {
    slug: "healthcare-patient-management",
    title: "Healthcare Patient Management System",
    excerpt: "HIPAA-compliant web application for managing patient records, appointments, and telemedicine consultations.",
    description: `Built a comprehensive healthcare management platform that digitizes patient care workflows while maintaining strict HIPAA compliance. The system handles electronic health records (EHR), appointment scheduling, prescription management, and integrated telemedicine capabilities.

The platform features role-based access control with granular permissions, ensuring that healthcare providers only access information relevant to their patients. Implemented end-to-end encryption for all patient data, with audit logs tracking every access and modification for compliance reporting.

The telemedicine module includes HD video consultations, screen sharing for reviewing test results, and integrated prescription writing that connects directly to pharmacy systems. Automated appointment reminders via SMS and email reduce no-shows, while the intelligent scheduling system optimizes provider availability and minimizes patient wait times.`,
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Twilio", "AWS", "Redis", "WebRTC"],
    date: "2024-11-01",
    challenges: [
      "Ensuring HIPAA compliance across all features",
      "Integrating with legacy hospital systems",
      "Handling sensitive data securely",
      "Building reliable video consultation platform"
    ],
    solutions: [
      "Implemented comprehensive encryption and access controls",
      "Developed HL7/FHIR adapters for system integration",
      "Built zero-trust security architecture",
      "Created redundant WebRTC infrastructure with fallbacks"
    ],
    impact: "Currently in pilot with 3 clinics, managing 5,000+ patient records, 500+ daily appointments, and 95% patient satisfaction score."
  },
  {
    slug: "blockchain-supply-chain",
    title: "Blockchain Supply Chain Tracker",
    excerpt: "Decentralized application for tracking products through supply chain using blockchain technology.",
    description: `Developed a blockchain-based supply chain solution that brings transparency and traceability to product sourcing and distribution. The platform uses smart contracts to record every transaction and movement in the supply chain, creating an immutable audit trail from manufacturer to end consumer.

The system supports multiple stakeholders including manufacturers, distributors, retailers, and consumers, each with their own dashboard and capabilities. QR codes on products allow consumers to scan and view the complete journey of their purchase, including origin, processing locations, and authenticity verification.

Implemented using Ethereum blockchain with IPFS for distributed storage of product images and documents. The smart contracts handle automated payments and escrow, reducing transaction disputes and improving cash flow for suppliers. The platform includes IoT integration for real-time tracking of temperature-sensitive goods and automated quality checks.`,
    technologies: ["Solidity", "Web3.js", "React", "IPFS", "Ethereum", "Node.js", "MongoDB"],
    github: "https://github.com",
    date: "2023-09-20",
    challenges: [
      "Minimizing blockchain transaction costs",
      "Ensuring scalability for high-volume tracking",
      "Integrating with existing supply chain systems",
      "Making blockchain accessible to non-technical users"
    ],
    solutions: [
      "Implemented Layer 2 scaling with batch transactions",
      "Used hybrid on-chain/off-chain architecture",
      "Created REST API wrapper for blockchain interactions",
      "Built intuitive UI hiding blockchain complexity"
    ],
    impact: "Tracked 100,000+ products, reduced counterfeit incidents by 60%, improved supply chain visibility by 90%, and saved $500K in dispute resolution costs."
  },
  {
    slug: "ai-content-generation-saas",
    title: "AI Content Generation Tool",
    excerpt: "SaaS platform generating marketing content, blog posts, and social media updates using fine-tuned language models.",
    description: `Created an AI-powered content generation platform that helps businesses create high-quality marketing materials, blog posts, and social media content at scale. The platform uses fine-tuned language models optimized for different content types and industries, ensuring relevant and engaging output.

The system includes advanced features like SEO optimization, tone adjustment, and brand voice learning. Users can train the AI on their existing content to maintain consistent brand messaging. The platform also includes content planning tools, editorial calendar integration, and performance analytics to track content effectiveness.

Built with a modern serverless architecture for cost-effective scaling, the platform handles thousands of content generation requests daily. Implemented usage-based billing with Stripe, content moderation to ensure quality, and integration with popular content management systems and social media platforms for direct publishing.`,
    technologies: ["Python", "OpenAI API", "Next.js", "Supabase", "Vercel", "Stripe", "Redis"],
    link: "https://example.com",
    date: "2024-07-05",
    challenges: [
      "Maintaining content quality and relevance",
      "Managing API costs at scale",
      "Preventing AI hallucinations and inaccuracies",
      "Ensuring content originality and SEO value"
    ],
    solutions: [
      "Implemented multi-stage content validation pipeline",
      "Built intelligent caching and request batching",
      "Created fact-checking layer with source verification",
      "Developed plagiarism detection and SEO scoring"
    ],
    impact: "Serving 1,000+ active users, generating 50,000+ pieces of content monthly, achieving 85% user retention rate, and $100K+ ARR within 6 months."
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

