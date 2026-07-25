"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PackageManagerTabs } from "./PackageManagerTabs";
import { play } from "cuelume";

interface CommandInstallProps {
  componentName: string;
}

export function CommandInstall({ componentName }: CommandInstallProps) {
  const [showSetup, setShowSetup] = useState(false);

  const slug = componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  return (
    <div className="flex flex-col">
      <PackageManagerTabs
        type="dlx"
        packages={`shadcn@latest add @yoavi/${slug}`}
      />

      <button
        onClick={() => {
          setShowSetup((prev) => !prev);
          play("press");
        }}
        data-cuelume-hover="tick"
        className={`mt-6 inline-flex items-center gap-1.5 self-start rounded-md border px-2.5 py-1.5 font-mono uppercase tracking-[0.12em] transition-colors ${
          showSetup
            ? "border-primary/40 bg-primary/[0.08] text-foreground"
            : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:bg-primary/[0.04] hover:text-foreground"
        }`}
        style={{ fontSize: "11px", lineHeight: "1" }}
      >
        <ChevronDown
          className={`h-3 w-3 transition-transform ${
            showSetup ? "rotate-180" : ""
          }`}
          strokeWidth={2.5}
        />
        First time using @yoavi?
      </button>

      {showSetup && (
        <div className="mt-3 rounded-xl border border-border/40 bg-secondary/20 p-4">
          <p
            className="mb-3 text-muted-foreground"
            style={{
              fontSize: "13px",
              lineHeight: "20px",
              letterSpacing: "0.1px",
            }}
          >
            Add this to your project&apos;s{" "}
            <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              components.json
            </code>
            :
          </p>

          <pre
            className="overflow-x-auto rounded-lg border border-border/60 bg-card p-3 font-mono text-[12px] leading-[18px]"
            style={{ maxWidth: "100%" }}
          >
            <code>{`{
  "registries": {
    "@yoavi": "https://shahriaravi.me/r/{name}.json"
  }
}`}</code>
          </pre>
        </div>
      )}
    </div>
  );
}