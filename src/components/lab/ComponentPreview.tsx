"use client";

import { useState } from "react";
import { getRegistryComponent } from "./registry";
import { play } from "cuelume";

interface ComponentPreviewProps {
  componentName: string;
  codeBlock: React.ReactNode;
}

type Tab = "preview" | "code";

export function ComponentPreview({
  componentName,
  codeBlock,
}: ComponentPreviewProps) {
  const [tab, setTab] = useState<Tab>("preview");

  const Component = getRegistryComponent(componentName);

  return (
    <div className="mb-12">
      <div className="mb-3 flex items-center gap-5 border-b border-border/40 pb-2">
        <button
          onClick={() => {
            setTab("preview");
            play("press");
          }}
          data-cuelume-hover="tick"
          className={`font-mono uppercase tracking-[0.12em] transition-colors ${
            tab === "preview"
              ? "text-foreground"
              : "text-muted-foreground/60 hover:text-muted-foreground"
          }`}
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          preview
        </button>
        <button
          onClick={() => {
            setTab("code");
            play("press");
          }}
          data-cuelume-hover="tick"
          className={`font-mono uppercase tracking-[0.12em] transition-colors ${
            tab === "code"
              ? "text-foreground"
              : "text-muted-foreground/60 hover:text-muted-foreground"
          }`}
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          code
        </button>
      </div>

      {tab === "preview" ? (
        <div className="relative flex min-h-[240px] items-center justify-center rounded-xl border border-border/60 bg-card p-8">
          {Component ? (
            <Component />
          ) : (
            <span
              className="font-mono uppercase tracking-[0.14em] text-muted-foreground/50"
              style={{ fontSize: "11px", lineHeight: "1" }}
            >
              component not registered
            </span>
          )}
        </div>
      ) : (
        codeBlock
      )}
    </div>
  );
}