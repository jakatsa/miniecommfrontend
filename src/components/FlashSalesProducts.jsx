import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FlashSalesProducts = ({ products }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Added loader state

  useEffect(() => {
    if (products.length > 0) {
      setCurrentIndex(0);
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [products.length]);

  // Loader useEffect: Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const product = products[currentIndex];
    navigate(`/product/${product.id}`);
  };

  if (loading) {
    return <div>Loading flash sale products...</div>; // Loader display
  }

  return (
    <div onClick={handleClick} className="w-full cursor-pointer relative">
      <h1 className="absolute top-4 left-4 text-white text-2xl z-10">
        Flash Sale Products
      </h1>
      {products.length > 0 && (
        <div className="w-full h-[500px] overflow-hidden">
          <img
            key={products[currentIndex].id}
            src={products[currentIndex].image_url}
            alt={products[currentIndex].name}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
    </div>
  );
};

export default FlashSalesProducts;
