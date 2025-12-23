import { getMalData, getTraktData } from "@/app/api/stuffs/api";
import { StuffsGrid } from "@/components/integrations/Stuffs";
import { constructMetadata } from "@/lib/site-config";

export const metadata = constructMetadata({
  title: "stuffs",
  description: "stats on what i watch, listen to, and consume.",
});

export default async function StuffsPage() {
  const [trakt, mal] = await Promise.all([getTraktData(), getMalData()]);

  return <StuffsGrid trakt={trakt} mal={mal} />;
}
