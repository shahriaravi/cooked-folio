"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const HELLOS = ["hello", "স্বাগতম", "hola", "नमस्ते", "bonjour"];

export function HelloLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % HELLOS.length);
    }, 250);
    return () => clearInterval(id);
  }, []);

  const current = HELLOS[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background cursor-wait">
      <div className="flex items-center gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-16 h-16 md:w-20 md:h-20 shrink-0"
        >
          <Image
            src="/avatar/avatar.png"
            alt="loading..."
            fill
            className="object-contain"
            priority
          />
        </motion.div>

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
                  '"Pacifico", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
