import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CategoryProducts = ({ category, products }) => {
  const navigate = useNavigate();
  const { productId } = useParams(); // not used currently, but available if needed

  const [cart, setCart] = useState([]);

  // Load cart data from localStorage on mount
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  // Filter products belonging to the current category
  const categoryProducts = Array.isArray(products)
    ? products.filter((product) => product.category === category.id)
    : [];

  // Add product to cart with quantity tracking
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

  return (
    <section className="my-8">
      <h3 className="text-2xl font-bold mb-4">{category.name} Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image_url} // Updated to use Cloudinary URL
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col items-center">
                <Link
                  to={`/products/${product.slug}`}
                  className="w-full text-center"
                >
                  <h1 className="text-gray-800 text-xl font-semibold mt-2">
                    {product.name}
                  </h1>
                  <p className="text-gray-800 mt-1">Ksh. {product.price}</p>
                </Link>
                <div className="flex justify-between items-center mt-4 w-full">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 flex-1 mr-2"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/products/${product.id}`}
                    className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 flex-1 text-center"
                  >
                    View Details
                  </Link>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Stock: {product.stock}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">
            No products available in this category
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
