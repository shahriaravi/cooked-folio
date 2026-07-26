import {
  getAllPlaygroundSlugs,
  getPlayground,
} from "@/components/playground/registry";
import { PlaygroundLayout } from "@/components/playground/PlaygroundLayout";
import { constructMetadata, siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPlaygroundSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const config = getPlayground(params.slug);
  if (!config) return {};

  return constructMetadata({
    canonicalUrl: `${siteConfig.url}/playground/${config.slug}`,
  });
}

export default function PlaygroundComponentPage({ params }: PageProps) {
  const config = getPlayground(params.slug);

  if (!config) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-10 md:pb-16">
      <PlaygroundLayout config={config} />
    </main>
  );
}