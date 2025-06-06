/**
 * Header Component
 * 
 * This component renders the top navigation bar for the MindClear website.
 * 
 * Features:
 * - Displays site branding with logo and title linking to the home page.
 * - Responsive navigation menu with desktop and mobile views.
 * - Desktop menu shows navigation links horizontally.
 * - Mobile menu toggles open/closed with animated dropdown.
 * - Navigation links include internal page anchors and route links.
 * - Header background and padding change when the page is scrolled or when not on the home page.
 * 
 * State:
 * - isOpen: controls visibility of the mobile navigation menu.
 * - scrolled: tracks whether the window has been scrolled beyond a threshold to adjust header style.
 * 
 * Uses:
 * - React Router's Link and useLocation to handle routing and active page detection.
 * - Framer Motion for smooth animation of mobile menu appearance.
 * - Lucide icons for menu toggle and branding.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Statistics', href: '/#statistics' },
  { name: 'About Anxiety', href: '/#intro' },
  { name: 'Take The Test', href: '/test' },
  { name: 'About Project', href: '/#about' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-primary-700 font-bold text-xl"
        >
          <Brain size={24} />
          <span>MindClear</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.href.startsWith('/#') ? (
                  <a
                    href={isHomePage ? item.href : `${item.href}`}
                    className={`text-secondary-700 hover:text-primary-600 transition-colors ${
                      scrolled || !isHomePage ? '' : 'hover:text-primary-300'
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-secondary-700 hover:text-primary-600 transition-colors ${
                      scrolled || !isHomePage ? '' : 'hover:text-primary-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-secondary-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0"
        >
          <nav className="container-custom py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('/#') ? (
                    <a
                      href={isHomePage ? item.href : `${item.href}`}
                      className="block py-2 text-secondary-700 hover:text-primary-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="block py-2 text-secondary-700 hover:text-primary-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  );
};