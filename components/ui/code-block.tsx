"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

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
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="syntax-highlighter-container relative">
        <SyntaxHighlighter
          language={language}
          useInlineStyles={false}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            border: 0,
            fontSize: "0.8rem",
            lineHeight: "1.5rem",
            backgroundColor: "hsl(var(--raised))",
            color: "hsl(var(--foreground))",
            padding: "1rem",
            overflowX: "auto",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            },
          }}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBlock;
