import dynamic from "next/dynamic";
import { createElement } from "react";

export const componentRegistry = {
  TimeDisplay: dynamic(() => import("./TimeDisplay")),
  DiscordPresenceDot: dynamic(() => import("../preview/DiscordPresenceDotPreview")),
  HelloLoader: dynamic(() =>
    import("./HelloLoader").then((mod) => ({
      default: () =>
        createElement(mod.default, {
          fullScreen: false,
          interval: 900,
        }),
    }))
  ),
};

export function getRegistryComponent(name: string) {
  return componentRegistry[name as keyof typeof componentRegistry] ?? null;
}