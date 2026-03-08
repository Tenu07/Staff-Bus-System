import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HeroSub = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Payment method data
  const paymentMethods = [
    { id: 1, name: "Visa Card", icon: "💳", color: "from-blue-500 to-blue-700" },
    { id: 2, name: "American Express", icon: "👑", color: "from-teal-500 to-teal-700" },
    { id: 3, name: "Master Card", icon: "🌐", color: "from-red-500 to-red-700" },
    { id: 4, name: "Genie", icon: "🧞", color: "from-purple-500 to-purple-700" },
    { id: 5, name: "Money Transfer", icon: "💸", color: "from-green-500 to-green-700" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center font-poppins bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Multiple Payment Options
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Secure, convenient payment methods for all your bookings
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mt-6 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * method.id 
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              onHoverStart={() => setHoveredItem(method.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className={`
                bg-white rounded-xl p-6 flex flex-col items-center
                border border-gray-200 transition-all duration-300
                ${hoveredItem === method.id ? 'shadow-xl' : 'shadow-md'}
              `}
            >
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center
                text-3xl mb-4 transition-all duration-500
                ${hoveredItem === method.id ? 
                  `bg-gradient-to-br ${method.color} text-white scale-110` : 
                  'bg-gray-100 text-gray-700'}
              `}>
                {method.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {method.name}
              </h3>
              
              <p className="text-gray-600 text-center text-sm mb-4">
                Secure and instant transactions
              </p>
              
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredItem === method.id ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-white rounded-xl p-6 max-w-3xl mx-auto border border-gray-200 shadow-md"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl text-green-600 mr-4">
                🔒
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Secure Payments</h3>
                <p className="text-gray-600">256-bit SSL encryption</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl text-blue-600 mr-4">
                ⚡
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Instant Processing</h3>
                <p className="text-gray-600">No waiting time</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl text-purple-600 mr-4">
                🔄
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Easy Refunds</h3>
                <p className="text-gray-600">24-hour cancellation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSub;