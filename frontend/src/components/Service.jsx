import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Real-Time Bidding",
      description: "Engage in live auctions with instant updates and fair competition.",
      icon: "📈",
    },
    {
      id: 2,
      title: "Secure Transactions",
      description: "We ensure all payments and transactions are encrypted and safe.",
      icon: "🔒",
    },
    {
      id: 3,
      title: "Diverse Listings",
      description: "Bid on a wide range of products from verified sellers.",
      icon: "🛍️",
    },
    {
      id: 4,
      title: "User-Friendly Interface",
      description: "A seamless experience for both buyers and sellers.",
      icon: "💻",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto min-h-screen mt-20 p-6 shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl"
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            whileHover={{
              scale: 1.12,  
              boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.5)", 
              transition: { duration: 0.15, ease: "easeInOut" }, 
            }}
            whileTap={{ scale: 0.95 }} 
            className="p-6 shadow-md rounded-xl text-center cursor-pointer transition duration-300 min-h-[250px] flex flex-col justify-center"
          >
            <span className="text-4xl">{service.icon}</span>
            <h2 className="text-xl font-semibold text-green-700 mt-2">{service.title}</h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
