import { CategorySlider, Hero, Process, TopCollection, TopSeller, Trust } from "../../router";
import { ProductList } from "../../components/hero/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductOfUser } from "../../redux/features/productSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { categorys } = useSelector((state) => state.category);

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