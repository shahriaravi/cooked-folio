"use client";

import ThemeToggle from "@/components/common/ThemeToggle";
import TimeDisplay from "@/components/ui/TimeDisplay";
import { CornerDownLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/writing", label: "/writing" },
  { href: "/contact", label: "/contact" },
];

function getBackHref(pathname: string): string {
  if (pathname.startsWith("/writing/") && pathname !== "/writing") {
    return "/writing";
  }
  return "/";
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="mb-14 flex items-center justify-between gap-4">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {pathname === "/" ? (
          <TimeDisplay />
        ) : (
          <button
            onClick={() => router.push(getBackHref(pathname))}
            data-cuelume-hover="tick"
            data-cuelume-press
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <CornerDownLeft className="h-3 w-3" strokeWidth={2.25} />
            <span>back</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                router.push(link.href);
              }}
              data-cuelume-hover="tick"
              data-cuelume-press
              className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-foreground ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          );
        })}
        <ThemeToggle data-cuelume-hover="tick" data-cuelume-press />
      </div>
    </nav>
  );
}
