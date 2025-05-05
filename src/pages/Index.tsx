
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PromiseSection from '@/components/sections/PromiseSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';

const Index = () => {
  // Scroll to the top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PromiseSection />
      <HowItWorksSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
