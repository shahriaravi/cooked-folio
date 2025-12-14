import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <main className={cn("mx-auto max-w-3xl px-6 py-10 md:py-16", className)}>
      {children}
    </main>
  );
}
