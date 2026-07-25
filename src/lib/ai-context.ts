import type { CraftComponent } from "./craft";
import { getComponentSource } from "@/components/craft/registry/sources";
import { siteConfig } from "./site-config";

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

export function buildAIContext(component: CraftComponent): string {
  const slug = toKebabCase(component.component);
  const source = getComponentSource(component.component);

  const deps =
    component.dependencies.length > 0
      ? component.dependencies.join(", ")
      : "none";

  return `# ${component.title}

${component.description}

**Source:** ${siteConfig.url}/craft/${component.slug}
**Author:** Shahriar Avi (${siteConfig.url})

## Dependencies

${deps}

## Installation

Via shadcn CLI (recommended):

\`\`\`bash
npx shadcn@latest add @yoavi/${slug}
\`\`\`

Requires this in your \`components.json\`:

\`\`\`json
{
  "registries": {
    "@yoavi": "${siteConfig.url}/r/{name}.json"
  }
}
\`\`\`

## Component source

File: \`components/${slug}.tsx\`

\`\`\`tsx
${source}
\`\`\`

## Docs

${component.content}
`;
}