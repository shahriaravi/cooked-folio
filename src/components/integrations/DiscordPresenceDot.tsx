"use client";

import { cn } from "@/lib/utils";
import { IoMdMoon } from "react-icons/io";

export type DiscordPresence = "online" | "idle" | "dnd" | "offline";

interface StatusConfig {
  color: string;
  label: string;
}

const STATUS_MAP: Record<DiscordPresence, StatusConfig> = {
  online: {
    color: "bg-green-500",
    label: "Active now",
  },
  idle: {
    color: "text-[#f0b232]",
    label: "Idle",
  },
  dnd: {
    color: "bg-red-500",
    label: "DND",
  },
  offline: {
    color: "bg-zinc-300 dark:bg-zinc-600",
    label: "Touching grass 🌿",
  },
};

interface DiscordPresenceDotProps {
  status: string | null;
  className?: string;
}

export default function DiscordPresenceDot({
  status,
  className,
}: DiscordPresenceDotProps) {
  const safeStatus: DiscordPresence =
    status === "online" ||
    status === "idle" ||
    status === "dnd" ||
    status === "offline"
      ? status
      : "offline";

  const config = STATUS_MAP[safeStatus];
  const isIdle = safeStatus === "idle";

  return (
    <div className="group relative flex items-center justify-center">
      <div className="absolute -top-10 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap group-hover:block">
        <div className="rounded-lg border border-primary/20 bg-popover px-3 py-1.5 text-[10px] font-bold text-popover-foreground shadow-lg backdrop-blur-md">
          {config.label}
        </div>
        <div className="absolute -bottom-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-primary/20 bg-popover" />
      </div>

      {isIdle ? (
        <div
          className={cn(
            "relative z-20 flex items-center justify-center rounded-full bg-background -rotate-[15deg] cursor-help",
            config.color,
            className
          )}
        >
          <IoMdMoon className="h-[85%] w-[85%]" />
        </div>
      ) : (
        <div
          className={cn(
            "rounded-full border-background shadow-sm cursor-help",
            config.color,
            className
          )}
        />
      )}
    </div>
  );
}