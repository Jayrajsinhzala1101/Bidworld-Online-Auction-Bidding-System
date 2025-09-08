import React, { useEffect, useState } from "react";
import { Title } from "../../router";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllWonedProductOfUser } from "../../redux/features/productSlice";
import { Table } from "../../components/Table";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const WinningBidList = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wonedproducts } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllWonedProductOfUser());
  }, [dispatch]);

  const handlePayment = async (product) => {
    try {
      setLoading(true);
      // Navigate to payment page with product details immediately
      navigate("/payment-gateway", {
        state: {
          productDetails: {
            title: product.title,
            category: product.category,
            price: product.biddingPrice,
            id: product._id,
            image: product.image
          }
        }
      });
    } catch (error) {
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  const renderProductCard = (product) => {
    if (!product.isSoldout || product.isPaid) return null;
    
    const formattedPrice = Number(product.biddingPrice).toFixed(2);
    
    return (
      <div key={product._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-64 overflow-hidden rounded-lg">
            <img 
              src={product.image.filePath || product.image.url || '/placeholder.png'} 
              alt={product.title} 
              className="w-full h-full object-contain bg-gray-50"
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Victory! 🏆
              </span>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-medium">Category:</p>
                <p>{product.category}</p>
              </div>
              <div>
                <p className="font-medium">Your Winning Bid:</p>
                <div className="flex items-baseline">
                  <span className="text-xl font-semibold text-green-600">₹</span>
                  <p className="text-2xl text-green-600 font-bold">{formattedPrice}</p>
                </div>
              </div>
              <div>
                <p className="font-medium">Bid Status:</p>
                <p className="text-green-600 font-medium">Won - Pending Payment</p>
              </div>
              {(product.height || product.width || product.lengthPic) && (
                <div>
                  <p className="font-medium">Dimensions:</p>
                  <p>{`${product.height || 0}H x ${product.width || 0}W x ${product.lengthPic || 0}L`}</p>
                </div>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">Click below to proceed with UPI payment</p>
              <button
                onClick={() => handlePayment(product)}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:bg-blue-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  "Pay Now with UPI"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Title level={5} className="text-2xl font-semibold">
            Your Winning Bids
          </Title>
          <p className="text-gray-600 mt-2">Complete your purchase for the auctions you've won</p>
        </div>

        {wonedproducts && wonedproducts.length > 0 ? (
          <div className="space-y-6">
            {wonedproducts.map(renderProductCard)}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">You haven't won any auctions yet. Keep bidding!</p>
          </div>
        )}
      </section>
    </>
  );
};