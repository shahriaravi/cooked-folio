"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Return from "@/components/ui/Return";
import { SlideToVibeButton } from "@/components/vibe/SlideToVibeButton";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Pause,
  Play,
  RotateCcw,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import Image from "next/image";
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
  "Bruh, you just killed the vibe! Top 10 Anime Betrayals",
  "Not cool, bro. Not cool.",
  "Who gave you the aux?",
  "Explain yourself.",
  "Unbelievable! Ruined it.",
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
        playPromise.catch((e) =>
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
    <div className="h-screen w-full bg-background text-foreground flex flex-col items-center justify-center overflow-hidden relative px-4">
      {currentSong && (
        <audio ref={audioRef} src={currentSong} loop preload="auto" />
      )}

      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center min-h-[500px]">
        <AnimatePresence mode="popLayout">
          {hasEntered ? (
            <motion.div
              key="vibes-content"
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full flex justify-center -mt-20">
                <Return />
              </div>

              <div className="relative h-72 w-72 md:h-96 md:w-96 flex items-center justify-center my-8">
                <AnimatePresence mode="wait">
                  {showAngryState ? (
                    <motion.div
                      key="angry"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center z-10"
                    >
                      <h2 className="text-2xl md:text-4xl font-bold text-red-300 drop-shadow-lg leading-tight">
                        {getAngryMessage()}
                      </h2>
                      <div className="relative w-24 h-24 mx-auto mt-4">
                        <Image
                          src="/avatar/avatar-angry.png"
                          alt="Angry"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="vibing-monke"
                      className="relative w-full h-full"
                    >
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={currentImageIndex}
                          initial={{
                            opacity: 0,
                            scale: 0.8,
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
                            alt="Vibing Monkey"
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
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-6 bg-secondary/30 backdrop-blur-md px-8 py-4 rounded-full border border-white/5 shadow-2xl z-20"
              >
                <button
                  onClick={handleTogglePlayPause}
                  className="hover:scale-110 transition-transform text-foreground"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={cn(
                    "hover:scale-110 transition-transform",
                    isMuted ? "text-muted-foreground" : "text-primary"
                  )}
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <button
                  onClick={handleChangeSong}
                  disabled={isChangingSong}
                  className="hover:scale-110 transition-transform disabled:opacity-50"
                >
                  <RotateCcw
                    size={24}
                    className={cn(isChangingSong && "animate-spin")}
                  />
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button
                  onClick={() => setShowSongModal(true)}
                  className="hover:scale-110 transition-transform text-foreground"
                >
                  <Send size={24} />
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="slider-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center gap-6 z-10 w-full"
            >
              <div className="w-full max-w-sm flex justify-center">
                <SlideToVibeButton
                  onUnlock={handleEnter}
                  disabled={!currentSong || isPreparing}
                  label={isPreparing ? "Loading..." : "Slide to Vibe"}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                <AlertTriangle className="w-3 h-3" />
                <span>caution: audio incoming</span>
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-card border border-border/50 p-6 rounded-lg w-full max-w-sm shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Song Request
                </h3>
                <button onClick={() => setShowSongModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <Input
                autoFocus
                className="w-full"
                placeholder="Song name or URL..."
                value={songSuggestion}
                onChange={(e) => setSongSuggestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitSong()}
              />

              <Button
                onClick={handleSubmitSong}
                disabled={isSubmitting || !songSuggestion.trim()}
                className="w-full mt-4 h-12 text-sm font-semibold rounded-lg"
              >
                {isSubmitting
                  ? "Sending..."
                  : submitStatus === "success"
                  ? "Sent!"
                  : "Send Recommendation"}
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
