"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { play } from "cuelume";

type ThemeToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export default function ThemeToggle({
  className,
  onClick,
  ...rest
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    play("toggle");
    onClick?.(e);
  };

  if (!mounted) {
    return <div className="h-4 w-4" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      {...rest}
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-5 w-5 items-center justify-center overflow-hidden text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-500",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-180 scale-0 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-500",
          !isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-180 scale-0 opacity-0"
        )}
      />
    </button>
  );
}