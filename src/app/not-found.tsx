"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { play } from "cuelume";

export default function NotFound() {
  const [displayText, setDisplayText] = useState("000");
  const targetText = "404";

  useEffect(() => {
    play("whisper");

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
    <main className="flex min-h-[60vh] w-full items-center justify-center px-4">
      <div className="flex items-center gap-5">
        <div
          className="relative overflow-hidden bg-background"
          style={{
            width: "clamp(56px, 10vw, 88px)",
            height: "clamp(56px, 10vw, 88px)",
            borderRadius: "18px",
          }}
        >
          <Image
            src="/avatar/avatar.png"
            alt="Shahriar Avi"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1
          className="font-mono font-semibold tracking-tighter text-foreground"
          style={{
            fontSize: "clamp(56px, 10vw, 88px)",
            lineHeight: "1",
            letterSpacing: "-0.04em",
          }}
        >
          {displayText}
        </h1>
      </div>
    </main>
  );
}