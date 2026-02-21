import { Container } from "@/components/common/Container";
import { Hero } from "@/components/layout/Hero";
import { ActivitySection } from "@/components/integrations/ActivitySection";
import { ExperienceList } from "@/components/sections/ExperienceList";
import { EducationList } from "@/components/sections/EducationList";
import { StackList } from "@/components/sections/StackList";
import { ProjectList } from "@/components/sections/ProjectList";
import { GithubActivityCard } from "@/components/integrations/GithubActivityCard";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/lib/animations";

import { constructMetadata } from "@/lib/site-config";

export const metadata = constructMetadata({
  title: "avi.portfolio",
  description: "building things. breaking things.",
});

export const revalidate = 60;

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Container>
        <Hero />
        <AnimatedSection delay={0.05}>
          <ActivitySection />
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <ExperienceList />
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <EducationList />
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <StackList />
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <ProjectList />
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <GithubActivityCard />
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <Footer />
        </AnimatedSection>
      </Container>
    </div>
  );
}
