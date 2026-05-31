"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="group my-6 overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-raised px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-[11px] text-faint opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="syntax-highlighter-container relative">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            border: 0,
            fontSize: "0.8rem",
            lineHeight: "1.5rem",
            backgroundColor: "hsl(var(--raised))",
            color: "hsl(var(--foreground))",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            },
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBlock;
