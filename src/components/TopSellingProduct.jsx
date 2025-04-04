import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopSellingProduct = ({ products }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Added loader state

  const topsellingproduct = Array.isArray(products)
    ? products.sort((a, b) => b.sales - a.sales).slice(0, 10)
    : [];

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  // Loader useEffect: Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    let updatedCart;
    if (existingProductIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  if (loading) {
    return <div>Loading top-selling products...</div>; // Loader display
  }

  return (
    <div>
      <h1>Top Selling Products</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {topsellingproduct.length > 0 ? (
          topsellingproduct.map((product) => (
            <div key={product.id} className="w-80 bg-white shadow rounded">
              <div
                className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${product.image_url})`,
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
                  {product.brand}
                </p>
                <Link to={`/product/${product.slug}`}>
                  <h1 className="text-gray-800 text-center mt-1">
                    {product.name}
                  </h1>
                  <p className="text-center text-gray-800 mt-1">
                    Ksh. {product.price}
                  </p>
                </Link>
                <Link
                  to={`/products/${product.id}`}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                >
                  View Details
                </Link>
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to order
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
          <p>Loading....</p>
        )}
      </div>
    </div>
  );
};

export default TopSellingProduct;
