"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}
export default function NowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing");
        if (!res.ok) throw new Error("API response not OK");
        const json = await res.json();
        setData(json);
      } catch {
        setData({ isPlaying: false });
      }
    };
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={data ? (data.isPlaying ? "playing" : "not-playing") : "loading"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3 text-sm md:text-base"
        >
          {!data ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>loading spotify...</span>
            </div>
          ) : data.isPlaying ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              {data.albumImageUrl && (
                <Image
                  src={data.albumImageUrl}
                  alt={data.title || "album art"}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-[10px] shadow-sm border border-white/5"
                  unoptimized
                />
              )}

              <svg
                className="w-4 h-4 text-green-500 flex-shrink-0"
                viewBox="0 0 168 168"
                fill="currentColor"
              >
                <path d="M83.996 0C37.747 0 0 37.747 0 83.996c0 46.249 37.747 83.996 83.996 83.996 46.249 0 83.996-37.747 83.996-83.996C167.992 37.747 130.245 0 83.996 0zm38.446 120.988c-1.509 2.471-4.723 3.246-7.178 1.737-19.662-12.01-44.414-14.736-73.564-8.075-2.809.642-5.601-1.121-6.243-3.93-.643-2.808 1.12-5.6 3.929-6.242 31.9-7.291 59.263-4.15 81.336 9.334 2.46 1.51 3.235 4.715 1.72 7.176zm10.25-22.799c-1.894 3.073-5.912 4.037-8.981 2.15-22.505-13.834-56.822-17.841-83.447-9.759-3.453 1.043-7.1-.903-8.148-4.35-1.04-3.453.907-7.093 4.354-8.143 30.413-9.228 68.221-4.758 94.071 11.127 3.07 1.89 4.04 5.91 2.151 8.976zm.88-23.744c-26.994-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.722 2.209 4.943 7.016 2.737 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
              </svg>

              <div className="flex flex-wrap items-baseline gap-x-1.5 min-w-0">
                <span className="text-foreground font-semibold">
                  Listening to
                </span>

                <a
                  href={data.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wavy-underline group cursor-pointer"
                  title={`Play ${data.title} on Spotify`}
                >
                  <span className="text-foreground font-semibold truncate max-w-[160px] sm:max-w-xs group-hover:text-primary transition-colors">
                    {data.title}
                  </span>
                </a>
                <span className="text-muted-foreground">by</span>
                <span className="text-muted-foreground truncate max-w-[140px] sm:max-w-xs">
                  {data.artist}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg
                className="w-4 h-4"
                viewBox="0 0 168 168"
                fill="currentColor"
              >
                <path d="M83.996 0C37.747 0 0 37.747 0 83.996c0 46.249 37.747 83.996 83.996 83.996 46.249 0 83.996-37.747 83.996-83.996C167.992 37.747 130.245 0 83.996 0zm38.446 120.988c-1.509 2.471-4.723 3.246-7.178 1.737-19.662-12.01-44.414-14.736-73.564-8.075-2.809.642-5.601-1.121-6.243-3.93-.643-2.808 1.12-5.6 3.929-6.242 31.9-7.291 59.263-4.15 81.336 9.334 2.46 1.51 3.235 4.715 1.72 7.176zm10.25-22.799c-1.894 3.073-5.912 4.037-8.981 2.15-22.505-13.834-56.822-17.841-83.447-9.759-3.453 1.043-7.1-.903-8.148-4.35-1.04-3.453.907-7.093 4.354-8.143 30.413-9.228 68.221-4.758 94.071 11.127 3.07 1.89 4.04 5.91 2.151 8.976zm.88-23.744c-26.994-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.722 2.209 4.943 7.016 2.737 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
              </svg>
              <span>- not listening to anything rn.</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
