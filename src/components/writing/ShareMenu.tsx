"use client";

import { cn } from "@/lib/utils";
import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiDiscord, SiFacebook, SiX } from "react-icons/si";
import { play } from "cuelume";

interface ShareMenuProps {
  title: string;
  slug: string;
}

export function ShareMenu({ title, slug }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/writing/${slug}`
      : `/writing/${slug}`;

  const shareText = `${title} — by @shahriaravi_`;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      play("press");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      play("error");
    }
  };

  const shareTargets = [
    {
      label: "X",
      icon: SiX,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Facebook",
      icon: SiFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      label: "Discord",
      icon: SiDiscord,
      onClick: handleCopy,
    },
  ];

  return (
    <div className="relative inline-flex" ref={menuRef}>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
          play("press");
        }}
        data-cuelume-hover="tick"
        data-cuelume-press
        aria-label="Share post"
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:text-foreground",
          open ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <Share2 className="h-3 w-3" strokeWidth={2.25} />
        share
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 flex items-center gap-1 rounded-xl border border-border/60 bg-card p-1.5 shadow-lg"
          role="menu"
        >
          {shareTargets.map((target) => {
            const Icon = target.icon;
            const commonClass =
              "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground";

            if (target.onClick) {
              return (
                <button
                  key={target.label}
                  onClick={target.onClick}
                  data-cuelume-hover="tick"
                  data-cuelume-press
                  aria-label={`Copy link to share on ${target.label}`}
                  className={commonClass}
                >
                  <Icon className="h-[15px] w-[15px]" />
                </button>
              );
            }

            return (
              <a
                key={target.label}
                href={target.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cuelume-hover="tick"
                data-cuelume-press
                aria-label={`Share on ${target.label}`}
                className={commonClass}
              >
                <Icon className="h-[15px] w-[15px]" />
              </a>
            );
          })}

          <div className="mx-1 h-5 w-px bg-border/60" />

          <button
            onClick={handleCopy}
            data-cuelume-hover="tick"
            data-cuelume-press
            aria-label="Copy link"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
          >
            {copied ? (
              <Check className="h-[15px] w-[15px] text-emerald-400" />
            ) : (
              <Copy className="h-[15px] w-[15px]" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}