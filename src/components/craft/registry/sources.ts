export const componentSources: Record<string, string> = {
  TimeDisplay: `"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface TimeDisplayProps {
  timezone?: string;
  showLabel?: boolean;
  labelText?: string;
}

export default function TimeDisplay({
  timezone = "Asia/Dhaka",
  showLabel = true,
  labelText,
}: TimeDisplayProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const zoned = new Date(
        now.toLocaleString("en-US", { timeZone: timezone })
      );

      const h = zoned.getHours().toString().padStart(2, "0");
      const m = zoned.getMinutes().toString().padStart(2, "0");
      const s = zoned.getSeconds().toString().padStart(2, "0");

      setTime(\`\${h}:\${m}:\${s}\`);
    };

    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  const label = labelText ?? timezone.split("/").pop() ?? "";

  if (!time) {
    return (
      <span className="inline-flex items-center gap-1.5 opacity-0">
        <Clock className="h-3 w-3" strokeWidth={2.25} />
        <span className="tabular-nums">00:00:00 {showLabel ? label : ""}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      <Clock className="h-3 w-3" strokeWidth={2.25} />
      <span className="tabular-nums">
        {time}
        {showLabel && \` \${label}\`}
      </span>
    </span>
  );
}
`,

  DiscordPresenceDot: `"use client";

import { useEffect, useState } from "react";
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
  userId: string;
  size?: number;
  pollInterval?: number;
  showTooltip?: boolean;
  className?: string;
}

export default function DiscordPresenceDot({
  userId,
  size = 14,
  pollInterval = 15000,
  showTooltip = true,
  className = "",
}: DiscordPresenceDotProps) {
  const [status, setStatus] = useState<DiscordPresence>("offline");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          \`https://api.lanyard.rest/v1/users/\${userId}\`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("failed");
        const json = await res.json();
        const next = json?.data?.discord_status as DiscordPresence;
        if (
          next === "online" ||
          next === "idle" ||
          next === "dnd" ||
          next === "offline"
        ) {
          setStatus(next);
        } else {
          setStatus("offline");
        }
      } catch {
        setStatus("offline");
      }
    };

    fetchStatus();
    const id = setInterval(fetchStatus, pollInterval);
    return () => clearInterval(id);
  }, [userId, pollInterval]);

  const config = STATUS_MAP[status];
  const isIdle = status === "idle";

  const sizeStyle = {
    width: \`\${size}px\`,
    height: \`\${size}px\`,
  };

  return (
    <div className="group relative inline-flex items-center justify-center">
      {showTooltip && (
        <div className="absolute -top-10 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap group-hover:block">
          <div className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[10px] font-bold text-black shadow-lg dark:border-white/10 dark:bg-black dark:text-white">
            {config.label}
          </div>
          <div className="absolute -bottom-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-black/10 bg-white dark:border-white/10 dark:bg-black" />
        </div>
      )}

      {isIdle ? (
        <div
          className={\`relative z-20 flex items-center justify-center rounded-full bg-white dark:bg-black -rotate-[15deg] \${config.color} \${className}\`}
          style={sizeStyle}
        >
          <IoMdMoon className="h-[85%] w-[85%]" />
        </div>
      ) : (
        <div
          className={\`rounded-full \${config.color} \${className}\`}
          style={sizeStyle}
        />
      )}
    </div>
  );
}
`,

  HelloLoader: `"use client";

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
    <div className={\`\${wrapperClass} \${className}\`}>
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
`,
};

export function getComponentSource(name: string): string {
  return componentSources[name] ?? "// Source not found";
}