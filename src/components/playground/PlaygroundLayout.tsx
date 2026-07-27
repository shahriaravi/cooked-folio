"use client";

import type { PlaygroundConfig, PlaygroundControl } from "./types";
import { RotateCcw, Settings2 } from "lucide-react";
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

  const groups: Record<string, PlaygroundControl[]> = {};
  const groupOrder: string[] = [];

  config.controls.forEach((control) => {
    const groupName = control.group ?? "General";
    if (!groups[groupName]) {
      groups[groupName] = [];
      groupOrder.push(groupName);
    }
    groups[groupName].push(control);
  });

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
        className="mb-4 text-balance font-semibold text-foreground"
        style={{
          fontSize: "clamp(26px, 4vw, 32px)",
          lineHeight: "1.2",
          letterSpacing: "-0.02em",
        }}
      >
        {config.title}
      </h1>

      <p
        className="mb-10 text-pretty text-muted-foreground"
        style={{
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0.2px",
        }}
      >
        {config.description}
      </p>

      <div className="mb-12 flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-card p-8">
        <Component {...values} />
      </div>

      <div>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="flex items-center gap-2">
            <Settings2
              className="h-4 w-4 text-muted-foreground"
              strokeWidth={2.25}
              aria-hidden="true"
            />
            <h2
              className="font-mono uppercase tracking-[0.14em] text-foreground/90"
              style={{
                fontSize: "12px",
                lineHeight: "1",
              }}
            >
              Customize
            </h2>
          </div>

          <button
            type="button"
            onClick={handleReset}
            data-cuelume-hover="tick"
            data-cuelume-press
            aria-label="Reset all controls to defaults"
            className="group/reset inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-150 hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            style={{ fontSize: "11px", lineHeight: "1" }}
          >
            <RotateCcw
              className="h-3 w-3 transition-transform duration-300 group-hover/reset:-rotate-90 motion-reduce:transition-none"
              strokeWidth={2.25}
            />
            Reset
          </button>
        </div>

        <div>
          {groupOrder.map((groupName, gIdx) => (
            <section
              key={groupName}
              className={gIdx > 0 ? "mt-6" : ""}
              aria-labelledby={`group-${gIdx}`}
            >
              {groupOrder.length > 1 && (
                <div className="px-1.5 pb-2.5">
                  <span
                    id={`group-${gIdx}`}
                    className="font-mono uppercase tracking-[0.16em] text-foreground/70"
                    style={{ fontSize: "11px", lineHeight: "1" }}
                  >
                    {groupName}
                  </span>
                </div>
              )}

              <div>
                {groups[groupName].map((control) => (
                  <div key={control.key}>
                    <ControlRenderer
                      control={control}
                      value={values[control.key]}
                      onChange={(v) => updateValue(control.key, v)}
                    />
                  </div>
                ))}
              </div>
            </section>
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