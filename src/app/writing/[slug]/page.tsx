import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/writing";
import { siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/writing/MdxComponents";
import { MorePosts } from "@/components/writing/MorePosts";
import { ShareMenu } from "@/components/writing/ShareMenu";
import { ArticleJsonLd } from "@/components/writing/ArticleJsonLd";
import { Clock, AlignLeft } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function extractDescription(content: string): string {
  const withoutHeadings = content.replace(/^#{1,6}\s+.*$/gm, "");
  const withoutCode = withoutHeadings.replace(/```[\s\S]*?```/g, "");
  const withoutLinks = withoutCode.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const withoutBold = withoutLinks.replace(/\*\*([^*]+)\*\*/g, "$1");
  const withoutItalic = withoutBold.replace(/\*([^*]+)\*/g, "$1");
  const plainText = withoutItalic.replace(/\s+/g, " ").trim();

  if (plainText.length <= 160) return plainText;
  return plainText.slice(0, 157).trimEnd() + "...";
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const description = extractDescription(post.content);
  const url = `${siteConfig.url}/writing/${post.slug}`;
  const ogImageUrl = `${url}/opengraph-image`;

  return {
    title: post.title,
    description,
    authors: [{ name: "Shahriar Avi", url: siteConfig.url }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: "Shahriar Avi",
      type: "article",
      publishedTime: post.date,
      authors: ["Shahriar Avi"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
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

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

const prettyCodeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const morePosts = getRelatedPosts(post.slug, 4);
  const description = extractDescription(post.content);

  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-10 md:pb-16">
      <article>
        <ArticleJsonLd post={post} description={description} />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <span
            className="font-mono uppercase tracking-[0.14em] text-primary"
            style={{ fontSize: "11px", lineHeight: "1" }}
          >
            {formatFullDate(post.date)}
          </span>

          <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <AlignLeft className="h-3 w-3" strokeWidth={2.25} />
              {post.wordCount} words
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" strokeWidth={2.25} />
              {post.readingTime}
            </span>
            <ShareMenu title={post.title} slug={post.slug} />
          </div>
        </div>

        <h1
          className="mb-10 font-semibold text-foreground"
          style={{
            fontSize: "clamp(28px, 5vw, 34px)",
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
          }}
        >
          {post.title}
        </h1>

        <div className="writing-content">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
              },
            }}
          />
        </div>
      </article>

      <MorePosts posts={morePosts} />
    </main>
  );
}