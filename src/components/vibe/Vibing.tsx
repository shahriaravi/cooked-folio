"use client";

import { SlideToVibeButton } from "@/components/vibe/SlideToVibeButton";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CornerDownLeft,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const audioFiles = [
  "/audio/song1.mp3",
  "/audio/song2.mp3",
  "/audio/song3.mp3",
  "/audio/song4.mp3",
  "/audio/song5.mp3",
];

const cyclingImages = [
  "/images/monkeys/monkey-1.png",
  "/images/monkeys/monkey-2.png",
  "/images/monkeys/monkey-3.png",
  "/images/monkeys/monkey-4.png",
  "/images/monkeys/monkey-5.png",
];

const ANGRY_MESSAGES = [
  "Bruh, you just killed the vibe. Top 10 Anime Betrayals",
  "Not cool, bro. Not cool.",
  "Who gave you the aux?",
  "Explain yourself.",
  "Unbelievable. Absolutely ruined it.",
];

export default function Vibing() {
  const [mounted, setMounted] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChangingSong, setIsChangingSong] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);
  const [showAngryState, setShowAngryState] = useState(false);
  const [showSongModal, setShowSongModal] = useState(false);
  const [songSuggestion, setSongSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
    const randomSong =
      audioFiles[Math.floor(Math.random() * audioFiles.length)];
    setCurrentSong(randomSong);
  }, []);

  useEffect(() => {
    if (!hasEntered || !isPlaying) return;
    const id = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cyclingImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [hasEntered, isPlaying]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (hasEntered && !isPlaying) {
      timeout = setTimeout(() => {
        setShowAngryState(true);
      }, 2000);
    } else {
      setShowAngryState(false);
    }
    return () => clearTimeout(timeout);
  }, [hasEntered, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.2;

    if (isPlaying && !isMuted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() =>
          console.log("Autoplay waiting for user interaction")
        );
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, isMuted, currentSong]);

  const handleEnter = () => {
    if (hasEntered || isPreparing) return;
    setIsPreparing(true);
    setTimeout(() => {
      setHasEntered(true);
      setIsPlaying(true);
      setIsPreparing(false);
    }, 800);
  };

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setPauseCount((prev) => prev + 1);
    } else {
      setIsPlaying(true);
    }
  };

  const handleChangeSong = () => {
    if (isChangingSong) return;
    setIsChangingSong(true);
    const availableSongs = audioFiles.filter((song) => song !== currentSong);
    const newSong =
      availableSongs[Math.floor(Math.random() * availableSongs.length)];

    setIsPlaying(false);
    setTimeout(() => {
      setCurrentSong(newSong);
      setIsPlaying(true);
      setIsChangingSong(false);
    }, 300);
  };

  const handleSubmitSong = async () => {
    if (!songSuggestion.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/song-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ song: songSuggestion.trim() }),
      });

      if (!res.ok) throw new Error("failed to submit");

      setSubmitStatus("success");
      setSongSuggestion("");

      setTimeout(() => {
        setShowSongModal(false);
        setSubmitStatus("idle");
      }, 1500);
    } catch (e) {
      console.error(e);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAngryMessage = () => {
    const index = Math.max(0, pauseCount - 1) % ANGRY_MESSAGES.length;
    return ANGRY_MESSAGES[index];
  };

  if (!mounted) return <div className="h-screen w-full bg-background" />;

  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-background text-foreground">
      {currentSong && (
        <audio ref={audioRef} src={currentSong} loop preload="auto" />
      )}

      <div className="layout-container relative z-20 !py-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <CornerDownLeft className="h-[14px] w-[14px] transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Back</span>
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 pb-16">
        <AnimatePresence mode="popLayout">
          {hasEntered ? (
            <motion.div
              key="vibes-content"
              className="flex w-full flex-col items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-10 flex h-72 w-72 items-center justify-center md:h-96 md:w-96">
                <AnimatePresence mode="wait">
                  {showAngryState ? (
                    <motion.div
                      key="angry"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="z-10 flex flex-col items-center text-center"
                    >
                      <span
                        className="mb-3 font-mono uppercase tracking-[0.14em] text-red-400/80"
                        style={{ fontSize: "11px", lineHeight: "1" }}
                      >
                        vibe interrupted
                      </span>
                      <h2
                        className="max-w-[420px] font-semibold text-foreground"
                        style={{
                          fontSize: "22px",
                          lineHeight: "28px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {getAngryMessage()}
                      </h2>
                      <div className="relative mt-5 h-24 w-24">
                        <Image
                          src="/avatar/avatar-angry.png"
                          alt="angry avi"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="vibing-monke"
                      className="relative h-full w-full"
                    >
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={currentImageIndex}
                          initial={{
                            opacity: 0,
                            scale: 0.85,
                            filter: "blur(10px)",
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            opacity: 0,
                            scale: 1.1,
                            filter: "blur(10px)",
                          }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={cyclingImages[currentImageIndex]}
                            alt="vibing monke"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 18 }}
                className="z-20 flex items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1.5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              >
                <ControlButton
                  onClick={handleTogglePlayPause}
                  label={isPlaying ? "pause" : "play"}
                  primary
                >
                  {isPlaying ? (
                    <Pause className="h-[18px] w-[18px]" />
                  ) : (
                    <Play className="ml-0.5 h-[18px] w-[18px]" />
                  )}
                </ControlButton>

                <span className="mx-0.5 h-6 w-px bg-border/60" />

                <ControlButton
                  onClick={() => setIsMuted(!isMuted)}
                  label={isMuted ? "unmute" : "mute"}
                  active={!isMuted}
                >
                  {isMuted ? (
                    <VolumeX className="h-[16px] w-[16px]" />
                  ) : (
                    <Volume2 className="h-[16px] w-[16px]" />
                  )}
                </ControlButton>

                <ControlButton
                  onClick={handleChangeSong}
                  disabled={isChangingSong}
                  label="next"
                >
                  <RotateCcw
                    className={cn(
                      "h-[16px] w-[16px]",
                      isChangingSong && "animate-spin"
                    )}
                  />
                </ControlButton>

                <span className="mx-0.5 h-6 w-px bg-border/60" />

                <ControlButton
                  onClick={() => setShowSongModal(true)}
                  label="request"
                >
                  <Send className="h-[16px] w-[16px]" />
                </ControlButton>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="slider-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="z-10 flex w-full flex-col items-center justify-center gap-6"
            >
              <div className="flex w-full max-w-sm justify-center">
                <SlideToVibeButton
                  onUnlock={handleEnter}
                  disabled={!currentSong || isPreparing}
                  label={isPreparing ? "loading..." : "slide to vibe"}
                />
              </div>

              <div
                className="flex items-center gap-2 text-muted-foreground/70"
                style={{
                  fontSize: "11px",
                  lineHeight: "1",
                  letterSpacing: "0.08em",
                }}
              >
                <AlertTriangle className="h-3 w-3" />
                <span className="font-mono uppercase">
                  caution · audio incoming
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSongModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSongModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative w-full max-w-sm rounded-2xl border border-border/60 bg-card p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span
                    className="font-mono uppercase tracking-[0.14em] text-muted-foreground"
                    style={{ fontSize: "10px", lineHeight: "1" }}
                  >
                    song request
                  </span>
                  <h3
                    className="font-semibold text-foreground"
                    style={{ fontSize: "16px", lineHeight: "20px" }}
                  >
                    got a banger?
                  </h3>
                </div>
                <button
                  onClick={() => setShowSongModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                  aria-label="close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <input
                autoFocus
                type="text"
                placeholder="song name or url..."
                value={songSuggestion}
                onChange={(e) => setSongSuggestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitSong()}
                className="h-11 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-background"
                style={{
                  fontSize: "15px",
                  lineHeight: "22px",
                  letterSpacing: "0.1px",
                }}
              />

              <button
                onClick={handleSubmitSong}
                disabled={isSubmitting || !songSuggestion.trim()}
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
                style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 600 }}
              >
                {isSubmitting ? (
                  <>
                    <span>sending</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : submitStatus === "success" ? (
                  <span>sent, thanks ✌️</span>
                ) : submitStatus === "error" ? (
                  <span>try again</span>
                ) : (
                  <>
                    <span>send recommendation</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

function ControlButton({
  children,
  onClick,
  disabled,
  label,
  active,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  active?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-90 disabled:opacity-40 disabled:hover:bg-transparent",
        primary
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : active
          ? "text-primary hover:bg-primary/10"
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}