"use client";

import { playgroundRegistry } from "@/components/playground/registry";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function PlaygroundList() {
  const router = useRouter();
  const featured = playgroundRegistry.slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        playground
      </h2>

      <p
        className="mb-8 text-muted-foreground"
        style={{
          fontSize: "14px",
          lineHeight: "22px",
          letterSpacing: "0.1px",
        }}
      >
        Interactive components. Tweak controls, watch them change live.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {featured.map((config) => {
          const { Component } = config;
          const defaultProps = Object.fromEntries(
            config.controls.map((c) => [c.key, c.default])
          );

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
                <Component {...defaultProps} />
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

      <div className="mt-5 flex justify-center">
        <a
          href="/playground"
          onClick={(e) => {
            e.preventDefault();
            router.push("/playground");
          }}
          data-cuelume-hover="tick"
          data-cuelume-press
          className="group inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          <span>See more</span>
          
        </a>
      </div>
    </section>
  );
}