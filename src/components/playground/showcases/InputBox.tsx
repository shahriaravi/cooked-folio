"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface InputBoxProps {
  placeholder: string;
  size: "sm" | "md" | "lg";
  radius: number;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  textColor: string;
  showIcon: boolean;
  disabled: boolean;
  focusRing: boolean;
}

const sizeMap = {
  sm: { padY: "6px", padX: "10px", font: "12px", iconSize: "12px" },
  md: { padY: "10px", padX: "14px", font: "14px", iconSize: "14px" },
  lg: { padY: "14px", padX: "18px", font: "16px", iconSize: "16px" },
};

export default function InputBox({
  placeholder,
  size,
  radius,
  borderWidth,
  borderColor,
  backgroundColor,
  textColor,
  showIcon,
  disabled,
  focusRing,
}: InputBoxProps) {
  const s = sizeMap[size];
  const [focused, setFocused] = useState(false);

  const showRing = focusRing && focused && !disabled;

  return (
    <div style={{ width: "100%", maxWidth: "360px" }}>
      <style>{`
        .playground-input-${size}::placeholder {
          color: ${textColor};
          opacity: 0.5;
        }
      `}</style>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          borderWidth: `${borderWidth}px`,
          borderStyle: "solid",
          borderColor: showRing ? "hsl(var(--primary) / 0.6)" : borderColor,
          borderRadius: `${radius}px`,
          backgroundColor,
          padding: `${s.padY} ${s.padX}`,
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          boxShadow: showRing
            ? "0 0 0 3px hsl(var(--primary) / 0.2)"
            : "none",
        }}
      >
        {showIcon && (
          <Search
            style={{
              width: s.iconSize,
              height: s.iconSize,
              marginRight: "8px",
              color: "currentColor",
              opacity: 0.4,
              flexShrink: 0,
            }}
            strokeWidth={2}
          />
        )}
        <input
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`playground-input-${size}`}
          style={{
            flex: 1,
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            color: textColor,
            fontSize: s.font,
            lineHeight: "1.4",
            fontFamily: "inherit",
          }}
        />
      </div>
    </div>
  );
}