"use client";

import { play } from "cuelume";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface ToggleControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleControl({ label, value, onChange }: ToggleControlProps) {
  const id = useId();

  const handleToggle = () => {
    play("press");
    onChange(!value);
  };

  return (
    <div className="group/row flex min-h-[44px] items-center justify-between gap-4 rounded-xl px-3.5 py-2 transition-colors duration-150 hover:bg-foreground/[0.02]">
      <label
        htmlFor={id}
        className="min-w-0 cursor-pointer select-none truncate text-foreground/85"
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
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={`Toggle ${label}`}
        onClick={handleToggle}
        data-cuelume-hover="tick"
        className={cn(
          "relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
          value
            ? "bg-foreground/90 shadow-[inset_0_0_0_1px_hsl(var(--foreground)/0.1)]"
            : "bg-foreground/10 shadow-[inset_0_0_0_1px_hsl(var(--foreground)/0.06),inset_0_1px_2px_rgba(0,0,0,0.05)]"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-background shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out motion-reduce:transition-none",
            value ? "translate-x-[19px]" : "translate-x-[3px]"
          )}
        />
      </button>
    </div>
  );
}