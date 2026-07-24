import { HeroSection } from '@/components/sections/hero/hero';
import { AboutSection } from '@/components/sections/about/about';
import { StatisticsSection } from '@/components/sections/statistics/statistics';
import { FeaturedProjectsSection } from '@/components/sections/projects/featured-projects';
import { SkillsSection } from '@/components/sections/skills/skills';
import { TechStackSection } from '@/components/sections/tech-stack/tech-stack';
import { ServicesSection } from '@/components/sections/services/services';
import { GithubSection } from '@/components/sections/github/github';
import { ContactSection } from '@/components/sections/contact/contact';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatisticsSection />
      <FeaturedProjectsSection />
      <SkillsSection />
      <TechStackSection />
      <ServicesSection />
      <GithubSection />
      <ContactSection />
    </>
  );
}
