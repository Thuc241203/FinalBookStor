import React, { useState } from "react";
import { useGetProductsQuery } from "../redux/api/productApi";
import LottieLoading from "../effect/LottieLoading";
import { useAppDispatch } from "../app/hook";
import { useGetCategoriesQuery } from "../redux/api/categoriesApi";
import { setCategories } from "../redux/slices/paginationSlice";
import Products from "./Products";

const Home = () => {
  const { isLoading }: any = useGetProductsQuery({
    _order: "desc",
    _limit: 5,
  });
  const { data: categoriesData }: any = useGetCategoriesQuery();
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
    dispatch(setCategories(category));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }

  return (
    <div className=" ">
      <div className="flex p-2 md:max-w-6xl md:mx-auto md:space-y-12">
        <div className="hidden md:block">
          <h2 className="text-xl font-bold mb-2">Danh mục sách</h2>
          {categoriesData?.result.map((category) => (
            <div key={category._id} className="mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category._id}
                  onChange={() => handleCategoryClick(category._id)}
                />
                <span className="ml-2">{category.name}</span>
              </label>
            </div>
          ))}
        </div>
        <Products />
      </div>
    </div>
  );
};

export default Home;
