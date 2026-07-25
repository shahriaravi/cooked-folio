import { getCraftComponentBySlug, getAllCraftSlugs } from "@/lib/craft";
import { buildAIContext } from "@/lib/ai-context";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllCraftSlugs().map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const component = getCraftComponentBySlug(params.slug);
  if (!component) return notFound();

  const content = buildAIContext(component);

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}