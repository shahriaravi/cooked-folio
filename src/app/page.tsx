import { Container } from "@/components/common/Container";
import { Hero } from "@/components/layout/Hero";
import { ActivitySection } from "@/components/integrations/ActivitySection";
import { ExperienceList } from "@/components/sections/ExperienceList";
import { EducationList } from "@/components/sections/EducationList";
import { StackList } from "@/components/sections/StackList";
import { ProjectList } from "@/components/sections/ProjectList";
import { PlaygroundList } from "@/components/sections/PlaygroundList";
import { GithubHeatmap } from "@/components/integrations/GithubHeatmap";
import { HomeFooter } from "@/components/layout/HomeFooter";
import { constructMetadata, siteConfig } from "@/lib/site-config";

export const metadata = constructMetadata({
  canonicalUrl: siteConfig.url,
});

export const revalidate = 60;

export default function Home() {
  return (
    <Container>
      <Hero />
      <ActivitySection />
      <ExperienceList />
      <EducationList />
      <ProjectList />
      <StackList />
      <PlaygroundList />
      <GithubHeatmap />
      <HomeFooter />
    </Container>
  );
}