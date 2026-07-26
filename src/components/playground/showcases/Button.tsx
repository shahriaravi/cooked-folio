"use client";

import {
  ArrowRight,
  Check,
  Download,
  Github,
  Heart,
  Loader2,
  Plus,
  Send,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";

interface ButtonProps {
  label: string;
  variant: "solid" | "outline" | "ghost" | "soft";
  size: "sm" | "md" | "lg" | "xl";
  radius: number;
  background: string;
  foreground: string;
  borderColor: string;
  borderWidth: number;
  fontWeight: number;
  letterSpacing: number;
  icon: string;
  iconPosition: "left" | "right";
  fullWidth: boolean;
  disabled: boolean;
  loading: boolean;
  glow: boolean;
  uppercase: boolean;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  none: () => null,
  arrow: ArrowRight,
  check: Check,
  download: Download,
  github: Github,
  heart: Heart,
  plus: Plus,
  send: Send,
  sparkles: Sparkles,
  star: Star,
};

const sizeMap = {
  sm: { padY: "6px", padX: "12px", font: "12px", iconSize: "12px", gap: "6px" },
  md: {
    padY: "9px",
    padX: "16px",
    font: "13px",
    iconSize: "14px",
    gap: "7px",
  },
  lg: {
    padY: "12px",
    padX: "20px",
    font: "15px",
    iconSize: "16px",
    gap: "8px",
  },
  xl: {
    padY: "16px",
    padX: "28px",
    font: "17px",
    iconSize: "18px",
    gap: "10px",
  },
};

export default function Button({
  label,
  variant,
  size,
  radius,
  background,
  foreground,
  borderColor,
  borderWidth,
  fontWeight,
  letterSpacing,
  icon,
  iconPosition,
  fullWidth,
  disabled,
  loading,
  glow,
  uppercase,
}: ButtonProps) {
  const s = sizeMap[size];
  const [hovered, setHovered] = useState(false);

  const Icon = iconMap[icon] ?? null;

  const getVariantStyles = () => {
    const base = {
      transition: "all 0.15s ease",
      transform: hovered && !disabled ? "translateY(-1px)" : "translateY(0)",
    };

    switch (variant) {
      case "solid":
        return {
          ...base,
          backgroundColor: background,
          color: foreground,
          border: `${borderWidth}px solid ${borderColor}`,
        };
      case "outline":
        return {
          ...base,
          backgroundColor:
            hovered && !disabled ? `${background}15` : "transparent",
          color: foreground,
          border: `${borderWidth}px solid ${background}`,
        };
      case "ghost":
        return {
          ...base,
          backgroundColor:
            hovered && !disabled ? `${background}15` : "transparent",
          color: foreground,
          border: `${borderWidth}px solid transparent`,
        };
      case "soft":
        return {
          ...base,
          backgroundColor: `${background}20`,
          color: foreground,
          border: `${borderWidth}px solid transparent`,
        };
      default:
        return base;
    }
  };

  const glowStyle =
    glow && !disabled
      ? {
          boxShadow: `0 0 24px -4px ${background}`,
        }
      : {};

  return (
    <div style={{ width: fullWidth ? "100%" : "auto", maxWidth: "360px" }}>
      <button
        disabled={disabled || loading}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: s.gap,
          padding: `${s.padY} ${s.padX}`,
          fontSize: s.font,
          lineHeight: "1",
          fontWeight,
          letterSpacing: `${letterSpacing}px`,
          textTransform: uppercase ? "uppercase" : "none",
          borderRadius: `${radius}px`,
          cursor: disabled || loading ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          width: fullWidth ? "100%" : "auto",
          fontFamily: "inherit",
          ...getVariantStyles(),
          ...glowStyle,
        }}
      >
        {loading ? (
          <Loader2
            style={{
              width: s.iconSize,
              height: s.iconSize,
              animation: "spin 0.8s linear infinite",
            }}
            strokeWidth={2.25}
          />
        ) : (
          <>
            {Icon && iconPosition === "left" && icon !== "none" && (
              <Icon
                style={{ width: s.iconSize, height: s.iconSize }}
                strokeWidth={2.25}
              />
            )}
            <span>{label}</span>
            {Icon && iconPosition === "right" && icon !== "none" && (
              <Icon
                style={{ width: s.iconSize, height: s.iconSize }}
                strokeWidth={2.25}
              />
            )}
          </>
        )}
      </button>
    </div>
  );
}
