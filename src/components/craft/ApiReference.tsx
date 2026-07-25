"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { play } from "cuelume";

interface ApiProp {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description?: string;
}

interface ApiReferenceProps {
  componentName: string;
  props: ApiProp[];
}

function highlightType(type: string): string {
  if (type === "string") return "text-emerald-400";
  if (type === "number") return "text-amber-400";
  if (type === "boolean") return "text-pink-400";
  if (type === "function") return "text-blue-400";
  return "text-cyan-400";
}

export function ApiReference({ componentName, props }: ApiReferenceProps) {
  const [openRows, setOpenRows] = useState<Set<string>>(new Set());

  if (props.length === 0) return null;

  const toggleRow = (name: string) => {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
    play("press");
  };

  return (
    <section className="mb-12">
      <h2
        className="mb-5 font-semibold text-foreground"
        style={{
          fontSize: "22px",
          lineHeight: "28px",
          letterSpacing: "-0.01em",
        }}
      >
        API Reference
      </h2>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <div className="border-b border-border/60 bg-secondary/30 px-4 py-3">
          <span
            className="font-mono font-semibold text-foreground"
            style={{ fontSize: "13px", lineHeight: "1" }}
          >
            {componentName}
          </span>
        </div>

        <div
          className="grid grid-cols-[1fr_2fr_auto] items-center gap-4 border-b border-border/40 bg-secondary/10 px-4 py-2.5"
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          <span className="font-mono uppercase tracking-[0.12em] text-muted-foreground">
            Prop
          </span>
          <span className="font-mono uppercase tracking-[0.12em] text-muted-foreground">
            Type
          </span>
          <span className="w-4" />
        </div>

        {props.map((prop) => {
          const isOpen = openRows.has(prop.name);
          const optional = !prop.required;
          const hasDetails = prop.description || prop.defaultValue;

          return (
            <div
              key={prop.name}
              className="border-b border-border/40 last:border-b-0"
            >
              <button
                onClick={() => hasDetails && toggleRow(prop.name)}
                data-cuelume-hover={hasDetails ? "tick" : undefined}
                disabled={!hasDetails}
                className={cn(
                  "grid w-full grid-cols-[1fr_2fr_auto] items-center gap-4 px-4 py-3 text-left transition-colors",
                  hasDetails && "hover:bg-secondary/20"
                )}
              >
                <span
                  className="truncate font-mono text-foreground"
                  style={{ fontSize: "13px", lineHeight: "20px" }}
                >
                  {prop.name}
                  {optional && (
                    <span className="text-muted-foreground/60">?</span>
                  )}
                </span>

                <span
                  className={cn(
                    "font-mono",
                    highlightType(prop.type)
                  )}
                  style={{ fontSize: "13px", lineHeight: "20px" }}
                >
                  {prop.type}
                </span>

                {hasDetails ? (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground/60 transition-transform",
                      isOpen && "rotate-180"
                    )}
                    strokeWidth={2}
                  />
                ) : (
                  <span className="w-4" />
                )}
              </button>

              {isOpen && hasDetails && (
                <div className="border-t border-border/40 bg-secondary/10 px-4 py-3">
                  {prop.defaultValue && (
                    <div className="mb-2 flex gap-2">
                      <span
                        className="font-mono uppercase tracking-[0.1em] text-muted-foreground/70"
                        style={{ fontSize: "10px", lineHeight: "18px" }}
                      >
                        default
                      </span>
                      <code
                        className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-foreground"
                        style={{ fontSize: "12px" }}
                      >
                        {prop.defaultValue}
                      </code>
                    </div>
                  )}
                  {prop.description && (
                    <p
                      className="text-foreground/85"
                      style={{
                        fontSize: "13px",
                        lineHeight: "20px",
                        letterSpacing: "0.1px",
                      }}
                    >
                      {prop.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}