import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import ScheduleSection from '../../components/ScheduleSection/ScheduleSection';
import AboutSection from '../../components/AboutSection/AboutSection';
import ContactSection from '../../components/ContactSection/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ScheduleSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default Home;
