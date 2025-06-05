import React from 'react';
import { motion } from 'framer-motion';
import { AssessmentForm } from '../components/AssessmentForm';

export const TestPage: React.FC = () => {
  return (
    <section className="section bg-white pt-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-title">
            <h1>Social Anxiety Assessment</h1>
            <p className="text-lg">
              Complete this comprehensive assessment to understand how various lifestyle factors might be influencing your social anxiety levels.
            </p>
          </div>
          <AssessmentForm />
        </motion.div>
      </div>
    </section>
  );
};