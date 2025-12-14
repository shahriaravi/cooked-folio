"use client";

import type { DiscordPresence } from "@/components/integrations/DiscordPresenceDot";
import { useEffect, useState } from "react";

export function useDiscordPresence() {
  const [status, setStatus] = useState<DiscordPresence>("offline");

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
        } else {
          setStatus("offline");
        }
      } catch {
        setStatus("offline");
      }
    };

    fetchStatus();
    const id = setInterval(fetchStatus, 15000);
    return () => clearInterval(id);
  }, []);

  return status;
}
