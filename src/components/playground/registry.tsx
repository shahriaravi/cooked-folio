import type { PlaygroundConfig } from "./types";
import InputBox from "./showcases/InputBox";
import Button from "./showcases/Button";
import ToggleShowcase from "./showcases/Toggle";

export const playgroundRegistry: PlaygroundConfig[] = [
  {
    slug: "input-box",
    title: "Input Box",
    description:
      "A customizable text input. Play with size, radius, border, colors, and behavior in real time.",
    Component: InputBox,
    controls: [
      {
        key: "placeholder",
        label: "Placeholder",
        type: "text",
        default: "Type here...",
      },
      {
        key: "size",
        label: "Size",
        type: "select",
        default: "md",
        options: [
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ],
      },
      {
        key: "radius",
        label: "Radius",
        type: "slider",
        default: 8,
        min: 0,
        max: 32,
        step: 1,
        unit: "px",
      },
      {
        key: "borderWidth",
        label: "Border",
        type: "slider",
        default: 1,
        min: 0,
        max: 4,
        step: 1,
        unit: "px",
      },
      {
        key: "borderColor",
        label: "Border Color",
        type: "color",
        default: "#3f3f46",
      },
      {
        key: "backgroundColor",
        label: "Background",
        type: "color",
        default: "#18181b",
      },
      {
        key: "textColor",
        label: "Text Color",
        type: "color",
        default: "#fafafa",
      },
      {
        key: "showIcon",
        label: "Show Icon",
        type: "toggle",
        default: true,
      },
      {
        key: "focusRing",
        label: "Focus Ring",
        type: "toggle",
        default: true,
      },
      {
        key: "disabled",
        label: "Disabled",
        type: "toggle",
        default: false,
      },
    ],
  },
  {
    slug: "button",
    title: "Button",
    description:
      "A fully customizable button. Change variants, size, icons, colors, and behavior.",
    Component: Button,
    controls: [
      {
        key: "label",
        label: "Label",
        type: "text",
        default: "Continue",
      },
      {
        key: "variant",
        label: "Variant",
        type: "select",
        default: "solid",
        options: [
          { value: "solid", label: "Solid" },
          { value: "outline", label: "Outline" },
          { value: "ghost", label: "Ghost" },
          { value: "soft", label: "Soft" },
        ],
      },
      {
        key: "size",
        label: "Size",
        type: "select",
        default: "md",
        options: [
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
          { value: "xl", label: "Extra Large" },
        ],
      },
      {
        key: "radius",
        label: "Radius",
        type: "slider",
        default: 8,
        min: 0,
        max: 32,
        step: 1,
        unit: "px",
      },
      {
        key: "background",
        label: "Background",
        type: "color",
        default: "#3b82f6",
      },
      {
        key: "foreground",
        label: "Text Color",
        type: "color",
        default: "#ffffff",
      },
      {
        key: "borderColor",
        label: "Border Color",
        type: "color",
        default: "#3b82f6",
      },
      {
        key: "borderWidth",
        label: "Border Width",
        type: "slider",
        default: 1,
        min: 0,
        max: 4,
        step: 1,
        unit: "px",
      },
      {
        key: "fontWeight",
        label: "Font Weight",
        type: "slider",
        default: 500,
        min: 400,
        max: 700,
        step: 100,
      },
      {
        key: "letterSpacing",
        label: "Letter Spacing",
        type: "slider",
        default: 0,
        min: -1,
        max: 3,
        step: 0.1,
        unit: "px",
      },
      {
        key: "icon",
        label: "Icon",
        type: "select",
        default: "arrow",
        options: [
          { value: "none", label: "None" },
          { value: "arrow", label: "Arrow" },
          { value: "check", label: "Check" },
          { value: "download", label: "Download" },
          { value: "github", label: "GitHub" },
          { value: "heart", label: "Heart" },
          { value: "plus", label: "Plus" },
          { value: "send", label: "Send" },
          { value: "sparkles", label: "Sparkles" },
          { value: "star", label: "Star" },
        ],
      },
      {
        key: "iconPosition",
        label: "Icon Position",
        type: "select",
        default: "right",
        options: [
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
        ],
      },
      {
        key: "fullWidth",
        label: "Full Width",
        type: "toggle",
        default: false,
      },
      {
        key: "uppercase",
        label: "Uppercase",
        type: "toggle",
        default: false,
      },
      {
        key: "glow",
        label: "Glow",
        type: "toggle",
        default: false,
      },
      {
        key: "loading",
        label: "Loading",
        type: "toggle",
        default: false,
      },
      {
        key: "disabled",
        label: "Disabled",
        type: "toggle",
        default: false,
      },
    ],
  },
   {
    slug: "toggle",
    title: "Toggle",
    description:
      "An animated switch. Tweak the size, shape, colors, icons, and label to fit your product.",
    Component: ToggleShowcase,
    controls: [
      {
        key: "size",
        label: "Size",
        type: "select",
        default: "md",
        options: [
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ],
      },
      {
        key: "width",
        label: "Width",
        type: "slider",
        default: 44,
        min: 32,
        max: 80,
        step: 1,
        unit: "px",
      },
      {
        key: "radius",
        label: "Radius",
        type: "slider",
        default: 999,
        min: 2,
        max: 999,
        step: 1,
        unit: "px",
      },
      {
        key: "onColor",
        label: "On Color",
        type: "color",
        default: "#3b82f6",
      },
      {
        key: "offColor",
        label: "Off Color",
        type: "color",
        default: "#3f3f46",
      },
      {
        key: "thumbColor",
        label: "Thumb Color",
        type: "color",
        default: "#ffffff",
      },
      {
        key: "thumbShape",
        label: "Thumb Shape",
        type: "select",
        default: "circle",
        options: [
          { value: "circle", label: "Circle" },
          { value: "pill", label: "Pill" },
          { value: "square", label: "Square" },
        ],
      },
      {
        key: "showIcons",
        label: "Show Icons",
        type: "toggle",
        default: false,
      },
      {
        key: "iconStyle",
        label: "Icon Style",
        type: "select",
        default: "check-x",
        options: [
          { value: "check-x", label: "Check / X" },
          { value: "sun-moon", label: "Sun / Moon" },
          { value: "none", label: "None" },
        ],
      },
      {
        key: "label",
        label: "Label",
        type: "text",
        default: "Enable notifications",
      },
      {
        key: "showLabel",
        label: "Show Label",
        type: "toggle",
        default: true,
      },
      {
        key: "labelPosition",
        label: "Label Position",
        type: "select",
        default: "left",
        options: [
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
        ],
      },
      {
        key: "disabled",
        label: "Disabled",
        type: "toggle",
        default: false,
      },
      {
        key: "defaultOn",
        label: "Default On",
        type: "toggle",
        default: false,
      },
    ],
  },
];

export function getPlayground(slug: string): PlaygroundConfig | null {
  return playgroundRegistry.find((p) => p.slug === slug) ?? null;
}

export function getAllPlaygroundSlugs(): string[] {
  return playgroundRegistry.map((p) => p.slug);
}