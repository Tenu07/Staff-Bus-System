import React from 'react';
import Forms from '../Component/UI/Forms';

function BookingLayout() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 to-white font-poppins">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Floating gradient circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 opacity-60 blur-xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 opacity-50 blur-xl animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 opacity-60 blur-xl animate-float-fast"></div>
        
        {/* Road graphic at bottom */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-800 to-gray-900 overflow-hidden">
          <div className="absolute bottom-0 w-[200%] h-full flex items-center animate-road">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-16 h-2 mx-8 bg-yellow-400 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center pt-10 pb-12 animate-fade-in">
          <div className="text-center mb-6 z-20">
            <div className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-full mb-5 text-lg shadow-lg animate-pulse-slow">
              🚌 Sri Lanka's #1 Bus Platform
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center pb-4 max-w-4xl animate-fade-in-up">
            <span className="block">Book Bus Tickets</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mt-3">
              In Just 60 Seconds
            </span>
          </h1>
          
          <div className="flex items-center justify-center mb-6 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-grow-width"></div>
            <div className="h-1 w-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-grow-width"></div>
          </div>
          
          <p className="text-gray-600 text-center text-lg md:text-xl w-full max-w-3xl lg:max-w-4xl leading-relaxed animate-fade-in-up">
            Plan your trip with ease: select your route, choose your seat, and confirm your ticket in just a few clicks. 
            <span className="font-semibold text-gray-900"> Fast, simple, and secure bus booking at your fingertips.</span>
          </p>
        </div>
        
        {/* Form Section */}
        <div className="flex flex-col items-center gap-8 mt-8 mb-16">
          <div className="w-full max-w-5xl bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white relative overflow-hidden animate-fade-in-up">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-500 rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-500 rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-500 rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-500 rounded-br-2xl"></div>
            
            {/* Form title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Plan Your Journey</h2>
              <p className="text-blue-600 font-medium">Fill in your travel details below</p>
            </div>
            
            {/* Your form component */}
            <Forms />
            
            {/* Booking stats */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center animate-fade-in-up">
                <div className="text-3xl font-bold text-blue-600">500K+</div>
                <div className="text-gray-600">Tickets Booked</div>
              </div>
              <div className="text-center animate-fade-in-up animate-delay-100">
                <div className="text-3xl font-bold text-indigo-600">99%</div>
                <div className="text-gray-600">On Time Buses</div>
              </div>
              <div className="text-center animate-fade-in-up animate-delay-200">
                <div className="text-3xl font-bold text-blue-500">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
          
          {/* Benefits section */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 animate-pulse">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Secure Booking</h3>
              </div>
              <p className="text-gray-600">Your transactions are protected with bank-grade security measures.</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up animate-delay-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 animate-pulse">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Instant Confirmation</h3>
              </div>
              <p className="text-gray-600">Get your e-ticket immediately after booking confirmation.</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up animate-delay-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center text-sky-700 animate-pulse">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Wide Coverage</h3>
              </div>
              <p className="text-gray-600">Access to 3,500+ routes across all of Sri Lanka.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Add to your global CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes growWidth {
          from { width: 0; }
          to { width: 4rem; }
        }
        
        @keyframes road {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-grow-width {
          animation: growWidth 1s ease-out forwards;
        }
        
        .animate-road {
          animation: road 2s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-delay-100 {
          animation-delay: 100ms;
        }
        
        .animate-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  )
}

export default BookingLayout;