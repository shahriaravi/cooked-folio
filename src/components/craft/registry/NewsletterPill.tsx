"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, Bell, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type ViewState = "cta" | "form" | "success";

interface NewsletterPillProps {
  endpoint?: string;
  ctaLabel?: string;
  submitLabel?: string;
  successMessage?: string;
  placeholder?: string;
  onSubscribe?: (email: string) => Promise<void> | void;
  className?: string;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  size: number;
  shape: "circle" | "square";
}

const CONFETTI_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#06b6d4",
  "#a855f7",
];

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 22,
  mass: 0.9,
};

function generateConfetti(count: number): ConfettiParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 480,
    y: -(Math.random() * 320 + 40),
    rotate: (Math.random() - 0.5) * 720,
    color:
      CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 8 + 4,
    shape: Math.random() > 0.5 ? "circle" : "square",
  }));
}

export default function NewsletterPill({
  endpoint = "/api/subscribe",
  ctaLabel = "Notify Me",
  submitLabel = "Subscribe",
  successMessage = "You're in the club 🎉",
  placeholder = "your@email.com",
  onSubscribe,
  className = "",
}: NewsletterPillProps) {
  const [view, setView] = useState<ViewState>("cta");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (view === "form") {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [view]);

  useEffect(() => {
    if (confetti.length === 0) return;
    const timer = setTimeout(() => setConfetti([]), 3000);
    return () => clearTimeout(timer);
  }, [confetti]);

  const handleOpenForm = () => {
    setError(null);
    setView("form");
  };

  const handleBlur = () => {
    if (!email.trim() && !isSubmitting) {
      setError(null);
      setView("cta");
    }
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setError("Please enter an email");
      return;
    }

    if (!validateEmail(trimmed)) {
      setError("That doesn't look like a valid email");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      if (onSubscribe) {
        await onSubscribe(trimmed);
      } else {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });

        if (res.status === 409) {
          throw new Error("You're already subscribed");
        }

        if (!res.ok) {
          throw new Error("Something went wrong. Try again?");
        }
      }

      setView("success");
      if (!prefersReducedMotion) {
        setConfetti(generateConfetti(120));
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <AnimatePresence>
          {confetti.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                rotate: particle.rotate,
                scale: 0.5,
              }}
              transition={{
                duration: 2.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                borderRadius: particle.shape === "circle" ? "50%" : "2px",
              }}
              aria-hidden="true"
            />
          ))}
        </AnimatePresence>
      </div>

      <LayoutGroup id="newsletter-pill-group">
        <AnimatePresence mode="popLayout">
          {view === "cta" && (
            <motion.button
              key="cta"
              type="button"
              layoutId="newsletter-pill"
              onClick={handleOpenForm}
              transition={springTransition}
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 font-semibold text-primary-foreground shadow-sm outline-none transition-colors duration-150 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
              style={{ fontSize: "14px", lineHeight: "20px" }}
              aria-label="Subscribe to newsletter"
            >
              <motion.span
                layoutId="newsletter-icon"
                transition={springTransition}
                className="inline-flex h-4 w-4 shrink-0 items-center justify-center"
              >
                <Bell className="h-4 w-4" strokeWidth={2.25} />
              </motion.span>
              <motion.span
                layoutId="newsletter-text"
                transition={springTransition}
                className="whitespace-nowrap"
              >
                {ctaLabel}
              </motion.span>
            </motion.button>
          )}

          {view === "form" && (
            <motion.form
              key="form"
              layoutId="newsletter-pill"
              onSubmit={handleSubmit}
              transition={springTransition}
              className={`relative flex h-10 w-full max-w-[320px] items-center gap-1.5 rounded-full border bg-card p-1 pl-3 shadow-sm outline-none transition-colors duration-150 focus-within:ring-2 focus-within:ring-primary/30 focus-within:ring-offset-2 focus-within:ring-offset-background motion-reduce:transition-none ${
                error
                  ? "border-red-400/60"
                  : "border-border/60"
              }`}
            >
              <motion.span
                layoutId="newsletter-icon"
                transition={springTransition}
                className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground"
              >
                <Bell className="h-4 w-4" strokeWidth={2.25} />
              </motion.span>

              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                onBlur={handleBlur}
                placeholder={placeholder}
                disabled={isSubmitting}
                spellCheck={false}
                autoComplete="email"
                aria-label="Email address"
                aria-invalid={error ? true : undefined}
                className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/50 disabled:opacity-60 sm:text-sm"
                style={{ lineHeight: "20px" }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 font-semibold text-primary-foreground outline-none transition-colors duration-150 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-70 motion-reduce:transition-none"
                style={{ fontSize: "13px", lineHeight: "1" }}
                aria-label={isSubmitting ? "Subscribing" : submitLabel}
              >
                {isSubmitting ? (
                  <Loader2
                    className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                ) : (
                  <>
                    <span>{submitLabel}</span>
                    <ArrowRight
                      className="h-3 w-3"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </motion.form>
          )}

          {view === "success" && (
            <motion.div
              key="success"
              layoutId="newsletter-pill"
              transition={springTransition}
              className="inline-flex h-10 items-center rounded-full px-4 font-semibold text-foreground"
              style={{ fontSize: "14px", lineHeight: "20px" }}
              role="status"
              aria-live="polite"
            >
              <motion.span
                layoutId="newsletter-text"
                transition={springTransition}
                className="whitespace-nowrap"
              >
                {successMessage}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            role="alert"
            className="text-center text-red-400"
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.1px",
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}