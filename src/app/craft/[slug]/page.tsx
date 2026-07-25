import { getAllCraftSlugs, getCraftComponentBySlug } from "@/lib/craft";
import { getComponentSource } from "@/components/craft/registry/sources";
import { constructMetadata, siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { craftMdxComponents } from "@/components/craft/mdx/craftMdxComponents";
import { ComponentPreview } from "@/components/craft/ComponentPreview";
import { InstallSection } from "@/components/craft/InstallSection";
import { ManualInstall } from "@/components/craft/ManualInstall";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CopyForAI } from "@/components/craft/CopyForAI";
import { buildAIContext } from "@/lib/ai-context";
import rehypePrettyCode from "rehype-pretty-code";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllCraftSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const component = getCraftComponentBySlug(params.slug);
  if (!component) return {};

  const url = `${siteConfig.url}/craft/${component.slug}`;
  const ogImageUrl = `${url}/opengraph-image`;

  return {
    title: component.title,
    description: component.description,
    authors: [{ name: "Shahriar Avi", url: siteConfig.url }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: component.title,
      description: component.description,
      url,
      siteName: "Shahriar Avi",
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: component.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: component.title,
      description: component.description,
      creator: "@shahriaravi_",
      site: "@shahriaravi_",
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: true,
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
};

export default async function CraftComponentPage({ params }: PageProps) {
  const component = getCraftComponentBySlug(params.slug);

  if (!component) {
    notFound();
  }

  const source = getComponentSource(component.component);
  const aiContext = buildAIContext(component);

  const previewCodeBlock = (
    <CodeBlock code={source} language="tsx" maxHeight={500} />
  );

  const manualContent = await ManualInstall({
    componentName: component.component,
    dependencies: component.dependencies,
  });

  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-10 md:pb-16">
      <article>
        <div className="mb-2">
          <span
            className="font-mono uppercase tracking-[0.14em] text-muted-foreground/70"
            style={{ fontSize: "11px", lineHeight: "1" }}
          >
            component
          </span>
        </div>

        <h1
          className="mb-4 font-semibold text-foreground"
          style={{
            fontSize: "clamp(26px, 4vw, 32px)",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          {component.title}
        </h1>

        <p
          className="mb-8 text-muted-foreground"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.2px",
          }}
        >
          {component.description}
        </p>

        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          {component.dependencies.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="font-mono uppercase tracking-[0.12em] text-muted-foreground/70"
                style={{ fontSize: "10px", lineHeight: "1" }}
              >
                deps
              </span>
              {component.dependencies.map((dep) => (
                <span
                  key={dep}
                  className="rounded-[4px] border border-border/60 bg-secondary/40 px-2 py-1 font-mono text-muted-foreground"
                  style={{
                    fontSize: "11px",
                    lineHeight: "1",
                    letterSpacing: "0.02em",
                  }}
                >
                  {dep}
                </span>
              ))}
            </div>
          ) : (
            <div />
          )}

          <CopyForAI context={aiContext} />
        </div>

        <ComponentPreview
          componentName={component.component}
          codeBlock={previewCodeBlock}
        />

        <InstallSection
          componentName={component.component}
          manualContent={manualContent}
        />

        <div className="writing-content mt-12">
          <MDXRemote
            source={component.content}
            components={craftMdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
              },
            }}
          />
        </div>
      </article>
    </main>
  );
}