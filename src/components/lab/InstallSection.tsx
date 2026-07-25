"use client";

import { useState } from "react";
import { CommandInstall } from "./CommandInstall";
import { play } from "cuelume";

interface InstallSectionProps {
  componentName: string;
  manualContent: React.ReactNode;
}

type Tab = "command" | "manual";

export function InstallSection({
  componentName,
  manualContent,
}: InstallSectionProps) {
  const [tab, setTab] = useState<Tab>("command");

  return (
    <div className="mb-12">
      <h2
        className="mb-5 font-semibold text-foreground"
        style={{
          fontSize: "20px",
          lineHeight: "26px",
          letterSpacing: "-0.01em",
        }}
      >
        Installation
      </h2>

      <div className="mb-4 flex items-center gap-5 border-b border-border/40 pb-2">
        <button
          onClick={() => {
            setTab("command");
            play("press");
          }}
          data-cuelume-hover="tick"
          className={`font-mono uppercase tracking-[0.12em] transition-colors ${
            tab === "command"
              ? "text-foreground"
              : "text-muted-foreground/60 hover:text-muted-foreground"
          }`}
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          command
        </button>
        <button
          onClick={() => {
            setTab("manual");
            play("press");
          }}
          data-cuelume-hover="tick"
          className={`font-mono uppercase tracking-[0.12em] transition-colors ${
            tab === "manual"
              ? "text-foreground"
              : "text-muted-foreground/60 hover:text-muted-foreground"
          }`}
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          manual
        </button>
      </div>

      {tab === "command" ? (
        <CommandInstall componentName={componentName} />
      ) : (
        manualContent
      )}
    </div>
  );
}