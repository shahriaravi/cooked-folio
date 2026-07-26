"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { play } from "cuelume";
import { cn } from "@/lib/utils";

interface SelectControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export function SelectControl({
  label,
  value,
  onChange,
  options,
}: SelectControlProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

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

  return (
    <div
      ref={menuRef}
      className="relative flex h-11 items-center justify-between gap-3 rounded-md border border-border/40 bg-card px-3"
    >
      <label
        className="shrink-0 text-foreground/80"
        style={{ fontSize: "13px", lineHeight: "1", letterSpacing: "0.1px" }}
      >
        {label}
      </label>

      <button
        onClick={() => {
          setOpen((prev) => !prev);
          play("press");
        }}
        data-cuelume-hover="tick"
        className="inline-flex items-center gap-1.5 rounded-full bg-background/60 px-3 py-1.5 font-mono text-foreground ring-1 ring-inset ring-border/40 transition-all hover:ring-border/60"
        style={{ fontSize: "12px", lineHeight: "1" }}
      >
        <span>{selectedOption?.label ?? "Select"}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-muted-foreground/60 transition-transform",
            open && "rotate-180"
          )}
          strokeWidth={2.25}
        />
      </button>

      {open && (
        <div
          className="absolute right-3 top-full z-50 mt-1.5 min-w-[140px] overflow-hidden rounded-lg border border-border/60 bg-card p-1 shadow-lg"
          role="menu"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  play("press");
                }}
                data-cuelume-hover="tick"
                role="menuitem"
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-2 text-left transition-colors",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
                )}
                style={{ fontSize: "12px", lineHeight: "1.2" }}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check className="h-3 w-3 shrink-0" strokeWidth={2.5} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}