"use client";

import { STACK } from "@/lib/config";
import LogoLoop from "@/components/ui/LogoLoop";

export function StackList() {
  const half = Math.ceil(STACK.length / 2);
  const rowOne = STACK.slice(0, half).map((tech) => {
    const Icon = tech.icon;
    return {
      node: <Icon style={{ color: tech.color }} />,
      title: tech.name,
    };
  });
  const rowTwo = STACK.slice(half).map((tech) => {
    const Icon = tech.icon;
    return {
      node: <Icon style={{ color: tech.color }} />,
      title: tech.name,
    };
  });

  return (
    <section className="mb-16 w-full">
      <h2 className="text-sm font-mono text-muted-foreground mb-6 uppercase tracking-wider pl-1 md:pl-0">
        stack
      </h2>

      <div className="flex flex-col gap-6">
        <div style={{ height: "72px", position: "relative", overflow: "hidden" }}>
          <LogoLoop
            logos={rowOne}
            speed={50}
            direction="left"
            logoHeight={32}
            gap={56}
            fadeOut
            fadeOutColor="hsl(var(--background))"
            hoverSpeed={0}
            ariaLabel="Tech stack row one"
          />
        </div>
        <div style={{ height: "72px", position: "relative", overflow: "hidden" }}>
          <LogoLoop
            logos={rowTwo}
            speed={50}
            direction="right"
            logoHeight={32}
            gap={56}
            fadeOut
            fadeOutColor="hsl(var(--background))"
            hoverSpeed={0}
            ariaLabel="Tech stack row two"
          />
        </div>
      </div>
    </section>
  );
}