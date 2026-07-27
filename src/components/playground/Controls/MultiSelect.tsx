"use client";

import { play } from "cuelume";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useId } from "react";

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
  const id = useId();

  const toggle = (optionValue: string) => {
    play("press");
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div
      role="group"
      aria-labelledby={id}
      className="group/row flex flex-col gap-2.5 rounded-xl px-3.5 py-3 transition-colors duration-150 hover:bg-foreground/[0.02]"
    >
      <div className="flex items-center justify-between gap-4">
        <span
          id={id}
          className="min-w-0 select-none truncate text-foreground/85"
          style={{
            fontSize: "13px",
            lineHeight: "18px",
            letterSpacing: "0.1px",
          }}
        >
          {label}
        </span>

        {value.length > 0 && (
          <span
            className="shrink-0 font-mono tabular-nums text-foreground/50"
            style={{ fontSize: "10px", lineHeight: "1" }}
          >
            {value.length} selected
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const isActive = value.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              role="checkbox"
              aria-checked={isActive}
              onClick={() => toggle(option.value)}
              data-cuelume-hover="tick"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
                isActive
                  ? "bg-foreground/[0.08] text-foreground shadow-[inset_0_0_0_1px_hsl(var(--foreground)/0.1)]"
                  : "bg-foreground/[0.03] text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
              )}
              style={{ fontSize: "11px", lineHeight: "1" }}
            >
              {isActive && (
                <Check
                  className="h-3 w-3 shrink-0 text-foreground/70"
                  strokeWidth={2.75}
                />
              )}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}