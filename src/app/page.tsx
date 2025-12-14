import { Container } from "@/components/common/Container";
import { HeroHeader } from "@/components/layout/HeroHeader";
import { ActivitySection } from "@/components/integrations/ActivitySection";
import { ExperienceList } from "@/components/sections/ExperienceList";
import { EducationList } from "@/components/sections/EducationList";
import { TechStack } from "@/components/sections/TechStack";
import { ProjectList } from "@/components/sections/ProjectList";
import { GithubActivityCard } from "@/components/integrations/GithubActivityCard";
import { Footer } from "@/components/layout/Footer";

import { constructMetadata } from "@/lib/site-config";

export const metadata = constructMetadata({
  title: "avi.portfolio",
  description: "building things. breaking things. monke coding.",
});

export const revalidate = 60;

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Container>
        <HeroHeader />
        <ActivitySection />
        <ExperienceList />
        <EducationList />
        <TechStack />
        <ProjectList />
        <GithubActivityCard />
        <Footer />
      </Container>
    </div>
  );
}