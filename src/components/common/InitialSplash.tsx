"use client";

import { useEffect, useState } from "react";
import { HelloLoader } from "./HelloLoader";

export function InitialSplash({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setShowSplash(false);
    }, 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {showSplash && <HelloLoader />}
      <div
        className={
          showSplash
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-300"
        }
      >
        {children}
      </div>
    </>
  );
}
