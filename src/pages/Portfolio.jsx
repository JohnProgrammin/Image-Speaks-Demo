import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  XMarkIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  Squares2X2Icon,
  ViewColumnsIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const galleryRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { darkMode, toggleDarkMode } = useTheme();

  // Sample portfolio data
  const portfolioItems = [
    { id: 1, category: 'portrait', title: 'Portrait Elegance', src: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3' },
    { id: 2, category: 'wedding', title: 'Wedding Bliss', src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3' },
    { id: 3, category: 'nature', title: 'Nature Beauty', src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3' },
    { id: 4, category: 'portrait', title: 'Urban Portrait', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3' },
    { id: 5, category: 'fashion', title: 'Fashion Forward', src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3' },
    { id: 6, category: 'wedding', title: 'Golden Hour', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3' },
    { id: 7, category: 'nature', title: 'Mountain Majesty', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3' },
    { id: 8, category: 'fashion', title: 'Runway Style', src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3' },
    { id: 9, category: 'portrait', title: 'Minimal Portrait', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3' },
    { id: 10, category: 'wedding', title: 'First Dance', src: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-4.0.3' },
    { id: 11, category: 'nature', title: 'Forest Serenity', src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3' },
    { id: 12, category: 'fashion', title: 'Editorial Fashion', src: 'https://images.unsplash.com/photo-1525299374597-911581e1bdef?ixlib=rb-4.0.3' },
  ];

  const categories = [
    { id: 'all', name: 'All Works' },
    { id: 'portrait', name: 'Portraits' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'nature', name: 'Nature' },
    { id: 'fashion', name: 'Fashion' },
  ];

  // Filter portfolio items based on selected category
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  // Memoized animation setup
  const setupAnimations = useCallback(() => {
    if (!galleryRef.current) return;
    
    const galleryItems = galleryRef.current.querySelectorAll('.gallery-item');
    
    // Kill existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Animate each gallery item with stagger effect
    gsap.fromTo(galleryItems, 
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6, // Slightly faster
        stagger: 0.08, // Reduced stagger time
        ease: 'power2.out', // Simpler easing for better performance
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%', // Trigger earlier
          end: 'bottom 40%',
          toggleActions: 'play none none none', // Only play once
          markers: false // Disable markers in production
        }
      }
    );
  }, [filter, viewMode]);

  // Initialize animations
  useEffect(() => {
    setupAnimations();
    
    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setupAnimations]);

  // Open lightbox with specific image
  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  // Navigate to next image in lightbox
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [filteredItems.length]);

  // Navigate to previous image in lightbox
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  }, [filteredItems.length]);

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  // Optimized image loading
  const ImageItem = React.memo(({ item, index }) => (
    <div 
      className="gallery-item group overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 transform transition-transform duration-300 hover:shadow-xl dark:shadow-gray-900/30"
      style={{ willChange: 'transform' }} // Performance hint
    >
      <div 
        className="relative overflow-hidden cursor-pointer"
        onClick={() => openLightbox(index)}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" // Reduced scale effect
          loading="lazy" // Lazy loading for better performance
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-center">
            <h3 className="text-xl font-medium mb-2">{item.title}</h3>
            <p className="text-sm uppercase tracking-wider">{item.category}</p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <section id="portfolio" className="min-h-screen pt-20 py-20 transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <div className="container mx-auto px-6">
          {/* Dark Mode Toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-card)' }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
              ) : (
                <MoonIcon className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
              )}
            </button>
          </div>

          {/* Section Header */}
          <div className="text-center mb-12"> {/* Reduced margin */}
            <h2 className="text-4xl md:text-5xl font-light mb-4">Our Portfolio</h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Explore our collection of stunning photographs that capture special moments and tell unique stories.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center gap-3 mb-10"> {/* Reduced gap and margin */}
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === category.id 
                    ? 'text-white' 
                    : 'hover:opacity-90'
                }`}
                style={{
                  backgroundColor: filter === category.id 
                    ? '#3b82f6' 
                    : 'var(--bg-card)',
                  color: filter === category.id 
                    ? 'white' 
                    : 'var(--text-primary)'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-end mb-6"> {/* Reduced margin */}
            <div className="flex rounded-lg p-1 shadow-sm" style={{ backgroundColor: 'var(--bg-card)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'opacity-100' : 'opacity-70'
                }`}
                style={{ color: 'var(--text-primary)' }}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'masonry' ? 'opacity-100' : 'opacity-70'
                }`}
                style={{ color: 'var(--text-primary)' }}
              >
                <ViewColumnsIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div 
            ref={galleryRef}
            className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'masonry-grid'}`}
          >
            {filteredItems.map((item, index) => (
              <ImageItem key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-100 transition-colors"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-100 transition-colors z-10"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-100 transition-colors z-10"
              >
                <ArrowRightIcon className="w-6 h-6" />
              </button>

              <div className="max-w-5xl max-h-full w-full h-full flex items-center justify-center">
                <img
                  src={filteredItems[currentImageIndex].src}
                  alt={filteredItems[currentImageIndex].title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="absolute bottom-6 left-0 right-0 text-center text-white">
                <h3 className="text-xl font-medium">{filteredItems[currentImageIndex].title}</h3>
                <p className="text-gray-300">{currentImageIndex + 1} / {filteredItems.length}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Portfolio;