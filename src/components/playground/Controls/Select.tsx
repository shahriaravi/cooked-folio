"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
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
  const id = useId();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedOption = options.find((o) => o.value === value);
  const selectedIndex = options.findIndex((o) => o.value === value);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    requestAnimationFrame(() => {
      const target = selectedIndex >= 0 ? selectedIndex : 0;
      itemRefs.current[target]?.focus();
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, selectedIndex]);

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % options.length;
      itemRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + options.length) % options.length;
      itemRefs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      itemRefs.current[options.length - 1]?.focus();
    }
  };

  return (
    <div
      ref={menuRef}
      className="group/row relative flex min-h-[44px] items-center justify-between gap-4 rounded-xl px-3.5 py-2 transition-colors duration-150 hover:bg-foreground/[0.02]"
    >
      <label
        htmlFor={id}
        className="min-w-0 select-none truncate text-foreground/85"
        style={{
          fontSize: "13px",
          lineHeight: "18px",
          letterSpacing: "0.1px",
        }}
      >
        {label}
      </label>

      <button
        id={id}
        ref={buttonRef}
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          play("press");
        }}
        data-cuelume-hover="tick"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${selectedOption?.label ?? "Select"}`}
        className={cn(
          "inline-flex min-w-[120px] max-w-[220px] shrink-0 items-center justify-between gap-2 rounded-lg bg-foreground/[0.04] px-2.5 py-1.5 font-medium text-foreground outline-none transition-all duration-150 hover:bg-foreground/[0.08] focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
          open && "bg-foreground/[0.08]"
        )}
        style={{ fontSize: "12px", lineHeight: "18px" }}
      >
        <span className="truncate">
          {selectedOption?.label ?? "Select"}
        </span>
        <ChevronsUpDown
          className="h-3 w-3 shrink-0 text-muted-foreground/60"
          strokeWidth={2.25}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute right-3.5 top-full z-50 mt-1.5 min-w-[180px] max-w-[280px] overflow-hidden rounded-xl border border-border/60 bg-popover p-1 shadow-[0_10px_38px_-10px_rgba(0,0,0,0.35),0_10px_20px_-15px_rgba(0,0,0,0.2)]"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  play("press");
                  buttonRef.current?.focus();
                }}
                onKeyDown={(e) => handleItemKeyDown(e, index)}
                data-cuelume-hover="tick"
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-left outline-none transition-colors duration-100 focus-visible:bg-foreground/[0.06] motion-reduce:transition-none",
                  isSelected
                    ? "bg-foreground/[0.06] text-foreground"
                    : "text-foreground/75 hover:bg-foreground/[0.04] hover:text-foreground"
                )}
                style={{ fontSize: "12px", lineHeight: "1.3" }}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check
                    className="h-3 w-3 shrink-0 text-foreground/60"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}