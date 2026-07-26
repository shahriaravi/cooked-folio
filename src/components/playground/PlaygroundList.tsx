"use client";

import type { PlaygroundConfig } from "./types";
import { useRouter } from "next/navigation";

interface PlaygroundListProps {
  configs: PlaygroundConfig[];
}

export function PlaygroundList({ configs }: PlaygroundListProps) {
  const router = useRouter();

  if (configs.length === 0) {
    return (
      <p
        className="text-muted-foreground"
        style={{ fontSize: "15px", lineHeight: "22px" }}
      >
        No playgrounds yet. Come back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {configs.map((config) => {
        const { Component } = config;
        return (
          <a
            key={config.slug}
            href={`/playground/${config.slug}`}
            onClick={(e) => {
              e.preventDefault();
              router.push(`/playground/${config.slug}`);
            }}
            data-cuelume-hover="tick"
            data-cuelume-press
            className="group flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card transition-colors hover:border-primary/40"
          >
            <div className="flex h-[170px] items-center justify-center overflow-hidden bg-background/40 p-5">
              <Component
                {...Object.fromEntries(
                  config.controls.map((c) => [c.key, c.default])
                )}
              />
            </div>

            <div className="border-t border-border/40 px-3.5 py-2.5">
              <span
                className="truncate font-semibold text-foreground transition-colors group-hover:text-primary"
                style={{
                  fontSize: "13px",
                  lineHeight: "18px",
                  letterSpacing: "0.1px",
                }}
              >
                {config.title}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}