import { CategorySlider, Hero, Process } from "../../router";
import { ProductList } from "../../components/hero/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductOfUser } from "../../redux/features/productSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductOfUser());
  }, [dispatch])
  return (
    <>
      <Hero />
      <CategorySlider />
      <ProductList products={products} />
      {/* <TopSeller /> */}
      <Process />
      {/* <Trust />/ */}
      {/* <TopCollection /> */}
    </>
  );
}; 