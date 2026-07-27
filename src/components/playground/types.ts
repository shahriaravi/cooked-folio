export type ControlType =
  | "text"
  | "number"
  | "slider"
  | "color"
  | "select"
  | "multi-select"
  | "toggle";

export interface BaseControl {
  key: string;
  label: string;
  type: ControlType;
  default: any;
  group?: string;
}

export interface TextControl extends BaseControl {
  type: "text";
  default: string;
  placeholder?: string;
}

export interface NumberControl extends BaseControl {
  type: "number";
  default: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface SliderControl extends BaseControl {
  type: "slider";
  default: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  ticks?: number[];
}

export interface ColorControl extends BaseControl {
  type: "color";
  default: string;
}

export interface SelectControl extends BaseControl {
  type: "select";
  default: string;
  options: { value: string; label: string }[];
}

export interface MultiSelectControl extends BaseControl {
  type: "multi-select";
  default: string[];
  options: { value: string; label: string }[];
}

export interface ToggleControl extends BaseControl {
  type: "toggle";
  default: boolean;
}

export type PlaygroundControl =
  | TextControl
  | NumberControl
  | SliderControl
  | ColorControl
  | SelectControl
  | MultiSelectControl
  | ToggleControl;

export interface PlaygroundConfig {
  slug: string;
  title: string;
  description: string;
  Component: React.ComponentType<any>;
  controls: PlaygroundControl[];
}