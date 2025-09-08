import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productDetails } = location.state || {};
  const [loading, setLoading] = useState(false);

  const paymentOptions = [
    {
      name: 'Google Pay',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/1200px-Google_Pay_Logo_%282020%29.svg.png',
      bgColor: 'bg-white'
    },
    {
      name: 'PhonePe',
      logo: 'https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'BHIM UPI',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Paytm',
      logo: 'https://1000logos.net/wp-content/uploads/2021/03/Paytm_Logo.png',
      bgColor: 'bg-sky-100'
    },
    {
      name: 'RuPay',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/1200px-Rupay-Logo.png',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Net Banking',
      logo: 'https://cdn-icons-png.flaticon.com/512/6364/6364343.png',
      bgColor: 'bg-gray-100'
    }
  ];

  const handlePaymentOption = async (option) => {
    try {
      setLoading(true);
      
      if (!productDetails || !productDetails.id) {
        throw new Error('Invalid product details');
      }

      // Generate UPI URL when payment option is selected
      const response = await axios.post("/api/payment/generate-upi", { 
        productId: productDetails.id 
      });
      
      const { upiUrl } = response.data;

      if (!upiUrl) {
        throw new Error('Payment URL not found');
      }

      // Open UPI payment app
      window.location.href = upiUrl;

      // After payment completion
      setTimeout(async () => {
        try {
          await axios.post("/api/payment/verify", {
            productId: productDetails.id,
            paymentStatus: "success"
          });
          toast.success("Payment successful!");
          navigate("/winning-products");
        } catch (error) {
          toast.error("Payment verification failed");
          navigate("/winning-products");
        }
      }, 30000);
    } catch (error) {
      toast.error(error.message || "Failed to process payment");
      setLoading(false);
    }
  };

  if (!productDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">Invalid payment session. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate("/winning-products")}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <div className="text-center py-8 bg-white shadow-sm">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Bid World Payment Page
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="flex-1 px-4 py-8">
          {/* Product Summary */}
          <div className="bg-white shadow-sm p-8 mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <div className="flex gap-6">
                {productDetails.image && (
                  <img
                    src={productDetails.image.filePath || productDetails.image.url}
                    alt={productDetails.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                )}
                <div className="flex flex-col justify-center">
                  <p className="text-xl text-gray-800 font-medium">Product: {productDetails.title}</p>
                  <p className="text-lg text-gray-600 mt-2">Category: {productDetails.category}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-xl font-semibold text-green-600">₹</span>
                  <p className="text-3xl font-bold text-green-600">{Number(productDetails.price).toFixed(2)}</p>
                </div>
                <p className="text-gray-500 mt-1">Your Winning Bid Amount</p>
                <p className="text-sm text-gray-400 mt-1">Amount to be paid</p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white shadow-sm p-8 w-full">
            <h2 className="text-2xl font-semibold mb-8">Select Payment Method</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
              {paymentOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handlePaymentOption(option)}
                  disabled={loading}
                  className={`${option.bgColor} p-8 rounded-lg hover:shadow-xl transition-all duration-200 flex flex-col items-center justify-center space-y-4 border-2 border-transparent hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105`}
                >
                  <div className="w-28 h-28 flex items-center justify-center p-4">
                    <img
                      src={option.logo}
                      alt={option.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-base font-medium text-gray-700">
                    {loading ? 'Processing...' : option.name}
                  </span> 
                </button>
              ))}
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>🔒 Your payment is secured with end-to-end encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PaymentPage }; 