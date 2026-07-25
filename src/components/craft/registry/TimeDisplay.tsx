"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface TimeDisplayProps {
  timezone?: string;
  showLabel?: boolean;
  labelText?: string;
}

export default function TimeDisplay({
  timezone = "Asia/Dhaka",
  showLabel = true,
  labelText,
}: TimeDisplayProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const zoned = new Date(
        now.toLocaleString("en-US", { timeZone: timezone })
      );

      const h = zoned.getHours().toString().padStart(2, "0");
      const m = zoned.getMinutes().toString().padStart(2, "0");
      const s = zoned.getSeconds().toString().padStart(2, "0");

      setTime(`${h}:${m}:${s}`);
    };

    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  const label = labelText ?? timezone.split("/").pop() ?? "";

  if (!time) {
    return (
      <span className="inline-flex items-center gap-1.5 opacity-0">
        <Clock className="h-3 w-3" strokeWidth={2.25} />
        <span className="tabular-nums">00:00:00 {showLabel ? label : ""}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      <Clock className="h-3 w-3" strokeWidth={2.25} />
      <span className="tabular-nums">
        {time}
        {showLabel && ` ${label}`}
      </span>
    </span>
  );
}