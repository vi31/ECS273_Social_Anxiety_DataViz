import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-50"
    >
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 mb-6">
            Understanding <span className="text-accent-600">Social Anxiety</span> Through Data
          </h1>
          
          <p className="text-lg md:text-xl text-secondary-700 mb-8 leading-relaxed">
            Explore how lifestyle factors influence social anxiety levels and discover personalized insights through our interactive tool.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/test"
                className="btn btn-primary text-lg px-8 py-3"
              >
                Take the Test
              </Link>
            </motion.div>
            
            <motion.a
              href="#intro"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary text-lg"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <a 
            href="#statistics" 
            className="animate-bounce bg-white p-2 rounded-full shadow-soft"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} className="text-primary-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};