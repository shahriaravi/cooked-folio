"use client";

import DiscordPresenceDot from "@/components/integrations/DiscordPresenceDot";
import NowPlaying from "@/components/integrations/NowPlaying";
import { useDiscordPresence } from "@/hooks/useDiscordPresence";
import { DISCORD_LINK, SOCIALS } from "@/lib/config";
import Image from "next/image";
import { SiDiscord } from "react-icons/si";

export function Hero() {
  const discordStatus = useDiscordPresence();

  return (
    <section className="relative mb-16 w-full">
      <div className="flex flex-col w-full">
        <div className="relative mb-4 h-20 w-20 shrink-0">
          <div
            className="relative h-full w-full overflow-hidden bg-background ring-1 ring-border/60"
            style={{ borderRadius: "22px" }}
          >
            <Image
              src="/avatar/avatar.jpg"
              alt="Shahriar Avi"
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

        <h1
          className="mb-5 text-[22px] font-semibold leading-none tracking-tight"
          style={{ color: "hsl(var(--foreground))" }}
        >
          Shahriar Avi
        </h1>

        <p
          className="mb-6"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.2px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Hey, I&apos;m Avi, a design engineer and founder of{" "}
          <a
            href="https://byontriq.dev"
            target="_blank"
            rel="noopener noreferrer"
            data-cuelume-hover="tick"
            data-cuelume-press
            className="inline-flex items-baseline gap-1.5 font-semibold transition-colors duration-200 hover:text-primary align-baseline"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Byontriq
            <span className="relative inline-block h-[18px] w-[18px] translate-y-[4px] overflow-hidden rounded-[4px] ring-1 ring-border/40">
              <Image
                src="/images/companies/byontriq.jpeg"
                alt="Byontriq"
                fill
                className="object-cover"
              />
            </span>
          </a>
          . I ship apps, websites, and extensions, and I obsess over the
          details most people skip. Currently taking on new projects if you
          need something built with care.
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
              className="transition-colors duration-200"
              style={{ color: "hsl(var(--muted-foreground))" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "hsl(var(--foreground))")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "hsl(var(--muted-foreground))")
              }
            >
              <social.icon
                className="h-[17px] w-[17px]"
                style={{ color: "inherit" }}
              />
            </a>
          ))}

          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[14px] transition-colors duration-200"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <SiDiscord
              className="h-[17px] w-[17px] transition-colors duration-200"
              style={{ color: "hsl(var(--primary) / 0.7)" }}
            />
            <span
              className="font-semibold transition-colors duration-200 group-hover:text-primary"
              style={{ color: "hsl(var(--foreground) / 0.8)" }}
            >
              join community
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}