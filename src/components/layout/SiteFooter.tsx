"use client";

import { Copyright } from "lucide-react";
import Link from "next/link";
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
        <footer className="flex items-center justify-between gap-4 pb-8">
          <span
            className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.12em] text-muted-foreground/80"
            style={{ fontSize: "11px", lineHeight: "1" }}
          >
            <Copyright className="h-3 w-3" strokeWidth={2.25} />
            2026 / avi
          </span>

          <Link
            href="https://github.com/shahriaravi/cooked-folio"
            target="_blank"
            rel="noopener noreferrer"
            data-cuelume-hover="tick"
            data-cuelume-press
            className="group inline-flex items-center gap-2 rounded-md border border-border/60 bg-card px-2.5 py-1.5 font-mono uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/[0.04] hover:text-foreground"
            style={{ fontSize: "11px", lineHeight: "1" }}
          >
            <SiGithub className="h-3.5 w-3.5 text-foreground transition-colors group-hover:text-primary" />
            <span className="font-semibold text-foreground">star on github</span>
            {stars !== null && stars > 0 && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="tabular-nums text-foreground">
                  {formatStars(stars)}
                </span>
              </>
            )}
          </Link>
        </footer>
      </div>
    </div>
  );
}