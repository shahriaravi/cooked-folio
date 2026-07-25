import { getAllCraftComponents } from "@/lib/craft";
import { getAllPosts } from "@/lib/writing";
import { siteConfig } from "@/lib/site-config";
import { NextResponse } from "next/server";

export async function GET() {
  const components = getAllCraftComponents();
  const posts = getAllPosts();

  const content = `# Shahriar Avi

> Design engineer and founder of Byontriq. Building apps, websites, and extensions with obsessive attention to detail.

- Portfolio: ${siteConfig.url}
- Writing: ${siteConfig.url}/writing
- Craft (components): ${siteConfig.url}/craft
- Contact: hi@shahriaravi.me

## About

Shahriar Avi is a design engineer based in Bangladesh who builds products end to end. Ships apps, websites, browser extensions, and reusable UI components. Currently available for freelance projects.

## Craft components

Reusable React components installable via shadcn CLI using the @yoavi namespace.

Setup:
\`\`\`json
{
  "registries": {
    "@yoavi": "${siteConfig.url}/r/{name}.json"
  }
}
\`\`\`

${components
  .map(
    (c) => `- [${c.title}](${siteConfig.url}/craft/${c.slug}): ${c.description}
  - Install: \`npx shadcn@latest add @yoavi/${c.slug}\`
  - Dependencies: ${c.dependencies.length > 0 ? c.dependencies.join(", ") : "none"}
  - Full context: ${siteConfig.url}/craft/${c.slug}/llms.txt`
  )
  .join("\n")}

## Writing

${posts
  .map(
    (p) => `- [${p.title}](${siteConfig.url}/writing/${p.slug}) (${p.date}, ${p.readingTime})`
  )
  .join("\n")}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}