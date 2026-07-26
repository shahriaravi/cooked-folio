"use client";

import { play } from "cuelume";
import { cn } from "@/lib/utils";

interface ToggleControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleControl({ label, value, onChange }: ToggleControlProps) {
  const handleToggle = () => {
    play("press");
    onChange(!value);
  };

  return (
    <div className="flex h-11 items-center justify-between gap-3 rounded-md border border-border/40 bg-card px-3">
      <label
        className="shrink-0 text-foreground/80"
        style={{ fontSize: "13px", lineHeight: "1", letterSpacing: "0.1px" }}
      >
        {label}
      </label>

      <button
        onClick={handleToggle}
        data-cuelume-hover="tick"
        aria-label={`Toggle ${label}`}
        className={cn(
          "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
          value ? "bg-primary" : "bg-muted-foreground/30"
        )}
      >
        <span
          className={cn(
            "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform",
            value ? "translate-x-[18px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}