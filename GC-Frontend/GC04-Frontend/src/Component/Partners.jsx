import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import images
import photo1 from '../assets/Images/BusPartners/photo1.png';
import photo2 from '../assets/Images/BusPartners/photo2.png';
import photo3 from '../assets/Images/BusPartners/photo3.png';
import photo4 from '../assets/Images/BusPartners/photo4.png';
import photo5 from '../assets/Images/BusPartners/photo5.png';
import photo6 from '../assets/Images/BusPartners/photo6.png';
import photo7 from '../assets/Images/BusPartners/photo7.png';
import photo8 from '../assets/Images/BusPartners/photo8.png';
import photo9 from '../assets/Images/BusPartners/photo9.png';
import photo10 from '../assets/Images/BusPartners/photo10.png';
import photo12 from '../assets/Images/BusPartners/photo12.png';
import photo13 from '../assets/Images/BusPartners/photo13.png';

// Create an array of partner logos
const partnerLogos = [
  photo1, photo2, photo3, photo4, photo5, photo6,
  photo7, photo8, photo9, photo10, photo12, photo13
];

function Partners() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Preload images
  useEffect(() => {
    partnerLogos.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <div 
      className='w-full py-16  font-poppins bg-white'
      ref={ref}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-14'
        >
          <h1 className='text-4xl md:text-5xl lg:text-6xl text-black font-bold mb-4'>
            Partnered Bus Service Providers
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-700 mx-auto rounded-full' />
        </motion.div>

        <motion.div 
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8'
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {partnerLogos.map((logo, index) => (
            <motion.div 
              key={index}
              className='flex justify-center items-center'
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              <div className='
                bg-white/5 backdrop-blur-sm 
                rounded-xl p-4 w-full h-32 
                flex items-center justify-center 
                border border-gray-600/20 
                hover:border-yellow-500/30 
                transition-all duration-300 
                shadow-lg hover:shadow-2xl hover:shadow-yellow-900/20
                cursor-pointer
              '>
                <img 
                  src={logo} 
                  alt={`Partner ${index + 1}`} 
                  className='max-h-16 max-w-[90%] object-contain'
                  loading='lazy'
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Partners;