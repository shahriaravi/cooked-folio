import { CraftList } from "@/components/craft/CraftList";
import { getAllCraftComponents } from "@/lib/craft";
import { constructMetadata, siteConfig } from "@/lib/site-config";

export const metadata = constructMetadata({
  canonicalUrl: `${siteConfig.url}/craft`,
});

export default function CraftPage() {
  const components = getAllCraftComponents();

  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-10 md:pb-16">
      <section>
        <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          craft
        </h2>

        <p
          className="mb-10 text-muted-foreground"
          style={{
            fontSize: "14px",
            lineHeight: "22px",
            letterSpacing: "0.1px",
          }}
        >
          Live previews of components I built. Use the ones you like.
        </p>

        <CraftList components={components} />
      </section>
    </main>
  );
}