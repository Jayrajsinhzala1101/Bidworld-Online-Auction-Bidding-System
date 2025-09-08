import PropTypes from "prop-types";
import { RiAuctionFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineFavorite } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { Caption, PrimaryButton, ProfileCard, Title } from "../common/Design";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ProductCard = ({ item }) => {
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (!item?.endTime || !item?.isVerify) return;

    const checkIfEnded = () => {
      const now = new Date().getTime();
      const endTime = new Date(item.endTime).getTime();
      return now >= endTime;
    };

    // Check if already ended
    if (item.isEnded || checkIfEnded()) {
      setIsEnded(true);
      return;
    }

    // Set up timer to check end time
    const timer = setInterval(() => {
      if (checkIfEnded()) {
        setIsEnded(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [item]);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white shadow-s1 rounded-xl overflow-hidden group h-full hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Container with aspect ratio */}
      <div className="relative aspect-[4/3] w-full">
        <NavLink to={`/details/${item?._id}`} className="block w-full h-full">
          <img 
            src={item?.image?.filePath} 
            alt={item?.image?.fileName} 
            className="w-full h-full object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
          />
          {/* Status badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {item?.isSoldout && (
              <span className="bg-red-500 text-white px-3 py-1.5 text-sm font-medium rounded-full shadow-lg">
                Sold Out
              </span>
            )}
            {isEnded && (
              <span className="bg-red-500 text-white px-3 py-1.5 text-sm font-medium rounded-full shadow-lg">
                Ended
              </span>
            )}
            {!item?.isSoldout && !isEnded && item?.isVerify && (
              <span className="bg-green-500 text-white px-3 py-1.5 text-sm font-medium rounded-full shadow-lg">
                Active
              </span>
            )}
          </div>
          {/* Bids count */}
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 text-gray-800 px-3 py-1.5 text-sm font-medium rounded-full shadow-lg">
              {item?.totalBids || 0} Bids
            </span>
          </div>
          {/* Image overlay for hover effect */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </NavLink>

        {/* Category badge */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full shadow-lg">
            <BiCategory className="text-green" size={18} />
            <span className="text-sm font-medium text-gray-700">
              {item?.category || 'Uncategorized'}
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-1 group-hover:text-green transition-colors duration-300">
          {item?.title}
        </h3>

        {/* Price and Bid Info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Bid</p>
            <p className="text-xl font-bold text-green">
              ₹{item?.biddingPrice || item?.price || 0}
            </p>
          </div>
          <NavLink to={`/details/${item?._id}`}>
            <button 
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium
                ${isEnded || item?.isSoldout 
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
                  : "bg-green/10 hover:bg-green hover:text-white text-green"}`}
              disabled={isEnded || item?.isSoldout}
            >
              <RiAuctionFill size={18} />
              <span>{isEnded ? 'Ended' : item?.isSoldout ? 'Sold Out' : 'Bid Now'}</span>
            </button>
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.shape({
      filePath: PropTypes.string,
      fileName: PropTypes.string,
    }),
    category: PropTypes.string,
    isSoldout: PropTypes.bool,
    isVerify: PropTypes.bool,
    isEnded: PropTypes.bool,
    totalBids: PropTypes.number,
    biddingPrice: PropTypes.number,
    price: PropTypes.number,
    endTime: PropTypes.string,
  }).isRequired,
};