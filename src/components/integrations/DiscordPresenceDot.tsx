"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { IoMdMoon } from "react-icons/io"

export type DiscordPresence = "online" | "idle" | "dnd" | "offline"

interface StatusConfig {
  color: string
  label: string
}

const STATUS_MAP: Record<string, StatusConfig> = {
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
}

interface DiscordPresenceDotProps {
  status: string | null
  className?: string
}

export default function DiscordPresenceDot({ status, className }: DiscordPresenceDotProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const safeStatus = (status || "offline") as DiscordPresence
  const config = STATUS_MAP[safeStatus] || STATUS_MAP.offline
  const isIdle = safeStatus === "idle"

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap"
          >
            <div className="bg-popover text-popover-foreground border border-primary/20 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md">
              {config.label}
            </div>
            <div className="w-2 h-2 bg-popover border-r border-b border-primary/20 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 -z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {isIdle ? (
        <motion.div
          key="idle"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          className={cn(
            "relative z-20 flex items-center justify-center -rotate-[15deg] bg-background rounded-full cursor-help",
            config.color,
            className 
          )}
        >
           <IoMdMoon className="w-[85%] h-[85%]" />
        </motion.div>
      ) : (
        <motion.div
          key={safeStatus}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          className={cn(
            "rounded-full border-background shadow-sm cursor-help",
            config.color,
            className
          )}
        />
      )}
    </div>
  )
}