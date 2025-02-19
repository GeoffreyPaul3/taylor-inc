import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ServicesSection from "@/components/ServicesSection";
import TrainingsAndCoursesSection from "@/components/TrainingsAndCoursesSection";


export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <TrainingsAndCoursesSection />
      <AboutSection />
      <ProjectsShowcase />
      <ContactSection />
    </Layout>
  )
}

