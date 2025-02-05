import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export const ProductCard = ({ products = [] }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Find the product based on the URL parameter (productId)
  const product = products.find((prod) => prod.id === parseInt(productId));

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  // Handle adding the product to the cart
  const handleAddToCart = (product) => {
    if (!product) {
      console.error("Product is undefined or not available");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1, // You can replace this with dynamic quantity if needed
    };

    // Update cart in local storage
    const updatedCart = cart.concat(cartItem);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    navigate("/CartPage");
    console.log(updatedCart);
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-4">Product Card</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="w-80 bg-white shadow rounded">
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
                  {product.brand}
                </p>
                <h1 className="text-gray-800 text-center mt-1">
                  {product.name}
                </h1>
                <p className="text-center text-gray-800 mt-1">
                  Ksh. {product.price}
                </p>
                <div className="inline-flex items-center mt-2">
                  <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                    2
                  </div>
                  <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-4"
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
                <Link
                  to={`/products/${product.id}`}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                >
                  View Details
                </Link>
                
                {/* Add to cart button */}
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to ordersss
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
          <p>No products available</p>
        )}
      </div>
    </>
  );
};
