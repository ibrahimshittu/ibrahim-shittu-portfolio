import React from "react";

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
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={idx} className="font-semibold text-[#050914]">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
};

// Transform full markdown-lite content (headings, lists, code) into React nodes
export const formatContent = (content: string): React.ReactNode[] => {
  const paragraphs = content.split("\n\n").filter((p) => p.trim());

  return paragraphs.map((paragraph, index) => {
    const trimmed = paragraph.trim();

    // General heading detection (##, ###, ####) with optional following lines
    const headingMatch = trimmed.match(/^(#{2,4})\s+/);
    if (headingMatch) {
      const headingLevel = headingMatch[1].length;
      const lines = trimmed.split("\n");
      const headingLine = lines[0].slice(headingLevel + 1).trim();
      const restLines = lines.slice(1).filter((l) => l.trim());

      const HeadingTag = ({ children }: { children: React.ReactNode }) => {
        if (headingLevel === 2) {
          return (
            <h2 className="text-lg font-bold text-[#050914] mt-10 mb-6 leading-tight">
              {children}
            </h2>
          );
        }
        if (headingLevel === 3) {
          return (
            <h3 className="text-base font-semibold text-[#050914] mt-8 mb-4 leading-tight">
              {children}
            </h3>
          );
        }
        return (
          <h4 className="text-sm font-semibold text-[#050914] mt-6 mb-3 leading-tight">
            {children}
          </h4>
        );
      };

      if (restLines.length === 0) {
        return <HeadingTag key={index}>{headingLine}</HeadingTag>;
      }

      if (restLines.every((l) => l.startsWith("- "))) {
        return (
          <React.Fragment key={index}>
            <HeadingTag>{headingLine}</HeadingTag>
            <ul className="space-y-2 mt-4 mb-6 ml-4">
              {restLines.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="text-sm text-[#6c737f] font-mono leading-relaxed flex items-start"
                >
                  <span className="mr-3 text-[#9CA0A8]">•</span>
                  <span>{formatInlineText(item.substring(2))}</span>
                </li>
              ))}
            </ul>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={index}>
          <HeadingTag>{headingLine}</HeadingTag>
          {restLines.map((line, idxLine) => (
            <p
              key={idxLine}
              className="text-sm text-[#6c737f] font-mono leading-relaxed mt-4 mb-6"
            >
              {formatInlineText(line.trim())}
            </p>
          ))}
        </React.Fragment>
      );
    }

    // List blocks (stand-alone)
    if (trimmed.includes("\n- ")) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={index} className="space-y-2 mt-4 mb-6 ml-4">
          {items.map((item, itemIdx) => (
            <li
              key={itemIdx}
              className="text-sm text-[#6c737f] font-mono leading-relaxed flex items-start"
            >
              <span className="mr-3 text-[#9CA0A8]">•</span>
              <span>{formatInlineText(item.substring(2))}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Code blocks ```
    if (trimmed.includes("```")) {
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

    // Italic-only paragraphs (surrounded by single * ... *)
    if (
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

    // Multi-line paragraph without specific markers
    if (trimmed.includes("\n")) {
      const lines = trimmed.split("\n").filter((l) => l.trim());
      return (
        <React.Fragment key={index}>
          {lines.map((line, idxLine) => (
            <p
              key={idxLine}
              className="text-sm text-[#6c737f] font-mono leading-relaxed mt-4 mb-6"
            >
              {formatInlineText(line.trim())}
            </p>
          ))}
        </React.Fragment>
      );
    }

    // Default paragraph
    return (
      <p
        key={index}
        className="text-sm text-[#6c737f] font-mono leading-relaxed mt-4 mb-6"
      >
        {formatInlineText(trimmed)}
      </p>
    );
  });
};
