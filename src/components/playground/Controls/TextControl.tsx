"use client";

interface TextControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextControl({
  label,
  value,
  onChange,
  placeholder,
}: TextControlProps) {
  return (
    <div className="flex h-11 items-center justify-between gap-3 rounded-md border border-border/40 bg-card px-3">
      <label
        className="shrink-0 text-foreground/80"
        style={{ fontSize: "13px", lineHeight: "1", letterSpacing: "0.1px" }}
      >
        {label}
      </label>

      <div className="flex flex-1 justify-end">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full max-w-[160px] rounded-full bg-background/60 px-3.5 py-2 text-right font-mono text-foreground outline-none ring-1 ring-inset ring-border/40 transition-all placeholder:text-muted-foreground/40 hover:ring-border/60 focus:bg-background focus:ring-primary/40"
          style={{ fontSize: "12px", lineHeight: "1" }}
        />
      </div>
    </div>
  );
}