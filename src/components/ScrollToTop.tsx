/**
 * ScrollToTop Component
 * 
 * Displays a floating "scroll to top" button when the user scrolls down the page.
 * 
 * Features:
 * - Button appears after scrolling down 500 pixels.
 * - Smoothly scrolls the window back to the top when clicked.
 * - Uses Framer Motion for fade and scale animations on show/hide.
 * - Accessible with aria-label for screen readers.
 * 
 * Enhances user navigation by providing quick return to the top of long pages.
 */


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-md z-40 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};