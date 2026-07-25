"use client";

import type { LabMeta } from "@/lib/lab";
import { useRouter } from "next/navigation";
import { getRegistryComponent } from "./registry";

interface LabListProps {
  components: LabMeta[];
}

export function LabList({ components }: LabListProps) {
  const router = useRouter();

  if (components.length === 0) {
    return (
      <p
        className="text-muted-foreground"
        style={{ fontSize: "15px", lineHeight: "22px" }}
      >
        No components yet. Come back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {components.map((component) => {
        const Component = getRegistryComponent(component.component);
        return (
          <a
            key={component.slug}
            href={`/lab/${component.slug}`}
            onClick={(e) => {
              e.preventDefault();
              router.push(`/lab/${component.slug}`);
            }}
            data-cuelume-hover="tick"
            data-cuelume-press
            className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-primary/40"
          >
            <div className="flex min-h-[180px] items-center justify-center overflow-hidden bg-background/40 p-6">
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

            <div className="border-t border-border/40 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="truncate font-semibold text-foreground transition-colors group-hover:text-primary"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.1px",
                  }}
                >
                  {component.title}
                </span>

                <span
                  className="font-mono uppercase tracking-[0.12em] text-muted-foreground/60"
                  style={{ fontSize: "10px", lineHeight: "1" }}
                >
                  {component.dependencies.length > 0
                    ? `${component.dependencies.length} dep${
                        component.dependencies.length > 1 ? "s" : ""
                      }`
                    : "no deps"}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}