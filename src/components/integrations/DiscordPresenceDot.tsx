"use client";

import { motion } from "framer-motion";

export type DiscordPresence = "online" | "idle" | "dnd" | "offline";

const COLORS: Record<DiscordPresence, string> = {
  online: "bg-green-500",
  idle: "bg-yellow-400",
  dnd: "bg-red-500",
  offline: "bg-gray-500",
};

export default function DiscordPresenceDot({ status }: { status: DiscordPresence }) {
  const color = COLORS[status] ?? COLORS.offline;

  return (
    <div className="relative h-6 w-6">
      <motion.div
        key={status}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        className={`h-full w-full rounded-full border-2 border-background ${color}`}
      />
    </div>
  );
}