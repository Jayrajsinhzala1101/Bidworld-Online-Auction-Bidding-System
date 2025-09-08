import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categorylists } from "../../utils/data";
import { CategoryCard, Container, Heading } from "../../router";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/features/categorySlice";

export const CategorySlider = () => {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate(`/products/category?category=${category.title.toLowerCase()}`);
  };

  return (
    <section className="category-slider pb-8">
      <Container>
        <Heading title="Browse the categories" subtitle="Most viewed and all-time top-selling categories" />

        <div className="grid grid-cols-2 md:grid-cols-7 gap-5 my-8">
          {categorylists?.map((item) => (
            <div key={item._id} onClick={() => handleCategoryClick(item)} className="cursor-pointer">
              <CategoryCard item={item} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};