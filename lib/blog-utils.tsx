import React from "react";
import {
  getYouTubeThumbnail,
  getYouTubeEmbedUrl,
  type VideoMetadata,
} from "./video-seo";
import { CodeBlock } from "@/components/ui/code-block";

// Long form, e.g. "January 15, 2025"
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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

const INLINE_TOKEN_REGEX =
  /(``[^`]+``|`[^`]+`|\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g;

export const formatInlineText = (text: string): React.ReactNode => {
  const parts = text.split(INLINE_TOKEN_REGEX);
  const nodes: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;

    const isLink =
      i + 2 < parts.length &&
      parts[i + 1] &&
      parts[i + 2] &&
      text.includes(`[${parts[i + 1]}](${parts[i + 2]})`);

    if (isLink) {
      nodes.push(
        <a
          key={`link-${i}`}
          href={parts[i + 2]}
          target="_blank"
          rel="noopener noreferrer"
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
      nodes.push(<code key={`code-${i}`}>{content}</code>);
      continue;
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={`bold-${i}`}>{part.slice(2, -2)}</strong>);
      continue;
    }

    nodes.push(<React.Fragment key={`text-${i}`}>{part}</React.Fragment>);
  }

  return nodes;
};

interface HeadingTagProps {
  level: number;
  children: React.ReactNode;
}

function HeadingTag({ level, children }: HeadingTagProps) {
  if (level === 2) return <h2>{children}</h2>;
  if (level === 3) return <h3>{children}</h3>;
  return <h4>{children}</h4>;
}

const isItalicOnly = (text: string): boolean =>
  ((text.startsWith("*") && text.endsWith("*")) ||
    (text.startsWith("_") && text.endsWith("_"))) &&
  !text.includes("**");

const isTableRow = (line: string): boolean =>
  line.trim().startsWith("|") && line.trim().endsWith("|");

const isTableSeparator = (line: string): boolean =>
  /^\|[\s-:|]+\|$/.test(line.trim());

const parseTableCells = (line: string): string[] =>
  line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());

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

  const flushParagraph = () => {
    if (!paragraphBuf.length) return;
    const text = paragraphBuf.join("\n").trim();
    if (!text) {
      paragraphBuf = [];
      return;
    }
    if (isItalicOnly(text)) {
      nodes.push(
        <p key={`i-${nodes.length}`} className="italic">
          {formatInlineText(text.slice(1, -1))}
        </p>,
      );
    } else {
      text.split("\n").forEach((line) => {
        nodes.push(
          <p key={`p-${nodes.length}`}>{formatInlineText(line.trim())}</p>,
        );
      });
    }
    paragraphBuf = [];
  };

  const flushList = () => {
    if (!listItems || listItems.length === 0) return;
    nodes.push(
      <ul key={`ul-${nodes.length}`}>
        {listItems.map((item, idx) => (
          <li key={idx}>{formatInlineText(item)}</li>
        ))}
      </ul>,
    );
    listItems = null;
  };

  const flushCode = () => {
    if (!inCode) return;
    nodes.push(
      <div key={`code-${nodes.length}`} className="my-6">
        <CodeBlock language={codeLang} code={codeLines.join("\n")} />
      </div>,
    );
    inCode = false;
    codeLines = [];
    codeLang = "text";
  };

  const flushQuote = () => {
    if (!quoteBuf || quoteBuf.length === 0) return;
    const quoteLines = quoteBuf
      .join("\n")
      .split("\n")
      .map((l) => l.replace(/^>\s?/, ""));
    nodes.push(
      <blockquote key={`q-${nodes.length}`}>
        {quoteLines.map((l, i) => (
          <p key={i}>{formatInlineText(l)}</p>
        ))}
      </blockquote>,
    );
    quoteBuf = null;
  };

  const flushTable = () => {
    if (!tableHeader || !tableRows || tableRows.length === 0) return;
    nodes.push(
      <div key={`table-${nodes.length}`} className="-mx-5 overflow-x-auto sm:mx-0">
        <table>
          <thead>
            <tr>
              {tableHeader.map((cell, i) => (
                <th key={i}>{formatInlineText(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>{formatInlineText(cell)}</td>
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

  const flushBlocks = (
    options: { exclude?: "paragraph" | "list" | "quote" | "table" } = {},
  ) => {
    const { exclude } = options;
    if (exclude !== "paragraph") flushParagraph();
    if (exclude !== "list") flushList();
    if (exclude !== "quote") flushQuote();
    if (exclude !== "table") flushTable();
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const raw = lines[idx];
    const line = raw.replace(/\s+$/, "");

    if (inCode) {
      if (/^```\s*$/.test(line)) {
        flushCode();
      } else {
        codeLines.push(raw);
      }
      continue;
    }

    if (line.startsWith("{{youtube:") && line.endsWith("}}")) {
      flushBlocks();
      const videoId = line.slice(10, -2).trim();
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
          className="relative my-8 w-full"
          style={{ paddingBottom: "56.25%" }}
          data-video-id={videoId}
          data-video-metadata={JSON.stringify(videoMetadata)}
        >
          <iframe
            className="absolute left-0 top-0 h-full w-full rounded-lg border-0"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>,
      );
      continue;
    }

    if (quoteBuf && /^>\s?.*/.test(line)) {
      quoteBuf.push(line);
      continue;
    }

    if (quoteBuf && line.trim() !== "" && !/^>\s?/.test(line)) {
      flushQuote();
    }

    const codeStart = line.match(/^```\s*([A-Za-z0-9_+-]+)?\s*$/);
    if (codeStart) {
      flushBlocks();
      inCode = true;
      codeLang = codeStart[1] ? codeStart[1].toLowerCase() : "text";
      continue;
    }

    if (line.trim() === "") {
      flushBlocks();
      continue;
    }

    if (/^>\s?.*/.test(line)) {
      flushBlocks({ exclude: "quote" });
      if (!quoteBuf) quoteBuf = [];
      quoteBuf.push(line);
      continue;
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushBlocks();
      const alt = imageMatch[1];
      const src = imageMatch[2];
      nodes.push(
        <figure key={`img-${nodes.length}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
          {alt && <figcaption>{alt}</figcaption>}
        </figure>,
      );
      continue;
    }

    if (isTableRow(line)) {
      flushBlocks({ exclude: "table" });

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

    const headingMatch = line.match(/^(#{2,4})\s+(.*)$/);
    if (headingMatch) {
      flushBlocks();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      nodes.push(
        <HeadingTag key={`h-${nodes.length}`} level={level}>
          {text}
        </HeadingTag>,
      );
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushBlocks({ exclude: "list" });
      if (!listItems) listItems = [];
      listItems.push(listMatch[1]);
      continue;
    }

    paragraphBuf.push(line);
  }

  flushCode();
  flushBlocks();

  return nodes;
};
