import { LabList } from "@/components/lab/LabList";
import { getAllLabComponents } from "@/lib/lab";
import { constructMetadata, siteConfig } from "@/lib/site-config";

export const metadata = constructMetadata({
  canonicalUrl: `${siteConfig.url}/lab`,
});

export default function LabPage() {
  const components = getAllLabComponents();

  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-10 md:pb-16">
      <section>
        <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          lab
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

        <LabList components={components} />
      </section>
    </main>
  );
}