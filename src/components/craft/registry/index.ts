import { createElement } from "react";
import TimeDisplay from "./TimeDisplay";
import DiscordPresenceDotPreview from "../preview/DiscordPresenceDotPreview";
import HelloLoader from "./HelloLoader";
import NewsletterPillPreview from "../preview/NewsletterPillPreview";

export const componentRegistry = {
  TimeDisplay,
  DiscordPresenceDot: DiscordPresenceDotPreview,
  HelloLoader: () =>
    createElement(HelloLoader, {
      fullScreen: false,
      interval: 900,
    }),
  NewsletterPill: NewsletterPillPreview,
};

export function getRegistryComponent(name: string) {
  return componentRegistry[name as keyof typeof componentRegistry] ?? null;
}