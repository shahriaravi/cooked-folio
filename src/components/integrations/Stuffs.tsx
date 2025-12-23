"use client";

import { MalData, TraktStats } from "@/app/api/stuffs/api";
import Return from "@/components/ui/Return";
import { GAMES, SPOTIFY_PLAYLIST, YOUTUBE_PLAYLISTS } from "@/lib/stuffs";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clapperboard,
  Clock,
  ExternalLink,
  Film,
  Gamepad2,
  Play,
  PlayCircle,
  Tv,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiMyanimelist, SiSpotify, SiYoutube } from "react-icons/si";

interface StuffsGridProps {
  trakt: TraktStats | null;
  mal: MalData | null;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function StuffsGrid({ trakt, mal }: StuffsGridProps) {
  const formatDaysInt = (mins: number) => {
    if (!mins) return "0 Days";
    return `${Math.floor(mins / 60 / 24)} Days`;
  };

  const totalTraktDays = trakt
    ? Math.floor((trakt.movies.minutes + trakt.episodes.minutes) / 60 / 24)
    : 0;

  return (
    <div className="layout-container">
      <div className="mb-10">
        <Return className="mb-6" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-medium text-foreground tracking-tight mb-2">
            stuffs
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            statistically proving i have no life. here is the data on how i fry
            my dopamine receptors.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min"
      >
        {trakt && (
          <motion.div
            variants={item}
            className="md:col-span-2 p-8 rounded-xl bg-card/40 border border-border/50 relative overflow-hidden group"
          >
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                  <Clapperboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-medium leading-none text-foreground">
                    Trakt.tv
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs font-medium text-primary">
                      {totalTraktDays} Days Total Watched
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Film className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Movies
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-foreground tracking-tight">
                    {trakt.movies.watched.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground/60 mt-1">
                    {formatDaysInt(trakt.movies.minutes)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Tv className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Shows
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-foreground tracking-tight">
                    {trakt.shows.watched.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground/60 mt-1">
                    {formatDaysInt(trakt.episodes.minutes)}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-[-10%] top-[-10%] h-[120%] w-[40%] opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none rotate-12">
              <PlayCircle className="w-full h-full" />
            </div>
          </motion.div>
        )}

        <motion.div variants={item} className="h-full">
          <Link
            href={SPOTIFY_PLAYLIST.url}
            target="_blank"
            className="block h-full group"
          >
            <div className="relative h-full overflow-hidden rounded-xl border border-border/50 bg-card/40 p-6 flex flex-col justify-center min-h-[200px]">
              <div className="absolute inset-0 z-0">
                <Image
                  src={SPOTIFY_PLAYLIST.cover}
                  alt="blur"
                  fill
                  className="object-cover opacity-25 blur-2xl scale-125 transition-transform duration-700 group-hover:scale-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center gap-5">
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={SPOTIFY_PLAYLIST.cover}
                    alt={SPOTIFY_PLAYLIST.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <SiSpotify className="w-8 h-8 text-[#1DB954]" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-widest">
                      On Repeat
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-[#1DB954] transition-colors line-clamp-2">
                    {SPOTIFY_PLAYLIST.name}
                  </h3>

                  <div className="flex items-end gap-1 h-4 mt-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: ["20%", "100%", "50%", "80%", "20%"],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.1,
                          ease: "easeInOut",
                        }}
                        className="w-1.5 bg-foreground/30 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {mal && (
          <motion.div
            variants={item}
            className="p-6 rounded-xl bg-[#2e51a2]/5 border border-[#2e51a2]/20 flex flex-col justify-center h-full min-h-[200px] hover:bg-[#2e51a2]/10 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-[#2e51a2]/10 rounded-lg text-[#2e51a2]">
                <SiMyanimelist className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-medium leading-none">
                  MyAnimeList
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Otaku stats
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Entries
                </span>
                <span className="text-xl font-bold text-foreground font-mono">
                  {mal.stats.anime.total_entries}
                </span>
              </div>
              <div className="w-full h-px bg-[#2e51a2]/10" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Arc Duration
                </span>
                <span className="text-xl font-bold text-foreground font-mono">
                  {mal.stats.anime.days_watched.toFixed(0)} Days
                </span>
              </div>
              <div className="w-full h-px bg-[#2e51a2]/10" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Mean Score
                </span>
                <span className="text-2xl font-bold text-[#2e51a2] font-mono">
                  {mal.stats.anime.mean_score}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={item} className="md:col-span-2 pt-8">
          <div className="flex items-center gap-3 mb-6 px-1">
            <Gamepad2 className="w-5 h-5 text-primary" />
            <div>
              <h3 className="text-sm font-medium leading-none">Games I Play</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                where my elo goes to die
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GAMES.map((game) => (
              <div
                key={game.name}
                className="flex items-center gap-3 p-4 rounded-lg border border-border/40 bg-card/20 hover:bg-card/40 transition-colors"
              >
                <game.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {game.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="md:col-span-2 pt-8">
          <div className="flex items-center gap-3 mb-8 px-1">
            <SiYoutube className="w-5 h-5 text-[#FF0000]" />
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Playlists
            </span>
          </div>

          <div className="space-y-6">
            {YOUTUBE_PLAYLISTS.map((list) => (
              <Link
                key={list.url}
                href={list.url}
                target="_blank"
                className="group flex flex-col sm:flex-row gap-6 items-start sm:items-center p-2 rounded-lg transition-all duration-300 hover:bg-white/5"
              >
                <div className="relative w-full sm:w-48 aspect-video shrink-0 rounded-lg overflow-hidden bg-muted shadow-sm ring-1 ring-border/50">
                  <Image
                    src={list.cover}
                    alt={list.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <h4 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {list.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal">
                    {list.description}
                  </p>
                </div>

                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-transparent group-hover:border-border/50 group-hover:bg-card transition-all">
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
