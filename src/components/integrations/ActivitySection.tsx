"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGamepad } from "react-icons/fa";

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
    <section className="mb-10">
      <h2 className="text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider pl-1 md:pl-0">
        activity
      </h2>

      <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground">
        {data.largeImage && (
          <div className="relative h-9 w-9 md:h-10 md:w-10 overflow-hidden rounded-lg border border-white/10 flex-shrink-0">
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
            <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground">
              {activity.activityType === "PLAYING" ? "playing" : "activity"}
            </span>
            {data.startTimestamp && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                <FaGamepad className="h-3 w-3" />
                {elapsedTime}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1 mt-0.5">
            <span className="font-semibold text-foreground truncate max-w-[160px] md:max-w-xs">
              {data.name}
            </span>
            {data.details && (
              <span className="text-muted-foreground truncate max-w-[220px] md:max-w-sm">
                – {data.details}
              </span>
            )}
            {data.state && !data.details && (
              <span className="text-muted-foreground truncate max-w-[220px] md:max-w-sm">
                – {data.state}
              </span>
            )}
          </div>

          {data.workspace && (
            <div className="mt-1">
              <span className="text-[11px] text-muted-foreground/80">
                project: {data.workspace}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
