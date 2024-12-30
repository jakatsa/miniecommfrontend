import React, { useState, useEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";

const CategoryProducts = ({ category, products }) => {
  const { productId } = useParams();

  // State to manage the cart
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const product = products.find((prod) => prod.id === parseInt(productId));

  // Ensure products is an array before filtering
  const categoryProducts = Array.isArray(products)
    ? products.filter((product) => product.category.id === category.id)
    : [];

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  // Handle adding a product to the cart
  const handleAddToCart = (product) => {
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    let updatedCart;
    if (existingProductIndex > -1) {
      // If the product exists, update its quantity
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      // If the product does not exist, add it to the cart with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    // Update cart in localStorage and state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
      <div id={`category-${category.id}`} className="flex flex-wrap justify-center gap-6">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div key={product.id} className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
              <div
                className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${product.images})`,
                }}
              >
                <div className="flex justify-between">
                  <input type="checkbox" />
                  <button className="text-white hover:text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                    Available: {product.stock}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col items-center">
                <p className="text-gray-400 font-light text-xs text-center">
                  {category.name}
                </p>
                <Link to={`/products/${product.slug}`}>
                  <h1 className="text-gray-800 text-center mt-1">{product.name}</h1>
                  <p className="text-center text-gray-800 mt-1">Ksh. {product.price}</p>
                </Link>
                <Link to={`/products/${product.id}`}
                     className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                                >
                                  View Details
                                </Link>
                {/* Add to Cart Button */}
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                  onClick={() => handleAddToCart(product)} // Add product to cart
                >
                  Add to cart
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available in this category</p>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
