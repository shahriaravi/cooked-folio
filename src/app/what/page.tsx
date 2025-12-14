import { constructMetadata } from "@/lib/site-config";
import SlideToVibe from "../../components/vibe-check/SlideToVibe";

export const metadata = constructMetadata({
  title: "slide to vibe",
  description: "monke see. monke listen. vibes unlocked.",
});

export default function WhatPage() {
  return <SlideToVibe />;
}