import { defineQuery } from "next-sanity";
import {
  AboutSection,
  AchievementsSection,
  BlogSection,
  CertificationsSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
  TestimonialsSection,
} from "./sections";
import HeroSection from "./sections/HeroSection";
import { sanityFetch } from "@/sanity/lib/live";
import SiteSettingsClient from "./SiteSettingsClient";
import FooterSection from "./sections/FooterSection";

const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "singleton-siteSettings"][0]{
  siteTitle,
  siteDescription,
  primaryColor,
  secondaryColor,
  accentColor,
  showBlog,
  showServices,
  showTestimonials,
  maintenanceMode,
  favicon{asset->{url}},
  footer{ text, copyrightText, links[]{title, url, _key} }
}`);

async function PortfolioContent() {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  const showBlog = settings?.showBlog ?? true;
  const showServices = settings?.showServices ?? true;
  const showTestimonials = settings?.showTestimonials ?? true;

  return (
    <>
      {/* Apply site-level settings on the client (colors, title, favicon, maintenance) */}
      <SiteSettingsClient settings={settings} />

      <HeroSection />
      <AboutSection />
      {showTestimonials && <TestimonialsSection />}
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      {showServices && <ServicesSection />}
      {showBlog && <BlogSection />}
      <ContactSection />
      {/* Footer from site settings */}
      <FooterSection footer={settings?.footer} />
    </>
  );
}

export default PortfolioContent;
