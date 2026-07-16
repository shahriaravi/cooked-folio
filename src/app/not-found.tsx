"use client";

import { CornerDownLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <main className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-background text-foreground">
      <div className="layout-container relative z-20 !py-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <CornerDownLeft className="h-[14px] w-[14px] transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Back</span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-20 text-center">

        <div className="mb-8 flex items-center gap-4 md:gap-6">
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            <div
              className="relative h-full w-full overflow-hidden bg-background"
              style={{ borderRadius: "20px" }}
            >
              <Image
                src="/avatar/avatar.png"
                alt="avi"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1
            className="font-mono font-semibold tracking-tighter text-foreground"
            style={{
              fontSize: "clamp(72px, 14vw, 128px)",
              lineHeight: "1",
              letterSpacing: "-0.04em",
            }}
          >
            {displayText}
          </h1>
        </div>

        <h2
          className="mb-3 font-semibold text-foreground"
          style={{
            fontSize: "22px",
            lineHeight: "28px",
            letterSpacing: "-0.01em",
          }}
        >
          You&apos;re lost in the void.
        </h2>

        <p
          className="max-w-[420px] text-muted-foreground"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.2px",
          }}
        >
          This page doesn&apos;t exist, was moved, or never existed in the
          first place. Either way, nothing to see here.
        </p>
      </div>
    </main>
  );
}