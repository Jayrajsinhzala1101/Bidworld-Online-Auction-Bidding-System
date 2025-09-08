import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OnlineAuctionGuide = () => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (section) => {
    setShowDetails((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto min-h-screen mt-20 p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl"
    >
      <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">
        How to Begin with Online Auctions
      </h1>
      {[1, 2, 3, 4, 5].map((step) => (
        <motion.section
          key={step}
          whileHover={{
            scale: 1.12,  
            boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.5)", 
            transition: { duration: 0.15, ease: "easeInOut" }, 
          }}
          whileTap={{ scale: 0.95 }} 
          className="mb-6 bg-gray-100 p-4 rounded-lg transition duration-300 cursor-pointer"
          onClick={() => toggleDetails(`step${step}`)}
        >
          <h2 className="text-xl font-semibold text-green-700">
            Step {step}: {[ 
              "Create an Account", 
              "Explore Auctions", 
              "Place a Bid", 
              "Track Your Bids", 
              "Winning & Payment"
            ][step - 1]}
          </h2>
          <AnimatePresence>
            {showDetails[`step${step}`] && (
              <motion.div
                initial={{ opacity: 0, maxHeight: 0, padding: 0 }}
                animate={{ opacity: 1, maxHeight: 200, padding: "10px" }}
                exit={{ opacity: 0, maxHeight: 0, padding: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-gray-700 overflow-hidden"
              >
                {[ 
                  "Create an account on the auction site with your email and set up your password.",
                  "Explore different categories to find items you’re interested in. Read product details and auction end times.",
                  "Enter the amount you’re willing to pay and place a bid.",
                  "Monitor your bids through the dashboard. Increase your bid if necessary before the auction ends.",
                  "The highest bidder wins the auction!"
                ][step - 1]}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      ))}
    </motion.div>
  );
};

export default OnlineAuctionGuide;