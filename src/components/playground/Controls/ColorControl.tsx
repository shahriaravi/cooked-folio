"use client";

interface ColorControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorControl({ label, value, onChange }: ColorControlProps) {
  return (
    <div className="flex h-11 items-center justify-between gap-3 overflow-hidden rounded-md border border-border/40 bg-card px-3">
      <span
        className="shrink-0 text-foreground/80"
        style={{ fontSize: "13px", lineHeight: "1", letterSpacing: "0.1px" }}
      >
        {label}
      </span>

      <div className="flex shrink-0 items-center gap-2">
        <label className="relative block h-5 w-5 shrink-0 cursor-pointer overflow-hidden rounded-sm border border-border/60">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: value }}
          />
        </label>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-[76px] rounded-sm bg-background/70 px-2 py-1 text-center font-mono text-foreground outline-none transition-colors focus:bg-background"
          style={{ fontSize: "11px", lineHeight: "1" }}
        />
      </div>
    </div>
  );
}