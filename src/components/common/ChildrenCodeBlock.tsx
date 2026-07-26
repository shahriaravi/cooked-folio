"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { play } from "cuelume";

interface ChildrenCodeBlockProps {
  children: React.ReactNode;
}

export function ChildrenCodeBlock({ children }: ChildrenCodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!preRef.current) return;
    const text = preRef.current.innerText;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      play("press");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      play("error");
    }
  };

  return (
    <div className="relative mb-6">
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

      <pre
        ref={preRef}
        className="code-block overflow-x-auto rounded-xl border border-border/60 p-4 pr-12 font-mono text-[13.5px] leading-[22px]"
      >
        {children}
      </pre>
    </div>
  );
}