import { buildRegistryItem } from "@/lib/registry-source";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const cleanSlug = params.slug.replace(/\.json$/, "");
  const item = buildRegistryItem(cleanSlug);

  if (!item) {
    return NextResponse.json(
      { error: "Component not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(item, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}