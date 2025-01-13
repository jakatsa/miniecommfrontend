import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export const ProductDetails = ({ products = [] }) => {
  const { productId } = useParams();
  const product = products.find((prod) => prod.id === parseInt(productId, 10));
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      quantity: quantity,
    };

    const updatedCart = cart.concat(cartItem);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    navigate("/CartPage");
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  if (!product) {
    return <p>Product not found or loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1>Product Details</h1>
      {/* Product Display */}
      <div>
        <img src={product.images} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
      {/* Add to Cart */}
      <button onClick={handleAddToCart}>Add to Cart</button>
      {/* Vendor Info */}
      <p>
        Vendor:{" "}
        <Link to={`vendor/${product.vendor?.id}`}>
          {product.vendor?.user?.name || "Unknown Vendor"}
        </Link>
      </p>
    </div>
  );
};
