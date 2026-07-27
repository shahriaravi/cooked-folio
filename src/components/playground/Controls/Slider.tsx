"use client";

import { play } from "cuelume";
import { useCallback, useEffect, useId, useRef, useState } from "react";

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
}: SliderControlProps) {
  const id = useId();
  const valueId = `${id}-value`;
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const range = max - min;
  const percent = ((value - min) / range) * 100;
  const clampedPercent = Math.min(100, Math.max(0, percent));

  const displayValue = Number.isInteger(step)
    ? Math.round(value)
    : Math.round(value * 100) / 100;

  const stepDecimals = step.toString().split(".")[1]?.length ?? 0;

  const roundToStep = useCallback(
    (v: number) => {
      const stepped = Math.round((v - min) / step) * step + min;
      const clamped = Math.min(max, Math.max(min, stepped));
      return parseFloat(clamped.toFixed(stepDecimals));
    },
    [min, max, step, stepDecimals]
  );

  const valueFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return value;
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(
        1,
        Math.max(0, (clientX - rect.left) / rect.width)
      );
      const raw = min + ratio * range;
      return roundToStep(raw);
    },
    [min, range, roundToStep, value]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    const next = valueFromClientX(e.clientX);
    if (next !== value) onChange(next);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const next = valueFromClientX(e.clientX);
    if (next !== value) onChange(next);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
    play("press");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    const bigStep = Math.max(step, range / 10);

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      next = roundToStep(value + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      next = roundToStep(value - step);
    } else if (e.key === "PageUp") {
      next = roundToStep(value + bigStep);
    } else if (e.key === "PageDown") {
      next = roundToStep(value - bigStep);
    } else if (e.key === "Home") {
      next = min;
    } else if (e.key === "End") {
      next = max;
    }

    if (next !== null) {
      e.preventDefault();
      if (next !== value) onChange(next);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const preventScroll = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchmove", preventScroll, { passive: false });
    return () => document.removeEventListener("touchmove", preventScroll);
  }, [isDragging]);

  const showEnlarged = isDragging || isHovering || isFocused;

  return (
    <div className="group/row flex flex-col gap-3 rounded-xl px-3.5 py-3 transition-colors duration-150 hover:bg-foreground/[0.02]">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={id}
          className="min-w-0 select-none truncate text-foreground/85"
          style={{
            fontSize: "13px",
            lineHeight: "18px",
            letterSpacing: "0.1px",
          }}
        >
          {label}
        </label>

        <span
          id={valueId}
          className="shrink-0 font-mono tabular-nums text-foreground/70"
          style={{
            fontSize: "11px",
            lineHeight: "1",
            minWidth: "40px",
            textAlign: "right",
          }}
        >
          {displayValue}
          {unit && (
            <span className="ml-0.5 text-muted-foreground/50">{unit}</span>
          )}
        </span>
      </div>

      <div
        className="relative flex h-5 cursor-pointer items-center touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          ref={trackRef}
          className="relative h-[4px] w-full rounded-full bg-foreground/[0.06] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-foreground/70"
            style={{
              width: `${clampedPercent}%`,
              transition: isDragging
                ? "none"
                : "width 120ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{
              left: `${clampedPercent}%`,
              transition: isDragging
                ? "none"
                : "left 120ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              className="absolute top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background transition-[width,height,box-shadow] duration-200 ease-out motion-reduce:transition-none"
              style={{
                width: showEnlarged ? "16px" : "12px",
                height: showEnlarged ? "16px" : "12px",
                boxShadow: isDragging
                  ? "0 0 0 5px hsl(var(--foreground) / 0.08), 0 2px 4px rgba(0,0,0,0.25), 0 0 0 1px hsl(var(--foreground) / 0.9)"
                  : showEnlarged
                    ? "0 0 0 3px hsl(var(--foreground) / 0.06), 0 1px 3px rgba(0,0,0,0.2), 0 0 0 1px hsl(var(--foreground) / 0.85)"
                    : "0 1px 2px rgba(0,0,0,0.15), 0 0 0 1px hsl(var(--foreground) / 0.75)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-labelledby={id}
          aria-describedby={valueId}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${displayValue}${unit}`}
          className="sr-only"
        />
      </div>
    </div>
  );
}