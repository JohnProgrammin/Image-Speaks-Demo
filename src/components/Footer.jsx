// components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowUpIcon 
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

// Custom Instagram icon
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
    <rect width={20} height={20} x={2} y={2} strokeWidth={2} rx={5} ry={5} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 6.5h.01" />
  </svg>
);

// Custom WhatsApp icon
const WhatsAppIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode } = useTheme(); // Get dark mode state from context

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300"
            style={{ 
              backgroundColor: darkMode ? 'var(--bg-primary)' : '#ffffff',
              color: darkMode ? 'var(--text-primary)' : '#1f2937'
            }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Copyright */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm transition-colors duration-300"
               style={{ color: darkMode ? 'var(--text-secondary)' : '#6b7280' }}>
              © {new Date().getFullYear()} Frame & Focus Photography. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a
              href="https://instagram.com/image.speaks"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-pink-600"
              style={{ color: darkMode ? 'var(--text-secondary)' : '#6b7280' }}
              aria-label="Follow us on Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/+2348115713452"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-green-600"
              style={{ color: darkMode ? 'var(--text-secondary)' : '#6b7280' }}
              aria-label="Message us on WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className={`p-3 rounded-full transition-all duration-300 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              backgroundColor: darkMode ? 'var(--bg-card)' : '#f3f4f6',
              color: darkMode ? 'var(--text-primary)' : '#4b5563'
            }}
            aria-label="Back to top"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;