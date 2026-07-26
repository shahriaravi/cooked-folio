"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { play } from "cuelume";
import { SiPnpm, SiYarn, SiBun } from "react-icons/si";

type PackageManager = "shadcn" | "npm" | "pnpm" | "yarn" | "bun";

interface PackageManagerTabsProps {
  type: "install" | "dlx";
  packages: string;
}

function ShadcnIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      aria-hidden="true"
    >
      <rect width="256" height="256" fill="none" />
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
}

function NpmIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#CB3837"
        d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
      />
    </svg>
  );
}

const managers: {
  id: PackageManager;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "shadcn",
    label: "shadcn",
    icon: <ShadcnIcon className="h-[11px] w-[11px]" />,
  },
  {
    id: "pnpm",
    label: "pnpm",
    icon: <SiPnpm className="h-[11px] w-[11px] text-[#F69220]" />,
  },
  {
    id: "npm",
    label: "npm",
    icon: <NpmIcon className="h-[11px] w-[11px]" />,
  },
  {
    id: "yarn",
    label: "yarn",
    icon: <SiYarn className="h-[11px] w-[11px] text-[#2C8EBB]" />,
  },
  {
    id: "bun",
    label: "bun",
    icon: <SiBun className="h-[11px] w-[11px] text-[#FBF0DF]" />,
  },
];

function buildCommand(
  manager: PackageManager,
  type: "install" | "dlx",
  packages: string
): string {
  if (type === "dlx") {
    switch (manager) {
      case "shadcn":
        return `shadcn ${packages.replace(/^shadcn@?[\w.]*\s+/, "")}`;
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
    case "shadcn":
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

export function PackageManagerTabs({
  type,
  packages,
}: PackageManagerTabsProps) {
  const [manager, setManager] = useState<PackageManager>(
    type === "dlx" ? "shadcn" : "npm"
  );
  const [copied, setCopied] = useState(false);

  const command = buildCommand(manager, type, packages);
  const visibleManagers = type === "install"
    ? managers.filter((m) => m.id !== "shadcn")
    : managers;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      play("press");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      play("error");
    }
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex items-center justify-between border-b border-border/60 bg-secondary/30 px-2 py-1.5">
        <div className="flex items-center gap-1 overflow-x-auto">
          {visibleManagers.map((m) => {
            const isActive = manager === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setManager(m.id);
                  play("press");
                }}
                data-cuelume-hover="tick"
                className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono lowercase tracking-[0.02em] transition-colors ${
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground/70 hover:text-foreground"
                }`}
                style={{ fontSize: "12px", lineHeight: "1" }}
              >
                {m.icon}
                <span className={isActive ? "font-semibold" : ""}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCopy}
          data-cuelume-hover="tick"
          data-cuelume-press
          aria-label="Copy command"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono uppercase tracking-[0.12em] text-muted-foreground/70 transition-colors hover:text-foreground"
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" strokeWidth={2.5} />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" strokeWidth={2.5} />
              Copy
            </>
          )}
        </button>
      </div>

      <div
        className="overflow-x-auto px-4 py-3"
        style={{ maxWidth: "100%" }}
      >
        <pre
          className="font-mono text-[13px] leading-[22px]"
          style={{ margin: 0 }}
        >
          <code>
            <span className="mr-2 text-muted-foreground/60">$</span>
            <span className="text-emerald-500 dark:text-emerald-300">{command}</span>
          </code>
        </pre>
      </div>
    </div>
  );
}