"use client";

import { motion } from "framer-motion";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}
interface Week {
  contributionDays: ContributionDay[];
}
interface Calendar {
  totalContributions: number;
  weeks: Week[];
}

interface ActivityData {
  isActive: boolean;
  activityType?: "PLAYING";
  data?: {
    name: string;
    details: string;
    state: string;
    startTimestamp: number | null;
    workspace?: string | null;
  };
}

const formatElapsedTime = (start: number): string => {
  const totalSeconds = Math.floor((Date.now() - start) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const mm = String(minutes).padStart(2, "0");
  if (hours > 0) return `${hours}h ${mm}m`;
  return `${minutes}m`;
};

export function GithubActivityCard() {
  const { data: calendar, error } = useSWR<Calendar>(
    "/api/github/contributions",
    fetcher
  );
  const { data: activity } = useSWR<ActivityData>(
    "/api/discord/current-activity",
    fetcher,
    { refreshInterval: 30000 }
  );

  if (error || !calendar) {
    return (
      <section className="mb-6">
        <h2 className="text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider pl-1 md:pl-0">
          github activity
        </h2>
        <p className="text-xs text-muted-foreground">
          {error ? "skill issue loading data." : "loading activity..."}
        </p>
      </section>
    );
  }

  const days: ContributionDay[] = calendar.weeks.flatMap(
    (w) => w.contributionDays
  );
  const max = Math.max(...days.map((d) => d.contributionCount || 0));

  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-muted/30";
    const ratio = count / max;
    if (ratio < 0.25) return "bg-emerald-900";
    if (ratio < 0.5) return "bg-emerald-700";
    if (ratio < 0.75) return "bg-emerald-500";
    return "bg-emerald-400";
  };

  const hasActivity = activity && activity.isActive && activity.data;
  const elapsed =
    hasActivity && activity!.data!.startTimestamp
      ? formatElapsedTime(activity!.data!.startTimestamp!)
      : null;

  return (
    <section className="mb-0 w-full">
      <h2 className="text-sm font-mono text-muted-foreground mb-3 uppercase tracking-wider pl-1 md:pl-0">
        // github activity
      </h2>

      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-2 mb-3 text-xs md:text-sm">
        <p className="text-muted-foreground pl-1 md:pl-0">
          Total:{" "}
          <span className="font-semibold text-foreground">
            {calendar.totalContributions.toLocaleString()}
          </span>{" "}
          contributions
        </p>

        <div className="text-muted-foreground md:text-right pl-1 md:pl-0">
          {hasActivity ? (
            <>
              <p>
                Coding in{" "}
                <span className="font-semibold text-foreground">
                  {activity!.data!.name}
                </span>
                {elapsed && ` • ${elapsed}`}
              </p>
            </>
          ) : (
            <p className="opacity-60">Currently touching grass</p>
          )}
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-hide">
          {calendar.weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3px]">
              {week.contributionDays.map((day, dIdx) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: (wIdx * 7 + dIdx) * 0.002,
                  }}
                  className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-[2px] ${getIntensityClass(
                    day.contributionCount
                  )}`}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 text-[10px] text-muted-foreground pr-1 md:pr-0">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2.5 w-2.5 rounded-[2px] ${
                  i === 0
                    ? "bg-muted/30"
                    : i === 1
                    ? "bg-emerald-900"
                    : i === 2
                    ? "bg-emerald-700"
                    : "bg-emerald-500"
                }`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
