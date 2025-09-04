// Hero.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDownIcon, CameraIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const navRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shutterActive, setShutterActive] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Navigation animation
    if (navRef.current) {
      tl.fromTo(
        navRef.current.children,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }
      );
    }

    // Main content animation
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.3'
    );
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.4'
    );
    tl.fromTo(
      ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    // Scroll indicator animation
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      opacity: 0.7,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Trigger shutter effect
      setShutterActive(true);
      
      // Wait for shutter animation to complete halfway then scroll
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 400);
      
      // Reset shutter effect
      setTimeout(() => {
        setShutterActive(false);
      }, 800);
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShutterClick = (sectionId) => {
    setShutterActive(true);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 400);
  };

  return (
    <div 
      ref={heroRef} 
      className={`relative h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden ${shutterActive ? 'shutter-effect' : ''}`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-0"></div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
          Capturing Life's <span className="text-gray-300">Beautiful</span> Moments
        </h1>
        <p ref={subtitleRef} className="text-lg md:text-xl font-light max-w-2xl mb-10 text-gray-300">
          Professional photography services that tell your unique story through our lens
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <a 
  href="/portfolio"
  className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
>
  <CameraIcon className="h-5 w-5 mr-2" />
  View Portfolio
</a>
          <button 
            onClick={() => handleShutterClick('contact')}
            className="px-8 py-3 border border-white hover:bg-white/10 transition-colors duration-300"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        ref={scrollIndicatorRef}
        onClick={() => handleShutterClick('portfolio')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
      >
        <ChevronDownIcon className="h-8 w-8 text-white animate-bounce" />
      </div>
    </div>
  );
};

export default Hero;