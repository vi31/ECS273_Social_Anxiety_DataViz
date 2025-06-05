import React from 'react';
import { Hero } from '../components/Hero';
import { StatisticsCarousel } from '../components/StatisticsCarousel';
import { IntroSection } from '../components/IntroSection';
import { CallToAction } from '../components/CallToAction';
import { AboutSection } from '../components/AboutSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <StatisticsCarousel />
      <IntroSection />
      <CallToAction />
      <AboutSection />
    </>
  );
};