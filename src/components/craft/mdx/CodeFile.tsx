"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { play } from "cuelume";

interface CodeFileProps {
  filename: string;
  language?: string;
  children: string;
}

export function CodeFile({
  filename,
  language = "ts",
  children,
}: CodeFileProps) {
  const [copied, setCopied] = useState(false);
  const code = typeof children === "string" ? children.trim() : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      play("press");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      play("error");
    }
  };

  return (
    <div className="mb-6">
      <div
        className="flex items-center gap-2 rounded-t-xl border border-b-0 border-border/60 bg-secondary/30 px-3 py-2"
        style={{ fontSize: "11px", lineHeight: "1" }}
      >
        <span className="font-mono uppercase tracking-[0.1em] text-muted-foreground/60">
          {language}
        </span>
        <span className="font-mono text-muted-foreground">{filename}</span>
      </div>

      <div className="relative">
        <button
          onClick={handleCopy}
          data-cuelume-hover="tick"
          data-cuelume-press
          aria-label="Copy code"
          className="absolute right-3 top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors hover:text-foreground"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
        <pre className="max-h-[400px] overflow-auto rounded-b-xl border border-border/60 bg-card p-4 pr-12 font-mono text-[13px] leading-[22px]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}