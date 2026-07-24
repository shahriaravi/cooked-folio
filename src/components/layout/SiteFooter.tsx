"use client";

import { Copyright } from "lucide-react";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

export function SiteFooter() {
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
            className="group inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.12em] text-muted-foreground/80 transition-colors hover:text-foreground"
            style={{ fontSize: "11px", lineHeight: "1" }}
          >
            <span>star on github</span>
            <SiGithub className="h-3 w-3 transition-colors group-hover:text-primary" />
          </Link>
        </footer>
      </div>
    </div>
  );
}