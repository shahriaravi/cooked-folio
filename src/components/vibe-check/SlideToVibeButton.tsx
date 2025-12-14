"use client";

import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SlideToVibeButtonProps {
  onUnlock: () => void;
  disabled?: boolean;
  label?: string;
}

export function SlideToVibeButton({ onUnlock, disabled, label = "slide to vibe" }: SlideToVibeButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const maxWidth = 260;
  const handleSize = 52;
  const maxDrag = maxWidth - handleSize - 8;

  const opacity = useTransform(x, [0, maxDrag / 2], [1, 0]);
  const bgOpacity = useTransform(x, [0, maxDrag], [0, 1]);

  async function handleDragEnd() {
    const currentX = x.get();
    setIsDragging(false);

    if (currentX >= maxDrag - 10) {
      await controls.start({ x: maxDrag });
      onUnlock();
    } else {
      controls.start({ x: 0 });
    }
  }

  return (
    <div 
      className={`
        relative w-[260px] h-[60px] rounded-full 
        bg-white/5 border border-white/5 shadow-2xl shadow-black/20
        backdrop-blur-md overflow-hidden select-none
        transition-opacity duration-300
        ${disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"}
      `}
    >
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-primary/20"
      />

      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="text-sm font-medium text-white/40 tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white/40 via-white to-white/40 animate-shimmer bg-[length:200%_auto]">
          {label}
        </span>
        <ChevronRight className="w-4 h-4 text-white/20 ml-1 animate-pulse" />
      </motion.div>

      <motion.div
        drag={disabled ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-[3px] left-[4px] w-[52px] h-[52px] rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center z-10 overflow-hidden"
      >
        <Image 
          src="/avatar/avatar.png" 
          alt="slide handle"
          width={52} 
          height={52} 
          className="object-cover w-full h-full hover:opacity-90 transition-opacity"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}