import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/v1/products/?category=${slug}`
        );
        const data = response.data;
        const currentCategory = data.find(
          (product) => product.category.slug === slug
        );
        setCategory(currentCategory.category);
        setProducts(data.filter((product) => product.category.slug === slug));
      } catch (error) {
        console.error("error fetching ");
      }
    };
    fetchCategoryAndProducts();
  }, [slug]);

  if (!category || products.length === 0) {
    return <div>Loading Page...</div>;
  }
  return (
    <>
      <div>CategoryPage</div>
      <h2>{category.name}</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
            <img src={product.images} />
            <Link
              to={`/products/${product.id}`}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
