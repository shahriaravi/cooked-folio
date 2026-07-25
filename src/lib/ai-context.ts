import type { CraftComponent, ApiProp } from "./craft";
import { getComponentSource } from "@/components/craft/registry/sources";
import { siteConfig } from "./site-config";

function toKebabCase(str: string): string {
  if (!str) return "";
  return str
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

export function buildAIContext(component: CraftComponent): string {
  if (!component?.component) {
    return `Component metadata is incomplete. Please check the MDX frontmatter for missing "component" field.`;
  }

  const slug = toKebabCase(component.component);
  const source = getComponentSource(component.component);

  const deps =
    component.dependencies.length > 0
      ? component.dependencies.join(" ")
      : "";

  const propsSection = component.apiReference?.length
    ? formatApiReference(component.apiReference)
    : "";

  return `You are integrating a React component called "${component.title}" into an existing Next.js + Tailwind CSS project.

## Component overview

${component.description}

**Source of truth:** ${siteConfig.url}/craft/${component.slug}
**Author:** Shahriar Avi

## Step 1: Install dependencies

${
  deps
    ? `Install the required npm packages:\n\n\`\`\`bash\nnpm install ${deps}\n\`\`\``
    : "This component has no external dependencies."
}

## Step 2: Add the component file

Create a new file at \`components/${slug}.tsx\` with this exact content:

\`\`\`tsx
${source}
\`\`\`

## Step 3: Use it in your app

Import and render the component wherever needed:

\`\`\`tsx
import ${component.component} from "@/components/${slug}";

export default function Page() {
  return <${component.component} />;
}
\`\`\`

${propsSection}

## Additional guidance

- Make sure Tailwind CSS is configured in the project
- If \`cn\` utility is referenced, ensure \`lib/utils.ts\` exports it (uses \`clsx\` + \`tailwind-merge\`)
- The component uses shadcn/ui design tokens (\`--background\`, \`--foreground\`, \`--primary\`, etc.) — make sure these CSS variables exist
- Adjust props as needed based on the API reference above

## Full documentation

For usage examples, edge cases, and advanced patterns, refer to:
${siteConfig.url}/craft/${component.slug}

Now integrate this component into the user's project following the steps above.`;
}

function formatApiReference(props: ApiProp[]): string {
  if (!props || props.length === 0) return "";

  const rows = props
    .map((p) => {
      const optional = p.required ? "" : "?";
      const defaultText = p.defaultValue ? ` (default: ${p.defaultValue})` : "";
      const desc = p.description ? ` — ${p.description}` : "";
      return `- \`${p.name}${optional}: ${p.type}\`${defaultText}${desc}`;
    })
    .join("\n");

  return `## API Reference

${rows}
`;
}