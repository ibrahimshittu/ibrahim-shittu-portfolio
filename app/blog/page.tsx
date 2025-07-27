import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export default function Blog() {
  const blogPosts: BlogPost[] = [
    {
      slug: "building-ai-agents-for-legal-tech",
      title: "Building AI Agents for Legal Tech: Lessons from Finiti Legal",
      excerpt:
        "Exploring the challenges and solutions in developing AI agents that automate SEC filings and integrate with Microsoft Office suite for legal professionals.",
      date: "2025-01-15",
      readTime: "8 min read",
      tags: ["AI", "Legal Tech", "Microsoft Office", "Automation"],
    },
    {
      slug: "scaling-cad-education-platform",
      title: "Scaling a CAD Education Platform: The Fabrio Journey",
      excerpt:
        "How we rebuilt Fabrio from the ground up using TypeScript, NextJS, and AWS, growing from startup to serving prestigious institutions worldwide.",
      date: "2024-12-20",
      readTime: "10 min read",
      tags: ["TypeScript", "NextJS", "AWS", "Education", "Startup"],
    },
    {
      slug: "ar-smart-glasses-accessibility",
      title: "Making Communication Accessible with AR Smart Glasses",
      excerpt:
        "Building real-time subtitle smart glasses for hearing accessibility using Unity, XREAL, and AI-powered speech recognition.",
      date: "2024-11-10",
      readTime: "6 min read",
      tags: ["AR", "Accessibility", "Unity", "AI", "XREAL"],
    },
    {
      slug: "from-civil-engineering-to-software",
      title:
        "From Civil Engineering to Software Development: My Career Journey",
      excerpt:
        "The story of transitioning from civil engineering to becoming a senior software engineer, and lessons learned along the way.",
      date: "2024-10-05",
      readTime: "7 min read",
      tags: ["Career", "Personal", "Engineering", "Growth"],
    },
    {
      slug: "predictive-analytics-energy-optimization",
      title: "Using Predictive Analytics for Energy Optimization",
      excerpt:
        "How we achieved a 25% reduction in energy waste using AI-driven analytics to monitor and optimize building energy consumption.",
      date: "2024-09-15",
      readTime: "9 min read",
      tags: ["AI/ML", "Energy", "Predictive Analytics", "Sustainability"],
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
            className="font-mono text-sm text-[#050914] hover:underline"
          >
            Blog
          </Link>
        </div>
      </nav>

      <section
        className="mx-auto w-full max-w-2xl space-y-8 bg-white px-4 pb-8"
        aria-label="Blog Content"
      >
        {/* Header */}
        <header className="space-y-1.5">
          <h1 className="text-2xl font-bold" id="blog-title">
            Blog
          </h1>
          <p className="text-pretty font-mono text-sm text-[#6c737f]">
            Thoughts on technology, software development, AI, and building great
            products.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {/* Blog Posts */}
          <section className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-lg font-bold" id="recent-posts">
              Recent Posts
            </h2>
            <div className="flex flex-col gap-6" aria-labelledby="recent-posts">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="font-mono flex flex-col justify-start items-start gap-3 pb-6 border-b border-[#eeeff0] last:border-b-0"
                >
                  <div className="flex flex-wrap justify-between items-start self-stretch gap-2">
                    <div className="flex-1">
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-base font-semibold text-left text-[#050914] hover:underline transition-all cursor-pointer">
                          {post.title}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#54575e]">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <p className="self-stretch text-sm font-medium text-left text-[#6c737f] leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <div
                        key={tag}
                        className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors text-nowrap border-[#eeeff0] bg-[#eeeff0] text-[#54575e] pointer-events-none"
                      >
                        {tag}
                      </div>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-[#9CA0A8] font-mono">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* About Blog */}
          <section className="flex min-h-0 flex-col gap-y-3 pt-4">
            <h2 className="text-xl font-bold" id="about-blog">
              About This Blog
            </h2>
            <div
              className="text-pretty font-mono text-sm text-[#6c737f]"
              aria-labelledby="about-blog"
            >
              I write about technology, software development, AI, and building
              great products. My posts cover everything from technical
              deep-dives to career insights and lessons learned from working at
              startups and larger companies.
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="flex min-h-0 flex-col gap-y-3 pt-4">
            <h2 className="text-xl font-bold" id="stay-updated">
              Stay Updated
            </h2>
            <div
              className="text-pretty font-mono text-sm text-[#6c737f] mb-4"
              aria-labelledby="stay-updated"
            >
              Get notified when I publish new posts. No spam, unsubscribe at any
              time.
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm font-mono border border-input rounded-md bg-background text-foreground placeholder:text-[#9CA0A8] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <button className="px-4 py-2 text-sm font-mono bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
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
