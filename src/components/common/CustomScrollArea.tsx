"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  showFadeEdges?: boolean;
  thumbClassName?: string;
  trackClassName?: string;
}

export function CustomScrollArea({
  children,
  className,
  showFadeEdges = true,
  thumbClassName,
  trackClassName,
}: CustomScrollAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const thumbWidth = useMotionValue(0);
  const thumbX = useMotionValue(0);
  const springThumbX = useSpring(thumbX, { stiffness: 300, damping: 30 });

  const checkOverflow = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const containerWidth = container.clientWidth;
    const contentWidth = content.scrollWidth;
    
    setHasOverflow(contentWidth > containerWidth + 1);
  }, []);

  const updateThumb = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const track = trackRef.current;

    if (!container || !content || !track || !hasOverflow) return;

    const containerWidth = container.clientWidth;
    const contentWidth = content.scrollWidth;
    const trackWidth = track.clientWidth;

    const ratio = containerWidth / contentWidth;
    const newThumbWidth = Math.max(ratio * trackWidth, 40);
    thumbWidth.set(newThumbWidth);

    const maxScroll = contentWidth - containerWidth;
    const maxThumbX = trackWidth - newThumbWidth;
    
    if (maxScroll <= 0) {
        thumbX.set(0);
        return;
    }

    const scrollRatio = container.scrollLeft / maxScroll;
    thumbX.set(scrollRatio * maxThumbX);

    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(container.scrollLeft < maxScroll - 10);
  }, [hasOverflow, thumbWidth, thumbX]);

  const handleScroll = () => {
    updateThumb();
  };

  const handleThumbDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const startX = event.clientX;
    const startThumbX = thumbX.get();
    const trackRect = track.getBoundingClientRect();
    const currentThumbWidth = thumbWidth.get();
    const maxThumbX = trackRect.width - currentThumbWidth;

    const contentWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;
    const maxScroll = contentWidth - containerWidth;

    const handleMove = (e: PointerEvent) => {
      const deltaX = e.clientX - startX;
      const newThumbX = Math.max(0, Math.min(maxThumbX, startThumbX + deltaX));
      
      const scrollRatio = newThumbX / maxThumbX;
      container.scrollLeft = scrollRatio * maxScroll;
    };

    const handleUp = () => {
      setIsDragging(false);
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
  };

  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const trackRect = track.getBoundingClientRect();
    const clickX = event.clientX - trackRect.left;
    const currentThumbWidth = thumbWidth.get();
    const maxThumbX = trackRect.width - currentThumbWidth;

    const contentWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;
    const maxScroll = contentWidth - containerWidth;

    const targetThumbX = Math.max(0, Math.min(maxThumbX, clickX - currentThumbWidth / 2));
    const scrollRatio = targetThumbX / maxThumbX;
    
    animate(container.scrollLeft, scrollRatio * maxScroll, {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => (container.scrollLeft = v),
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const observer = new ResizeObserver(() => {
      checkOverflow();
      if (trackRef.current) updateThumb();
    });

    observer.observe(container);
    observer.observe(content);

    checkOverflow();

    return () => observer.disconnect();
  }, [checkOverflow, updateThumb]);

  useEffect(() => {
    if (hasOverflow) {
        updateThumb();
    }
  }, [hasOverflow, updateThumb]);

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {showFadeEdges && hasOverflow && (
        <>
          <div
            className={cn(
              "pointer-events-none absolute left-0 top-0 bottom-4 w-8 z-10",
              "bg-gradient-to-r from-background to-transparent",
              "transition-opacity duration-300",
              canScrollLeft ? "opacity-100" : "opacity-0"
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute right-0 top-0 bottom-4 w-8 z-10",
              "bg-gradient-to-l from-background to-transparent",
              "transition-opacity duration-300",
              canScrollRight ? "opacity-100" : "opacity-0"
            )}
          />
        </>
      )}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-hide touch-pan-x"
      >
        <div ref={contentRef} className="inline-flex min-w-full">
          {children}
        </div>
      </div>

      {hasOverflow && (
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className={cn(
            "relative h-1.5 mt-3 mx-1 rounded-full cursor-pointer select-none touch-none",
            "bg-muted/40 dark:bg-muted/20",
            "transition-all duration-300",
            isHovering || isDragging ? "opacity-100 h-2" : "opacity-60",
            trackClassName
          )}
        >
          <motion.div
            style={{
              width: thumbWidth,
              x: springThumbX,
            }}
            onPointerDown={handleThumbDrag}
            className={cn(
              "absolute top-0 h-full rounded-full cursor-grab active:cursor-grabbing",
              "bg-gradient-to-r from-primary/60 via-primary to-primary/60",
              "hover:from-primary/80 hover:via-primary hover:to-primary/80",
              "transition-colors duration-200",
              "shadow-[0_0_8px_rgba(59,130,246,0.3)]",
              isDragging && "from-primary hover:from-primary",
              thumbClassName
            )}
          >
             <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-0 hover:opacity-50 transition-opacity">
               <div className="w-[2px] h-1/2 rounded-full bg-primary-foreground/40" />
               <div className="w-[2px] h-1/2 rounded-full bg-primary-foreground/40" />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}