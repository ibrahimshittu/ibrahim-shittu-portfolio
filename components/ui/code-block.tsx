"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeBlockProps {
  language: string;
  code: string;
}

const darkTheme: { [key: string]: React.CSSProperties } = {
  'pre[class*="language-"]': {
    background: "transparent",
    color: "#e8e3d6",
    fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', monospace",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: 0,
    padding: 0,
  },
  'code[class*="language-"]': {
    background: "transparent",
    color: "#e8e3d6",
    fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', monospace",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  comment: { color: "#74706a", fontStyle: "italic" },
  prolog: { color: "#74706a" },
  doctype: { color: "#74706a" },
  cdata: { color: "#74706a" },
  punctuation: { color: "#9c978d" },
  property: { color: "#e0a060" },
  tag: { color: "#e0a060" },
  boolean: { color: "#e0a060" },
  number: { color: "#e0a060" },
  constant: { color: "#e0a060" },
  symbol: { color: "#e0a060" },
  deleted: { color: "#e0a060" },
  selector: { color: "#a8c98e" },
  "attr-name": { color: "#a8c98e" },
  string: { color: "#a8c98e" },
  char: { color: "#a8c98e" },
  builtin: { color: "#a8c98e" },
  inserted: { color: "#a8c98e" },
  operator: { color: "#9c978d" },
  entity: { color: "#9c978d", cursor: "help" },
  url: { color: "#9c978d" },
  variable: { color: "#e8e3d6" },
  atrule: { color: "#cba6f7" },
  "attr-value": { color: "#a8c98e" },
  function: { color: "#cba6f7" },
  "class-name": { color: "#cba6f7" },
  keyword: { color: "#f0a8a8" },
  regex: { color: "#e0a060" },
  important: { color: "#f0a8a8", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

const lightTheme: { [key: string]: React.CSSProperties } = {
  'pre[class*="language-"]': {
    background: "transparent",
    color: "#0e0f11",
    fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', monospace",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: 0,
    padding: 0,
  },
  'code[class*="language-"]': {
    background: "transparent",
    color: "#0e0f11",
    fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', monospace",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  comment: { color: "#7a7f86", fontStyle: "italic" },
  prolog: { color: "#7a7f86" },
  doctype: { color: "#7a7f86" },
  cdata: { color: "#7a7f86" },
  punctuation: { color: "#3d4147" },
  property: { color: "#a06020" },
  tag: { color: "#a06020" },
  boolean: { color: "#a06020" },
  number: { color: "#a06020" },
  constant: { color: "#a06020" },
  symbol: { color: "#a06020" },
  selector: { color: "#1f5d3b" },
  "attr-name": { color: "#1f5d3b" },
  string: { color: "#1f5d3b" },
  char: { color: "#1f5d3b" },
  builtin: { color: "#1f5d3b" },
  operator: { color: "#3d4147" },
  variable: { color: "#0e0f11" },
  atrule: { color: "#7c3aed" },
  "attr-value": { color: "#1f5d3b" },
  function: { color: "#7c3aed" },
  "class-name": { color: "#7c3aed" },
  keyword: { color: "#b91c4f" },
  regex: { color: "#a06020" },
  important: { color: "#b91c4f", fontWeight: "bold" },
};

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
          onClick={handleCopy}
          className="!font-mono text-[10.5px] text-[#7a7f86] opacity-0 transition-opacity hover:text-[#0e0f11] group-hover:opacity-100 dark:text-[#74706a] dark:hover:text-[#f2efe7]"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <div className="overflow-x-auto px-4 py-4">
        <span className="hidden dark:block">
          <SyntaxHighlighter
            language={language}
            style={darkTheme}
            PreTag="div"
            CodeTag="code"
            customStyle={{ background: "transparent", padding: 0, margin: 0 }}
          >
            {code}
          </SyntaxHighlighter>
        </span>
        <span className="block dark:hidden">
          <SyntaxHighlighter
            language={language}
            style={lightTheme}
            PreTag="div"
            CodeTag="code"
            customStyle={{ background: "transparent", padding: 0, margin: 0 }}
          >
            {code}
          </SyntaxHighlighter>
        </span>
      </div>
    </div>
  );
}

export default CodeBlock;
