import React from "react";
import {
  getYouTubeThumbnail,
  getYouTubeEmbedUrl,
  type VideoMetadata,
} from "./video-seo";
import { CodeBlock } from "@/components/ui/code-block";

export function extractYouTubeVideos(content: string): string[] {
  const matches = content.match(/\{\{youtube:([^}]+)\}\}/g);
  if (!matches) return [];
  return matches.map((match) => match.slice(10, -2).trim());
}

export function generateBlogVideoMetadata(
  videoId: string,
  blogTitle: string,
  blogDescription: string,
  blogDate: string,
): VideoMetadata {
  return {
    title: `${blogTitle} - Video Content`,
    description: blogDescription,
    thumbnailUrl: getYouTubeThumbnail(videoId),
    uploadDate: blogDate,
    embedUrl: getYouTubeEmbedUrl(videoId),
    videoId: videoId,
  };
}

// Parse inline code (single/double backticks), **bold**, and [links](url) into React nodes.
export const formatInlineText = (text: string): React.ReactNode => {
  const parts = text.split(
    /(``[^`]+``|`[^`]+`|\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g,
  );
  const nodes: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;

    // Markdown link: the split captures the label (i+1) and href (i+2) as adjacent parts.
    if (
      i + 2 < parts.length &&
      parts[i + 1] &&
      parts[i + 2] &&
      text.includes(`[${parts[i + 1]}](${parts[i + 2]})`)
    ) {
      nodes.push(
        <a
          key={`link-${i}`}
          href={parts[i + 2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
        >
          {parts[i + 1]}
        </a>,
      );
      i += 2;
      continue;
    }

    if (
      (part.startsWith("``") && part.endsWith("``")) ||
      (part.startsWith("`") && part.endsWith("`"))
    ) {
      const isDouble = part.startsWith("``");
      const content = isDouble ? part.slice(2, -2) : part.slice(1, -1);
      nodes.push(
        <code
          key={`code-${i}`}
          className="px-1 py-0.5 rounded bg-muted text-foreground font-mono text-[0.8em]"
        >
          {content}
        </code>,
      );
    } else if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(
        <span key={`bold-${i}`} className="font-semibold text-muted-foreground">
          {part.slice(2, -2)}
        </span>,
      );
    } else {
      nodes.push(<React.Fragment key={`text-${i}`}>{part}</React.Fragment>);
    }
  }

  return nodes;
};

// Transform full markdown-lite content (headings, lists, code, images, tables) into React nodes
export const formatContent = (content: string): React.ReactNode[] => {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];

  let inCode = false;
  let codeLang: string = "text";
  let codeLines: string[] = [];

  let listItems: string[] | null = null;
  let paragraphBuf: string[] = [];
  let quoteBuf: string[] | null = null;
  let tableRows: string[][] | null = null;
  let tableHeader: string[] | null = null;

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
          className="text-sm font-mono text-muted-foreground italic mt-8 mb-6 leading-relaxed border-l-[3px] border-solid border-[#1f5d3b] pl-4 dark:border-[#6fb292]"
        >
          {formatInlineText(text.slice(1, -1))}
        </p>,
      );
    } else {
      // Split paragraph by single newlines so each line renders as its own <p>
      text.split("\n").forEach((line) => {
        nodes.push(
          <p
            key={`p-${nodes.length}`}
            className="text-sm text-muted-foreground font-mono leading-relaxed mt-4 mb-6"
          >
            {formatInlineText(line.trim())}
          </p>,
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
      </ul>,
    );
    listItems = null;
  };

  const flushCode = () => {
    if (!inCode) return;
    nodes.push(
      <div key={`code-${nodes.length}`} className="mt-4 mb-6">
        <CodeBlock language={codeLang} code={codeLines.join("\n")} />
      </div>,
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
        className="border-l-[3px] border-solid border-[#1f5d3b] pl-4 italic text-muted-foreground mt-8 mb-6 dark:border-[#6fb292]"
      >
        {lines.map((l, i) => (
          <p key={i} className="text-sm font-mono leading-relaxed">
            {formatInlineText(l)}
          </p>
        ))}
      </blockquote>,
    );
    quoteBuf = null;
  };

  const flushTable = () => {
    if (!tableHeader || !tableRows || tableRows.length === 0) return;
    nodes.push(
      <div
        key={`table-${nodes.length}`}
        className="mt-4 mb-6 -mx-4 sm:mx-0 overflow-x-auto"
      >
        <table className="w-full min-w-[520px] text-xs sm:text-sm font-mono border-collapse">
          <thead>
            <tr className="border-b border-border">
              {tableHeader.map((cell, i) => (
                <th
                  key={i}
                  className="text-left py-2 px-2 sm:px-3 text-muted-foreground font-semibold"
                >
                  {formatInlineText(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-border/50">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="py-2 px-2 sm:px-3 text-muted-foreground leading-relaxed"
                  >
                    {formatInlineText(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    tableHeader = null;
    tableRows = null;
  };

  const isTableRow = (line: string): boolean =>
    line.trim().startsWith("|") && line.trim().endsWith("|");

  // Matches a separator row like |---|:--:|---:|
  const isTableSeparator = (line: string): boolean =>
    /^\|[\s-:|]+\|$/.test(line.trim());

  const parseTableCells = (line: string): string[] =>
    line
      .trim()
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());

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

    // {{youtube:VIDEO_ID}} custom marker — render as an embed and surface
    // metadata to parent components via data-* attributes.
    if (line.startsWith("{{youtube:") && line.endsWith("}}")) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      const videoId = line.slice(10, -2).trim();

      // Placeholder metadata — enriched with real post/video details by callers.
      const videoMetadata: VideoMetadata = {
        title: "YouTube Video",
        description: "Embedded YouTube video content",
        thumbnailUrl: getYouTubeThumbnail(videoId),
        uploadDate: new Date().toISOString(),
        embedUrl: getYouTubeEmbedUrl(videoId),
        videoId: videoId,
      };

      nodes.push(
        <div
          key={`yt-${nodes.length}`}
          className="relative w-full mt-6 mb-8"
          style={{ paddingBottom: "56.25%" }}
          data-video-id={videoId}
          data-video-metadata={JSON.stringify(videoMetadata)}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>,
      );
      continue;
    }

    // Blockquote continuation
    if (quoteBuf && /^>\s?.*/.test(line)) {
      quoteBuf.push(line);
      continue;
    }

    // A non-blank non-quote line ends a quote block; fall through to re-process it below.
    if (quoteBuf && line.trim() !== "" && !/^>\s?/.test(line)) {
      flushQuote();
    }

    // Code block start
    const codeStart = line.match(/^```\s*([A-Za-z0-9_+-]+)?\s*$/);
    if (codeStart) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      inCode = true;
      codeLang = codeStart[1] ? codeStart[1].toLowerCase() : "text";
      continue;
    }

    // Blank line separates blocks
    if (line.trim() === "") {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      continue;
    }

    // Blockquote start
    if (/^>\s?.*/.test(line)) {
      flushParagraph();
      flushList();
      flushTable();
      if (!quoteBuf) quoteBuf = [];
      quoteBuf.push(line);
      continue;
    }

    // Image: ![alt](src)
    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      const alt = imageMatch[1];
      const src = imageMatch[2];
      nodes.push(
        <figure key={`img-${nodes.length}`} className="mt-6 mb-8">
          <img
            src={src}
            alt={alt}
            className="w-full rounded-lg border border-border"
          />
          {alt && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground font-mono">
              {alt}
            </figcaption>
          )}
        </figure>,
      );
      continue;
    }

    // Table: first row is the header, second is the `|---|` separator, rest are data rows.
    if (isTableRow(line)) {
      flushParagraph();
      flushList();
      flushQuote();

      if (!tableHeader) {
        tableHeader = parseTableCells(line);
        tableRows = [];
        continue;
      }
      if (isTableSeparator(line)) continue;
      if (tableRows) tableRows.push(parseTableCells(line));
      continue;
    }

    if (tableHeader && !isTableRow(line)) {
      flushTable();
    }

    // Heading (##, ###, ####)
    const headingMatch = line.match(/^(#{2,4})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      nodes.push(
        <HeadingTag key={`h-${nodes.length}`} level={level}>
          {text}
        </HeadingTag>,
      );
      continue;
    }

    // List items (- or *)
    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      flushQuote();
      flushTable();
      if (!listItems) listItems = [];
      listItems.push(listMatch[1]);
      continue;
    }

    paragraphBuf.push(line);
  }

  flushCode();
  flushList();
  flushQuote();
  flushTable();
  flushParagraph();

  return nodes;
};
