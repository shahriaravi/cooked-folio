"use client";

import { PackageManagerTabs } from "./PackageManagerTabs";

interface CommandInstallProps {
  componentName: string;
}

export function CommandInstall({ componentName }: CommandInstallProps) {
  const slug = componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  return (
    <PackageManagerTabs
      type="dlx"
      packages={`shadcn@latest add https://shahriaravi.me/r/${slug}`}
    />
  );
}