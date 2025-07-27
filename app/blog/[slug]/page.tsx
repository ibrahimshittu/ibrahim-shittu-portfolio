import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

// This would normally come from a CMS or markdown files
function getBlogPost(slug: string): BlogPost | null {
  const posts: Record<string, BlogPost> = {
    "building-ai-agents-for-legal-tech": {
      slug: "building-ai-agents-for-legal-tech",
      title: "Building AI Agents for Legal Tech: Lessons from Finiti Legal",
      excerpt:
        "Exploring the challenges and solutions in developing AI agents that automate SEC filings and integrate with Microsoft Office suite for legal professionals.",
      date: "2025-01-15",
      readTime: "8 min read",
      tags: ["AI", "Legal Tech", "Microsoft Office", "Automation"],
      content: `Working at Finiti Legal has been an incredible journey into the intersection of artificial intelligence and legal technology. As we build AI agents that fundamentally transform how lawyers work with regulatory content, I've learned valuable lessons about developing enterprise-grade AI solutions.

## The Challenge

Legal professionals spend countless hours on tedious, repetitive tasks - particularly around SEC filings and regulatory content creation. What traditionally takes days to draft manually can now be automated, but the challenge lies in building systems that lawyers can trust with their most critical work.

## Our Approach

### Security First

Working with sensitive legal documents requires SOC 2 compliance from day one. We've built a secure multi-tenant architecture that ensures data isolation and meets the stringent security requirements of legal firms.

### Microsoft Office Integration

Lawyers live in Microsoft Word and Outlook. Rather than asking them to change their workflow, we brought our AI directly into their existing tools through deep Office integration.

### Domain-Specific AI

Generic AI models aren't sufficient for legal work. We've fine-tuned our models specifically for regulatory content, ensuring accuracy and relevance in legal contexts.

## Key Lessons Learned

**Trust is Everything**: In legal tech, accuracy isn't just important - it's critical. Every AI decision needs to be explainable and auditable.

**Integration Over Innovation**: Sometimes the best solution isn't the most innovative - it's the one that fits seamlessly into existing workflows.

**Compliance is a Feature**: SOC 2 compliance isn't a checkbox - it's a core feature that enables adoption in enterprise legal environments.

## Looking Forward

The future of legal tech lies in AI that amplifies human expertise rather than replacing it. As we continue to develop these tools, the focus remains on helping legal professionals focus on strategy and high-value work while automating the routine tasks that consume their time.

*What challenges are you facing in your domain-specific AI implementations? I'd love to hear your thoughts.*`,
    },
    "scaling-cad-education-platform": {
      slug: "scaling-cad-education-platform",
      title: "Scaling a CAD Education Platform: The Fabrio Journey",
      excerpt:
        "How we rebuilt Fabrio from the ground up using TypeScript, NextJS, and AWS, growing from startup to serving prestigious institutions worldwide.",
      date: "2024-12-20",
      readTime: "10 min read",
      tags: ["TypeScript", "NextJS", "AWS", "Education", "Startup"],
      content: `As the first engineering hire at Fabrio, I had the unique opportunity to rebuild an entire CAD education platform from the ground up. This is the story of how we transformed a startup idea into a platform serving prestigious institutions worldwide.

## The Starting Point

When I joined Fabrio, the vision was clear: revolutionize Computer-Aided Design education and workflow efficiency. However, the technical foundation needed a complete overhaul to support the ambitious goals ahead.

## Technology Decisions

### Why TypeScript and NextJS?

We chose TypeScript for its type safety and developer experience, especially important when building complex educational interfaces. NextJS provided the perfect balance of performance and developer productivity.

### AWS Infrastructure

Our AWS architecture was designed for scalability from day one:

- **Compute**: ECS for containerized services
- **Storage**: S3 for CAD files and media assets
- **Database**: RDS for structured data, DynamoDB for session management
- **CDN**: CloudFront for global content delivery

## Challenges and Solutions

### CAD File Processing

CAD files are large and complex. We implemented:
- Streaming uploads for large files
- Background processing for file conversion
- Progressive loading for 3D models

### Real-time Collaboration

Students and instructors needed to collaborate in real-time:
- WebSocket connections for live cursors
- Operational Transform for conflict resolution
- Optimistic updates for smooth UX

### Scalable Assessment System

Automated grading of CAD assignments required:
- Geometric comparison algorithms
- Standardized evaluation criteria
- Instant feedback systems

## Results

The rebuild was successful beyond our expectations:
- **Performance**: 60% faster load times
- **Scalability**: Supporting 10x more concurrent users
- **Adoption**: Prestigious institutions worldwide
- **Developer Experience**: 80% reduction in bug reports

## Lessons for Startup CTOs

**Plan for Scale Early**: The decisions you make at 100 users will impact you at 10,000 users.

**Invest in DevOps**: Good CI/CD saves more time than any framework.

**Monitor Everything**: You can't optimize what you don't measure.

**Team Culture**: Technical excellence starts with team practices.

## Looking Back

Rebuilding Fabrio taught me that successful platforms are built on three pillars: solid technical foundations, user-centric design, and a team that cares about quality. The combination of modern web technologies with thoughtful architecture can create truly transformative educational experiences.

*Are you working on an educational platform? I'd love to connect and share more detailed insights about our technical challenges and solutions.*`,
    },
  };

  return posts[slug] || null;
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: PageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-lg font-bold text-[#050914] mt-8 mb-4"
          >
            {paragraph.substring(3)}
          </h2>
        );
      } else if (paragraph.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-base font-semibold text-[#050914] mt-6 mb-3"
          >
            {paragraph.substring(4)}
          </h3>
        );
      } else if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <p
            key={index}
            className="text-sm font-semibold text-[#050914] mt-4 mb-2"
          >
            {paragraph.slice(2, -2)}
          </p>
        );
      } else if (paragraph.startsWith("*") && paragraph.endsWith("*")) {
        return (
          <p
            key={index}
            className="text-sm font-medium text-[#6c737f] italic mt-6 mb-4"
          >
            {paragraph.slice(1, -1)}
          </p>
        );
      } else if (paragraph.startsWith("- ")) {
        const items = paragraph
          .split("\n")
          .filter((line) => line.startsWith("- "));
        return (
          <ul key={index} className="space-y-1 mt-4 mb-4">
            {items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="text-sm text-[#6c737f] font-mono flex items-start"
              >
                <span className="mr-2">•</span>
                <span>{item.substring(2)}</span>
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <p
            key={index}
            className="text-sm text-[#6c737f] font-mono leading-relaxed mt-4 mb-4"
          >
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <main className="flex-1 flex flex-col">
      {/* Navigation */}
      <nav className="mx-auto w-full max-w-2xl px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-sm text-[#9CA0A8] hover:text-[#050914] transition-colors"
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

      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white px-4 pb-8">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#9CA0A8] hover:text-[#050914] transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="space-y-4">
          <h1 className="text-2xl font-bold text-[#050914] leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#54575e]">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors text-nowrap border-[#eeeff0] bg-[#eeeff0] text-[#54575e] pointer-events-none"
              >
                {tag}
              </div>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article className="font-mono space-y-0">
          {formatContent(post.content)}
        </article>

        {/* Author Bio */}
        <div className="border-t border-[#eeeff0] pt-8">
          <div className="flex items-start gap-4">
            <span className="relative flex shrink-0 overflow-hidden rounded-full size-12">
              <img
                className="aspect-square h-full w-full"
                alt="Ibrahim Shittu's profile picture"
                src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMFNVYTB5U011aGdYTXBvRHhueFlIZ09qU1gifQ"
              />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-[#050914] mb-2">
                Ibrahim Shittu
              </h3>
              <p className="text-sm font-mono text-[#6c737f] mb-4">
                Senior Software Engineer passionate about AI, web development,
                and building products that make a difference. Currently working
                at Finiti Legal, building AI agents for the legal industry.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/ibrahimshittu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#9CA0A8] hover:text-[#050914] transition-colors"
                >
                  Follow on GitHub
                </a>
                <a
                  href="https://linkedin.com/in/ibrahimshittu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#9CA0A8] hover:text-[#050914] transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center pt-8">
          <Link href="/blog">
            <button className="px-4 py-2 text-sm font-mono bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              View All Posts
            </button>
          </Link>
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

export async function generateStaticParams() {
  // In a real app, this would fetch all blog post slugs
  return [
    { slug: "building-ai-agents-for-legal-tech" },
    { slug: "scaling-cad-education-platform" },
    { slug: "ar-smart-glasses-accessibility" },
    { slug: "from-civil-engineering-to-software" },
    { slug: "predictive-analytics-energy-optimization" },
  ];
}
