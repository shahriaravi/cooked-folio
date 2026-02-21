"use client";

import ThemeToggle from "@/components/common/ThemeToggle";
import DiscordPresenceDot from "@/components/integrations/DiscordPresenceDot";
import NowPlaying from "@/components/integrations/NowPlaying";
import TimeDisplay from "@/components/ui/TimeDisplay";
import { useDiscordPresence } from "@/hooks/useDiscordPresence";
import { BANNER_IMAGE, DISCORD_LINK, SOCIALS } from "@/lib/config";
import { motion } from "framer-motion";
import { Clock, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiDiscord } from "react-icons/si";

const heroReveal = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 20, mass: 0.8 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

export function Hero() {
  const discordStatus = useDiscordPresence();

  return (
    <section className="relative mb-10 font-mono">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 py-2 mb-6 text-xs text-muted-foreground uppercase tracking-wider border-b border-border/40 pb-4"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <TimeDisplay />
        </div>

        <div className="flex items-center justify-start sm:justify-end gap-4">
          <nav className="flex items-center gap-4 text-sm">
            <nav className="flex items-center gap-4 text-sm">
              {["/stuffs", "/what", "/contact", "/gist"].map((href) => (
                <motion.span key={href} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={href}
                    target={href === "/gist" ? "blank" : undefined}
                    className="hover:text-primary transition-colors underline decoration-wavy underline-offset-4 lowercase"
                  >
                    {href}
                  </Link>
                </motion.span>
              ))}
            </nav>
          </nav>

          <ThemeToggle className="bg-transparent hover:bg-primary/10 text-muted-foreground hover:text-primary w-8 h-8 rounded-md transition-colors" />
        </div>
      </motion.div>

      <motion.div
        variants={heroReveal}
        initial="hidden"
        animate="visible"
        className="h-40 md:h-56 w-full relative mb-12 select-none pointer-events-none"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-background/20 to-background" />
        <Image
          src={BANNER_IMAGE}
          alt="banner"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105 opacity-90 grayscale-[0.1]"
          priority
        />
      </motion.div>

      <div className="px-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 }}
          className="relative -mt-24 mb-6 w-max"
        >
          <div
            className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden shadow-2xl ring-4 ring-background bg-background z-10"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <Image
              src="/avatar/avatar-full.png"
              alt="avi"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-1 -right-1 z-20">
            <DiscordPresenceDot
              status={discordStatus}
              className="w-5 h-5 md:w-6 md:h-6 border-[3px] border-background"
            />
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerChild} className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Shahriar Avi
            </h1>
            <Leaf className="w-5 h-5 text-success fill-success/10 -rotate-12" />
          </motion.div>

          <motion.div variants={staggerChild} className="text-base md:text-lg text-muted-foreground mb-3 flex flex-wrap items-center gap-2">
            <span>building things</span>
            <a
              href="https://byontriq.xyz"
              target="_blank"
              className="wavy-underline font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              @Byontriq
            </a>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-6 mt-2">
            <NowPlaying />
          </motion.div>

          <motion.p variants={staggerChild} className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed mb-8">
            A code <span className="highlight-text">alchemist ⚗️</span> building
            things and turning ideas into products. I make apps, websites and
            extensions, <span className="highlight-text">experiment a lot</span>
            , break stuff on purpose and ship what&apos;s{" "}
            <span className="highlight-text">actually useful</span>.
          </motion.p>

          <motion.div variants={staggerChild} className="flex flex-wrap items-center gap-5">
            {SOCIALS.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="text-muted-foreground transition-all duration-200"
                whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget.firstElementChild as HTMLElement;
                  if (el && (social as any).color)
                    el.style.color = (social as any).color;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget.firstElementChild as HTMLElement;
                  if (el) el.style.color = "";
                }}
              >
                <social.icon className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
            ))}

            <div className="hidden sm:block w-px h-6 bg-border" />

            <motion.a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors text-xs md:text-sm"
              whileHover={{ x: 2, transition: { type: "spring", stiffness: 300, damping: 15 } }}
              whileTap={{ scale: 0.97 }}
            >
              <SiDiscord className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
              <span>Join Community</span>
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary">
                →
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
