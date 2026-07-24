"use client";

import { useEffect, useState } from "react";
import { HelloLoader } from "./HelloLoader";

const SPLASH_KEY = "avi-splash-shown";

export function InitialSplash({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SPLASH_KEY);

    if (alreadyShown) {
      setReady(true);
      return;
    }

    setShowSplash(true);
    const id = setTimeout(() => {
      setShowSplash(false);
      setReady(true);
      sessionStorage.setItem(SPLASH_KEY, "1");
    }, 1200);
    return () => clearTimeout(id);
  }, []);

  if (showSplash) {
    return <HelloLoader />;
  }

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}