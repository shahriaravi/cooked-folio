"use client";

import { CustomScrollArea } from "@/components/common/CustomScrollArea";
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

  if (error || !calendar || !calendar.weeks) {
    return (
      <section className="mb-6">
        <h2 className="mb-3 pl-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pl-0">
          github activity
        </h2>
        <p
          className="text-muted-foreground"
          style={{ fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1px" }}
        >
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
      <h2 className="mb-3 pl-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pl-0">
        github activity
      </h2>

      <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-2">
        <p
          className="pl-1 text-muted-foreground md:pl-0"
          style={{ fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1px" }}
        >
          Total:{" "}
          <span className="font-semibold text-foreground">
            {calendar.totalContributions.toLocaleString()}
          </span>{" "}
          contributions
        </p>

        <div
          className="pl-1 text-muted-foreground md:pl-0 md:text-right"
          style={{ fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1px" }}
        >
          {hasActivity ? (
            <p>
              Coding in{" "}
              <span className="font-semibold text-foreground">
                {activity!.data!.name}
              </span>
              {elapsed && (
                <>
                  {" • "}
                  <span
                    className="font-mono text-emerald-400"
                    style={{ fontSize: "12px", letterSpacing: "0.06em" }}
                  >
                    {elapsed}
                  </span>
                </>
              )}
            </p>
          ) : (
            <p className="opacity-60">Currently touching grass</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <CustomScrollArea showFadeEdges>
          <div className="flex gap-[3px] pb-1">
            {calendar.weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    className={`h-2.5 w-2.5 rounded-[2px] md:h-3 md:w-3 ${getIntensityClass(
                      day.contributionCount
                    )}`}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </CustomScrollArea>

        <div className="flex items-center justify-end gap-2 pr-1 text-muted-foreground md:pr-0">
          <span
            className="font-mono uppercase tracking-[0.12em]"
            style={{ fontSize: "10px", lineHeight: "1" }}
          >
            Less
          </span>
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
          <span
            className="font-mono uppercase tracking-[0.12em]"
            style={{ fontSize: "10px", lineHeight: "1" }}
          >
            More
          </span>
        </div>
      </div>
    </section>
  );
}