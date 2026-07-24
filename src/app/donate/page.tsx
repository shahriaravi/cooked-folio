import { constructMetadata, siteConfig } from "@/lib/site-config";

export const metadata = constructMetadata({
  canonicalUrl: `${siteConfig.url}/donate`,
});

export { default } from "@/components/donate/DonateContent";