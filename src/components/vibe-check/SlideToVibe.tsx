"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SlideToVibeButton } from "@/components/vibe-check/SlideToVibeButton";

const audioFiles = [
  "/audio/song1.mp3",
  "/audio/song2.mp3",
  "/audio/song3.mp3",
];

const cyclingImages = [
  "/images/monkeys/monkey-1.png",
  "/images/monkeys/monkey-2.png",
  "/images/monkeys/monkey-3.png",
  "/images/monkeys/monkey-4.png",
  "/images/monkeys/monkey-5.png",
];

export default function SlideToVibe() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const randomSong = audioFiles[Math.floor(Math.random() * audioFiles.length)];
    setCurrentSong(randomSong);
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    const id = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cyclingImages.length);
    }, 4000); 
    return () => clearInterval(id);
  }, [hasEntered]);

  const handleEnter = () => {
    if (hasEntered || isPreparing || !audioRef.current) return;

    setIsPreparing(true);

    const playAudioOnReady = () => {
      setHasEntered(true);
      setIsPreparing(false);
      audioRef.current?.play().catch((e) => console.error(e));
    };

    if (audioRef.current.readyState >= 3) {
      playAudioOnReady();
    } else {
      audioRef.current.addEventListener("canplaythrough", playAudioOnReady, { once: true });
      audioRef.current.load();
    }
  };

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col items-center justify-center overflow-hidden relative">
      
      {currentSong && (
        <audio ref={audioRef} src={currentSong} loop preload="auto" />
      )}

      <div className="relative w-full max-w-lg flex items-center justify-center">
        
        <AnimatePresence>
          {hasEntered && (
            <motion.div
              key="monkey-container"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                    transition={{ duration: 1.5, ease: "anticipate" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={cyclingImages[currentImageIndex]}
                      alt="vibes"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!hasEntered && (
            <motion.div
              key="slider-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, pointerEvents: "none" }}
              transition={{ duration: 0.5 }}
              className="z-20"
            >
              <SlideToVibeButton
                onUnlock={handleEnter}
                disabled={isPreparing || !currentSong}
                label={isPreparing ? "loading tunes..." : "slide to vibe"}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}