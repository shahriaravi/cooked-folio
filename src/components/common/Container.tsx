import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-[44rem] px-6 pb-10 md:pb-16",
        className
      )}
    >
      {children}
    </main>
  );
}