import React from 'react';
import { 
  Users, Shield, Clock, Map, Bus, Heart, ArrowRight, 
  Star, Check, Phone, Mail, MapPin 
} from 'lucide-react';
import { motion } from 'framer-motion';
import leader1 from '../../public/BA.png';
import leader2 from '../../public/PM.png';
import leader3 from '../../public/QA.png';
import leader4 from '../../public/SE.png';
import leader5 from '../../public/UIUX.png';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 } 
  }
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const slideInRight = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const bounce = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

function AboutUsLayout() {
  const teamMembers = [
    {
      name: "Shehani Maleesha",
      role: "Business Analyst",
      bio: "20+ years in transportation industry",
      image: leader1
    },
    {
      name: "Ramithu Wethmin",
      role: " Project Manager",
      bio: "Expert in logistics and fleet management",
      image: leader2
    },
    {
      name: "Tenuli Liyansa",
      role: "Quality Assurance",
      bio: "Passionate about traveler satisfaction",
      image: leader3
    },
    {
      name: "Sulakshika Sewmini ",
      role: "Software Developer",
      bio: "Building innovative travel solutions",
      image: leader4
    },
    {
      name: "Aarya Liyanage",
      role: "UI/UX Designer",
      bio: "Building innovative travel solutions",
      image: leader5
    }
  ];

  const milestones = [
    { year: "2008", title: "Company Founded", description: "Started with just 5 buses serving Colombo-Kandy route" },
    { year: "2012", title: "National Expansion", description: "Expanded to cover all major cities in Sri Lanka" },
    { year: "2016", title: "Mobile App Launch", description: "Introduced booking app with real-time tracking" },
    { year: "2020", title: "Fleet Modernization", description: "Upgraded entire fleet with luxury AC buses" },
    { year: "2023", title: "1M Passengers", description: "Served our 1 millionth happy customer" }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety First",
      description: "Our drivers undergo rigorous training, and our buses are maintained to the highest standards with daily safety checks."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Punctuality",
      description: "We maintain a 98.7% on-time record through efficient scheduling and real-time monitoring of all journeys."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer Care",
      description: "24/7 support team ready to assist with bookings, changes, and any travel inquiries you may have."
    }
  ];

  const testimonials = [
    {
      text: "The most comfortable bus journey I've experienced in Sri Lanka. The seats were spacious and the service was impeccable.",
      author: "Saman Perera",
      role: "Frequent Traveler",
      rating: 5
    },
    {
      text: "Staff Bus Service.lk has transformed my weekly commute to Colombo. Punctual, clean, and excellent customer service.",
      author: "Priya Fernando",
      role: "Business Traveler",
      rating: 5
    },
    {
      text: "Their mobile app makes booking so easy, and the real-time tracking gives me peace of mind about arrival times.",
      author: "Rajiv Silva",
      role: "Student Traveler",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-poppins">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[70vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-white font-medium">Since 2008</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Redefining Bus Travel in Sri Lanka
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              At Staff Bus Service.lk, we're committed to making your journey comfortable, reliable, and memorable.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a 
                href="#our-story" 
                className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Our Story
              </a>
              <a 
                href="#contact" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Mission: Transforming Sri Lankan Travel
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Founded in 2008, Staff Bus Service.lk began with a simple vision: to make bus travel in Sri Lanka comfortable, reliable, and accessible to everyone.
            </p>
            <p className="text-gray-600 mb-8">
              Today, we operate a modern fleet of over 100 buses serving 50+ routes across the island. Our commitment to safety, punctuality, and customer satisfaction has made us Sri Lanka's fastest-growing bus service.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-3xl font-bold text-blue-600 mb-2">98.7%</h3>
                <p className="text-gray-700">On-time performance rate</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-3xl font-bold text-blue-600 mb-2">500K+</h3>
                <p className="text-gray-700">Happy passengers annually</p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={bounce} 
              className="rounded-xl overflow-hidden h-80"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1596466596120-2a8e4b5d3acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80')"
                }}
              ></div>
            </motion.div>
            <motion.div 
              variants={bounce} 
              className="rounded-xl overflow-hidden h-80 mt-12"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1557226705-ec0c5c3b5e21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80')"
                }}
              ></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Values Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <motion.div 
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every journey we operate and every decision we make.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Journey Timeline */}
      <div id="our-story" className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From humble beginnings to becoming a leader in Sri Lankan bus transportation.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 z-0"></div>
          
          <div className="space-y-12 relative z-10">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index} 
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-1/2 p-6">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="text-blue-600 font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="w-1/2 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl border-4 border-white shadow-lg">
                    {milestone.year}
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <motion.div 
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The experienced professionals driving our vision forward.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-blue-300">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex items-center gap-3">
                    <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Contact</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Testimonials */}
      <motion.div 
        className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Passengers Say</h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                whileHover={{ y: -5 }}
              >
                <div className="text-yellow-400 flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-200 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h4 className="font-bold text-white">{testimonial.author}</h4>
                    <p className="text-blue-200 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Ready for Your Next Journey?</h2>
          <p className="text-gray-600 text-xl mb-10">
            Experience the Staff Bus Service.lk difference - comfort, reliability, and exceptional service.
          </p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              variants={bounce}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Book Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
              variants={bounce}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Our App
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Contact */}
      <motion.div 
        id="contact" 
        className="bg-gradient-to-r from-blue-900 to-indigo-900 py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={slideIn}>
              <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
              <p className="text-gray-300 mb-8 max-w-lg">
                Have questions about our services? Our team is ready to assist you with all your travel needs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>(+94) 76 676 4848</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>info@Staff Bus Service.lk</span>
                </div>
                <div className="flex items-start gap-4 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                  <span>123 Galle Road, Colombo 03, Sri Lanka</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8"
              variants={slideInRight}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutUsLayout;