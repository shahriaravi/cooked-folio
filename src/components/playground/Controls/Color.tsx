"use client";

import { useId } from "react";

interface ColorControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorControl({ label, value, onChange }: ColorControlProps) {
  const id = useId();
  const swatchId = `${id}-swatch`;
  const hexId = `${id}-hex`;

  return (
    <div className="group/row flex min-h-[44px] items-center justify-between gap-4 rounded-xl px-3.5 py-2 transition-colors duration-150 hover:bg-foreground/[0.02]">
      <label
        htmlFor={hexId}
        className="min-w-0 shrink-0 select-none truncate text-foreground/85"
        style={{
          fontSize: "13px",
          lineHeight: "18px",
          letterSpacing: "0.1px",
        }}
      >
        {label}
      </label>

      <div className="flex shrink-0 items-center gap-2">
        <label
          htmlFor={swatchId}
          className="relative block h-6 w-6 shrink-0 cursor-pointer overflow-hidden rounded-md outline-none transition-transform duration-150 hover:scale-105 focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-background motion-reduce:transition-none motion-reduce:hover:scale-100"
          style={{
            boxShadow: "inset 0 0 0 1px hsl(var(--foreground) / 0.15)",
          }}
          aria-label={`${label} color picker`}
        >
          <input
            id={swatchId}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={`${label} color value`}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: value }}
            aria-hidden="true"
          />
        </label>

        <input
          id={hexId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          aria-label={`${label} hex value`}
          className="w-[80px] rounded-lg bg-foreground/[0.04] px-2 py-1.5 text-center font-mono uppercase tabular-nums text-foreground outline-none transition-all duration-150 hover:bg-foreground/[0.08] focus:bg-foreground/[0.08] focus:ring-2 focus:ring-primary/30 motion-reduce:transition-none"
          style={{ fontSize: "10px", lineHeight: "18px" }}
        />
      </div>
    </div>
  );
}