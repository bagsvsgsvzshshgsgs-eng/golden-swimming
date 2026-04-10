import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import ScheduleSection from '../../components/ScheduleSection/ScheduleSection';
import AboutSection from '../../components/AboutSection/AboutSection';
import ContactSection from '../../components/ContactSection/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ScheduleSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default Home;
