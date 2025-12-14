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

const wavyUnderlineStyles: React.CSSProperties = {
  textDecoration: "none",
};

export function HeroHeader() {
  const discordStatus = useDiscordPresence();

  return (
    <section className="relative mb-10 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 py-2 mb-6 text-xs text-muted-foreground uppercase tracking-wider border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <TimeDisplay />
        </div>

        <div className="flex items-center justify-start sm:justify-end gap-4">
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/what"
              className="hover:text-primary transition-colors underline decoration-wavy underline-offset-4 lowercase"
            >
              /what
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors underline decoration-wavy underline-offset-4 lowercase"
            >
              /contact
            </Link>
          </nav>

          <ThemeToggle className="bg-transparent hover:bg-white/5 w-8 h-8" />
        </div>
      </div>

      <div className="h-40 md:h-56 w-full relative mb-12 select-none pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
        <Image
          src={BANNER_IMAGE}
          alt="banner"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          priority
        />
      </div>

      <div className="px-1">
        <div className="relative -mt-24 mb-6 w-max">
          <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-background">
            <Image
              src="/avatar/avatar-full.png"
              alt="avi"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-1 -right-1">
            <DiscordPresenceDot status={discordStatus} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Shahriar Avi
            </h1>
            <Leaf className="w-5 h-5 text-emerald-500 fill-emerald-500/20 -rotate-12" />
          </div>

          <div className="text-base md:text-lg text-muted-foreground mb-3 flex flex-wrap items-center gap-2">
            <span>Founder & SWE</span>
            <a
              href="https://byontriq.xyz"
              target="_blank"
              style={wavyUnderlineStyles}
              className="wavy-underline font-semibold text-foreground hover:text-primary transition-colors"
            >
              @Byontriq
            </a>
          </div>

          <div className="mb-6 mt-2">
            <NowPlaying />
          </div>

          <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed mb-8">
            I turn <span className="highlight-pill">coffee into code</span> and
            ideas into apps.{" "}
            <span className="highlight-pill">full‑stack wizard</span> building
            digital experiences from{" "}
            <span className="highlight-pill">pixels to databases</span>.
            Crafting stuff that actually works (most of the time).
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="text-muted-foreground transition-all duration-200 hover:-translate-y-1"
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
              </a>
            ))}

            <div className="hidden sm:block w-4" />

            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-medium text-foreground hover:text-[#5865F2] transition-colors text-xs md:text-sm"
            >
              <SiDiscord className="w-5 h-5 text-[#5865F2]" />
              <span>Join Community</span>
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
