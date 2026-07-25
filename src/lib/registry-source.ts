import { getComponentSource } from "@/components/craft/registry/sources";
import { getCraftComponentBySlug } from "@/lib/craft";

export interface RegistryFile {
  path: string;
  content: string;
  type: "registry:ui" | "registry:hook" | "registry:lib";
  target?: string;
}

export interface RegistryItem {
  $schema: string;
  name: string;
  type: "registry:ui";
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  tailwind?: {
    config?: Record<string, any>;
  };
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
}

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

export function buildRegistryItem(slug: string): RegistryItem | null {
  const component = getCraftComponentBySlug(slug);
  if (!component) return null;

  const componentName = component.component;
  const kebabName = toKebabCase(componentName);
  const source = getComponentSource(componentName);

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: kebabName,
    type: "registry:ui",
    title: component.title,
    description: component.description,
    dependencies: component.dependencies.length > 0 ? component.dependencies : undefined,
    files: [
      {
        path: `components/${kebabName}.tsx`,
        content: source,
        type: "registry:ui",
        target: `components/${kebabName}.tsx`,
      },
    ],
  };
}