"use client";

import { useState } from "react";
import { Check, Moon, Sun, X } from "lucide-react";
import { play } from "cuelume";

interface ToggleShowcaseProps {
  size?: "sm" | "md" | "lg";
  width?: number;
  radius?: number;
  onColor?: string;
  offColor?: string;
  thumbColor?: string;
  thumbShape?: "circle" | "square" | "pill";
  showIcons?: boolean;
  iconStyle?: "check-x" | "sun-moon" | "none";
  label?: string;
  showLabel?: boolean;
  labelPosition?: "left" | "right";
  disabled?: boolean;
  defaultOn?: boolean;
  compact?: boolean;
}

const sizeMap = {
  sm: { height: 18, thumbSize: 14, iconSize: 8, fontSize: "12px" },
  md: { height: 24, thumbSize: 20, iconSize: 10, fontSize: "13px" },
  lg: { height: 32, thumbSize: 26, iconSize: 14, fontSize: "15px" },
};

export default function ToggleShowcase({
  size = "md",
  width = 44,
  radius = 999,
  onColor = "#3b82f6",
  offColor = "#3f3f46",
  thumbColor = "#ffffff",
  thumbShape = "circle",
  showIcons = false,
  iconStyle = "check-x",
  label = "Enable notifications",
  showLabel = true,
  labelPosition = "left",
  disabled = false,
  defaultOn = false,
  compact = false,
}: ToggleShowcaseProps) {
  const s = sizeMap[size] ?? sizeMap.md;
  const [isOn, setIsOn] = useState(defaultOn);

  if (compact) {
    const cTrackHeight = 24;
    const cTrackWidth = 44;
    const cThumbSize = 20;
    const cThumbPadding = (cTrackHeight - cThumbSize) / 2;
    const cMaxTranslate = cTrackWidth - cThumbSize - cThumbPadding * 2;

    return (
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: `${cTrackWidth}px`,
          height: `${cTrackHeight}px`,
          borderRadius: `${cTrackHeight / 2}px`,
          backgroundColor: "#3b82f6",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: `${cThumbPadding}px`,
            width: `${cThumbSize}px`,
            height: `${cThumbSize}px`,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.25)",
            transform: `translateY(-50%) translateX(${cMaxTranslate}px)`,
          }}
        />
      </div>
    );
  }

  const trackHeight = s.height;
  const trackWidth = width;
  const thumbPadding = (trackHeight - s.thumbSize) / 2;
  const maxTranslate = trackWidth - s.thumbSize - thumbPadding * 2;

  const trackRadius = radius >= 999 ? trackHeight / 2 : radius;
  const thumbRadius =
    thumbShape === "circle"
      ? s.thumbSize / 2
      : thumbShape === "square"
        ? 4
        : s.thumbSize / 3;

  const handleToggle = () => {
    if (disabled) return;
    play("toggle");
    setIsOn((prev) => !prev);
  };

  const ToggleElement = (
    <button
      onClick={handleToggle}
      disabled={disabled}
      data-cuelume-hover="tick"
      style={{
        position: "relative",
        width: `${trackWidth}px`,
        height: `${trackHeight}px`,
        borderRadius: `${trackRadius}px`,
        backgroundColor: isOn ? onColor : offColor,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 0.2s ease",
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: `${thumbPadding}px`,
          width: `${s.thumbSize}px`,
          height: `${s.thumbSize}px`,
          borderRadius: `${thumbRadius}px`,
          backgroundColor: thumbColor,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.25)",
          transform: `translateY(-50%) translateX(${
            isOn ? maxTranslate : 0
          }px)`,
          transition: "transform 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showIcons && iconStyle !== "none" && (
          <>
            {iconStyle === "check-x" &&
              (isOn ? (
                <Check
                  style={{
                    width: `${s.iconSize}px`,
                    height: `${s.iconSize}px`,
                    color: onColor,
                  }}
                  strokeWidth={3}
                />
              ) : (
                <X
                  style={{
                    width: `${s.iconSize}px`,
                    height: `${s.iconSize}px`,
                    color: offColor,
                  }}
                  strokeWidth={3}
                />
              ))}
            {iconStyle === "sun-moon" &&
              (isOn ? (
                <Sun
                  style={{
                    width: `${s.iconSize}px`,
                    height: `${s.iconSize}px`,
                    color: onColor,
                  }}
                  strokeWidth={2.5}
                />
              ) : (
                <Moon
                  style={{
                    width: `${s.iconSize}px`,
                    height: `${s.iconSize}px`,
                    color: offColor,
                  }}
                  strokeWidth={2.5}
                />
              ))}
          </>
        )}
      </span>
    </button>
  );

  if (!showLabel) return ToggleElement;

  const LabelElement = (
    <span
      className="text-foreground"
      style={{
        fontSize: s.fontSize,
        lineHeight: "1.2",
        fontFamily: "inherit",
        fontWeight: 500,
        letterSpacing: "0.1px",
      }}
    >
      {label}
    </span>
  );

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        flexDirection: labelPosition === "left" ? "row" : "row-reverse",
      }}
    >
      {LabelElement}
      {ToggleElement}
    </div>
  );
}