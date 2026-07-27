"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

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
  const id = useId();
  const [focused, setFocused] = useState(false);

  return (
    <div className="group/row flex min-h-[44px] items-center justify-between gap-4 rounded-xl px-3.5 py-2 transition-colors duration-150 hover:bg-foreground/[0.02]">
      <label
        htmlFor={id}
        className="min-w-0 shrink-0 select-none truncate text-foreground/85"
        style={{
          fontSize: "13px",
          lineHeight: "18px",
          letterSpacing: "0.1px",
          maxWidth: "40%",
        }}
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={cn(
          "w-full min-w-0 flex-1 rounded-lg bg-foreground/[0.04] px-2.5 py-1.5 text-right font-mono text-foreground outline-none transition-all duration-150 placeholder:text-muted-foreground/40 hover:bg-foreground/[0.08] focus:bg-foreground/[0.08] focus:ring-2 focus:ring-primary/30 motion-reduce:transition-none",
          focused && "text-left"
        )}
        style={{
          fontSize: "12px",
          lineHeight: "18px",
          maxWidth: "60%",
        }}
      />
    </div>
  );
}