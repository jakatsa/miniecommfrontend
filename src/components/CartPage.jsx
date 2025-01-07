import React, { useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";

export const CartPage = ({ cart, setCart }) => {
  const navigate=useNavigate();
  // This useEffect will load the cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]); // Only runs once when the component mounts

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    // Make sure the quantity is a valid number and is at least 1
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
  const handleCheckOut=()=>{
    navigate("/CheckOutPage")
  }
  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your Cart is empty</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </td>
                  <td>
                    ${parseFloat(item.price).toFixed(2)}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item, parseInt(e.target.value))}
                    />
                  </td>
                  <td>
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h2>Total: ${calculateTotal().toFixed(2)}</h2>
            
            <button onClick={handleCheckOut}>Check Out</button>
            
          </div>
        </>
      )}
    </div>
  );
};
