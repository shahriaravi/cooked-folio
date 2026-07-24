"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const zoned = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
      );

      const h = zoned.getHours().toString().padStart(2, "0");
      const m = zoned.getMinutes().toString().padStart(2, "0");
      const s = zoned.getSeconds().toString().padStart(2, "0");

      setTime(`${h}:${m}:${s}`);
    };

    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <span className="inline-flex items-center gap-1.5 opacity-0">
        <Clock className="h-3 w-3" strokeWidth={2.25} />
        <span className="tabular-nums">00:00:00 GMT+6</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <Clock className="h-3 w-3" strokeWidth={2.25} />
      <span className="tabular-nums">{time} GMT+6</span>
    </span>
  );
}