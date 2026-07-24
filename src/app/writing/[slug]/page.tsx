import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/writing";
import { constructMetadata, siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/writing/MdxComponents";
import { MorePosts } from "@/components/writing/MorePosts";
import { ShareMenu } from "@/components/writing/ShareMenu";
import { Clock, AlignLeft } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return constructMetadata({
    canonicalUrl: `${siteConfig.url}/writing/${post.slug}`,
  });
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

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const morePosts = getRelatedPosts(post.slug, 4);

  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-10 md:pb-16">
      <article>
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
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>

      <MorePosts posts={morePosts} />
    </main>
  );
}