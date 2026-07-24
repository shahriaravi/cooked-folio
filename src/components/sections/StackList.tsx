"use client";

import { STACK } from "@/lib/config";
import LogoLoop from "@/components/ui/LogoLoop";

export function StackList() {
  const items = STACK.map((tech) => {
    const Icon = tech.icon;
    return {
      node: <Icon style={{ color: tech.color }} />,
      title: tech.name,
    };
  });

  return (
    <section className="mb-16 w-full">
      <h2 className="mb-6 pl-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pl-0">
        stack
      </h2>

      <div
        className="md:hidden"
        style={{ height: "56px", position: "relative", overflow: "hidden" }}
      >
        <LogoLoop
          logos={items}
          speed={50}
          direction="left"
          logoHeight={32}
          gap={40}
          fadeOut
          fadeOutColor="hsl(var(--background))"
          hoverSpeed={0}
          ariaLabel="Tech stack"
        />
      </div>

      <div className="hidden md:flex flex-wrap items-center gap-x-8 gap-y-6">
        {STACK.map((tech) => {
          const Icon = tech.icon;
          return (
            <div key={tech.name} className="group relative flex items-center justify-center">
              <Icon
                className="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
                style={{ color: tech.color }}
              />
              <span
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}