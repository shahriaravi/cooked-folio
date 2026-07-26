"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { PlaygroundControl } from "./types";

function serializeValue(control: PlaygroundControl, value: any): string {
  if (control.type === "multi-select") {
    return Array.isArray(value) ? value.join(",") : "";
  }
  if (control.type === "toggle") {
    return value ? "1" : "0";
  }
  return String(value);
}

function deserializeValue(
  control: PlaygroundControl,
  raw: string
): any {
  switch (control.type) {
    case "number":
    case "slider": {
      const n = Number(raw);
      return isNaN(n) ? control.default : n;
    }
    case "toggle":
      return raw === "1" || raw === "true";
    case "multi-select":
      return raw ? raw.split(",").filter(Boolean) : [];
    default:
      return raw;
  }
}

function valuesEqual(control: PlaygroundControl, a: any, b: any): boolean {
  if (control.type === "multi-select") {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => v === b[i]);
  }
  return a === b;
}

export function usePlaygroundState(controls: PlaygroundControl[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValues = Object.fromEntries(
    controls.map((c) => {
      const param = searchParams.get(c.key);
      if (param !== null) {
        return [c.key, deserializeValue(c, param)];
      }
      return [c.key, c.default];
    })
  );

  const [values, setValues] = useState<Record<string, any>>(initialValues);

  useEffect(() => {
    const params = new URLSearchParams();

    controls.forEach((control) => {
      const currentValue = values[control.key];
      if (!valuesEqual(control, currentValue, control.default)) {
        params.set(control.key, serializeValue(control, currentValue));
      }
    });

    const query = params.toString();
    const newUrl = query ? `?${query}` : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
  }, [values, controls]);

  const updateValue = useCallback((key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetAll = useCallback(() => {
    const defaults = Object.fromEntries(
      controls.map((c) => [c.key, c.default])
    );
    setValues(defaults);
  }, [controls]);

  return { values, updateValue, resetAll };
}