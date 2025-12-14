"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

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

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>/ return</span>
      </Link>
    </div>
  );
}