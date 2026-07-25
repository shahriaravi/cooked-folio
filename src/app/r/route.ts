import { getAllLabComponents } from "@/lib/lab";
import { siteConfig } from "@/lib/site-config";
import { NextResponse } from "next/server";

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

export async function GET() {
  const components = getAllLabComponents();

  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "shahriar-avi-lab",
    homepage: siteConfig.url,
    items: components.map((c) => ({
      name: toKebabCase(c.component),
      type: "registry:ui" as const,
      title: c.title,
      description: c.description,
      url: `${siteConfig.url}/r/${c.slug}`,
    })),
  };

  return NextResponse.json(registry, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}