"use client";

import Return from "@/components/ui/Return";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [displayText, setDisplayText] = useState("000");
  const targetText = "404";

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    const chars = "0123456789XY#@%";

    interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 25;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background text-foreground overflow-hidden">
      <div className="flex items-center gap-4 md:gap-6 mb-6">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src="/avatar/avatar.png"
            alt="avi"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-7xl md:text-9xl font-mono font-bold tracking-tighter text-foreground">
          {displayText}
        </h1>
      </div>

      <p className="text-muted-foreground text-sm md:text-base mb-6">
        you probably lost in the universe
      </p>

      <Return animate={false} />
    </div>
  );
}
