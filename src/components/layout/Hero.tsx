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
      <div className="flex w-full flex-col">
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

        <h1 className="mb-5 text-balance text-[22px] font-semibold leading-none tracking-tight text-foreground">
          Shahriar Avi
        </h1>

        <p
          className="mb-6 text-pretty text-muted-foreground"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.2px",
          }}
        >
          Hey, I&apos;m Avi, a design engineer and founder of{" "}
          <a
            href="https://byontriq.dev"
            target="_blank"
            rel="noopener noreferrer"
            data-cuelume-hover="tick"
            data-cuelume-press="press"
            aria-label="Byontriq — opens in new tab"
            className="inline-flex items-baseline gap-1.5 whitespace-nowrap rounded-[4px] align-baseline font-semibold text-foreground outline-none transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            Byontriq
            <span
              aria-hidden="true"
              className="relative inline-block h-[18px] w-[18px] translate-y-[4px] overflow-hidden rounded-[4px] ring-1 ring-border/40"
            >
              <Image
                src="/images/companies/byontriq.jpeg"
                alt=""
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

        <ul
          aria-label="Social links"
          className="flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          {SOCIALS.map((social) => {
            const IconComponent = social.icon;
            return (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.platform} — opens in new tab`}
                  data-cuelume-hover="tick"
                  data-cuelume-press="press"
                  className="inline-flex items-center rounded-[4px] text-muted-foreground outline-none transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                >
                  <IconComponent
                    className="h-[17px] w-[17px]"
                    style={{
                      color:
                        social.color === "currentColor"
                          ? "currentColor"
                          : social.color,
                    }}
                  />
                </a>
              </li>
            );
          })}

          <li>
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Discord community — opens in new tab"
              data-cuelume-hover="tick"
              data-cuelume-press="press"
              className="group/discord inline-flex items-center gap-2 whitespace-nowrap rounded-[6px] text-[14px] leading-[20px] text-muted-foreground outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              <SiDiscord
                className="h-[17px] w-[17px] text-primary/70 transition-colors duration-200 group-hover/discord:text-primary motion-reduce:transition-none"
                aria-hidden="true"
              />
              <span className="font-semibold text-foreground/80 transition-colors duration-200 group-hover/discord:text-primary motion-reduce:transition-none">
                join community
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}