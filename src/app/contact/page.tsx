import { constructMetadata, siteConfig } from "@/lib/site-config";
import ContactForm from "../../components/contact/ContactForm";

export const metadata = constructMetadata({
  title: "Contact Shahriar Avi",
  description:
    "Get in touch with Shahriar Avi - send a project idea, job offer, or just say hi. Open to freelance, full-time, and collaboration opportunities.",
  canonicalUrl: `${siteConfig.url}/contact`,
  keywords: [
    "contact Shahriar Avi",
    "hire Shahriar Avi",
    "Avi freelance",
    "Byontriq contact",
    "hire indie developer",
    "hire software engineer",
    "web engineer for hire",
  ],
});

export default function ContactPage() {
  return <ContactForm />;
}