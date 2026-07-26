"use client";

import type { PlaygroundConfig, PlaygroundControl } from "./types";
import { RotateCcw } from "lucide-react";
import { play } from "cuelume";
import {
  ColorControl,
  MultiSelectControl,
  NumberControl,
  SelectControl,
  SliderControl,
  TextControl,
  ToggleControl,
} from "./Controls";
import { usePlaygroundState } from "./usePlaygroundState";

interface PlaygroundLayoutProps {
  config: PlaygroundConfig;
}

export function PlaygroundLayout({ config }: PlaygroundLayoutProps) {
  const { values, updateValue, resetAll } = usePlaygroundState(config.controls);

  const { Component } = config;

  const handleReset = () => {
    resetAll();
    play("press");
  };

  return (
    <div>
      <div className="mb-2">
        <span
          className="font-mono uppercase tracking-[0.14em] text-muted-foreground/70"
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          playground
        </span>
      </div>

      <h1
        className="mb-4 font-semibold text-foreground"
        style={{
          fontSize: "clamp(26px, 4vw, 32px)",
          lineHeight: "1.2",
          letterSpacing: "-0.02em",
        }}
      >
        {config.title}
      </h1>

      <p
        className="mb-10 text-muted-foreground"
        style={{
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0.2px",
        }}
      >
        {config.description}
      </p>

      <div className="mb-12 flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-card p-8">
        <Component {...values} />
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2
            className="font-semibold text-foreground"
            style={{
              fontSize: "20px",
              lineHeight: "26px",
              letterSpacing: "-0.01em",
            }}
          >
            Customize
          </h2>

          <button
            onClick={handleReset}
            data-cuelume-hover="tick"
            data-cuelume-press
            className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card px-2.5 py-1.5 font-mono uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            style={{ fontSize: "11px", lineHeight: "1" }}
          >
            <RotateCcw className="h-3 w-3" strokeWidth={2.25} />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {config.controls.map((control) => (
            <ControlRenderer
              key={control.key}
              control={control}
              value={values[control.key]}
              onChange={(v) => updateValue(control.key, v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ControlRenderer({
  control,
  value,
  onChange,
}: {
  control: PlaygroundControl;
  value: any;
  onChange: (v: any) => void;
}) {
  switch (control.type) {
    case "text":
      return (
        <TextControl
          label={control.label}
          value={value}
          onChange={onChange}
          placeholder={control.placeholder}
        />
      );
    case "number":
      return (
        <NumberControl
          label={control.label}
          value={value}
          onChange={onChange}
          min={control.min}
          max={control.max}
          step={control.step}
        />
      );
    case "slider":
      return (
        <SliderControl
          label={control.label}
          value={value}
          onChange={onChange}
          min={control.min}
          max={control.max}
          step={control.step}
          unit={control.unit}
        />
      );
    case "color":
      return (
        <ColorControl label={control.label} value={value} onChange={onChange} />
      );
    case "select":
      return (
        <SelectControl
          label={control.label}
          value={value}
          onChange={onChange}
          options={control.options}
        />
      );
    case "multi-select":
      return (
        <MultiSelectControl
          label={control.label}
          value={value}
          onChange={onChange}
          options={control.options}
        />
      );
    case "toggle":
      return (
        <ToggleControl label={control.label} value={value} onChange={onChange} />
      );
    default:
      return null;
  }
}