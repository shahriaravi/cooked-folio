"use client";

import { useId } from "react";

interface NumberControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: NumberControlProps) {
  const id = useId();

  return (
    <div className="group/row flex min-h-[44px] items-center justify-between gap-4 rounded-xl px-3.5 py-2 transition-colors duration-150 hover:bg-foreground/[0.02]">
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
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-[80px] shrink-0 rounded-lg bg-foreground/[0.04] px-2.5 py-1.5 text-right font-mono tabular-nums text-foreground outline-none transition-all duration-150 hover:bg-foreground/[0.08] focus:bg-foreground/[0.08] focus:ring-2 focus:ring-primary/30 motion-reduce:transition-none"
        style={{ fontSize: "12px", lineHeight: "18px" }}
      />
    </div>
  );
}