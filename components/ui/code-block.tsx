"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { darkTheme, lightTheme } from "./code-block-themes";

interface CodeBlockProps {
  language: string;
  code: string;
}

const HIGHLIGHTER_RESET = { background: "transparent", padding: 0, margin: 0 };

interface HighlightedProps {
  language: string;
  code: string;
  style: { [key: string]: React.CSSProperties };
}

function Highlighted({ language, code, style }: HighlightedProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      PreTag="div"
      CodeTag="code"
      customStyle={HIGHLIGHTER_RESET}
    >
      {code}
    </SyntaxHighlighter>
  );
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
    <div className="not-prose group relative my-6 overflow-hidden rounded-md border border-[#e7e5de] bg-[#f5f3ec] dark:border-[#26251f] dark:bg-[#15140f]">
      <div className="flex items-center justify-between border-b border-[#e7e5de] px-4 py-2 dark:border-[#26251f]">
        <span className="!font-mono text-[10.5px] tracking-[0.04em] text-[#7a7f86] dark:text-[#74706a]">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="!font-mono text-[10.5px] text-[#7a7f86] opacity-0 transition-opacity hover:text-[#0e0f11] group-hover:opacity-100 dark:text-[#74706a] dark:hover:text-[#f2efe7]"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <div className="overflow-x-auto px-4 py-4">
        <span className="hidden dark:block">
          <Highlighted language={language} code={code} style={darkTheme} />
        </span>
        <span className="block dark:hidden">
          <Highlighted language={language} code={code} style={lightTheme} />
        </span>
      </div>
    </div>
  );
}

