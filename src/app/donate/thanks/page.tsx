import { constructMetadata, siteConfig } from "@/lib/site-config";
import DonateThanks from "@/components/donate/DonateThanks";

export const metadata = constructMetadata({
  canonicalUrl: `${siteConfig.url}/donate/thanks`,
});

export default function DonateThanksPage() {
  return <DonateThanks />;
}