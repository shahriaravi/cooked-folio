import { PlaygroundList } from "@/components/playground/PlaygroundList";
import { playgroundRegistry } from "@/components/playground/registry";
import { constructMetadata, siteConfig } from "@/lib/site-config";

export const metadata = constructMetadata({
  canonicalUrl: `${siteConfig.url}/playground`,
  other: {
    "og:image": `${siteConfig.url}/playground/opengraph-image`,
    "twitter:image": `${siteConfig.url}/playground/opengraph-image`,
  },
});

export default function PlaygroundPage() {
  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-10 md:pb-16">
      <section>
        <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          playground
        </h2>

        <p
          className="mb-10 text-muted-foreground"
          style={{
            fontSize: "14px",
            lineHeight: "22px",
            letterSpacing: "0.1px",
          }}
        >
          Interactive component playground. Tweak controls, watch it change live.
        </p>

        <PlaygroundList configs={playgroundRegistry} />
      </section>
    </main>
  );
}