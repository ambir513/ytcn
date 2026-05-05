"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

export function CodeBlock({ code, filename, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-lg border border-border overflow-hidden my-4">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <span className="text-xs text-muted-foreground font-mono">
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <IconCheck className="size-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <IconCopy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="bg-code-bg p-4 overflow-x-auto">
        <pre className="text-[13px] font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
