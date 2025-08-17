"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="my-6 group">
      <div className="flex items-center justify-between bg-muted border-x border-t border-border rounded-t-md px-3 py-2">
        <span className="text-xs font-mono text-muted-foreground">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-muted-foreground hover:text-foreground bg-background border border-border rounded px-2 py-1"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="relative syntax-highlighter-container">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus} // Default theme, overridden by CSS
          customStyle={{
            margin: 0,
            borderRadius: '0 0 0.375rem 0.375rem',
            borderTop: 0,
            fontSize: '0.75rem',
            lineHeight: '1.25rem',
            backgroundColor: 'hsl(var(--muted))',
            color: 'hsl(var(--foreground))',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5rem',
            paddingRight: '1rem',
            color: 'hsl(var(--muted-foreground))',
            fontSize: '0.75rem',
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