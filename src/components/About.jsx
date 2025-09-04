import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  CameraIcon,
  HeartIcon,
  SparklesIcon,
  EyeIcon,
  LightBulbIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const storyRefs = useRef([]);
  const ownerRef = useRef(null);
  const philosophyRefs = useRef([]);

  // Initialize animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with fade and subtle scale
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Enhanced story items animation with staggered timing
      storyRefs.current.forEach((el, index) => {
        if (!el) return;
        
        gsap.fromTo(el, 
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -80 : 80,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.3,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Owner section animation with parallax effect
      gsap.fromTo(ownerRef.current, 
        { 
          opacity: 0, 
          y: 80,
          rotation: 1
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ownerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Philosophy cards animation with staggered fade-in
      philosophyRefs.current.forEach((el, index) => {
        if (!el) return;
        
        gsap.fromTo(el, 
          { 
            opacity: 0, 
            y: 40,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Subtle floating animation for year circles
      const yearCircles = document.querySelectorAll('.year-circle');
      yearCircles.forEach((circle, index) => {
        gsap.to(circle, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5
        });
      });

    }, sectionRef);

    // Clean up function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add to refs arrays
  const addToStoryRefs = (el) => {
    if (el && !storyRefs.current.includes(el)) {
      storyRefs.current.push(el);
    }
  };

  const addToPhilosophyRefs = (el) => {
    if (el && !philosophyRefs.current.includes(el)) {
      philosophyRefs.current.push(el);
    }
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" ref={titleRef}>
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every photograph tells a story, and behind every story is a journey of passion, vision, and dedication.
          </p>
        </div>

        {/* Timeline Story */}
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Story Item 1 */}
          <div className="flex flex-col md:flex-row items-center" ref={addToStoryRefs}>
            <div className="md:w-1/2 md:pr-10 mb-8 md:mb-0">
              <div className="bg-gray-50 p-8 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    <LightBulbIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">The Beginning</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  It all started with a simple point-and-shoot camera and an insatiable curiosity about the world. 
                  What began as a hobby soon evolved into a passion for capturing the beauty in everyday moments.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="year-circle w-48 h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center border-2 border-blue-100">
                <span className="text-4xl font-light text-blue-600">2005</span>
              </div>
            </div>
          </div>

          {/* Story Item 2 */}
          <div className="flex flex-col md:flex-row items-center" ref={addToStoryRefs}>
            <div className="md:w-1/2 order-2 md:order-1 flex justify-center">
              <div className="year-circle w-48 h-48 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center border-2 border-amber-100">
                <span className="text-4xl font-light text-amber-600">2010</span>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10 mb-8 md:mb-0 order-1 md:order-2">
              <div className="bg-gray-50 p-8 border-l-4 border-amber-500">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-amber-50 rounded-lg mr-4">
                    <CameraIcon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">First Studio</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  With a growing portfolio and client base, we opened our first studio—a humble space filled with 
                  natural light and creative energy. This marked the beginning of our professional journey.
                </p>
              </div>
            </div>
          </div>

          {/* Story Item 3 */}
          <div className="flex flex-col md:flex-row items-center" ref={addToStoryRefs}>
            <div className="md:w-1/2 md:pr-10 mb-8 md:mb-0">
              <div className="bg-gray-50 p-8 border-l-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-50 rounded-lg mr-4">
                    <HeartIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Finding Our Style</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  We discovered that our true passion lies in authentic, emotion-filled photography. 
                  We moved away from posed perfection and embraced the beauty of genuine moments and raw emotions.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="year-circle w-48 h-48 bg-gradient-to-br from-purple-50 to-purple-100 rounded-full flex items-center justify-center border-2 border-purple-100">
                <span className="text-4xl font-light text-purple-600">2015</span>
              </div>
            </div>
          </div>

          {/* Story Item 4 */}
          <div className="flex flex-col md:flex-row items-center" ref={addToStoryRefs}>
            <div className="md:w-1/2 order-2 md:order-1 flex justify-center">
              <div className="year-circle w-48 h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center border-2 border-green-100">
                <span className="text-4xl font-light text-green-600">2020</span>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10 mb-8 md:mb-0 order-1 md:order-2">
              <div className="bg-gray-50 p-8 border-l-4 border-green-500">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-50 rounded-lg mr-4">
                    <SparklesIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">New Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  We expanded our services and embraced new technologies while staying true to our core values. 
                  Our team grew, but our commitment to personalized, meaningful photography remained unchanged.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Section */}
        <div ref={ownerRef} className="max-w-4xl mx-auto mt-24">
          <div className="bg-gray-50 p-12 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
              <div className="flex-shrink-0">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                  <EyeIcon className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-light text-gray-900 mb-3">King Stephen Chibuchi</h3>
                <p className="text-blue-600 font-medium mb-6">Founder & Lead Photographer</p>
                <blockquote className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                  "Photography, for me, is not about creating perfect images. It's about capturing authentic moments 
                  that tell the unique story of each person, couple, or family I have the privilege to work with."
                </blockquote>
                <p className="text-gray-600 leading-relaxed">
                  With over 15 years of experience, I've learned that the best photographs come from genuine connections 
                  and the ability to see the extraordinary in ordinary moments. My approach is intuitive, patient, and 
                  always focused on making you feel comfortable and beautiful in front of the camera.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h3 className="text-3xl font-light text-gray-900 mb-12">Our Philosophy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: HeartIcon,
                color: "blue",
                title: "Emotion First",
                description: "We believe the most powerful photographs are those that evoke genuine emotion and tell an authentic story."
              },
              {
                icon: SparklesIcon,
                color: "amber",
                title: "Artistic Excellence",
                description: "We combine technical mastery with artistic vision to create images that are both beautiful and meaningful."
              },
              {
                icon: CameraIcon,
                color: "purple",
                title: "Personal Connection",
                description: "We build relationships with our clients, ensuring a comfortable experience that results in natural, authentic photos."
              }
            ].map((item, index) => (
              <div 
                key={index}
                ref={addToPhilosophyRefs}
                className="bg-white p-8 border border-gray-200 hover:border-blue-300 transition-colors duration-300"
              >
                <div className={`w-16 h-16 bg-${item.color}-50 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button 
            onClick={() => window.location.href = '/portfolio'}
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300 group"
          >
            <CameraIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            View Portfolio
            <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;