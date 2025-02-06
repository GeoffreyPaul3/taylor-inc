import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ServicesSection from "@/components/ServicesSection";


export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProjectsShowcase />
      <ContactSection />
    </Layout>
  )
}

