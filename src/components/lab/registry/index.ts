import dynamic from "next/dynamic";

export const componentRegistry = {
  TimeDisplay: dynamic(() => import("./TimeDisplay")),
  DiscordPresenceDot: dynamic(
    () => import("../DiscordPresenceDotPreview")
  ),
};

export function getRegistryComponent(name: string) {
  return componentRegistry[name as keyof typeof componentRegistry] ?? null;
}