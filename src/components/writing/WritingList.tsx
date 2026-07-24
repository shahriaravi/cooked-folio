"use client";

import type { PostMeta } from "@/lib/writing";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface WritingListProps {
  posts: PostMeta[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

export function WritingList({ posts }: WritingListProps) {
  const router = useRouter();

  if (posts.length === 0) {
    return (
      <p
        className="text-muted-foreground"
        style={{ fontSize: "15px", lineHeight: "22px" }}
      >
        No posts yet. Come back soon.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <a
          key={post.slug}
          href={`/writing/${post.slug}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/writing/${post.slug}`);
          }}
          data-cuelume-hover="tick"
          data-cuelume-press
          className="group grid grid-cols-[90px_1fr_auto] items-center gap-6"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/80">
            {formatDate(post.date)}
          </span>

          <span
            className="truncate font-semibold text-foreground transition-colors group-hover:text-primary"
            style={{
              fontSize: "17px",
              lineHeight: "24px",
              letterSpacing: "0.1px",
            }}
          >
            {post.title}
          </span>

          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/80">
            <Clock className="h-3 w-3" strokeWidth={2.25} />
            {post.readingTime}
          </span>
        </a>
      ))}
    </div>
  );
}