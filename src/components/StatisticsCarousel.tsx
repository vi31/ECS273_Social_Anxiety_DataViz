import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { statisticsData } from '../data/statisticsData';

export const StatisticsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (inView && isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === statisticsData.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [inView, isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? statisticsData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === statisticsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToIndex = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="statistics" className="section bg-white" ref={ref}>
      <div className="container-custom">
        <div className="section-title">
          <h2>Social Anxiety by the Numbers</h2>
          <p>
            Understanding the prevalence and impact of social anxiety through data
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 shadow-soft">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <div className="text-5xl font-bold text-primary-600 mb-4">
                      {statisticsData[currentIndex].value}
                    </div>
                    <h3 className="text-xl font-medium text-secondary-800 mb-4">
                      {statisticsData[currentIndex].title}
                    </h3>
                    <p className="text-secondary-600">
                      {statisticsData[currentIndex].description}
                    </p>
                    <div className="mt-4 text-sm text-secondary-500">
                      Source: {statisticsData[currentIndex].source}
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <div className="w-full max-w-xs aspect-square flex items-center justify-center rounded-full bg-white/50 p-4">
                      {statisticsData[currentIndex].icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-soft transition-all"
            aria-label="Previous statistic"
          >
            <ChevronLeft size={24} className="text-primary-600" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-soft transition-all"
            aria-label="Next statistic"
          >
            <ChevronRight size={24} className="text-primary-600" />
          </button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {statisticsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-primary-600 w-6'
                  : 'bg-secondary-300'
              }`}
              aria-label={`Go to statistic ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};