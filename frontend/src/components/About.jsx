import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto min-h-screen mt-20 p-6 shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        About Us
      </h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        Welcome to <span className="font-semibold text-green-700">Bidworld</span>, the ultimate online bidding platform designed to revolutionize how buyers and sellers connect in a secure, transparent, and competitive environment.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="p-6 shadow-md rounded-xl"
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to provide a <strong>fair, secure, and efficient</strong> bidding system where users can participate in auctions seamlessly.
          </p>
        </motion.div>

        <motion.div
          className="p-6 shadow-md rounded-xl"
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>✅ Fair & Transparent Bidding</li>
            <li>✅ Secure Transactions</li>
            <li>✅ User-Friendly Interface</li>
            <li>✅ Wide Range of Auctions</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="p-6 shadow-md rounded-xl mt-8"
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-green-700 mb-2 text-center">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-600">
          <li>Sign Up & Verify your account.</li>
          <li>Browse ongoing auctions.</li>
          <li>Place bids in real-time.</li>
          <li>Win & complete secure payments.</li>
        </ol>
      </motion.div>
      
      <motion.p
        className="text-lg text-center mt-8 text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        🚀 <span className="font-semibold text-green-700">Join us today</span> and experience the future of online bidding!
      </motion.p>
    </motion.div>
  );
};

export default About;