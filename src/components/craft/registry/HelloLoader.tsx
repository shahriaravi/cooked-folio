"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HelloLoaderProps {
  greetings?: string[];
  interval?: number;
  avatarSrc?: string;
  avatarAlt?: string;
  fullScreen?: boolean;
  className?: string;
}

const DEFAULT_GREETINGS = [
  "hello",
  "স্বাগতম",
  "hola",
  "नमस्ते",
  "bonjour",
];

export default function HelloLoader({
  greetings = DEFAULT_GREETINGS,
  interval = 250,
  avatarSrc,
  avatarAlt = "Loading",
  fullScreen = true,
  className = "",
}: HelloLoaderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, interval);
    return () => clearInterval(id);
  }, [greetings.length, interval]);

  const current = greetings[index];

  const wrapperClass = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-background cursor-wait"
    : "flex items-center justify-center py-16";

  return (
    <div className={`${wrapperClass} ${className}`}>
      <div className="flex items-center gap-4 md:gap-6">
        {avatarSrc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden rounded-2xl"
          >
            <img
              src={avatarSrc}
              alt={avatarAlt}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}

        <div className="min-w-[140px]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={current}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
              style={{
                fontFamily:
                  '"Pacifico", system-ui, -apple-system, sans-serif',
              }}
            >
              {current}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}