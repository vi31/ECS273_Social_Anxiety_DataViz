import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, BarChart3, Shield, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section bg-white" ref={ref}>
      <div className="container-custom">
        <div className="section-title">
          <h2>About This Project</h2>
          <p>
            Learn more about our research-based approach to understanding social anxiety through visual analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-primary-50 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Our Approach</h3>
              
              <p className="text-secondary-700 mb-4">
                This project combines data science, psychology, and interactive visualization to create an engaging platform for understanding social anxiety. By leveraging visual analytics, we aim to make complex relationships between lifestyle factors and anxiety symptoms more accessible and actionable.
              </p>
              
              <p className="text-secondary-700 mb-4">
                Our interdisciplinary team includes data scientists, psychologists, and UX designers who collaborated to develop evidence-based algorithms and user-friendly interfaces that provide meaningful insights into social anxiety.
              </p>
              
              <p className="text-secondary-700">
                The visualizations and assessment tools were developed as part of a visual analytics course, with a focus on creating accessible, informative, and engaging data representations that can help users better understand the factors that influence their mental well-being.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-accent-50 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold text-accent-700 mb-4">Research Base</h3>
              
              <p className="text-secondary-700 mb-4">
                Our assessment tool and visualizations are based on peer-reviewed research on social anxiety and its relationship with lifestyle factors. We've integrated findings from multiple studies to create a comprehensive model.
              </p>
              
              <p className="text-secondary-700">
                For those interested in learning more about the research behind this project, we provide references to key studies and explanations of how we've interpreted and applied their findings.
              </p>
              
              <div className="mt-6">
                <a href="#" className="text-accent-600 font-medium hover:text-accent-700 transition-colors">
                  View Research References →
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              icon: <Lightbulb size={24} className="text-primary-600" />,
              title: "Educational Purpose",
              description: "Our primary goal is to educate users about social anxiety and empower them with knowledge to make informed lifestyle choices."
            },
            {
              icon: <BarChart3 size={24} className="text-primary-600" />,
              title: "Data Visualization",
              description: "We use advanced data visualization techniques to make complex information accessible and meaningful."
            },
            {
              icon: <Shield size={24} className="text-primary-600" />,
              title: "Privacy Focused",
              description: "Your data is processed locally in your browser. We don't store any personal information or assessment results."
            },
            {
              icon: <HeartHandshake size={24} className="text-primary-600" />,
              title: "Not a Diagnosis",
              description: "This tool is for educational purposes only and is not intended to diagnose or treat any mental health condition."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="card h-full"
            >
              <div className="bg-primary-50 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2">{item.title}</h3>
              <p className="text-secondary-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-secondary-50 rounded-xl p-6 border border-secondary-100"
        >
          <h3 className="text-xl font-bold text-secondary-800 mb-2">Responsible Use</h3>
          <p className="text-secondary-600">
            While we strive to provide accurate information, this tool is not a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing significant anxiety or distress, please consult with a qualified healthcare provider.
          </p>
        </motion.div>
      </div>
    </section>
  );
};