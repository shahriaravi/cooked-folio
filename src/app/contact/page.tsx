import { constructMetadata, siteConfig } from "@/lib/site-config";
import ContactForm from "../../components/contact/ContactForm";

export const metadata = constructMetadata({
  canonicalUrl: `${siteConfig.url}/contact`,
});

export default function ContactPage() {
  return <ContactForm />;
}