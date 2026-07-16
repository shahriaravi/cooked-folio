"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { bind } from "cuelume";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    bind();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}