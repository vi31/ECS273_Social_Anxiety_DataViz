import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LineChart, ArrowRight, CheckCircle } from 'lucide-react';

export const CallToAction: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="cta" className="section bg-gradient-to-r from-primary-600 to-primary-700 text-white" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Take the Social Anxiety Assessment
            </h2>
            
            <p className="text-primary-100 mb-8 text-lg">
              Our interactive assessment helps you understand how your lifestyle choices may be influencing your social anxiety levels. Get personalized insights and actionable recommendations.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Quick 5-minute assessment',
                'Science-backed analysis',
                'Personalized insights',
                'Privacy-focused (no account required)',
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={20} className="text-accent-300 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-white text-primary-700 hover:bg-primary-50 flex items-center gap-2"
            >
              Start Assessment
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
              <div className="absolute -top-6 -right-6 bg-accent-500 rounded-full p-4 shadow-lg">
                <LineChart size={28} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Answer Questions', desc: 'Complete a series of questions about your lifestyle and experiences' },
                  { step: '02', title: 'Data Analysis', desc: 'Our algorithm analyzes your responses using evidence-based models' },
                  { step: '03', title: 'Receive Insights', desc: 'Get personalized feedback and practical suggestions' },
                  { step: '04', title: 'Take Action', desc: 'Use the insights to make informed lifestyle adjustments' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="bg-primary-500 text-white rounded-lg h-10 w-10 flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{item.title}</h4>
                      <p className="text-primary-100">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute -z-10 w-full h-full top-6 left-6 bg-primary-800 rounded-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};