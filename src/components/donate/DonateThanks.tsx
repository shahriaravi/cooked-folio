"use client";

import { motion } from "framer-motion";
import { CornerDownLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DonateThanks() {
  return (
    <main className="layout-container">
      <Link
        href="/"
        className="group mb-10 inline-flex items-center gap-2 font-mono text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <CornerDownLeft className="h-[14px] w-[14px] transition-transform duration-200 group-hover:-translate-x-0.5" />
        <span>Back</span>
      </Link>

      <div className="flex flex-col items-center pt-6 text-center md:pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="mb-8"
        >
          <div
            className="relative h-24 w-24 overflow-hidden bg-background"
            style={{ borderRadius: "22px" }}
          >
            <Image
              src="/avatar/avatar.png"
              alt="avi"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="mb-4 font-mono uppercase tracking-[0.14em] text-primary/80"
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          payment received
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.25,
            type: "spring",
            stiffness: 90,
            damping: 18,
          }}
          className="mb-4 font-semibold text-foreground"
          style={{
            fontSize: "28px",
            lineHeight: "34px",
            letterSpacing: "-0.02em",
          }}
        >
          Thank you, seriously.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35,
            type: "spring",
            stiffness: 90,
            damping: 18,
          }}
          className="max-w-[480px] text-muted-foreground"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.2px",
          }}
        >
          Every contribution keeps the caffeine flowing, the late night coding
          sessions going, and the useful stuff shipping. You just made my day
          genuinely better.
        </motion.p>
      </div>
    </main>
  );
}