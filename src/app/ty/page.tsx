import { Metadata } from "next";
import ThankYouContent from "../../components/ui/ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You 💚",
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}