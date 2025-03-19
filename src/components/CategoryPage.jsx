import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        // Fetch the category object by slug.
        const categoryResponse = await axios.get(
          `https://miniecommbackend.onrender.com/api/v1/categories/?slug=${slug}`
        );
        if (categoryResponse.data && categoryResponse.data.length > 0) {
          const currentCategory = categoryResponse.data[0];
          setCategory(currentCategory);
          // Fetch products using the category's id.
          const productsResponse = await axios.get(
            `https://miniecommbackend.onrender.com/api/v1/products/?category=${currentCategory.id}`
          );
          setProducts(productsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchCategoryAndProducts();
  }, [slug]);

  // Function to handle adding a product to the cart.
  const handleAddToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    const updatedCart =
      existingProductIndex > -1
        ? cart.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cart, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  if (!category || products.length === 0) {
    return <div>Loading Page...</div>;
  }

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6">{category.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col"
          >
            <img
              src={product.image_url} // Updated to use Cloudinary URL
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <div className="mt-4 flex-grow">
              <Link to={`/products/${product.slug}`}>
                <h1 className="text-xl font-semibold">{product.name}</h1>
              </Link>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <p className="text-gray-800 font-medium mt-2">
                Price: Ksh. {product.price}
              </p>
              <p className="text-gray-800 font-medium">
                Stock: {product.stock}
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              <Link
                to={`/products/${product.id}`}
                className="flex-1 py-2 px-4 bg-green-500 text-white text-center rounded hover:bg-green-600 transition-colors duration-300"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
