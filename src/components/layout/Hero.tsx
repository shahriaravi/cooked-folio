"use client";

import ThemeToggle from "@/components/common/ThemeToggle";
import DiscordPresenceDot from "@/components/integrations/DiscordPresenceDot";
import NowPlaying from "@/components/integrations/NowPlaying";
import TimeDisplay from "@/components/ui/TimeDisplay";
import { useDiscordPresence } from "@/hooks/useDiscordPresence";
import { DISCORD_LINK, SOCIALS } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { SiDiscord } from "react-icons/si";

export function Hero() {
  const discordStatus = useDiscordPresence();

  const navLinks = [
    { href: "/what", label: "/what" },
    { href: "/contact", label: "/contact" },
    { href: "/gist", label: "/gist", external: true },
  ];

  return (
    <section className="relative mb-16 w-full">
      <div className="mb-14 flex items-center justify-between gap-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <TimeDisplay />
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle className="h-7 w-7 rounded-md bg-transparent text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary" />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="relative mb-4 h-20 w-20 shrink-0">
          <div
            className="relative h-full w-full overflow-hidden bg-background ring-1 ring-border/60"
            style={{ borderRadius: "22px" }}
          >
            <Image
              src="/avatar/avatar-full.png"
              alt="avi"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5">
            <DiscordPresenceDot
              status={discordStatus}
              className="h-[18px] w-[18px] border-[2.5px] border-background"
            />
          </div>
        </div>

        <h1 className="mb-5 text-[22px] font-semibold leading-none tracking-tight text-foreground">
          Shahriar Avi
        </h1>

        <p
          className="mb-6 text-muted-foreground"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.2px",
          }}
        >
          Hey, I&apos;m Avi and I just love building things. I&apos;m currently
          building{" "}
          <a
            href="https://byontriq.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground transition-colors duration-200 hover:text-primary"
          >
            @Byontriq
          </a>
          . I make apps, websites and extensions, experiment a lot, break stuff
          on purpose and ship what&apos;s actually useful.
        </p>

        <div className="mb-6">
          <NowPlaying />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          {SOCIALS.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <social.icon className="h-[17px] w-[17px]" />
            </a>
          ))}

          <span className="hidden h-3.5 w-px bg-border sm:block" />

          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <SiDiscord className="h-[17px] w-[17px] text-primary/70 transition-colors duration-200 group-hover:text-primary" />
            <span className="font-semibold text-foreground/80 transition-colors duration-200 group-hover:text-primary">
              join community
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}