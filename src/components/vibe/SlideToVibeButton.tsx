"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { play } from "cuelume";

interface SlideToVibeButtonProps {
  onUnlock: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function SlideToVibeButton({
  onUnlock,
  disabled = false,
  label = "slide to vibe",
  className,
}: SlideToVibeButtonProps) {
  const [, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  const trackHeight = 60;
  const padding = 4;
  const handleSize = trackHeight - padding * 2;
  const trackWidth = 280;

  const maxDrag = trackWidth - handleSize - padding * 2;

  const textOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0]);
  const textX = useTransform(x, [0, maxDrag], [0, 20]);
  const arrowOpacity = useTransform(x, [0, 20], [1, 0]);
  const trackGlow = useTransform(x, [0, maxDrag], [0, 1]);
  const trackBg = useTransform(
    trackGlow,
    [0, 1],
    ["hsl(var(--card) / 0.4)", "hsl(var(--primary) / 0.12)"]
  );
  const trackBorder = useTransform(
    trackGlow,
    [0, 1],
    ["hsl(var(--border) / 0.6)", "hsl(var(--primary) / 0.45)"]
  );

  function handleDragEnd() {
    setIsDragging(false);
    if (x.get() >= maxDrag - 10) {
      play("success");
      onUnlock();
    } else {
      animate(x, 0, { type: "spring", bounce: 0.4, duration: 0.5 });
    }
  }

  return (
    <div
      className={cn(
        "relative select-none",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      style={{ width: trackWidth, height: trackHeight }}
    >
      <motion.div
        style={{
          backgroundColor: trackBg,
          borderColor: trackBorder,
        }}
        className="absolute inset-0 rounded-full border backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]"
      />

      <motion.div
        style={{ opacity: textOpacity, x: textX }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="flex items-center gap-1.5 pl-10">
          <span
            className="font-mono uppercase text-muted-foreground"
            style={{
              fontSize: "11px",
              lineHeight: "1",
              letterSpacing: "0.18em",
            }}
          >
            {label}
          </span>
          <motion.div style={{ opacity: arrowOpacity }}>
            <ChevronRight className="h-3.5 w-3.5 animate-pulse text-primary/70" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        drag={disabled ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{
          x,
          width: handleSize,
          height: handleSize,
          top: padding,
          left: padding,
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.04 }}
        className="absolute z-10 flex cursor-grab items-center justify-center active:cursor-grabbing"
      >
        <div
          className="relative h-full w-full overflow-hidden bg-background shadow-[0_4px_14px_-2px_rgba(0,0,0,0.25)] transition-all duration-200 hover:shadow-[0_6px_18px_-2px_rgba(0,0,0,0.35)]"
          style={{ borderRadius: "16px" }}
        >
          <Image
            src="/avatar/avatar.png"
            alt="handle"
            fill
            className="object-cover"
            draggable={false}
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}