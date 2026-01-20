import { AboutSection, AchievementsSection, BlogSection, CertificationsSection, ContactSection, EducationSection, ExperienceSection, ProjectsSection, ServicesSection, SkillsSection, TestimonialsSection } from "./sections"
import HeroSection from "./sections/HeroSection"

async function PortfolioContent() {
  return <>
    <HeroSection />
    <AboutSection />
    <TestimonialsSection />
    <SkillsSection />
    <ExperienceSection />
    <EducationSection />
    <ProjectsSection />
    <CertificationsSection />
    <AchievementsSection />
    <ServicesSection />
    <BlogSection />
    <ContactSection />
  </>
}

export default PortfolioContent