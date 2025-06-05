import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white text-secondary-800 font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </motion.div>
      </div>
    </Router>
  );
}

export default App;