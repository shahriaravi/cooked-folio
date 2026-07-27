"use client";

import type { CraftMeta } from "@/lib/craft";
import { useRouter } from "next/navigation";
import { getRegistryComponent } from "./registry";

interface CraftListProps {
  components: CraftMeta[];
}

export function CraftList({ components }: CraftListProps) {
  const router = useRouter();

  if (components.length === 0) {
    return (
      <p
        className="text-pretty text-muted-foreground"
        style={{ fontSize: "15px", lineHeight: "22px" }}
      >
        No components yet. Come back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {components.map((component) => {
        const Component = getRegistryComponent(component.component);
        return (
          <a
            key={component.slug}
            href={`/craft/${component.slug}`}
            onClick={(e) => {
              e.preventDefault();
              router.push(`/craft/${component.slug}`);
            }}
            data-cuelume-hover="tick"
            data-cuelume-press
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-colors hover:border-primary/40"
          >
            <div className="flex h-[170px] items-center justify-center overflow-hidden bg-background/60 p-3">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md">
                {Component ? (
                  <Component />
                ) : (
                  <span
                    className="font-mono uppercase tracking-[0.14em] text-muted-foreground/40"
                    style={{ fontSize: "10px", lineHeight: "1" }}
                  >
                    preview unavailable
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-border/40 px-4 py-3">
              <span
                className="block truncate text-balance font-semibold text-foreground transition-colors group-hover:text-primary"
                style={{
                  fontSize: "13px",
                  lineHeight: "18px",
                  letterSpacing: "0.1px",
                }}
              >
                {component.title}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}