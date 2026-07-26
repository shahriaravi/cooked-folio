"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { play } from "cuelume";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
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
  );
}