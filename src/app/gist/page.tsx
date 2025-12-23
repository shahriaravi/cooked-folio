import { GistList } from "@/components/gist/GistList";
import { constructMetadata } from "@/lib/site-config";

export const metadata = constructMetadata({
  title: "gist",
  description: "a curated collection of useful links, tools, and resources for everyone.",
});

export default function GistPage() {
  return <GistList />;
}