"use client";

import { cn } from "@/lib/utils";
import {
  Check,
  Copy,
  Menu,
  Moon,
  Pause,
  Play,
  Sun,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type IconPair = "copy-check" | "play-pause" | "menu-x" | "sun-moon";

interface IconMorphShowcaseProps {
  iconPair?: IconPair;
  duration?: number;
  scaleStart?: number;
  blurAmount?: number;
  enableOpacity?: boolean;
  enableScale?: boolean;
  enableBlur?: boolean;
  autoToggle?: boolean;
  compact?: boolean;
}

interface IconPairConfig {
  inactive: LucideIcon;
  active: LucideIcon;
  inactiveColor: string;
  activeColor: string;
  inactiveLabel: string;
  activeLabel: string;
}

const iconMap: Record<IconPair, IconPairConfig> = {
  "copy-check": {
    inactive: Copy,
    active: Check,
    inactiveColor: "text-primary",
    activeColor: "text-emerald-400",
    inactiveLabel: "copy",
    activeLabel: "check",
  },
  "play-pause": {
    inactive: Play,
    active: Pause,
    inactiveColor: "text-foreground",
    activeColor: "text-primary",
    inactiveLabel: "play",
    activeLabel: "pause",
  },
  "menu-x": {
    inactive: Menu,
    active: X,
    inactiveColor: "text-foreground",
    activeColor: "text-primary",
    inactiveLabel: "menu",
    activeLabel: "close",
  },
  "sun-moon": {
    inactive: Sun,
    active: Moon,
    inactiveColor: "text-amber-400",
    activeColor: "text-blue-400",
    inactiveLabel: "sun",
    activeLabel: "moon",
  },
};

export default function IconMorphShowcase({
  iconPair = "copy-check",
  duration = 300,
  scaleStart = 0.5,
  blurAmount = 4,
  enableOpacity = true,
  enableScale = true,
  enableBlur = true,
  autoToggle = false,
  compact = false,
}: IconMorphShowcaseProps) {
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const shouldAutoToggle = autoToggle || compact;

    if (shouldAutoToggle) {
      intervalRef.current = setInterval(
        () => {
          setIsActive((prev) => !prev);
        },
        compact ? 1400 : duration + 800
      );
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoToggle, duration, compact]);

  const config = iconMap[iconPair];
  const InactiveIcon = config.inactive;
  const ActiveIcon = config.active;

  const transitionProps: string[] = [];
  if (enableOpacity) transitionProps.push("opacity");
  if (enableScale) transitionProps.push("transform");
  if (enableBlur) transitionProps.push("filter");

  const effectiveDuration = compact ? 500 : duration;

  const transitionStyle =
    transitionProps.length > 0
      ? `${transitionProps.join(",")} ${effectiveDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`
      : "none";

  const inactiveStyle: React.CSSProperties = {
    transition: transitionStyle,
    opacity: enableOpacity ? (isActive ? 0 : 1) : isActive ? 0 : 1,
    transform: enableScale
      ? `scale(${isActive ? scaleStart : 1})`
      : "scale(1)",
    filter: enableBlur
      ? `blur(${isActive ? blurAmount : 0}px)`
      : "blur(0px)",
  };

  const activeStyle: React.CSSProperties = {
    transition: transitionStyle,
    opacity: enableOpacity ? (isActive ? 1 : 0) : isActive ? 1 : 0,
    transform: enableScale
      ? `scale(${isActive ? 1 : scaleStart})`
      : "scale(1)",
    filter: enableBlur
      ? `blur(${isActive ? 0 : blurAmount}px)`
      : "blur(0px)",
  };

  if (compact) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div
          className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-background/60 shadow-sm"
          aria-hidden="true"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <InactiveIcon
              className={cn(
                "absolute inset-0 h-full w-full",
                config.inactiveColor
              )}
              strokeWidth={2.5}
              style={inactiveStyle}
            />
            <ActiveIcon
              className={cn(
                "absolute inset-0 h-full w-full",
                config.activeColor
              )}
              strokeWidth={2.5}
              style={activeStyle}
            />
          </span>
        </div>
      </div>
    );
  }

  const activeChips: string[] = [];
  if (enableOpacity) activeChips.push("opacity");
  if (enableScale) activeChips.push("scale");
  if (enableBlur) activeChips.push("blur");

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 py-6">
      <button
        type="button"
        onClick={() => setIsActive((prev) => !prev)}
        className="group/morph relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-sm outline-none transition-transform duration-200 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
        aria-label={`Toggle to ${
          isActive ? config.inactiveLabel : config.activeLabel
        }`}
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <InactiveIcon
            className={cn(
              "absolute inset-0 h-full w-full",
              config.inactiveColor
            )}
            strokeWidth={2.5}
            style={inactiveStyle}
          />
          <ActiveIcon
            className={cn(
              "absolute inset-0 h-full w-full",
              config.activeColor
            )}
            strokeWidth={2.5}
            style={activeStyle}
          />
        </span>
      </button>

      <div className="flex flex-col items-center gap-1">
        <span
          className="font-mono uppercase tracking-[0.12em] text-muted-foreground"
          style={{ fontSize: "10px", lineHeight: "1" }}
        >
          state
        </span>
        <span
          className="font-mono font-semibold text-foreground"
          style={{ fontSize: "13px", lineHeight: "1" }}
        >
          {isActive ? config.activeLabel : config.inactiveLabel}
        </span>
      </div>

      <div className="flex items-center gap-2 border-t border-border/40 pt-4">
        {activeChips.length === 0 ? (
          <span
            className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 font-mono uppercase tracking-[0.1em] text-amber-500"
            style={{ fontSize: "10px", lineHeight: "1" }}
          >
            no animation — enable a property
          </span>
        ) : (
          activeChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border/60 bg-secondary/40 px-2 py-1 font-mono uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontSize: "9px", lineHeight: "1" }}
            >
              {chip}
            </span>
          ))
        )}
      </div>
    </div>
  );
}