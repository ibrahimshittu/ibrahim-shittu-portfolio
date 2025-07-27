import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogPost } from "@/data/blog-posts";

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
    const paragraphs = content.split("\n\n").filter((p) => p.trim());

    return paragraphs.map((paragraph, index) => {
      const trimmed = paragraph.trim();

      // Handle headers
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-lg font-bold text-[#050914] mt-10 mb-6 leading-tight"
          >
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-base font-semibold text-[#050914] mt-8 mb-4 leading-tight"
          >
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith("#### ")) {
        return (
          <h4
            key={index}
            className="text-sm font-semibold text-[#050914] mt-6 mb-3 leading-tight"
          >
            {trimmed.substring(5)}
          </h4>
        );
      }

      // Handle lists
      else if (trimmed.includes("\n- ")) {
        const items = trimmed
          .split("\n")
          .filter((line) => line.startsWith("- "));
        return (
          <ul key={index} className="space-y-2 mt-4 mb-6 ml-4">
            {items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="text-sm text-[#6c737f] font-mono leading-relaxed flex items-start"
              >
                <span className="mr-3 text-[#9CA0A8]">•</span>
                <span>{formatInlineText(item.substring(2))}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Handle code blocks (simple detection)
      else if (trimmed.includes("```")) {
        return (
          <div
            key={index}
            className="bg-[#f8f9fa] border border-[#eeeff0] rounded-md p-4 mt-4 mb-6"
          >
            <code className="text-sm font-mono text-[#050914] whitespace-pre-wrap">
              {trimmed.replace(/```/g, "")}
            </code>
          </div>
        );
      }

      // Handle italic text (questions at end of posts)
      else if (
        trimmed.startsWith("*") &&
        trimmed.endsWith("*") &&
        !trimmed.includes("**")
      ) {
        return (
          <p
            key={index}
            className="text-sm font-mono text-[#6c737f] italic mt-8 mb-6 leading-relaxed border-l-2 border-[#eeeff0] pl-4"
          >
            {trimmed.slice(1, -1)}
          </p>
        );
      }

      // Regular paragraphs
      else {
        return (
          <p
            key={index}
            className="text-sm text-[#6c737f] font-mono leading-relaxed mt-4 mb-6"
          >
            {formatInlineText(trimmed)}
          </p>
        );
      }
    });
  };

  const formatInlineText = (text: string) => {
    // Handle bold text **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={index} className="font-semibold text-[#050914]">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
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
        <article className="font-mono">
          <div className="prose max-w-none">{formatContent(post.content)}</div>
        </article>

        {/* Author Bio */}
        <div className="border-t border-[#eeeff0] pt-8 mt-12">
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
                Senior Software Engineer passionate about AI, web/mobile
                development, and building products that make a difference.
                Currently working at Finiti Legal, building AI agents for the
                legal industry.
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
  return [
    { slug: "building-ai-agents-for-legal-tech" },
    { slug: "scaling-cad-education-platform" },
    { slug: "ar-smart-glasses-accessibility" },
    { slug: "from-civil-engineering-to-software" },
    { slug: "predictive-analytics-energy-optimization" },
  ];
}
