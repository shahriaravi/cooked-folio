"use client";

import { play } from "cuelume";
import { cn } from "@/lib/utils";

interface MultiSelectControlProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
}

export function MultiSelectControl({
  label,
  value,
  onChange,
  options,
}: MultiSelectControlProps) {
  const toggle = (optionValue: string) => {
    play("press");
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="col-span-full flex min-h-11 flex-wrap items-center justify-between gap-3 rounded-md border border-border/40 bg-card px-3 py-2">
      <label
        className="shrink-0 text-foreground/80"
        style={{ fontSize: "13px", lineHeight: "1", letterSpacing: "0.1px" }}
      >
        {label}
      </label>

      <div className="flex flex-wrap items-center gap-1.5">
        {options.map((option) => {
          const isActive = value.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggle(option.value)}
              data-cuelume-hover="tick"
              className={cn(
                "rounded-sm px-2 py-1 font-mono transition-colors",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "bg-background/60 text-muted-foreground hover:text-foreground"
              )}
              style={{ fontSize: "11px", lineHeight: "1" }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}