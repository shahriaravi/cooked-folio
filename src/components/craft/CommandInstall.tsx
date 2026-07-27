"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PackageManagerTabs } from "./PackageManagerTabs";

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

      <div className="mt-6 self-start">
        <Button
          variant="chip"
          size="xs"
          iconLeft={
            <ChevronDown
              className={`transition-transform duration-200 motion-reduce:transition-none ${
                showSetup ? "rotate-180" : ""
              }`}
              strokeWidth={2.5}
            />
          }
          onClick={() => setShowSetup((prev) => !prev)}
          aria-expanded={showSetup}
          aria-controls="yoavi-setup-panel"
          className={
            showSetup
              ? "border-primary/40 bg-primary/[0.08] text-foreground hover:border-primary/50 hover:bg-primary/[0.1]"
              : ""
          }
        >
          First time using @yoavi?
        </Button>
      </div>

      {showSetup && (
        <div
          id="yoavi-setup-panel"
          role="region"
          aria-label="Setup instructions"
          className="mt-3 rounded-2xl border border-border/40 bg-secondary/20 p-4"
        >
          <p
            className="mb-3 text-pretty text-muted-foreground"
            style={{
              fontSize: "13px",
              lineHeight: "20px",
              letterSpacing: "0.1px",
            }}
          >
            Add this to your project&apos;s{" "}
            <code className="whitespace-nowrap rounded-[6px] bg-secondary/60 px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              components.json
            </code>
            :
          </p>

          <pre
            className="overflow-x-auto rounded-xl border border-border/60 bg-card p-4 font-mono text-[12px] leading-[18px]"
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