"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdMoon } from "react-icons/io";
import { ChevronDown } from "lucide-react";
import { play } from "cuelume";

type DiscordPresence = "online" | "idle" | "dnd" | "offline" | "live";

interface StatusConfig {
  color: string;
  label: string;
  displayName: string;
}

const STATUS_MAP: Record<
  Exclude<DiscordPresence, "live">,
  StatusConfig
> = {
  online: {
    color: "bg-green-500",
    label: "Active now",
    displayName: "Online",
  },
  idle: {
    color: "text-[#f0b232]",
    label: "Idle",
    displayName: "Idle",
  },
  dnd: {
    color: "bg-red-500",
    label: "DND",
    displayName: "Do Not Disturb",
  },
  offline: {
    color: "bg-zinc-400 dark:bg-zinc-600",
    label: "Touching grass 🌿",
    displayName: "Offline",
  },
};

const DISCORD_USER_ID =
  process.env.NEXT_PUBLIC_DISCORD_USER_ID || "610804106344529931";

interface DiscordPresenceDotPreviewProps {
  avatarSrc?: string;
}

export default function DiscordPresenceDotPreview({
  avatarSrc = "/avatar/avatar-full.png",
}: DiscordPresenceDotPreviewProps) {
  const [selected, setSelected] = useState<DiscordPresence>("live");
  const [liveStatus, setLiveStatus] =
    useState<Exclude<DiscordPresence, "live">>("offline");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("failed");
        const json = await res.json();
        const next = json?.data?.discord_status;
        if (
          next === "online" ||
          next === "idle" ||
          next === "dnd" ||
          next === "offline"
        ) {
          setLiveStatus(next);
        }
      } catch {
        setLiveStatus("offline");
      }
    };
    fetchStatus();
    const id = setInterval(fetchStatus, 15000);
    return () => clearInterval(id);
  }, []);

  const activeStatus: Exclude<DiscordPresence, "live"> =
    selected === "live" ? liveStatus : selected;
  const config = STATUS_MAP[activeStatus];
  const isIdle = activeStatus === "idle";

  const options: { value: DiscordPresence; label: string }[] = [
    { value: "live", label: `Live (currently ${STATUS_MAP[liveStatus].displayName})` },
    { value: "online", label: "Online" },
    { value: "idle", label: "Idle" },
    { value: "dnd", label: "Do Not Disturb" },
    { value: "offline", label: "Offline" },
  ];

  const selectedLabel =
    options.find((o) => o.value === selected)?.label ?? "Live";

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="group relative">
        <div
          className="relative overflow-hidden bg-background ring-1 ring-border/60"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "22px",
          }}
        >
          <Image
            src={avatarSrc}
            alt="Avatar"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="absolute -bottom-0.5 -right-0.5">
          <div className="group/dot relative inline-flex items-center justify-center">
            <div className="absolute -top-10 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap group-hover/dot:block">
              <div className="rounded-lg border border-border/60 bg-popover px-3 py-1.5 text-[10px] font-bold text-popover-foreground shadow-lg">
                {config.label}
              </div>
              <div className="absolute -bottom-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border/60 bg-popover" />
            </div>

            {isIdle ? (
              <div
                className={`relative z-20 flex h-[18px] w-[18px] items-center justify-center rounded-full border-[2.5px] border-background bg-background -rotate-[15deg] ${config.color}`}
              >
                <IoMdMoon className="h-[85%] w-[85%]" />
              </div>
            ) : (
              <div
                className={`h-[18px] w-[18px] rounded-full border-[2.5px] border-background ${config.color}`}
              />
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => {
            setDropdownOpen((prev) => !prev);
            play("press");
          }}
          data-cuelume-hover="tick"
          className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-1.5 font-mono uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/40"
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          <span>{selectedLabel}</span>
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            strokeWidth={2.5}
          />
        </button>

        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute left-1/2 top-full z-50 mt-2 flex min-w-[220px] -translate-x-1/2 flex-col overflow-hidden rounded-lg border border-border/60 bg-popover shadow-xl">
              {options.map((opt) => {
                const isActive = selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSelected(opt.value);
                      setDropdownOpen(false);
                      play("press");
                    }}
                    data-cuelume-hover="tick"
                    className={`flex items-center justify-between px-3 py-2 text-left font-mono uppercase tracking-[0.08em] transition-colors ${
                      isActive
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                    style={{ fontSize: "11px", lineHeight: "1.2" }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}