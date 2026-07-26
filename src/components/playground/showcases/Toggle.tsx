"use client";

import { useState } from "react";
import { Check, Moon, Sun, X } from "lucide-react";

interface ToggleShowcaseProps {
  size: "sm" | "md" | "lg";
  width: number;
  radius: "full" | number;
  onColor: string;
  offColor: string;
  thumbColor: string;
  thumbShape: "circle" | "square" | "pill";
  showIcons: boolean;
  iconStyle: "check-x" | "sun-moon" | "none";
  label: string;
  showLabel: boolean;
  labelPosition: "left" | "right";
  disabled: boolean;
  defaultOn: boolean;
}

const sizeMap = {
  sm: { height: 18, thumbSize: 14, iconSize: 8, fontSize: "12px" },
  md: { height: 24, thumbSize: 20, iconSize: 10, fontSize: "13px" },
  lg: { height: 32, thumbSize: 26, iconSize: 14, fontSize: "15px" },
};

export default function ToggleShowcase({
  size,
  width,
  radius,
  onColor,
  offColor,
  thumbColor,
  thumbShape,
  showIcons,
  iconStyle,
  label,
  showLabel,
  labelPosition,
  disabled,
  defaultOn,
}: ToggleShowcaseProps) {
  const [isOn, setIsOn] = useState(defaultOn);
  const s = sizeMap[size];

  const trackHeight = s.height;
  const trackWidth = width;
  const thumbPadding = (trackHeight - s.thumbSize) / 2;
  const maxTranslate = trackWidth - s.thumbSize - thumbPadding * 2;

  const trackRadius = radius === "full" ? trackHeight / 2 : radius;
  const thumbRadius =
    thumbShape === "circle"
      ? s.thumbSize / 2
      : thumbShape === "square"
      ? 4
      : s.thumbSize / 3;

  const handleToggle = () => {
    if (disabled) return;
    setIsOn((prev) => !prev);
  };

  const ToggleElement = (
    <button
      onClick={handleToggle}
      disabled={disabled}
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
      style={{
        fontSize: s.fontSize,
        lineHeight: "1.2",
        color: "hsl(var(--foreground))",
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