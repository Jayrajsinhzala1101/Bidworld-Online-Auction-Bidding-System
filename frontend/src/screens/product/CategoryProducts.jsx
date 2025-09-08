import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/features/productSlice";
import { Container, Title, Caption, Loader } from "../../router";
import { ProductCard } from "../../components/cards/ProductCard";
import { motion } from "framer-motion";

export const CategoryProducts = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categorySlug = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    if (products && categorySlug) {
      const filtered = products.filter(
        (product) => product.category?.toLowerCase() === categorySlug.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [products, categorySlug]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="min-h-screen bg-primary">
      <div className="relative pt-32 pb-48">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <Container className="text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <Title level={2} className="text-center mb-6 text-white text-6xl font-bold">
              {categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)} Products
            </Title>
            <Caption className="text-center text-gray-200 text-xl max-w-3xl mx-auto mb-8">
              Explore our collection of {categorySlug} products available for bidding
            </Caption>
            <div className="flex justify-center items-center gap-6 text-white mt-12">
              <div className="px-10 py-6 bg-green/20 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-4xl font-bold">{filteredProducts.length}</div>
                <div className="text-sm font-medium mt-1">Products</div>
              </div>
              <div className="px-10 py-6 bg-green/20 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-4xl font-bold">{filteredProducts.reduce((acc, product) => acc + (product.totalBids || 0), 0)}</div>
                <div className="text-sm font-medium mt-1">Total Bids</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white rounded-t-[3rem] -mt-20 pt-24 pb-16 relative z-10">
        <Container className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <Title level={4} className="text-left mb-4 text-4xl font-bold text-gray-800">
              Live Auction
            </Title>
            <Caption className="text-left text-gray-600 text-lg max-w-3xl">
              Explore on the world's best & largest Bidding marketplace with our beautiful products
            </Caption>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-3xl text-gray-600 font-medium">No products found in this category</h2>
              <p className="text-gray-500 mt-2">Check back later for new items</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
            >
              {filteredProducts.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="h-full"
                >
                  <ProductCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </div>
    </section>
  );
};