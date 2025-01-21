import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../redux/actions/searchAction";
import { useNavigate } from "react-router-dom";

const SearchResultsPage = ({ searchQuery, vendors }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { results = [], loading, error } = useSelector((state) => state.result || {});

  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch initial cart data from localStorage
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchResults(searchQuery));
    }
  }, [dispatch, searchQuery]);

  const handleAddToCart = (product, quantity) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images,
      quantity: parseInt(quantity, 10),
    };

    const updatedCart = [...cart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    navigate("/CartPage");
  };

  if (loading) return <p className="text-center text-gray-600">Loading search results...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.length === 0 ? (
        <p className="text-center text-gray-600">No results found for "{searchQuery}"</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={item.images}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="mt-2 text-lg font-semibold">Price: ${item.price}</p>
                <p className="text-gray-500 line-through">Discounted Price: ${item.discount_price}</p>
                <p className="mt-2 text-gray-600">Stock: {item.stock}</p>
                <p className="mt-1 text-gray-500">Vendor: {vendors[0]?.user?.name || "Unknown Vendor"}</p>
                <div className="mt-4">
                  <label htmlFor={`quantity-${item.id}`} className="block text-gray-700">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    min="1"
                    defaultValue="1"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4 w-full"
                  onClick={() =>
                    handleAddToCart(
                      item,
                      document.getElementById(`quantity-${item.id}`).value
                    )
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
