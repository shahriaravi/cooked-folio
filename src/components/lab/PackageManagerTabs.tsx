"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { play } from "cuelume";
import { SiNpm, SiPnpm, SiYarn, SiBun } from "react-icons/si";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

interface PackageManagerTabsProps {
  type: "install" | "dlx";
  packages: string;
}

const managers: { id: PackageManager; label: string; icon: any }[] = [
  { id: "npm", label: "npm", icon: SiNpm },
  { id: "pnpm", label: "pnpm", icon: SiPnpm },
  { id: "yarn", label: "yarn", icon: SiYarn },
  { id: "bun", label: "bun", icon: SiBun },
];

function buildCommand(
  manager: PackageManager,
  type: "install" | "dlx",
  packages: string
): string {
  if (type === "dlx") {
    switch (manager) {
      case "npm":
        return `npx ${packages}`;
      case "pnpm":
        return `pnpm dlx ${packages}`;
      case "yarn":
        return `yarn dlx ${packages}`;
      case "bun":
        return `bunx ${packages}`;
    }
  }

  switch (manager) {
    case "npm":
      return `npm install ${packages}`;
    case "pnpm":
      return `pnpm add ${packages}`;
    case "yarn":
      return `yarn add ${packages}`;
    case "bun":
      return `bun add ${packages}`;
  }
}

export function PackageManagerTabs({ type, packages }: PackageManagerTabsProps) {
  const [manager, setManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const command = buildCommand(manager, type, packages);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      play("success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      play("error");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1 rounded-t-xl border border-b-0 border-border/60 bg-secondary/30 px-2 py-1.5">
        {managers.map((m) => {
          const Icon = m.icon;
          const isActive = manager === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setManager(m.id);
                play("press");
              }}
              data-cuelume-hover="tick"
              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono uppercase tracking-[0.1em] transition-colors ${
                isActive
                  ? "bg-card text-foreground"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              }`}
              style={{ fontSize: "11px", lineHeight: "1" }}
            >
              <Icon className="h-[11px] w-[11px]" />
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <button
          onClick={handleCopy}
          data-cuelume-hover="tick"
          data-cuelume-press
          aria-label="Copy command"
          className="absolute right-3 top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors hover:text-foreground"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
        <pre className="overflow-x-auto rounded-b-xl border border-border/60 bg-card p-4 pr-12 font-mono text-[13px] leading-[22px]">
          <code>{command}</code>
        </pre>
      </div>
    </div>
  );
}