import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Brain, Activity, ShieldAlert } from 'lucide-react';

export const IntroSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="intro" className="section bg-primary-50" ref={ref}>
      <div className="container-custom">
        <div className="section-title">
          <h2>Understanding Social Anxiety</h2>
          <p>
            Social anxiety disorder (SAD) is more than just shyness. It involves intense fear of social situations and can significantly impact daily life.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12"
        >
          <motion.div variants={item} className="card">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Users className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-800 mb-2">
                  What is Social Anxiety?
                </h3>
                <p className="text-secondary-700">
                  Social anxiety disorder is characterized by intense fear or anxiety about social situations where you might be scrutinized or judged by others. It goes beyond occasional nervousness and can significantly impair daily functioning.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="card">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Brain className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-800 mb-2">
                  Common Symptoms
                </h3>
                <p className="text-secondary-700">
                  Symptoms include intense fear of judgment, avoidance of social situations, physical symptoms like sweating or trembling, and anticipatory anxiety before social events. These symptoms can interfere with work, school, and relationships.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="card">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Activity className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-800 mb-2">
                  Lifestyle Factors
                </h3>
                <p className="text-secondary-700">
                  Research shows that lifestyle factors like sleep quality, physical activity, nutrition, and social support networks can significantly influence social anxiety levels. Understanding these connections can provide pathways for improvement.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="card">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <ShieldAlert className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-800 mb-2">
                  Treatment Approaches
                </h3>
                <p className="text-secondary-700">
                  Effective treatments include cognitive-behavioral therapy (CBT), medication, lifestyle modifications, and support groups. Many people find that a combination of approaches works best for managing social anxiety.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-secondary-600 max-w-3xl mx-auto mb-6">
            Social anxiety affects approximately 7% of adults in the United States, making it one of the most common anxiety disorders. With proper understanding and support, those affected can find effective ways to manage symptoms and improve quality of life.
          </p>
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Assess Your Social Anxiety
          </motion.a>
        </div>
      </div>
    </section>
  );
};