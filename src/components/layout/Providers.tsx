"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useRef } from "react";
import { bind } from "cuelume";

const TARGET_GAIN = 1.2;

export function Providers({ children }: { children: React.ReactNode }) {
  const patchedRef = useRef(false);

  useEffect(() => {
    bind();

    if (patchedRef.current) return;
    patchedRef.current = true;

    if (typeof window === "undefined") return;
    if (typeof AudioContext === "undefined") return;

    const originalCreateGain = AudioContext.prototype.createGain;

    (AudioContext.prototype as any).createGain = function () {
      const gainNode = originalCreateGain.call(this);
      const originalConnect = gainNode.connect.bind(gainNode);

      (gainNode as any).connect = function (
        destination: AudioNode | AudioParam,
        ...args: any[]
      ) {
        if (destination === this.context.destination) {
          gainNode.gain.value = TARGET_GAIN;
        }
        return (originalConnect as any)(destination, ...args);
      };

      return gainNode;
    };
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