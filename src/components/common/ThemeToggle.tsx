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

  return (
    <button
      {...rest}
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}