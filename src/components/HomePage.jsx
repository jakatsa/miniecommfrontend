import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoriesAction";
import { fetchProducts } from "../redux/actions/productsAction";
import TopSellingProduct from "./TopSellingProduct";
import FlashSalesProducts from "./FlashSalesProducts";
import CategoryProducts from "./CategoryProducts";
import CategoryList from "./CategoryList";
import { ProductCard } from "./ProductCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]); // Add dispatch to dependencies

  // Log categories to inspect its value
  console.log(categories);

  return (
    <div>
      <TopSellingProduct products={products} />
      <FlashSalesProducts
        products={products
          .filter((product) => product.is_flash_sale)
          .slice(0, 5)}
      />
      {/* filtering if product is flash sale  */}
      <h1>Our Categories </h1>
      <CategoryList categories={categories} />

      <h1>Category Product List</h1>
      {Array.isArray(categories) &&
        categories.map((category) => (
          <div key={category.id}>
            {/* Ensure to use a unique key */}
            <CategoryProducts category={category} products={products} />
          </div>
        ))}
        <ProductCard products={products} />
    </div>
  );
};

export default HomePage;
