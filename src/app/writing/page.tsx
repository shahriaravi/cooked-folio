import { WritingList } from "@/components/writing/WritingList";
import { getAllPosts } from "@/lib/writing";
import { constructMetadata, siteConfig } from "@/lib/site-config";

export const metadata = constructMetadata({
  canonicalUrl: `${siteConfig.url}/writing`,
  other: {
    "og:image": `${siteConfig.url}/writing/opengraph-image`,
    "twitter:image": `${siteConfig.url}/writing/opengraph-image`,
  },
});

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-10 md:pb-16">
      <section>
        <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          writing
        </h2>

        <p
          className="mb-10 text-muted-foreground"
          style={{
            fontSize: "14px",
            lineHeight: "22px",
            letterSpacing: "0.1px",
          }}
        >
          Notes on engineering, design, and everything I break along the way.
        </p>

        <WritingList posts={posts} />
      </section>
    </main>
  );
}