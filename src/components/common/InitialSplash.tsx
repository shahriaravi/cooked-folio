"use client";

import { useEffect, useState } from "react";
import { HelloLoader } from "./HelloLoader";

const SPLASH_KEY = "avi-splash-shown";

export function InitialSplash({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SPLASH_KEY) === "1";
    } catch {}

    if (seen) {
      setChecked(true);
      return;
    }

    setShowSplash(true);
    setChecked(true);

    const id = setTimeout(() => {
      try {
        sessionStorage.setItem(SPLASH_KEY, "1");
      } catch {}
      setShowSplash(false);
    }, 1200);

    return () => clearTimeout(id);
  }, []);

  if (!checked) {
    return <>{children}</>;
  }

  if (showSplash) {
    return <HelloLoader />;
  }

  return <>{children}</>;
}