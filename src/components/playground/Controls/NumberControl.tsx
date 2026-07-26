"use client";

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
  return (
    <div className="flex h-11 items-center justify-between gap-3 rounded-md border border-border/40 bg-card px-3">
      <label
        className="shrink-0 text-foreground/80"
        style={{ fontSize: "13px", lineHeight: "1", letterSpacing: "0.1px" }}
      >
        {label}
      </label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 rounded-full bg-background/60 px-3.5 py-2 text-right font-mono text-foreground outline-none ring-1 ring-inset ring-border/40 transition-all hover:ring-border/60 focus:bg-background focus:ring-primary/40"
        style={{ fontSize: "12px", lineHeight: "1" }}
      />
    </div>
  );
}