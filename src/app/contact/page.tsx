import { constructMetadata } from "@/lib/site-config";
import ContactForm from "../../components/contact/ContactForm";

export const metadata = constructMetadata({
  title: "talk to me",
  description: "send memes, job offers, or debug help. i am listening.",
});

export default function ContactPage() {
  return <ContactForm />;
}