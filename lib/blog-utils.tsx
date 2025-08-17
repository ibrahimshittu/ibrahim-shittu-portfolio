import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

// Format a date into human-readable long form (e.g., January 15, 2025)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Parse **bold** markers inside text and return React nodes with <span> wrappers
export const formatInlineText = (text: string): React.ReactNode => {
  // Support inline code with backticks and bold markers
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1 py-0.5 rounded bg-muted text-foreground font-mono text-[0.8em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={idx} className="font-semibold text-muted-foreground">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
};

// Transform full markdown-lite content (headings, lists, code) into React nodes
export const formatContent = (content: string): React.ReactNode[] => {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];

  let inCode = false;
  let codeLang: string = "text";
  let codeLines: string[] = [];

  let listItems: string[] | null = null;
  let paragraphBuf: string[] = [];
  let quoteBuf: string[] | null = null;

  const HeadingTag = ({
    level,
    children,
  }: {
    level: number;
    children: React.ReactNode;
  }) => {
    if (level === 2) {
      return (
        <h2 className="text-lg font-bold text-muted-foreground mt-10 mb-6 leading-tight">
          {children}
        </h2>
      );
    }
    if (level === 3) {
      return (
        <h3 className="text-base font-semibold text-muted-foreground mt-8 mb-4 leading-tight">
          {children}
        </h3>
      );
    }
    return (
      <h4 className="text-sm font-semibold text-muted-foreground mt-6 mb-3 leading-tight">
        {children}
      </h4>
    );
  };

  const flushParagraph = () => {
    if (!paragraphBuf.length) return;
    const text = paragraphBuf.join("\n").trim();
    if (!text) {
      paragraphBuf = [];
      return;
    }
    // Support italic-only paragraphs like *...* or _..._
    const italicOnly =
      ((text.startsWith("*") && text.endsWith("*")) ||
        (text.startsWith("_") && text.endsWith("_"))) &&
      !text.includes("**");
    if (italicOnly) {
      nodes.push(
        <p
          key={`i-${nodes.length}`}
          className="text-sm font-mono text-muted-foreground italic mt-8 mb-6 leading-relaxed border-l-2 border-border pl-4"
        >
          {text.slice(1, -1)}
        </p>
      );
    } else {
      // Split paragraph by single newlines into separate <p> like previous behavior
      text.split("\n").forEach((line, i) => {
        const cls =
          i === 0
            ? "text-sm text-muted-foreground font-mono leading-relaxed mt-4 mb-6"
            : "text-sm text-muted-foreground font-mono leading-relaxed mt-4 mb-6";
        nodes.push(
          <p key={`p-${nodes.length}`} className={cls}>
            {formatInlineText(line.trim())}
          </p>
        );
      });
    }
    paragraphBuf = [];
  };

  const flushList = () => {
    if (!listItems || listItems.length === 0) return;
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="space-y-2 mt-4 mb-6 ml-4 pl-2">
        {listItems.map((item, idx) => (
          <li
            key={idx}
            className="text-sm text-muted-foreground font-mono leading-relaxed flex items-start gap-3"
          >
            <span className="text-muted-foreground">•</span>
            <span>{formatInlineText(item)}</span>
          </li>
        ))}
      </ul>
    );
    listItems = null;
  };

  const flushCode = () => {
    if (!inCode) return;
    nodes.push(
      <div key={`code-${nodes.length}`} className="mt-4 mb-6">
        <CodeBlock language={codeLang} code={codeLines.join("\n")} />
      </div>
    );
    inCode = false;
    codeLines = [];
    codeLang = "text";
  };

  const flushQuote = () => {
    if (!quoteBuf || quoteBuf.length === 0) return;
    const joined = quoteBuf.join("\n");
    const lines = joined.split("\n").map((l) => l.replace(/^>\s?/, ""));
    nodes.push(
      <blockquote
        key={`q-${nodes.length}`}
        className="border-l-2 border-border pl-4 italic text-muted-foreground mt-8 mb-6"
      >
        {lines.map((l, i) => (
          <p key={i} className="text-sm font-mono leading-relaxed">
            {formatInlineText(l)}
          </p>
        ))}
      </blockquote>
    );
    quoteBuf = null;
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const raw = lines[idx];
    const line = raw.replace(/\s+$/, ""); // trim right, preserve indent in code

    if (inCode) {
      if (/^```\s*$/.test(line)) {
        flushCode();
      } else {
        codeLines.push(raw); // keep original spacing
      }
      continue;
    }

    // Blockquote continuation
    if (quoteBuf && /^>\s?.*/.test(line)) {
      quoteBuf.push(line);
      continue;
    }

    // A non-blank non-quote line ends a quote block
    if (quoteBuf && line.trim() !== "" && !/^>\s?/.test(line)) {
      flushQuote();
      // fall through to process this line normally
    }

    // Code block start
    const codeStart = line.match(/^```\s*([A-Za-z0-9_+-]+)?\s*$/);
    if (codeStart) {
      flushParagraph();
      flushList();
      flushQuote();
      inCode = true;
      codeLang = codeStart[1] ? codeStart[1].toLowerCase() : "text";
      continue;
    }

    // Blank line separates blocks
    if (line.trim() === "") {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    // Blockquote start
    if (/^>\s?.*/.test(line)) {
      flushParagraph();
      flushList();
      if (!quoteBuf) quoteBuf = [];
      quoteBuf.push(line);
      continue;
    }

    // Heading (##, ###, ####)
    const headingMatch = line.match(/^(#{2,4})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      nodes.push(
        <HeadingTag key={`h-${nodes.length}`} level={level}>
          {text}
        </HeadingTag>
      );
      continue;
    }

    // List items (- or *)
    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      flushQuote();
      if (!listItems) listItems = [];
      listItems.push(listMatch[1]);
      continue;
    }

    // Default: part of a paragraph
    paragraphBuf.push(line);
  }

  // Flush any remaining buffers
  flushCode();
  flushList();
  flushQuote();
  flushParagraph();

  return nodes;
};
