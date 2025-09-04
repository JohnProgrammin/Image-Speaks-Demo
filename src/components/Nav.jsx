// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  CameraIcon, 
  Bars3Icon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { darkMode } = useTheme();
  const location = useLocation(); // Get current location

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate navbar on mount
  useEffect(() => {
    gsap.fromTo('.nav-item', 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.7 }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if a link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-md shadow-lg py-3' 
          : 'py-5'
      }`}
      style={{ 
        backgroundColor: isScrolled 
          ? 'var(--nav-bg)' 
          : 'transparent' 
      }}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            <CameraIcon className="h-7 w-7 mr-2" />
            <span className="text-xl font-light tracking-wider">Image Speaks</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {[
              { path: '/', name: 'Home' },
              { path: '/portfolio', name: 'Portfolio' },
              { path: '/review', name: 'Review' },
            //   { path: '/about', name: 'About' },
            //   { path: '/services', name: 'Services' },
            //   { path: '/contact', name: 'Contact' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActiveLink(item.path) 
                    ? 'font-semibold border-b-2 border-blue-500' 
                    : 'hover:opacity-80'
                }`}
                style={{ color: 'var(--text-primary)' }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link 
            to="/contact"
            className="nav-item hidden md:flex items-center text-sm font-medium px-5 py-2 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: isScrolled 
                ? (darkMode ? '#3b82f6' : '#000000') 
                : 'rgba(255, 255, 255, 0.1)',
              color: isScrolled 
                ? '#ffffff' 
                : 'var(--text-primary)',
              border: isScrolled 
                ? 'none' 
                : '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <CameraIcon className="h-4 w-4 mr-2" />
            Book Session
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 backdrop-blur-md transition-opacity duration-500 md:hidden ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)' }}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {[
            { path: '/', name: 'Home' },
            { path: '/portfolio', name: 'Portfolio' },
            { path: '/review', name: 'Review' }
          ].map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-light opacity-0 transform -translate-y-5 ${
                isActiveLink(item.path) ? 'font-semibold text-blue-500' : ''
              }`}
              style={{
                animation: isMenuOpen 
                  ? `navItemFade 0.5s ease forwards ${index * 0.1}s` 
                  : 'none',
                color: isActiveLink(item.path) ? '' : 'var(--text-primary)'
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="px-8 py-3 mt-8 rounded-full font-medium flex items-center opacity-0 transform -translate-y-5"
            style={{
              animation: isMenuOpen 
                ? `navItemFade 0.5s ease forwards 0.5s` 
                : 'none',
              backgroundColor: darkMode ? '#3b82f6' : '#000000',
              color: '#ffffff'
            }}
          >
            <CameraIcon className="h-5 w-5 mr-2" />
            Book a Session
          </Link>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes navItemFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;