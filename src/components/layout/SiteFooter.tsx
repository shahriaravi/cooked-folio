"use client";

import { Button } from "@/components/ui/Button";
import { Copyright } from "lucide-react";
import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";

function formatStars(count: number): string {
  if (count >= 1000) {
    const k = count / 1000;
    return `${k.toFixed(1)}k`;
  }
  return count.toString();
}

export function SiteFooter() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch("/api/github/stars");
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        setStars(data.stars ?? 0);
      } catch {
        setStars(0);
      }
    };
    fetchStars();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[44rem] px-6">
      <div className="border-t border-border/40 pt-6">
        <footer
          aria-label="Site footer"
          className="flex flex-wrap items-center justify-between gap-4 pb-8"
        >
          <span
            className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono uppercase tracking-[0.12em] text-muted-foreground/80"
            style={{ fontSize: "11px", lineHeight: "1" }}
          >
            <Copyright
              className="h-3 w-3"
              strokeWidth={2.25}
              aria-hidden="true"
            />
            <span>2026 / avi</span>
          </span>

          <Button
            variant="outline"
            size="xs"
            href="https://github.com/shahriaravi/cooked-folio"
            ariaLabel={
              stars !== null && stars > 0
                ? `Star on GitHub — ${formatStars(stars)} stars — opens in new tab`
                : "Star on GitHub — opens in new tab"
            }
            iconLeft={
              <SiGithub className="text-foreground transition-colors duration-200 group-hover/btn:text-primary motion-reduce:transition-none" />
            }
            className="font-mono uppercase tracking-[0.12em] !bg-card"
          >
            <span className="!text-foreground">star on github</span>
            {stars !== null && stars > 0 && (
              <>
                <span
                  className="text-muted-foreground/40"
                  aria-hidden="true"
                >
                  ·
                </span>
                <span
                  className="tabular-nums !text-foreground"
                  aria-hidden="true"
                >
                  {formatStars(stars)}
                </span>
              </>
            )}
          </Button>
        </footer>
      </div>
    </div>
  );
}