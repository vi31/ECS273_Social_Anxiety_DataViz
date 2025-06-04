import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatisticsCarousel } from './components/StatisticsCarousel';
import { IntroSection } from './components/IntroSection';
import { CallToAction } from './components/CallToAction';
import { AboutSection } from './components/AboutSection';
import { AssessmentForm } from './components/AssessmentForm';
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
          <section id="assessment" className="section bg-white">
            <div className="container-custom">
              <div className="section-title">
                <h2>Social Anxiety Assessment</h2>
                <p>
                  Complete this comprehensive assessment to understand how various lifestyle factors might be influencing your social anxiety levels.
                </p>
              </div>
              <AssessmentForm />
            </div>
          </section>
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