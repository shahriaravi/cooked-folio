"use client";

import { play } from "cuelume";

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
}: SliderControlProps) {
  const tickCount = 10;

  return (
    <div className="flex h-11 items-center gap-3 rounded-md border border-border/40 bg-card px-3">
      <label
        className="shrink-0 text-foreground/80"
        style={{
          fontSize: "13px",
          lineHeight: "1",
          letterSpacing: "0.1px",
        }}
      >
        {label}
      </label>

      <div className="relative flex flex-1 items-center rounded-full bg-background/50 px-3 py-1.5">
        <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
          {Array.from({ length: tickCount }).map((_, i) => (
            <span key={i} className="h-2 w-px bg-muted-foreground/30" />
          ))}
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseUp={() => play("press")}
          className="playground-slider relative z-10 h-4 w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>

      <span
        className="shrink-0 text-right font-mono text-foreground tabular-nums"
        style={{ fontSize: "12px", lineHeight: "1", minWidth: "40px" }}
      >
        {value}
        {unit}
      </span>
    </div>
  );
}