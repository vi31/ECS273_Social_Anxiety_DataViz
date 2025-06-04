import React from 'react';
import { Brain, Github, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-800 text-secondary-300 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Brain size={24} />
              <span>MindClear</span>
            </div>
            <p className="mb-4">
              An interactive tool to explore the relationship between lifestyle factors and social anxiety.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '#hero' },
                { name: 'Statistics', href: '#statistics' },
                { name: 'About Anxiety', href: '#intro' },
                { name: 'Take The Test', href: '#cta' },
                { name: 'About Project', href: '#about' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: 'ADAA', href: 'https://adaa.org/', external: true },
                { name: 'NIMH', href: 'https://www.nimh.nih.gov/', external: true },
                { name: 'Mental Health America', href: 'https://www.mhanational.org/', external: true },
                { name: 'Psychology Today', href: 'https://www.psychologytoday.com/', external: true },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-400 hover:text-white transition-colors flex items-center gap-1"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.name}
                    {link.external && <ExternalLink size={12} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Privacy</h3>
            <p>
              We respect your privacy. All data from the assessment is processed locally in your browser and is not stored or transmitted to our servers.
            </p>
            <div className="mt-4">
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-secondary-700 text-center text-secondary-500 text-sm">
          <p>
            © {currentYear} MindClear. Created for educational purposes.
          </p>
          <p className="mt-2">
            This site is not intended to provide medical advice or treatment for social anxiety disorder.
          </p>
        </div>
      </div>
    </footer>
  );
};