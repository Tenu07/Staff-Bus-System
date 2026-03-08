import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sofa,
  ShieldCheck,
  Headphones,
  Clock,
  Bus,
  CalendarCheck,
  MapPin,
  Users,
  Star,
  ArrowRight
} from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide elements initially
      gsap.set([textRef.current, imageRef.current, featuresRef.current, statsRef.current], {
        opacity: 0,
        y: 50
      });

      // Text animation
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Image animation
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      // Features animation
      gsap.to(featuresRef.current, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });

      // Stats animation
      gsap.to(statsRef.current, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7
      });

      // Title animation
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Paragraph animations
      gsap.from('.about-paragraph', {
        scrollTrigger: {
          trigger: '.about-paragraph',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      });

      // Feature item animations
      gsap.from('.feature-item', {
        scrollTrigger: {
          trigger: '.feature-item',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.7
      });

      // Stats animations
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: '.stat-item',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.9
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      className='w-full py-16 md:py-28 bg-gradient-to-b from-white to-gray-50'
      ref={containerRef}
    >
      <div className='container mx-auto px-4 md:px-8 lg:px-16 font-poppins'>
        {/* Decorative elements */}
        <div className='absolute top-20 left-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-0'></div>
        <div className='absolute bottom-40 right-0 w-60 h-60 bg-yellow-100 rounded-full blur-3xl -z-0'></div>
        
        <div className='relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between items-center'>
          {/* About us */}
          <div ref={textRef} className='flex flex-col gap-5 md:gap-7'>
            <div className='inline-flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 about-title'>
              <div className='w-3 h-3 bg-blue-500 rounded-full animate-pulse'></div>
              <h1 className='text-lg md:text-xl text-blue-600 font-medium'>
                YOUR JOURNEY, OUR COMMITMENT
              </h1>
            </div>
            
            <div className='flex flex-col gap-6 max-w-full lg:max-w-2xl text-gray-800'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent about-paragraph'>
                Redefining Travel Excellence
              </h1>   
              
              <div className='space-y-5'>
                <p className='leading-7 text-gray-600 about-paragraph'>
                  At Staff Bus Service.lk, we're revolutionizing Sri Lanka's transportation landscape.With over 15 years of experience serving thousands of satisfied passengers, we've mastered the art of comfortable, reliable travel.
                </p>
                <p className='leading-7 text-gray-600 about-paragraph'>
                  Our modern fleet of luxury coaches features plush reclining seats, individual charging ports, and climate control to ensure your journey is as pleasant as your destination.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div ref={featuresRef} className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-3'>
              <div className='feature-item group bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center'>
                    <Sofa className='w-6 h-6 text-blue-600' />
                  </div>
                  <h3 className='font-bold text-lg text-blue-700'>Premium Comfort</h3>
                </div>
                <p className='text-gray-600 mt-3 pl-1 text-sm'>Ergonomic seats with extra legroom and adjustable headrests</p>
              </div>
              
              <div className='feature-item group bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center'>
                    <ShieldCheck className='w-6 h-6 text-blue-600' />
                  </div>
                  <h3 className='font-bold text-lg text-blue-700'>Safety First</h3>
                </div>
                <p className='text-gray-600 mt-3 pl-1 text-sm'>GPS tracked vehicles with 24/7 monitoring</p>
              </div>
              
              <div className='feature-item group bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center'>
                    <Headphones className='w-6 h-6 text-blue-600' />
                  </div>
                  <h3 className='font-bold text-lg text-blue-700'>Onboard Service</h3>
                </div>
                <p className='text-gray-600 mt-3 pl-1 text-sm'>Complimentary snacks & beverages on select routes</p>
              </div>
              
              <div className='feature-item group bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center'>
                    <Clock className='w-6 h-6 text-blue-600' />
                  </div>
                  <h3 className='font-bold text-lg text-blue-700'>Punctuality</h3>
                </div>
                <p className='text-gray-600 mt-3 pl-1 text-sm'>98% on-time departure record nationwide</p>
              </div>
            </div>
            
            <div className='mt-4 flex items-center gap-3 feature-item'>
              <button className='px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium flex items-center gap-2 group hover:shadow-lg hover:shadow-blue-300 transition-all'>
                <span>Discover More</span>
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              </button>
              <div className='flex items-center gap-1 text-yellow-500'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-4 h-4 fill-yellow-400' />
                ))}
                <span className='ml-2 text-gray-600 text-sm'>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Image with decorative elements */}
          <div ref={imageRef} className='relative mt-6 lg:mt-0 group'>
            <div className='relative overflow-hidden rounded-2xl border border-gray-200 shadow-xl'>
              <div className='absolute top-5 left-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 z-20'>
                <CalendarCheck className='w-4 h-4' />
                <span className='text-sm'>Since 2008</span>
              </div>
              
              <div className='w-full max-w-md lg:w-[28rem] h-[28rem] bg-gray-100 rounded-2xl overflow-hidden relative'>
                <div className='w-full h-full bg-[url("https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVzfGVufDB8fDB8fHww")] bg-cover bg-center'></div>
              </div>
              
              <div className='absolute bottom-5 left-5 z-20 text-white'>
                <h3 className='text-xl font-bold'>Luxury Fleet</h3>
                <p className='text-white text-sm'>Premium travel experience</p>
              </div>
            </div>
            
            <div className='absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg rotate-12 shadow-xl -z-10 group-hover:rotate-6 transition-all duration-500'></div>
            <div className='absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg -rotate-12 shadow-xl -z-10 group-hover:-rotate-6 transition-all duration-500'></div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className='px-4 md:px-0 mt-24 grid grid-cols-2 md:grid-cols-4 gap-5'>
          <div className='stat-item p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 group hover:shadow-lg'>
            <div className='flex flex-col items-center text-center'>
              <div className='w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-all'>
                <Bus className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>15+</h3>
              <p className='text-gray-600 text-sm'>Years Experience</p>
            </div>
          </div>
          
          <div className='stat-item p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 group hover:shadow-lg'>
            <div className='flex flex-col items-center text-center'>
              <div className='w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-all'>
                <MapPin className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>50+</h3>
              <p className='text-gray-600 text-sm'>Modern Vehicles</p>
            </div>
          </div>
          
          <div className='stat-item p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 group hover:shadow-lg'>
            <div className='flex flex-col items-center text-center'>
              <div className='w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-all'>
                <Clock className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>98%</h3>
              <p className='text-gray-600 text-sm'>On-Time Rate</p>
            </div>
          </div>
          
          <div className='stat-item p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 group hover:shadow-lg'>
            <div className='flex flex-col items-center text-center'>
              <div className='w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-all'>
                <Users className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>24/7</h3>
              <p className='text-gray-600 text-sm'>Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;