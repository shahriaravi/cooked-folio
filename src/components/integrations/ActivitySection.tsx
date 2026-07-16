"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { motion } from "framer-motion";

export interface Activity {
  isActive: boolean;
  activityType?: "PLAYING";
  data?: {
    name: string;
    details: string;
    state: string;
    largeImage: string | null;
    smallImage: string | null;
    startTimestamp: number | null;
    workspace?: string | null;
  };
}

interface ActivitySectionProps {
  initialActivity?: Activity;
}

const formatElapsedTime = (start: number): string => {
  const totalSeconds = Math.floor((Date.now() - start) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${minutes}:${ss}`;
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

export function ActivitySection({ initialActivity }: ActivitySectionProps) {
  const [activity, setActivity] = useState<Activity | null>(
    initialActivity ?? null
  );
  const [elapsedTime, setElapsedTime] = useState("0:00");

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/discord/current-activity", {
          cache: "no-store",
        });
        if (res.ok) {
          const json = await res.json();
          setActivity(json);
        }
      } catch (error) {
        console.error("failed to update activity:", error);
      }
    };

    fetchActivity();
    const interval = setInterval(fetchActivity, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activity?.data?.startTimestamp) return;

    const start = activity.data.startTimestamp;
    const update = () => setElapsedTime(formatElapsedTime(start));
    update();

    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [activity?.data?.startTimestamp]);

  if (!activity || !activity.isActive || !activity.data) return null;

  const data = activity.data;

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mb-10"
    >
      <motion.h2
        variants={staggerItem}
        className="mb-3 pl-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pl-0"
      >
        activity
      </motion.h2>

      <motion.div
        variants={staggerItem}
        whileHover={{
          y: -2,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="flex flex-wrap items-center gap-3 text-muted-foreground"
      >
        {data.largeImage && (
          <div className="relative h-9 w-9 md:h-10 md:w-10 flex-shrink-0 overflow-hidden rounded-lg border border-white/10">
            <Image
              src={data.largeImage}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {activity.activityType === "PLAYING" ? "playing" : "activity"}
            </span>
            {data.startTimestamp && (
              <span
                className="inline-flex items-center gap-1 font-mono text-emerald-400"
                style={{ fontSize: "11px", lineHeight: "1", letterSpacing: "0.06em" }}
              >
                <FaGamepad className="h-3 w-3" />
                {elapsedTime}
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <span
              className="max-w-[160px] truncate font-semibold text-foreground md:max-w-xs"
              style={{ fontSize: "15px", lineHeight: "22px" }}
            >
              {data.name}
            </span>
            {data.details && (
              <span
                className="max-w-[220px] truncate text-muted-foreground md:max-w-sm"
                style={{ fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1px" }}
              >
                – {data.details}
              </span>
            )}
            {data.state && !data.details && (
              <span
                className="max-w-[220px] truncate text-muted-foreground md:max-w-sm"
                style={{ fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1px" }}
              >
                – {data.state}
              </span>
            )}
          </div>

          {data.workspace && (
            <div className="mt-1.5">
              <span
                className="font-mono text-muted-foreground/70"
                style={{ fontSize: "11px", lineHeight: "1", letterSpacing: "0.08em" }}
              >
                project: {data.workspace}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}