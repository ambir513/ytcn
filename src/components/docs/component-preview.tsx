"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";

interface ComponentPreviewProps {
  code: string;
  filename?: string;
  children: React.ReactNode;
}

export function ComponentPreview({
  code,
  filename,
  children,
}: ComponentPreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className="border border-border rounded-lg overflow-hidden my-6">
      {/* Tab switcher */}
      <div className="flex items-center justify-end gap-1 border-b border-border bg-muted/30 px-4 py-1.5">
        <button
          onClick={() => setTab("preview")}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            tab === "preview"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setTab("code")}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            tab === "code"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Code
        </button>
      </div>

      {/* Content */}
      {tab === "preview" ? (
        <div className="bg-muted/20 p-8 flex items-center justify-center min-h-[200px]">
          <div
            className="w-full max-w-lg"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--border) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            {children}
          </div>
        </div>
      ) : (
        <div className="[&>div]:my-0 [&>div]:border-0 [&>div]:rounded-none">
          <CodeBlock code={code} filename={filename} />
        </div>
      )}
    </div>
  );
}
