
import { getAllPosts } from "@/lib/writing";
import { siteConfig } from "@/lib/site-config";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts();

  const content = `# Shahriar Avi

> Design engineer and founder of Byontriq. Building apps, websites, and extensions with obsessive attention to detail.

- Portfolio: ${siteConfig.url}
- Writing: ${siteConfig.url}/writing
- Contact: hi@shahriaravi.me

## About

Shahriar Avi is a design engineer who builds products end to end. Ships apps, websites, browser extensions, and reusable UI components. Currently available for freelance projects.

Setup:
\`\`\`json
{
  "registries": {
    "@yoavi": "${siteConfig.url}/r/{name}.json"
  }
}

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