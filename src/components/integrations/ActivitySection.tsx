"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

const CACHE_KEY = "avi-activity-cache";

function getCachedActivity(): Activity | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {}
  return null;
}

function setCachedActivity(activity: Activity) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(activity));
  } catch {}
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

export function ActivitySection({ initialActivity }: ActivitySectionProps) {
  const [activity, setActivity] = useState<Activity | null>(
    initialActivity ?? getCachedActivity()
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
          setCachedActivity(json);
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
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          activity
        </h2>
        {data.startTimestamp && (
          <span
            className="font-mono text-emerald-500 dark:text-emerald-400 tabular-nums"
            style={{
              fontSize: "11px",
              lineHeight: "1",
              letterSpacing: "0.06em",
            }}
          >
            {elapsedTime}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {data.largeImage && (
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-border/60">
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
          <p
            className="truncate font-semibold text-foreground"
            style={{
              fontSize: "15px",
              lineHeight: "22px",
              letterSpacing: "0.1px",
            }}
          >
            {data.name}
          </p>

          {(data.details || data.state) && (
            <p
              className="truncate text-muted-foreground"
              style={{
                fontSize: "13px",
                lineHeight: "20px",
                letterSpacing: "0.1px",
              }}
            >
              {data.details || data.state}
            </p>
          )}

          {data.workspace && (
            <p
              className="mt-1 font-mono text-muted-foreground/60 truncate"
              style={{
                fontSize: "11px",
                lineHeight: "1.4",
                letterSpacing: "0.06em",
              }}
            >
              {data.workspace}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}