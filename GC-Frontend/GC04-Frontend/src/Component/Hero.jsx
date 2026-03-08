import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bus from '../assets/Images/busimage.png'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
  const imageRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Only run animations if components are mounted
    if (!heroRef.current) return;
    
    // Create a master timeline for all animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reset"
      }
    });

    // Animation for title lines
    if (titleLine1Ref.current && titleLine2Ref.current) {
      tl.fromTo(titleLine1Ref.current, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0
      ).fromTo(titleLine2Ref.current, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2
      );
    }

    // Animation for subtitle
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.4
      );
    }

    // Animation for description
    if (descriptionRef.current) {
      tl.fromTo(descriptionRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.6
      );
    }

    // Animation for buttons
    if (buttonsRef.current) {
      tl.fromTo(buttonsRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, 0.8
      );
    }

    // Animation for features
    if (featuresRef.current && featuresRef.current.children) {
      tl.fromTo(featuresRef.current.children, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out"
        }, 1.0
      );
    }

    // Animation for image
    if (imageRef.current) {
      tl.fromTo(imageRef.current, 
        { opacity: 0, scale: 0.85 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.75)"
        }, 0.5
      );
    }

    // Animation for decorative circles
    const circles = [circle1Ref, circle2Ref, circle3Ref].filter(ref => ref.current);
    if (circles.length) {
      tl.fromTo(circles.map(ref => ref.current), 
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, 
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, 0.3
      );
    }

    // Animation for stats
    if (statsRef.current) {
      tl.fromTo(statsRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, 1.2
      );
    }

    // Continuous animations for decorative circles
    circles.forEach((circleRef, index) => {
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          y: index % 2 === 0 ? 15 : -15,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 bg-gradient-to-br from-sky-50 to-indigo-50 relative overflow-hidden mt-10"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div 
          ref={circle1Ref}
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-indigo-100 opacity-40"
        ></div>
        <div 
          ref={circle2Ref}
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-blue-200 opacity-30"
        ></div>
        <div 
          ref={circle3Ref}
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-sky-200 opacity-40"
        ></div>
      </div>
      
      {/* Text Content */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-center py-16 lg:py-0 relative z-10">
        <div className="max-w-2xl">
          <div className="mb-6">
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 font-poppins rounded-full mb-4">
              🚌 Sri Lanka's #1 Staff Bus Service
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppinsBold text-gray-900 leading-tight mb-4">
            <span ref={titleLine1Ref} className="block">Your Journey</span>
            <span ref={titleLine2Ref} className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              Begins Here
            </span>
          </h1>
          
          <h2 
            ref={subtitleRef}
            className="text-2xl md:text-3xl lg:text-4xl font-poppinsSemiBold text-gray-800 mb-6 "
          >
            Smart Bus Ticketing for Staff Members in Sri Lanka
          </h2>
          
          <p 
            ref={descriptionRef}
            className="text-gray-700 text-lg md:text-xl mb-8 max-w-lg font-poppins"
          >
            Book bus tickets across Sri Lanka with our seamless platform. 
            <span className="font-poppinsMedium text-indigo-700">
              {" "}Safe, fast, and convenient travel the smart way.
            </span>
          </p>
          
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <button 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-poppinsSemiBold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Book Tickets Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
            <button 
              className="px-8 py-4 bg-white text-indigo-700 font-poppinsSemiBold rounded-xl border-2 border-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors duration-300"
            >
              How It Works
            </button>
          </div>
          
          <div 
            ref={featuresRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md"
          >
            <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-poppinsSemiBold text-sm text-gray-900">Secure Booking</h3>
                <p className="text-sm font-poppinsSemiBold text-gray-600">100% payment protection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-poppinsSemiBold text-sm text-gray-900">Instant Confirmation</h3>
                <p className="text-sm font-poppinsSemiBold text-gray-600">E-ticket immediately</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-poppinsSemiBold text-sm  text-gray-900">3,500+ Routes</h3>
                <p className="text-sm font-poppinsSemiBold text-gray-600">Across Sri Lanka</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-poppinsSemiBold text-sm text-gray-900">24/7 Support</h3>
                <p className="text-sm font-poppinsSemiBold text-gray-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Content */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex items-center justify-center relative py-8 lg:py-0">
        <div className="relative w-full max-w-2xl">
          {/* Bus image with frame */}
          <div 
            ref={imageRef}
            className="relative w-full h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-sky-100 to-indigo-100 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white"
          >
            {/* Bus SVG */}
            <div className="absolute w-4/5">
              <img src={Bus} alt="" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-blue-500 bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 shadow-md"></div>
            <div className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl bg-indigo-500 bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 shadow-md"></div>
            
            {/* Floating passengers */}
            <div className="absolute top-8 right-12 animate-float">
              <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div className="absolute bottom-16 left-16 animate-float delay-500">
              <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
              </div>
            </div>
          </div>
          
          {/* Stats overlay */}
          <div 
            ref={statsRef}
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl py-4 px-6 flex gap-8"
          >
            <div className="text-center">
              <div className="text-2xl font-poppinsSemiBold text-blue-600">500K+</div>
              <div className="text-xs text-gray-600 font-poppinsSemiBold">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-poppinsSemiBold text-indigo-600">99%</div>
              <div className="text-xs text-gray-600 font-poppinsSemiBold">On Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-poppinsSemiBold text-amber-600">24/7</div>
              <div className="text-xs text-gray-600 font-poppinsSemiBold">Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-blue-500 flex justify-center p-1">
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1"></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;