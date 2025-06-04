import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatisticsCarousel } from './components/StatisticsCarousel';
import { IntroSection } from './components/IntroSection';
import { CallToAction } from './components/CallToAction';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white text-secondary-800 font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <main>
          <Hero />
          <StatisticsCarousel />
          <IntroSection />
          <CallToAction />
          <AboutSection />
        </main>
        <Footer />
        <ScrollToTop />
      </motion.div>
    </div>
  );
}

export default App;