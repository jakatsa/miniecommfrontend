import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

export const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckOut = () => {
    navigate("/CheckOutPage");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your Cart is empty</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 px-6">
                      <Link to={`/product/${item.slug}`} className="text-blue-600 hover:underline">
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-4 px-6">${parseFloat(item.price).toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item, parseInt(e.target.value))}
                        className="w-16 p-2 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="py-4 px-6">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Total: ${calculateTotal().toFixed(2)}</h2>
            <button
              onClick={handleCheckOut}
              className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600"
            >
              Check Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};
