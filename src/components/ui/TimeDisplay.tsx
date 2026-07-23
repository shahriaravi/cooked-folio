"use client";

import { useEffect, useState } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const zoned = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
      );

      const h24 = zoned.getHours();
      const h12 = h24 % 12 || 12;
      const m = zoned.getMinutes().toString().padStart(2, "0");
      const s = zoned.getSeconds().toString().padStart(2, "0");
      const ampm = h24 >= 12 ? "PM" : "AM";

      setTime(`${h12}:${m}:${s} ${ampm}`);
    };

    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return <span className="opacity-0 leading-none">00:00:00 AM</span>;

  return (
    <span className="inline-flex flex-col sm:flex-row sm:items-baseline sm:gap-2 leading-none">
      <span className="tracking-[0.25em] font-semibold tabular-nums leading-none">
        {time}
      </span>
      <span className="text-[11px] text-muted-foreground tracking-normal leading-none mt-1 sm:mt-0">
        // GMT+6
      </span>
    </span>
  );
}