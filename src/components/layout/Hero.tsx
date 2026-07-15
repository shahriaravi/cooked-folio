"use client";

import ThemeToggle from "@/components/common/ThemeToggle";
import DiscordPresenceDot from "@/components/integrations/DiscordPresenceDot";
import NowPlaying from "@/components/integrations/NowPlaying";
import TimeDisplay from "@/components/ui/TimeDisplay";
import { useDiscordPresence } from "@/hooks/useDiscordPresence";
import { DISCORD_LINK, SOCIALS } from "@/lib/config";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiDiscord } from "react-icons/si";

export function Hero() {
  const discordStatus = useDiscordPresence();

  return (
    <section className="relative mb-14 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 py-2 mb-16 md:mb-20 text-xs text-muted-foreground uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <TimeDisplay />
        </div>

        <div className="flex items-center justify-start sm:justify-end gap-4">
          <nav className="flex items-center gap-4 text-sm">
            {["/what", "/contact", "/gist"].map((href) => (
              <Link
                key={href}
                href={href}
                target={href === "/gist" ? "blank" : undefined}
                className="hover:text-primary transition-colors underline decoration-wavy underline-offset-4 lowercase"
              >
                {href}
              </Link>
            ))}
          </nav>

          <ThemeToggle className="bg-transparent hover:bg-primary/10 text-muted-foreground hover:text-primary w-8 h-8 rounded-md transition-colors" />
        </div>
      </div>

      <div className="px-1 md:px-2">
        <div>
          <div className="flex items-center gap-5 md:gap-6 mb-8 md:mb-10">
            <div className="relative shrink-0">
              <div
                className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden bg-background ring-1 ring-border/50 shadow-lg"
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
              <div className="absolute -bottom-1 -right-1">
                <DiscordPresenceDot
                  status={discordStatus}
                  className="w-5 h-5 md:w-6 md:h-6 border-[3px] border-background"
                />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Shahriar Avi
            </h1>
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8 md:mb-10">
            Hey, I&apos;m Avi and I just love building things. I&apos;m
            currently building{" "}
            <a
              href="https://byontriq.xyz"
              target="_blank"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              @Byontriq
            </a>
            . I make apps, websites and extensions, experiment a lot, break
            stuff on purpose and ship what&apos;s actually useful.
          </p>

          <div className="mb-10 md:mb-12">
            <NowPlaying />
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <social.icon className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            ))}

            <div className="hidden sm:block w-px h-6 bg-border" />

            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors text-sm md:text-base"
            >
              <SiDiscord className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
              <span>Join Community</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}