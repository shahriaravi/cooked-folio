import { Container } from "@/components/common/Container";
import { Hero } from "@/components/layout/Hero";
import { ActivitySection } from "@/components/integrations/ActivitySection";
import { ExperienceList } from "@/components/sections/ExperienceList";
import { EducationList } from "@/components/sections/EducationList";
import { StackList } from "@/components/sections/StackList";
import { ProjectList } from "@/components/sections/ProjectList";
import { GithubActivityCard } from "@/components/integrations/GithubActivityCard";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata, siteConfig } from "@/lib/site-config";

export const metadata = constructMetadata({
  title: "Shahriar Avi — Software Engineer & Founder",
  description:
    "Shahriar Avi — software engineer, indie developer, and founder of Byontriq. Building Mate, a wallet tracker app. Open to work in USA, Germany, India, and Bangladesh.",
  canonicalUrl: siteConfig.url,
  keywords: [
    "Shahriar Avi",
    "Avi portfolio",
    "Byontriq founder",
    "Mate app developer",
    "indie developer portfolio",
    "solo developer",
    "web engineer portfolio",
    "software engineer Bangladesh",
    "Next.js developer",
    "TypeScript engineer",
    "full stack developer portfolio",
    "wallet tracker app",
    "software engineer for hire",
    "web designer",
    "product engineer",
  ],
});

export const revalidate = 60;

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Container>
        <Hero />
        <ActivitySection />
        <ExperienceList />
        <EducationList />
        <ProjectList />
        <StackList />
        <GithubActivityCard />
        <Footer />
      </Container>
    </div>
  );
}