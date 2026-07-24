"use client";

import type { DiscordPresence } from "@/components/integrations/DiscordPresenceDot";
import { useEffect, useState } from "react";

const CACHE_KEY = "avi-discord-presence";

function getCachedStatus(): DiscordPresence {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached === "online" || cached === "idle" || cached === "dnd" || cached === "offline") {
      return cached;
    }
  } catch {}
  return "offline";
}

function setCachedStatus(status: DiscordPresence) {
  try {
    sessionStorage.setItem(CACHE_KEY, status);
  } catch {}
}

export function useDiscordPresence() {
  const [status, setStatus] = useState<DiscordPresence>(getCachedStatus);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/discord/presence", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("failed");
        const json = await res.json();
        const next = json.status as DiscordPresence;
        if (
          next === "online" ||
          next === "idle" ||
          next === "dnd" ||
          next === "offline"
        ) {
          setStatus(next);
          setCachedStatus(next);
        } else {
          setStatus("offline");
          setCachedStatus("offline");
        }
      } catch {
        setStatus("offline");
        setCachedStatus("offline");
      }
    };

    fetchStatus();
    const id = setInterval(fetchStatus, 15000);
    return () => clearInterval(id);
  }, []);

  return status;
}