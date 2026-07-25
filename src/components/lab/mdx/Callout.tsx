"use client";

import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "tip" | "warning";
  children: React.ReactNode;
}

const config = {
  info: {
    icon: Info,
    className:
      "border-blue-500/20 bg-blue-500/[0.06] text-foreground/85",
    iconClass: "text-blue-400",
  },
  tip: {
    icon: Lightbulb,
    className:
      "border-emerald-500/20 bg-emerald-500/[0.06] text-foreground/85",
    iconClass: "text-emerald-400",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-amber-500/20 bg-amber-500/[0.06] text-foreground/85",
    iconClass: "text-amber-400",
  },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const { icon: Icon, className, iconClass } = config[type];

  return (
    <div
      className={cn(
        "mb-6 flex items-start gap-3 rounded-xl border p-4",
        className
      )}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconClass)} strokeWidth={2.25} />
      <div
        className="flex-1"
        style={{
          fontSize: "14px",
          lineHeight: "22px",
          letterSpacing: "0.1px",
        }}
      >
        {children}
      </div>
    </div>
  );
}